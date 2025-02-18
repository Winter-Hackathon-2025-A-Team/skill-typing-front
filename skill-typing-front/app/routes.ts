import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/layout.tsx", [
    index("./routes/home.tsx"),
    route("create", "./routes/createQ.tsx"),
    route("edit", "./routes/editQ.tsx"),
    route("management", "./routes/management.tsx"),
    route("game", "./routes/game.tsx"),
  ]),
  route("login", "./routes/login.tsx"),
] satisfies RouteConfig;
