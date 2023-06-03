import { RouterContext } from "../deps.ts";

export type Body =
  | {
      data: Record<string, unknown>;
    }
  | {
      error: string;
    };

export type Response = {
  status: number;
  body: Record<string, unknown>;
};

export type Controller<T extends string> = (
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

export const success = <T>(data: T): Response => ({
  status: 200,
  body: { data },
});

export const error = (error: string, status: 400 | 404 | 500): Response => ({
  status,
  body: { error },
});
