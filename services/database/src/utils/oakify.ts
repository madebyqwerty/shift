import { Context } from "../deps.ts";

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

type Controller = (ctx: Context) => Promise<Response>;

export const oakify = (controller: Controller) => (ctx: Context) => {
  controller(ctx).then(({ status, body }) => {
    ctx.response.status = status;
    ctx.response.body = body;
  });
};
