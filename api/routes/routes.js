import {_get, _post, _post2, _put, _patch, _delete} from '../helper/call'

const routes = {
    login(req) {
        return new Promise(async (resolve, reject) => {
            const r = await _post('login', req)
            if (r.success) {
                req.session.access_token = r.data.access_token
        
                // remove access token and token type
                delete r.data.access_token
                delete r.data.token_type
                req.session.user = r.data.user

                // if(r.dropdown) {
                //     req.session.credit_list = r.dropdown
                // }
            }
            resolve(r)
        })
    },
    session(req) {
        return new Promise((resolve, reject) => {
            if (req.session?.user) {
                resolve({
                    status: true,
                    data: req.session.user
                })
            }
            else {
                resolve({
                    status: false,
                    data: {}
                })
            }
        })
    },
    logout(req) {
        return new Promise(async (resolve, reject) => {
            const r = await _post('logout', req)
            req.session = null // destroy session no matter failed or success
            resolve(r)
        })
    },
    uploadRequest(req) {
        return _post(`upload-request`, req)
    },
    uploadRequestMulti(req) {
        return _post(`upload-request-multiple`, req)
    },
    'request-otp'(req) {
        return _post(`request-otp`, req)
    },
    'reset-password'(req) {
        return _post(`reset-password`, req)
    },
    leads:{
        list(req) {
            return _post(`leads/submission-list`, req)
        },
        submit(req) {
            return _post(`leads/add-leads`, req)
        },
        update(req) {
            return _post(`leads/edit-leads`, req)
        },
        remove(req) {
            return _post(`leads/remove-leads`, req)
        },
        total(req) {
            return _post(`leads/total-leads`, req)
        }
    },
    application:{
        new(req){
            return _post(`leads/add-application`, req)
        },
        list(req){
            return _post(`leads/application-list`, req)
        },
        total(req) {
            return _post(`leads/total-application`, req)
        },
        details(req) {
            return _post(`leads/detail-application`, req)
        }
    },
    report(req){
        return _post(`leads/report-list`, req)
    }

}

module.exports = routes