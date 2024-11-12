export default function ({ $config, $axios, store, redirect, req}, inject) {
    const errorObject = {
        status: false,
        data: {},
        message: 'API Not Found or Timeout.'
    }

    const api = async (path, payload, loader = true) => {
        let base = `/api`;
        try {
           
            if (path[0] == '/') {
                path = path.substring(1)
            }
            let url = `${base}/${path}`

            if (!process.client) { // is server, we specify the domain
                url = req.protocol + "://" + req.headers.host  + url
            }
            
            if (loader) store.commit('updateLoader', true)

            let headers = undefined
            if (payload?.headers) {
                headers = {
                    "addheaders": btoa(JSON.stringify(payload?.headers)),
                }
                delete payload.headers
            }

            const r = await $axios.post(url, payload, { headers: headers })
            if (loader) store.commit('updateLoader', false)

            // session expired
            if (r.data.expired && path != 'login' && process.client) {
                // log user out
                if (path != 'logout') {
                    const logout = await store.dispatch('user/logOut', true)
                }
                /* else {
                    redirect('/sign-up?exp=1')
                } */
            }

            if(r.data){
                store.commit('user/updateFirstLoginSetup', r.data.first_login_setup)
                
                if(r.data.first_login_setup == 1){
                    redirect('/profile')
                }
            }

            return Promise.resolve(r.data)
        }
        catch(e) {
            return Promise.resolve(errorObject)
        }
    }

    inject('api', api)
};
