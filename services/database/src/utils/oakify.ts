import { RouterContext } from "../deps.ts";

type Data = Record<string, unknown> | Record<string, unknown>[];

export type Body =
  | Data
  | {
      errors: Record<string, string[]>;
    };

export type Response = {
  status: number;
  body: Body;
};

export type Controller<T extends string = "/"> = (
  ctx: RouterContext<T>
) => Promise<Response>;

export const oakify =
  <T extends string>(controller: Controller<T>) =>
  async (ctx: RouterContext<T>) => {
    const { status, body } = await controller(ctx);
    console.log(body);
    ctx.response.status = status;
    ctx.response.body = body;
  };

export const success = <T extends Data>(data: T): Response => ({
  status: 200,
  body: data,
});

export const error = (
  errors: Record<string, any[]>,
  status: 400 | 404 | 500 = 400
): Response => ({
  status,
  body: { errors },
});
