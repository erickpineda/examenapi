var Producte = require("../../models/producte");
var router = require("express").Router();

router.get("/", function(req, res, next) {
    Producte.find().sort('-date').exec(function(err, productes) {
        if(err) {
            return next(err);
        }
        res.json(productes);
    });
});

router.post("/", function(req, res, next) {
    var productes = new Producte({
        codi: req.body.codi,
        nom: req.body.nom,
        seccio: req.body.seccio,
        preu: req.body.preu
    });
    productes.save(function(err, producte) {
        if(err) {
            return next(err)
        }
        res.status(201).json(producte);
    });
});

router.put("/:codi", function(req, res, next){
    var producteCodi = req.params.codi;
    var rastreator = Producte.findOne({
        'codi': producteCodi
    }, function(err, producte) {
        if(err) {
            return next(err);
        }
        if(!producte) res.status(403).json({
            "Mensaje Error:": "El producto que buscas no existe"
        });
        Producte.findByIdAndUpdate(producte._id, req.nom, function(err) {
            if(err) {
                return next(err);
            }
            res.status(201).json({
                "Mensaje": "Actualizado Correctamente"
            });
        });
    });
    
});

router.delete("/:codi", function(req, res, next){
    var producteCodi = req.params.codi;
    var rastreator = Producte.findOne({
        'codi': producteCodi
    });
    rastreator.exec(function(err, producte) {
        if(err) {
            return handleError(err);
        }
        if(producte == null) {
            return res.send("El producto no existe");
        }
        producte.remove(function(err) {
            res.send("El producto se ha eliminado correctamente");
        });
    });
});

module.exports = router;