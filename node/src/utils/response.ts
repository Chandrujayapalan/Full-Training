export const Responses = {
    success: (
      req: any,
      res: any,
      statusCode = 200,
      message: String,
      data: any = null,
      error: any = null,
      errorObject: object 
    ) => {
      // req.appLogger.info(
      //   `URL : ${req.protocol}://${req.get("host")}${req.originalUrl
      //   }| ${req.method} | Request : ${JSON.stringify(
      //     req.body ? req.body : {}
      //   )} | Response :  ${JSON.stringify({ status: statusCode, message: message, errorObject: null, data: data })}`
      // );
      return res.status(statusCode).json({
        status: statusCode,
        message: message,
        errorObject: null,
        data: data
      })
    },
    errorResponse: (req: any, res: any, statusCode = 400, message: String, errorObject: object ) => {
      req.appLogger.warn(
        `URL : ${req.protocol}://${req.get("host")}${req.originalUrl
        }| ${req.method} | Request : ${JSON.stringify(
          req.body ? req.body : {}
        )} | Response :  ${JSON.stringify({ status: statusCode, message: message, errorObject: errorObject })}`
      );
      return res.status(statusCode).json({
        status: statusCode,
        message: message,
        errorObject: errorObject,
      });
    },
    response: (req: any, res: any, statusCode = 200, message: String, data: any = null) => {
      req.appLogger.info(
        `URL : ${req.protocol}://${req.get("host")}${req.originalUrl
        }| ${req.method} | Request : ${JSON.stringify(
          req.body ? req.body : {}
        )} | Response :  ${JSON.stringify({ status: statusCode, message: message, errorObject: null, data: data })}`
      );
      return res.status(statusCode).json({
        status: statusCode,
        message: message,
        data: data
      })
    }
  }
  