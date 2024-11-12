/* setup */
const express = require('express')
const app = express()
const cookieSession = require('cookie-session')
const cors = require('cors')

app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET]
}))

// create a whitelist for accepting request
let domains = []
if (process.env.DOMAINS) {
    domains = process.env.DOMAINS.split(',')
}
const protocols = ['http', 'https']
const subdomains = ['', 'www.']

if (process.env.SUBDOMAINS) {
    (process.env.SUBDOMAINS.split(',')).forEach(s => {
        subdomains.push(`${s}.`, `www.${s}.`)
    })
}
let whitelist = []

for (let d in domains) {
    for (let p in protocols) {
        for (let s in subdomains) {
            whitelist.push(`${protocols[p]}://${subdomains[s]}${domains[d]}`)
        }
    }
}

const corsOptions = async (req, callback) => {

    const origin = req.get('origin');

    const ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for']

    if (whitelist.indexOf(origin) !== -1 || !origin) {
        return callback(null, true)
    } else {
        console.log("Not allowed by CORS occur from Origin: ", origin," IP:", ip);
        return callback(new Error("Not allowed by CORS"));
    }
}

// app.use(express.json()) // make request params from front-end available at req.body
app.use(express.json({limit: '50mb'})) // make request params from front-end available at req.body
app.options('*', cors(corsOptions))


/* routing */
app.get('/api/test', cors(corsOptions), (req, res) => {
    res.json({
        status: true
    });
})

app.get('/api/test/sess', cors(corsOptions), (req, res) => {
    res.json({
        sess: req.session ? true : false,
        status: true,
        user: req.session.user,
        access_token: req.session.access_token,
        token_type: req.session.token_type
    });
})

const errorObj = {
    success: false,
    status: false,
    message: 'Invalid API',
    data: {}
}

const routes = require('./routes/routes')
app.use('/api/:scope/:action', cors(corsOptions), async (req, res) => {
    if (req.method != 'POST') {
        res.json(errorObj)
        return
    }

    let reqData = req.body
    if (process.env.APPLICATION_ENV == 'production') {
        reqData.debug = true
    }

    if (typeof routes[req.params.scope][req.params.action] == 'function') {
        try {
            const r = await routes[req.params.scope][req.params.action](req, reqData)
            res.json(r)
        }
        catch(err) {
            res.json({
                success: false,
                status: false,
                message: err,
                data: {}
            })
        }
    }
    else {
        res.json(errorObj)
    }
});

app.use('/api/:action', cors(corsOptions), async (req, res) => {
    if (req.method != 'POST') {
        res.json(errorObj)
        return
    }

    let reqData = req.body
    if (process.env.APPLICATION_ENV == 'production') {
        reqData.debug = true
    }

    if (typeof routes[req.params.action] == 'function') {
        try {
            const r = await routes[req.params.action](req, reqData)
            res.json(r)
        }
        catch(err) {
            res.json({
                success: false,
                status: false,
                message: err,
                data: {}
            })
        }
    }
    else {
        res.json(errorObj)
    }
});

module.exports = app
