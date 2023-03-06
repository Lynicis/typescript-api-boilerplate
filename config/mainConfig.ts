import * as dotenv from "dotenv";
import { MainConfigModel } from "./model";
import { ServerConfig } from "../server/config";

interface ConfigImplements {
    ReadConfig(): object;
}

class MainConfig implements ConfigImplements {
    ReadConfig(): MainConfigModel {
        const isAtRemote: string = process.env.IS_AT_REMOTE;
        if (isAtRemote == null) {
            dotenv.config();
        }

        const serverConfig: ServerConfigModel = new ServerConfig().ReadConfig();

        return {
            server: serverConfig,
        };
    }
}

export { ConfigImplements, MainConfig };
