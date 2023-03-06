import * as winston from "winston";
import { CustomError } from "./error";

function ErrorHandlerMiddleware(logger?: winston.Logger): (error, request, reply) => any {
    return function (error, request, reply) {
        if (error) {
            if (error instanceof CustomError) {
                logger?.error(error.Message);
                return reply.Code(error.Code);
            }

            return reply.send(error);
        }

        return reply.done();
    };
}

export { ErrorHandlerMiddleware };
