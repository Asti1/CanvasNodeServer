import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import PathParameters from "./Lab5/PathParameters.js";
import QueryParameters from "./Lab5/QueryParameters.js";
import WorkingWithObjects from "./Lab5/WorkingWithObjects.js";
import WorkingWithArrays from "./Lab5/WorkingWithArrays.js";
import UserRoutes from "./Canvas/Users/routes.js";
import CourseRoutes from "./Canvas/Courses/routes.js";
import db from "./Canvas/Database/index.js";
import session from "express-session";
import "dotenv/config";
import ModulesRoutes from "./Canvas/Modules/routes.js";
import AssignmentsRoutes from "./Canvas/Assignments/routes.js";
import EnrollmentsRoutes from "./Canvas/Enrollements/routes.js";
import mongoose from "mongoose";
const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);
const app = express();
// Configure CORS to support local and deployed frontends with credentials

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

// Note: Express v5 no longer accepts '*' in path-to-regexp.
// Preflight is handled by the global cors middleware above; no explicit options route needed.
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: process.env.SERVER_ENV === "development" ? "lax" : "none",
    secure: process.env.SERVER_ENV !== "development",
  },
};
// In production behind HTTPS, enable secure cookies and trust proxy
if (process.env.SERVER_ENV !== "development") {
  app.set("trust proxy", 1);
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app);
EnrollmentsRoutes(app);
Lab5(app);
Hello(app);
PathParameters(app);
QueryParameters(app);
WorkingWithObjects(app);
WorkingWithArrays(app);
app.listen(process.env.PORT || 4000);
