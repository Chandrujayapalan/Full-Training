import { messages } from "../utils/messages"
import { Responses as apiResponse } from "../utils/response"
import status from "../utils/responseStatus";
// error handler middleware
export default async function (err: any, req: any, res: any, next: any) {
    const code = err.status ? err.status : 500;
    if (err.message === 'Validation error') {
        if (err.fields) {
            err.message = Object.keys(err.fields).join()
        }
        err.message = `${(err.message ? `'${err.message}'` : "")} ${messages.alreadyExist.toLowerCase()}`;
        err.status = status.HTTP_BAD_REQUEST;
    }

    if (code == status.HTTP_UNPROCESSABLE_ENTITY) {
        let error: any = err.details && err.details.reduce((prev: { [x: string]: any; }, curr: { path: (string | number)[]; message: string; }) => {
            prev[curr.path[0]] = curr.message.replace(/"/g, "/n");
            return prev;
        }, {}) || err;
        let msg = Array.isArray(error) ? (Object.values(error).length ? Object.values(error).join(', ') : status[400]) : err.message;
        err.message = msg
        apiResponse.errorResponse(req, res, code, msg, error)
    } else {
        console.log(err);
        apiResponse.errorResponse(req, res, err.status || 500, err.message, err)
    }
};