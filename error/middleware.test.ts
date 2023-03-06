import { CustomError } from "./error";
import { constants } from "http2";
import fastify from "fastify";
import * as request from "supertest";
import { ErrorHandlerMiddleware } from "./middleware";

test("when error pass to middleware should resolve it", async () => {
    const app = fastify();

    app.setErrorHandler(ErrorHandlerMiddleware(null));
    app.get("/cerror", () => {
        throw new CustomError(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, "something went wrong");
    });
    await app.listen({ port: 3000 });

    const req = await request("http://127.0.0.1:3000").get("/cerror");

    await app.close();

    expect(req.statusCode).toEqual(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
});
