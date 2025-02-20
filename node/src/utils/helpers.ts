import { sign, verify } from "jsonwebtoken";

export const log = (...data: any[]) => {
  return console.log("\x1b[36m%s\x1b[0m", ...data);
};

export const info = (...data: string[]) => {
  return console.log("\x1b[36m%s", ...data);
};

export const warn = (...data: string[]) => {
  return console.log("\x1b[33m%s", ...data);
};

export const errorLog = (...data: string[]) => {
  return console.log("\x1b[31m%s", ...data);
};
export const verifyJwt: any = (token: string) => {
  return new Promise((resolve, reject) => {
    verify(token, "process.env.JWT_SECRET", (err, decode) => {
      if (err) {
        reject({ status: 401, ...err });
      }
      resolve(decode);
    });
  });
};


export const genAuthToken: any = (payload: object) => {
  return sign(payload, "process.env.JWT_SECRET", { expiresIn: "1d" });
};