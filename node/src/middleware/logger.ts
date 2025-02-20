import "winston-daily-rotate-file";
const CryptoJS = require("crypto");
import winston from "winston";
let clientIPAddress = "Unknown";
let requestId = guid();

import WinstonCloudWatch from "winston-cloudwatch";
// import AWS from "aws-sdk";

//Generate a random request ID for identification
function guid() {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const flt_value: any = "0.";
  for (let i = 0; i < 32; i++)
    text += possible.charAt(
      Math.floor(
        (flt_value + CryptoJS.getRandomValues(new Uint8Array(1))) *
          possible.length
      )
    );
  return text;
}

//Get a formatted date
function getFormattedDate() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  minutes = minutes < 10 ? 0 + minutes : minutes;
  let strTime = hours + ":" + minutes;
  return day + "/" + month + "/" + year + " " + strTime;
}

// AWS.config.update({
//   secretAccessKey: process.env.AWS_SECRET_KEY, // ,
//   accessKeyId: process.env.AWS_ACCESS_KEY, // process.env.ACCESS_KEY,
//   region: process.env.AWS_REGION, // process.env.REGION
// });

let storeLogger = [
  new winston.transports.DailyRotateFile({
    // name: 'debug-log',
    filename: "logs/API-Logger-%DATE%.log",
    // prepend: true,
    datePattern: "YYYY-MM-DD",
    format: winston.format.printf(
      (info) =>
        `${getFormattedDate()} | ${requestId} | IP - ${clientIPAddress} | [${
          info.level
        }] | ${info.message}`
    ),
  }),
];

if (process.env.NODE_ENV === "production") {
  let cdw: any = new WinstonCloudWatch({
    logGroupName: process.env.AWS_LOG_GROUP_NAME,
    logStreamName: process.env.AWS_LOG_STREAM_NAME,
  });
  storeLogger.push(cdw);
}

class CustomLogger {
  logger: any;
  constructor() {
    this.logger = null;
    winston.loggers.add("logger", {
      transports: [
        /*new (winston.transports.Console)({
                    level: 'info',
                    colorize: true
                }),*/

        //new files will be generated each day, the date patter indicates the frequency of creating a file.
        ...storeLogger,
      ],
    });

    this.logger = winston.loggers.get("logger");
  }

  //Write an error log
  error(message: string) {
    this.logger.error(message);
    return true;
  }

  //Write an info log
  info(message: string) {
    this.logger.info(message);
    return true;
  }

  //Write a warning log
  warn(message: string) {
    this.logger.warn(message);
    return true;
  }

  //Function used as an express middleware to capture incoming IP address and request ID
  requestDetails(loggerInstance) {
    return function (req, res, next) {
      requestId = guid();
      req.appLogger = loggerInstance;
      next();
    };
  }
}

export default new CustomLogger();
