type ServerConfigModel = {
    port: string;
};

interface HandlerImplements {
    RegisterRoutes(): void;
}
