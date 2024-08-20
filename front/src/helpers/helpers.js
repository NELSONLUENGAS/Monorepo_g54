import CryptoJs from 'crypto-js'
const { VITE_SIGN_ENCRYPT } = import.meta.env


export const handleEncrypt = (data) => {
    return CryptoJs.AES.encrypt(
        JSON.stringify(data),
        String(VITE_SIGN_ENCRYPT)
    ).toString()
}

export const handleDecrypt = (dataEncrypt) => {
    return CryptoJs.AES.decrypt(
        dataEncrypt,
        String(VITE_SIGN_ENCRYPT)
    ).toString(CryptoJs.enc.Utf8)
}