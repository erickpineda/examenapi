var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use("/api/productes", require("./controllers/api/productes"));
app.use("/",require("./controllers/static"));

app.listen(8080,function(){
    console.log("Servidor funcionando por el puerto 8080");
});

/*
app.listen(process.env.PORT, function() {
    console.log('Server listening on', process.env.PORT);
});*/
