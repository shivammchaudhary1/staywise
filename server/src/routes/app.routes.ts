import authRoutes from "./auth.routes.js";

const appRoutes = (app: any) => {
  app.use("/api/auth", authRoutes);
};

export default appRoutes;
