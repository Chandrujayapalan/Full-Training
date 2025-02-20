import { Express, json, raw, text, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import appLogger from "./logger";
import compression from "compression";

import { Responses as apiResponse } from "../utils/response";
import responseStatus from "../utils/responseStatus";

import {
    requestDecryption,
    responseEncryption,
} from "../utils/globalFunctions";



export default async (app: Express) => {
    // do any other app stuff, such as wire in passport, use cors etc

    app.use(json({ limit: '5mb' }));
    app.use(text({ limit: '5mb' }));
    app.use(raw({ limit: '5mb' }));
    // app.use(morgan("dev", {
    //     skip(req, res) { return res.statusCode < 400 }
    // }));
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(cors());
    app.use(appLogger.requestDetails(appLogger));

    // Compress all HTTP responses
    app.use(compression());
    const setCache = function (req: Request, res: Response, next: NextFunction) {
        // here you can define period in second, this one is 5 minutes
        const period = 60 * 5

        // you only want to cache for GET requests
        // if (req.method == 'GET') {
        //     res.set('Cache-control', `public, max-age=${period}`)
        // } else {
        //     // for the other requests set strict no caching parameters
        // }
        res.set('Cache-control', `no-cache, no-store`)
        res.header('X-Frame-Options', 'SAMEORIGIN')
        res.removeHeader("X-Powered-By");
        // remember to call next() to pass on the request
        next()
    }

    // now call the new middleware function in your app
    app.use(setCache)
    app.use(async (req: any, res: any, next) => {
      
        if (req.path === "/v1/request/encrypt" || req.path === "/v1/request/decrypt") {
            return next();
        }
        const { encDec = 0 } = req.query;
        // if true the request body will be decrypted before processing
        if (req.body && Object.keys(req.body).length && Number(1) && !parseInt(encDec || 0)) {
            // if req body is not string error will be returned
            if (typeof req.body !== "string" && req.method !== "GET") {
                return apiResponse.errorResponse(
                    req,
                    res,
                    responseStatus.HTTP_UNSUPPORTED_MEDIA_TYPE,
                    "Unsupported Media Type",{}
                );
            } else if (typeof req.body === "string") {
                console.log('req.body123',req.body);
                const data: any = await requestDecryption(req.body);
                req.body = data;
            }
        }
        next();
    });
    app.use(async (req: any, res: any, next) => {
        if (req.path === "/v1/request/encrypt" || req.path === "/v1/request/decrypt") {
            return next();
        }
        const { encDec = 0 } = req.query;
        // if true encrypeted response 
        //  be sent.
        if (Number(1) && !parseInt(encDec || 0)) {
            let sendEncryptedResponse = res.send;
            res.send = async function (data: any) {
                let body = await responseEncryption(data); // Result a string of letters and numbers
                sendEncryptedResponse.apply(this, [body]);
            };
        }
        next();
    });
    return app
}
