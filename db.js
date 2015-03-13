var mongoose = require("mongoose");
mongoose.connect("mongodb://mrexamen:ies2015!@ds035260.mongolab.com:35260/examen-api", function() {
    console.log('Conectado a MongoDB');
});
module.exports = mongoose;