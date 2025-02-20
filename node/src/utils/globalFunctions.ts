const CryptoJS = require("crypto-js");
const { Parser } = require("json2csv");

/**
 * Encryption for all processed responses
 */
const ENCRYPTION_KEY = 'bf3c199c2470cb477d907b1e0917c17b';

export const responseEncryption = async (text: any, type = "json") => {
  try {
    console.log(text, "text1");

    if (type == "json") {
      text = text.toString()
    }
    console.log(text, "text2");

    const encrypted = await CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();

    return encrypted
  } catch (err) {
    console.log(JSON.stringify(err), "API_ENCRYPTED_ERROR");
    return false;
  }
};

/**
 * Decryption for all incoming requests
 */
export const requestDecryption = async (text: any, type = "json") => {
  try {
    let bytes = await CryptoJS.AES.decrypt(text, ENCRYPTION_KEY);
    let decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (type != "json") {
      return decrypted;
    } else {
      return {
        ...JSON.parse(decrypted)
      };
    }
  } catch (err) {
    console.log('err',err);
    console.log(JSON.stringify(err), "API_DECRYPTED_ERROR");
    return false;
  }
};

export const encrypt = (text: string) => {
  try {
    return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
  } catch (error) {
    return Promise.reject(error)
  }
}

export const decrypt = (string: string) => {
  try {
    let bytes = CryptoJS.AES.decrypt(string, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return Promise.reject(error)
  }
}

export const convertJsonDataToCSV = (payload: [{}]) => {
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(payload);
  let file = Buffer.from(csv.toString("base64"));
  return { file };
}


