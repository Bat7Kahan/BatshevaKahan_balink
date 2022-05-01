const express = require("express");
const cors = require("cors");

const server = express();

const controller = require("./controllers-layer/controller");

server.use(cors());
server.use(express.json());

server.use("/api", controller);

server.use("*", (request, response)=> {
    response.status(404).send(`Route not found ${request.originalUrl}`);
});


const listener = server.listen(4000, () => {
    console.log("Listening on 4000");
}).on("error", (error) => {
    if(error.code === "EADDRINUSE")
        console.log("Error: Address in use");
    else
        console.log("Error: Unknown error");
});