const express = require("express");
const cors = require("cors");
const cluster = require("cluster");
const os = require("os");
const { portNo } = require("./utils/KeySettings");
const mainRouter = require("./routes/index");
//cluster helps in allowing backend to handle multiple clitents at same time, concurrently. ALthough it depends upon the capability of system on which backEnd is runing
const numCPUs = os.cpus().length; // It fethces the number of CPU cores
const enableCluster = process.env.ENABLE_CLUSTER === "false"; // make it true to use clustering and false for noraml functionaling, by default it set to false as for checking purpose

// Function to initialize the app
const startServer = () => {
  const app = express();
  app.use(cors());

  // For BE and FE to interact with each other, for seamless flow of information
  app.use(express.json()); // For accessing JSON content of a request

  // Base route: api/v1
  app.use(
    "/api/v1",
    (req, res, next) => {
      console.log("Through main route"); // For getting the flow of user
      next();
    },
    mainRouter
  );

  app.listen(portNo, () => {
    console.log(
      `Backend is running on port no: ${portNo}, Worker ID: ${process.pid}`
    );
  });
};

// Logic to handle clustering or single instance
if (enableCluster && cluster.isMaster) {
  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Log when a worker dies
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork(); // Automatically restart a worker when it dies
  });
} else {
  // If not clustering, start the server normally
  startServer();
}
