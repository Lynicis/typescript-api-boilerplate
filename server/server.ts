import * as fastify from "fastify";
import * as winston from "winston";
import { MainConfigModel } from "../config/model";
import { ErrorHandlerMiddleware } from "../error/middleware";
import { fastifyRequestContext } from "@fastify/request-context";

interface ServerImplements {
    Start(): void;
    Stop(): void;
    get Fastify(): any;
}

class Server implements ServerImplements {
    private readonly _config: MainConfigModel;
    private readonly _logger?: winston.Logger;
    private readonly _handlers?: Array<HandlerImplements>;
    private readonly _app: any;

    constructor(config: MainConfigModel, logger?: winston.Logger, handlers?: Array<HandlerImplements>) {
        this._config = config;
        this._logger = logger;
        this._app = fastify();
        this._handlers = handlers;

        this._app.setErrorHandler(ErrorHandlerMiddleware(this._logger));
        this._app.get("/health", () => {
            return "OK";
        });

        return;
    }

    Start() {
        this._app.register(fastifyRequestContext, {
            defaultStoreValues: {
                logger: this._logger,
            },
        });

        this._handlers?.forEach((handler) => {
            handler.RegisterRoutes();
        });

        const serverOptions = {
            port: this._config.server.port,
        };
        this._app.listen(serverOptions, (err, address) => {
            if (err) {
                this._logger?.error(`unexpected error occurred: ${err.toString()}`);
                process.exit(1);
            }
            this._logger?.info(`server running: ${address}`);
        });
    }

    Stop(): void {
        this._app.close();
    }

    get Fastify(): any {
        return this._app;
    }
}

export { ServerImplements, Server };
