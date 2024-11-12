const crypto = require('crypto');

const aes = {
    encrypt(plain_text, secret, iv) {
        const encryptor = crypto.createCipheriv('AES-256-CBC', secret, iv)
        return encryptor.update(plain_text, 'utf8', 'base64') + encryptor.final('base64')
    },
    decrypt(encryptedMessage, secret, iv) {
        const decryptor = crypto.createDecipheriv('AES-256-CBC', secret, iv)
        return decryptor.update(encryptedMessage, 'base64', 'utf8') + decryptor.final('utf8')
    }
}

const randomId = (length = 4) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let str = ''
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return str;
}

export {aes, randomId}