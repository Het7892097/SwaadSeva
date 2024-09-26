
//for scaling web-app use below logic using cluster, which create multiple instance of
//node and uses Robin-round appproach

const cluster = require('cluster');
const express = require('express');
const cors = require('cors');
const { portNo } = require('./utils/KeySettings');
const mainRouter = require('./routes/index');

const numCPUs = require('os').cpus().length; // Get the number of CPU cores

if (cluster.isMaster) {
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    const app = express();
    app.use(cors()); // For BE and FE to interact with each other, for seamless flow of information
    app.use(express.json()); // For accessing JSON content of a request

    // Base route: api/v1
    app.use('/api/v1', (req, res, next) => {
        console.log('Through main route'); // For getting the flow of user
        next();
    }, mainRouter);

    app.listen(portNo, () => {
        console.log(`Backend is running on port no: ${portNo}, Worker ID: ${process.pid}`);
    });
}
