import { table } from "./storage";

// Create the API
export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [table],
      },
      args: {
        auth: { iam: true }
      },
    }
  },
  cors: true
});

api.route("POST /notes", "packages/functions/src/create.main");
api.route("GET /notes/{id}", "packages/functions/src/get.main");
api.route("GET /notes", "packages/functions/src/list.main");
api.route("PUT /notes/{id}", "packages/functions/src/update.main");
api.route("DELETE /notes/{id}", "packages/functions/src/delete.main");

// import { bucket } from "./storage";

// export const api = new sst.aws.ApiGatewayV2("Api");

// api.route("GET /", {
//   link: [bucket],
//   handler: "packages/functions/src/api.handler",
// });