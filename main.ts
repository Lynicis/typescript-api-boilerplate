import * as winston from "winston";
import { MainConfig } from "./config/mainConfig";
import { MainConfigModel } from "./config/model";
import { Server, ServerImplements } from "./server/server";

const logger: winston.Logger = winston.createLogger({
    transports: [new winston.transports.Console()],
});

const config: MainConfigModel = new MainConfig().ReadConfig();

const server: ServerImplements = new Server(config, logger);
server.Start();
