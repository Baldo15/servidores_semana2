const mongoose = require('mongoose');
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;

MongoMemoryServer.create()
    .then((mongoServer) =>{
        return mongoose.connect(mongoServer.getUri(), {
            useNewUrlParser: true,
            dbName: "express-crud",
            useUnifiedTopology: true,
        });
    })
    .then(()=> console.info(`conexion exitosa!`))
    .catch((err)=>{
        console.error(err);
    });