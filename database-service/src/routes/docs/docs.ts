import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import swaggerConfig from "../../swagger-config.json" assert { type: "json" };
// @deno-types="npm:@types/swagger-jsdoc"
import swaggerJsDoc from "npm:swagger-jsdoc";

export const docsRouter = new Router({ prefix: "/docs" });

const specs = swaggerJsDoc({
  definition: swaggerConfig,
  apis: ["./src/routes/*/*.ts"],
});

docsRouter.get("/", (ctx) => {
  ctx.response.status = 200;
  ctx.response.headers.set("Content-Type", "html");
  ctx.response.body = `
  <html>
  <head>
  <!-- Load the latest Swagger UI code and style from npm using unpkg.com -->
  <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
  <link
  rel="stylesheet"
  type="text/css"
      href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css"
    />
    <title>My New API</title>
  </head>
  <body>
  <div id="swagger-ui"></div>
  <!-- Div to hold the UI component -->
  <script>
  window.onload = function () {
    // Begin Swagger UI call region
    const ui = SwaggerUIBundle({
      url: "openapi.json", //Location of Open API spec in the repo
      dom_id: "#swagger-ui",
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset,
          ],
          plugins: [SwaggerUIBundle.plugins.DownloadUrl],
        });
        window.ui = ui;
      };
    </script>
    </body>
    </html>
    `;
});

docsRouter.get("/openapi.json", (ctx) => {
  ctx.response.body = specs;
});
