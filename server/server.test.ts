import { Server } from "./server";
import { MainConfig } from "../config/mainConfig";
import { expect } from "@jest/globals";

test("when call server class should return server", () => {
    const server = new Server(null, null, null);

    expect(typeof server).toBe("object");
});

test("start and stop server without any error", () => {
    const config = new MainConfig().ReadConfig();
    const server = new Server(config);
    server.Start();
    server.Stop();
});

test("when call fastify getter should return fastify instance", () => {
    const server = new Server(null, null);

    expect(server.Fastify).not.toBeNull();
});
