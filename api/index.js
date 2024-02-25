const express = require("express");
const app = express();
const helmet = require("helmet");
const { auth } = require("express-oauth2-jwt-bearer");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routes");

dotenv.config();

const port = process.env.PORT || 8080;
app.use(helmet());

app.use(express.json());
app.use(
  cors({
    origin: process.env.OPENMART_ORIGIN,
    credentials: true,
  })
);
app.options("*", cors());
const jwtCheck = auth({
  audience: process.env.OPENMART_AUTH0_AUDIENCE,
  issuerBaseURL: process.env.OPENMART_AUTH0_BASE_URL,
  tokenSigningAlg: process.env.OPENMART_AUTH0_METHOD,
});

app.use(jwtCheck);
app.use(router);

app.listen(port, () => {
  console.log("Running on port ", port);
});
