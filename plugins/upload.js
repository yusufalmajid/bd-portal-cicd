// export default function ({ $api, $axios }, inject) {
//     const upload = async (file, isPublic) => {
//         return new Promise(async (resolve) => {
//             const res = await $api('uploadRequest', {
//                 'filename': file.name,
//                 'content-type': file.type || file.mimeType,
//                 'size': file.size,
//                 'is_public': isPublic
//             });
//             if (!res.status) {
//                 resolve(res);
//                 return;
//             }
//             let params = {
//                 'acl': res.data.field['acl'],
//                 'X-Amz-Security-Token': res.data.field['X-Amz-Security-Token'],
//                 'key': res.data.field['key'],
//                 'X-Amz-Credential': res.data.field['X-Amz-Credential'],
//                 'X-Amz-Algorithm': res.data.field['X-Amz-Algorithm'],
//                 'X-Amz-Date': res.data.field['X-Amz-Date'],
//                 'Policy': res.data.field['Policy'],
//                 'X-Amz-Signature': res.data.field['X-Amz-Signature'],
//                 'Content-Type': file.type || file.mimeType
//             }
//             let formData = new FormData();
//             for (let x in params) {
//                 formData.append(x, params[x]);
//             }
//             formData.append('file', file);

//             try {
//                 let uploadAct = await fetch(res.data.body.action, {
//                     method: res.data.body.method,
//                     body: formData,
//                     mode: 'no-cors'
//                 });
//                 resolve({ status: true, data: { key: params.key } })
//             }
//             catch (e) {
//                 resolve({ status: false, data: {}, error: e });
//             }
//         });
//     }
//     inject('upload', upload);
// }


export default function ({ i18n, $api, $axios }, inject) {
    const upload = async (file, isPublic, iframeData) => {
        return new Promise(async (resolve) => {
            const res = await $api(iframeData ? 'merchant/uploadRequest' : 'uploadRequest', {
                'file_name': file.name,
                'content_type': file.type || file.mimeType,
                // 'size': file.size,
                'is_public': isPublic,
                ...iframeData,
            });
            if (!res.status) {
                resolve({ status: false, data: {}, error: i18n.t('error_upload') });
            }
            if(res.data && (!res.data.key || !res.data.uploadUrl)){
                resolve({ status: false, data: {}, error: i18n.t('error_upload') });
            }
            try {
                let uploadAct = await fetch(res.data.uploadUrl, {
                    // method: putData.body.method,
                    method: "PUT",
                    body: file,
                }).then(async (json) => {
                    resolve({ status: true, data: { key: res.data.key } });
                }).catch(err => {
                    resolve({ status: false, data: {}, error: i18n.t('error_upload') });
                });
            }
            catch (e) {
                resolve({ status: false, data: {}, error: e.message || i18n.t('error_upload') });
            }
        });
    }

    const getKeyfromLink = (links) => {
        links = links.split("?");
        let link = links[0];
        return link.split('.com/')[1];
    }

    const uploadMulti = async (files, isPublic, iframeData) => {
        return new Promise(async (resolve) => {
            var data = []

            files.forEach(element => {
                data.push({
                    'filename': element.name,
                    'content_type': element.type || element.mimeType,
                    // 'size': element.size,
                    'is_public': isPublic,
                    ...iframeData,
                })
            });

            const res = await $api(iframeData ? 'merchant/uploadRequestMulti' : 'uploadRequestMulti', data);
            if (!res.status) {
                resolve(res);
                return;
            }
            let params = {
                'acl': res.data.field['acl'],
                'X-Amz-Security-Token': res.data.field['X-Amz-Security-Token'],
                'key': res.data.field['key'],
                'X-Amz-Credential': res.data.field['X-Amz-Credential'],
                'X-Amz-Algorithm': res.data.field['X-Amz-Algorithm'],
                'X-Amz-Date': res.data.field['X-Amz-Date'],
                'Policy': res.data.field['Policy'],
                'X-Amz-Signature': res.data.field['X-Amz-Signature'],
                'Content-Type': file.type || file.mimeType
            }
            let formData = new FormData();
            for (let x in params) {
                formData.append(x, params[x]);
            }
            formData.append('file', file);

            try {
                let uploadAct = await fetch(res.data.body.action, {
                    method: res.data.body.method,
                    body: formData,
                    mode: 'no-cors'
                }).then(async (json) => {
                    // let result = await json.json();

                    resolve({ status: true, data: { key: params.key } });
                }).catch(err => {
                    resolve({ status: false, data: {}, error: i18n.t('error_upload') });
                });
            }
            catch (e) {
                resolve({ status: false, data: {}, error: e.message || i18n.t('error_upload') });
            }
        });
    }

    inject('upload', upload);
    inject('uploadMulti', uploadMulti);
}
