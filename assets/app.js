var app = angular.module('appLearn', []);

app.controller('ProductesController', function($scope, ProductesService) {
    ProductesService.fetch().success(function(productes) {
        $scope.productes = productes;
    }).error(function(e) {
        console.log(e);
    });
    
    $scope.afegirProducte = function() {
        if($scope) {
            ProductesService.create({
                codi: $scope.codi,
                nom: $scope.nom,
                seccio: $scope.seccio,
                preu: $scope.preu
            }).success(function(producte) {
                $scope.productes.unshift(producte);
                $scope.nom = null
            });
        }
    };
    $scope.esborrarProducte = function() {
        if ($scope){
            ProductesService.romove({
                codi: $scope.codi,
                nom: $scope.nom,
                seccio: $scope.seccio,
                preu: $scope.preu
            }).success(function(producte){
                $scope.productes.unshift(producte);
            })
        }
    };
    $scope.editarProducte = function() {
        if ($scope){
            ProductesService.update({
                codi: $scope.codi,
                nom: $scope.nom,
                seccio: $scope.seccio,
                preu: $scope.preu
            }).success(function(producte){
                $scope.productes.unshift(producte);
            })
        }
    };
});

app.service("ProductesService", function($http) {
    this.fetch = function() {
        return $http.get("/api/productes");
    };
    this.create = function(producte) {
        return $http.post("/api/productes", producte);
    };
    this.romove = function(producte) {
        return $http.delete("/api/productes", producte);
    };
    this.update = function(producte) {
        return $http.put("/api/productes", producte);
    };
});