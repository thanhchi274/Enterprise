const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
app.listen(port, (error) => {
          if (error) throw error;
          console.log("Server is running 🚀 " + port);
});