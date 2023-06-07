import { RouterContext } from "../deps.ts";

export type Body =
  | {
      data: Record<string, unknown>;
    }
  | {
      errors: Record<string, unknown>;
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
  (ctx: RouterContext<T>) => {
    controller(ctx).then(({ status, body }) => {
      ctx.response.status = status;
      ctx.response.body = body;
    });
  };

export const success = <T extends Record<string, unknown>>(
  data: T
): Response => ({
  status: 200,
  body: { data },
});

export const error = (
  errors: Record<string, unknown>,
  status: 400 | 404 | 500 = 400
): Response => ({
  status,
  body: { errors },
});
