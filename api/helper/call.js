import { aes, randomId } from '../helper/utils'

const axios = require('axios')
const cookie = require('cookie');

const errorObj = {
    success: false,
    status: false,
    message: 'API Not Found or Timeout',
    data: {}
}

const generateHeader = (req) => {
    let ID = req.session.access_token || req.session.uniqueId
    if (!ID) {
        ID = randomId(4)
        req.session.uniqueId = Date.now().toString() + ID
    }

    const cookies = (cookie && req.headers?.cookie && typeof req.headers?.cookie === "string") ? cookie.parse(req.headers.cookie) : {}
    let headers = {
        // Depending on back-end api, see if they need the API-KEY. If no need, just comment this out
        // 'API-KEY': aes.encrypt(JSON.stringify({ ApplicationId: ID }), process.env.AES_SECRET, process.env.AES_IV),
        'Lang': cookies?.['i18n_redirected'] || 'en_US',
        'ip-web': req.headers['cf-connecting-ip'] || req.connection.remoteAddress,
    }

    if (req.headers.addheaders) {
        const addHeaders = JSON.parse(atob(req.headers.addheaders))
        headers = {
            ...headers,
            ...addHeaders,
        }
    }

    if (req.session.access_token) {
        headers['Authorization'] = `Bearer ${req.session.access_token}`
    }
    return headers
}

const generateDebug = (response) => {
    if (process.env.APPLICATION_ENV != 'production' && response && response.config) {
        const c = response.config
        return {
            method: c.method,
            url: c.url,
            headers: c.headers,
            params: c.params,
            data: c.data
        }
    }
    return {}
}

const _get = (path, req) => {
    
    console.log('api call to be', {
        method: 'get',
        path : process.env.API_DOMAIN + path,
        body: req.body
    })


    return new Promise(async (resolve, reject) => {
        try {
            const r = await axios.get(process.env.API_DOMAIN + path, { headers: generateHeader(req), params: req.body })
            r.data.fe_debug = generateDebug(r)
            r.data.success = r.data.status
            if(r.data.access_token) {
                req.session.access_token = r.data.access_token
                delete r.data.access_token
                delete r.data.token_type
            }
            resolve(r.data)
        }
        catch (err) {
            if (err.response?.data) {
                err.response.data.fe_debug = generateDebug(err.response)
                resolve(err.response.data)
            }
            else {
                resolve(errorObj)
            }
        }
    })
}

const _post2 = (path, req) => {

    console.log('api call to be', {
        method: 'post2',
        path : process.env.API_DOMAIN + path,
        body: req.body
    })

    return new Promise(async (resolve, reject) => {
        try {
            const r = await axios.post(process.env.API_DOMAIN + path, req.body, {headers: generateHeader(req)})
            r.data.fe_debug = generateDebug(r)
            r.data.success = r.data.status
            if(r.data.access_token) {
                req.session.access_token = r.data.access_token
                delete r.data.access_token
                delete r.data.token_type
            }
            resolve(r.data)
        }
        catch (err) {
            if (err.response?.data) {
                err.response.data.fe_debug = generateDebug(err.response)
                resolve(err.response.data)
            }
            else {
                resolve(errorObj)
            }
        }
    })
}

const _post = (path, req) => {

    console.log('api call to be', {
        method: 'post',
        path : process.env.API_DOMAIN + path,
        body: req.body
    })

    return new Promise(async (resolve, reject) => {
        try {
            const r = await axios.post(process.env.API_DOMAIN + path, req.body, {headers: generateHeader(req)})
            r.data.fe_debug = generateDebug(r)
            r.data.success = r.data.status
            if(r.data.access_token) {
                req.session.access_token = r.data.access_token
                delete r.data.access_token
                delete r.data.token_type
            }
            resolve(r.data)
        }
        catch (err) {
            if (err.response?.data) {
                err.response.data.fe_debug = generateDebug(err.response)
                resolve(err.response.data)
            }
            else {
                resolve(errorObj)
            }
        }
    })
}

const _put = (path, req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const r = await axios.put(process.env.API_DOMAIN + path, req.body, {headers: generateHeader(req)})
            r.data.fe_debug = generateDebug(r)
            r.data.success = r.data.status
            if(r.data.access_token) {
                req.session.access_token = r.data.access_token
                delete r.data.access_token
                delete r.data.token_type
            }
            resolve(r.data)
        }
        catch (err) {
            if (err.response?.data) {
                err.response.data.fe_debug = generateDebug(err.response)
                resolve(err.response.data)
            }
            else {
                resolve(errorObj)
            }
        }
    })
}

const _patch = (path, req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const r = await axios.patch(process.env.API_DOMAIN + path, req.body, {headers: generateHeader(req)})
            r.data.fe_debug = generateDebug(r)
            r.data.success = r.data.status
            if(r.data.access_token) {
                req.session.access_token = r.data.access_token
                delete r.data.access_token
                delete r.data.token_type
            }
            resolve(r.data)
        }
        catch (err) {
            err.response.data.fe_debug = generateDebug(err.response)
            if (err.response?.data) {
                resolve(err.response.data)
            }
            else {
                resolve(errorObj)
            }
        }
    })
}

const _delete = (path, req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const r = await axios.delete(process.env.API_DOMAIN + path, { headers: generateHeader(req), data: req.body })
            r.data.fe_debug = generateDebug(r)
            r.data.success = r.data.status
            if(r.data.access_token) {
                req.session.access_token = r.data.access_token
                delete r.data.access_token
                delete r.data.token_type
            }
            resolve(r.data)
        }
        catch (err) {
            if (err.response?.data) {
                err.response.data.fe_debug = generateDebug(err.response)
                resolve(err.response.data)
            }
            else {
                resolve(errorObj)
            }
        }
    })
}

export {_get, _post, _post2, _put, _patch, _delete}