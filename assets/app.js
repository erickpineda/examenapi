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
    // Gracias stackoverflow
    $scope.esborrarProducte = function(producte) {
        ProductesService.romove(producte.codi).success(function() {
            $scope.productes.splice($scope.productes.indexOf(producte), 1);
        });
    };
    
    $scope.editarProducte = function(producte) {
        
            ProductesService.update(producte.codi,{
                nom: $scope.nom,
                seccio: $scope.seccio,
                preu: $scope.preu
            }).success(function() {
                /*$scope.productes.codi = $scope.codi;
                $scope.productes.nom = $scope.nom;
                $scope.productes.seccio = $scope.seccio;
                $scope.productes.preu = $scope.preu;*/
            });
        
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
        return $http.delete("/api/productes/" + producte);
    };
    this.update = function(producte) {
        return $http.put("/api/productes/" + codi, producte);
    };
});