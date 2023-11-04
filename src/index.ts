import express from "express";
import { HOST_NAME, PORT } from "./config";
import errorHandler from "./middlewares/errorHandler";
import router from "./routes";
import connectDb from "./utils/connectDb";

const app = express();

/** ---> Registering middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** ---> Registering home route. */
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to the Home Route." });
});

/** Registering routes */
app.use("/api/v1", router);

/** ---> Registering 404 (not found page) */
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Page not found." });
});

/** ---> Registering global error handler  */
app.use(errorHandler);

app.listen(Number(PORT), HOST_NAME ? HOST_NAME : "127.0.0.1", () => {
  console.log(`Server is runnig at : http://${HOST_NAME}:${PORT}`);
  connectDb("mongodb://127.0.0.1:27017/user_auth");
});
