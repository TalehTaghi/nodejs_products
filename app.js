const express = require('express');
const app = express();
const port = 3000;

const generalRoutes = require("./src/route/route");

app.use("/api", generalRoutes);

app.listen(port, () => {
  console.log(`RUN http://localhost:${port}`)
})