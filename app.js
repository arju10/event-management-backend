const express = require("express");
const bodyParser = require("body-parser");
const eventRoutes = require("./routes/eventRoutes");
const { sequelize } = require("./models");

const app = express();

app.use(bodyParser.json());

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync();

app.use("/events", eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
