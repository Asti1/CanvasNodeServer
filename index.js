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
import EnrollmentsRoutes from "./Canvas/Enrollments/routes.js";

const app = express();
// Configure CORS to support local and deployed frontends with credentials
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  // Add common hosting domains here as needed
  "https://cms-projects.vercel.app",
];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "none",
    secure: false,
  },
};
// In production behind HTTPS, enable secure cookies and trust proxy
if (process.env.SERVER_ENV !== "development") {
  app.set("trust proxy", 1);
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}

app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);
Lab5(app);
Hello(app);
PathParameters(app);
QueryParameters(app);
WorkingWithObjects(app);
WorkingWithArrays(app);
app.listen(process.env.PORT || 4000);
