import Fastify, { FastifyInstance, FastifyListenOptions } from "fastify";
import * as winston from "winston";
import { MainConfigModel } from "../config/model";
import { ErrorHandlerMiddleware } from "../error/middleware";
import { fastifyRequestContext } from "@fastify/request-context";

interface ServerImplements {
    Start(): Promise<FastifyInstance>;
    Stop();
    get Fastify(): FastifyInstance;
}

class Server implements ServerImplements {
    private readonly _config: MainConfigModel;
    private readonly _logger?: winston.Logger;
    private readonly _handlers?: Array<HandlerImplements>;
    private readonly _app: FastifyInstance;

    constructor(config: MainConfigModel, logger?: winston.Logger, handlers?: Array<HandlerImplements>) {
        this._config = config;
        this._logger = logger;
        this._app = Fastify({
            disableRequestLogging: true,
            return503OnClosing: true,
            forceCloseConnections: true,
        });
        this._handlers = handlers;

        if (this._logger != null) {
            this._app.register(fastifyRequestContext, {
                defaultStoreValues: {
                    logger: this._logger,
                },
            });
        }
        this._app.setErrorHandler(ErrorHandlerMiddleware(this._logger));
        this._app.get("/health", () => "OK");
        this._handlers?.forEach((handler) => {
            handler.RegisterRoutes();
        });
    }

    async Start(): Promise<FastifyInstance> {
        const serverOptions: FastifyListenOptions = {
            port: Number(this._config.server.port),
        };
        await this._app.listen(serverOptions);
        return this._app.ready((err) => {
            if (err) {
                this._logger?.error(err);
                process.exit(1);
            }

            this._logger?.info(`server running at: ${this._config.server.port}`);
        });
    }

    Stop() {
        return this._app.close();
    }

    get Fastify(): FastifyInstance {
        return this._app;
    }
}

export { ServerImplements, Server };
