const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const routes = require("./routes");

const { PORT = 8001, HOSTNAME = "localhost" } = process.env;

app.use(express.json());
app.use("/api", routes);

app.use((err, req, res, next) => {
  res.json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://${HOSTNAME}:${PORT}`);
});
