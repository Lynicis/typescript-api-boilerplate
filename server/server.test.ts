import { Server, IServer } from "./server";
import { MainConfig } from "../config/mainConfig";

test("when call server class should return server", () => {
    const server = new Server(null, null, null);

    expect(typeof server).toBe("object");
});

test("start and stop server without any error", async () => {
    const config = new MainConfig().ReadConfig();
    const server: IServer = new Server(config);
    await server.Start().then(async () => await server.Stop());
});

test("when call fastify getter should return fastify instance", () => {
    const server = new Server(null, null);

    expect(server.Fastify).not.toBeNull();
});
