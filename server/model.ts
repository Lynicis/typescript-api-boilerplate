type ServerConfigModel = {
    port: string;
};

interface IHandler {
    RegisterRoutes(): void;
}

export {
    ServerConfigModel,
    IHandler
}
