// Definisco il modulo principale
var app = angular.module('galoppinoApp',['ngRoute','restangular','ui.select']);

// Configurazione
app.config(['$routeProvider',
	function($routeProvider){

		// Setto le rotte, abbinando parziale a controller
		$routeProvider
            .when('/home',
            {
                templateUrl: 'partials/startup/home.html',
                controller: 'makelistCtrl'
            })
            .when('/list',
            {
                templateUrl: 'partials/startup/list.html',
                controller: 'makelistCtrl'
            })
            .when('/marketplace',
            {
                templateUrl: 'partials/startup/marketplace.html',
                controller: 'marketplaceCtrl'
            })
            .when('/contact',
            {
                templateUrl: 'partials/startup/contact.html',
                controller: 'marketplaceCtrl'
            })
            .when('/signin',
            {
                templateUrl: 'partials/startup/signin.html',
                controller: 'marketplaceCtrl'
            })
            // nel caso nessuna rotta è settata
            .otherwise({ redirectTo: '/home' });

	}]);


// Controllers
app.controller('galopCtrl',['$scope','$location',
	function($scope,$location){
        $scope.isActive = function (viewLocation) { 
        
        return (viewLocation === $location.path());
        };
		// Per settare la classe active
		$scope.current = function(location){
			if(location == $location.path()){
				return true;
			}
		}
}]);

app.controller("makelistCtrl",['$scope',"$http","$location",'$anchorScroll','Restangular',
    function($scope,$http,$location,$anchorScroll,Restangular){
        Restangular.all('http://130.206.85.178:1026/NGSI10/updateContext');
        $scope.dispo=[]; 
        $scope.listaspesa=[];
        /*
{
    "contextElements": [
        {
            "type": "Room",
            "isPattern": "false",
            "id": "Room1",
            "attributes": [
            {
                "name": "temperature",
                "type": "centigrade",
                "value": "23"
            },
            {
                "name": "pressure",
                "type": "mmHg",
                "value": "720"
            }
            ]
        }
    ],
    "updateAction": "APPEND"
}
*/
        $scope.buylista=function () {
            console.log("buylista"); 
            var spesa={"updateAction": "APPEND","contextElements":[{"type":"listaSpesa","isPattern":"false","id":"listaSpesaSciuraTest2","attributes":[]}]};
            var places="";
            var qt=0;
            for (var i=0; i< $scope.listaspesa.length; i++) {
                var found=false;
                for (var k=0; k< places.length; k++) {
                    if(places[k]==$scope.listaspesa[i].bottega){
                            found=true;
                            break;
                    }

                }
                qt+=$scope.listaspesa[i].num;
                if(!found){
                    places+=$scope.listaspesa[i].bottega+"#";
                   //places.push($scope.listaspesa[i].bottega);
                }
            }
            //console.log(places);
            //spesa.contextElements[0].attributes.push({"name":"bottega","type":"string","value":places);
            spesa.contextElements[0].attributes.push({"name":"bottega","type":"nome","value": places });
            spesa.contextElements[0].attributes.push({"name":"qt","type":"qt","value": qt });
            //for (i=0; i< $scope.listaspesa.length; i++) {
            //    spesa.contextElements[0].attributes.push({"name":"bottega","type":"qt","value":$scope.listaspesa[i].num});
            //}
            console.log(JSON.stringify(spesa));

           // Restangular.all('lista','http://130.206.85.178:1026/NGSI10/updateContext').post("users", spesa);

           $http.post('http://130.206.85.178:1026/NGSI10/updateContext',
            spesa,{
            headers: {'Content-Type': 'application/json','Accept':'application/json'}   
            }).success(function (data, status, headers, config) {
                console.log("WIN");
                console.log(data); // assign  $scope.persons here as promise is resolved here 
            }).error(function (data, status, headers, config) {
                 console.log("LOST");
                  console.log(data); 
            });  
            window.alert("Your shop is waiting for a SHOP-RUNNER");
            $scope.listaspesa=[];
            /*$http.get("")
            .success(function(response,status){
                console.log("win",response,status);
                window.alert("PROCESSING SHOP");
            })
            .error(function(response,status){
                console.log("fail",response,status);
            }); */
            // body...
        };




        $scope.addtolista=function (item_to_add) {
            
            for (var i=0; i< $scope.listaspesa.length; i++) {
                if($scope.listaspesa[i].name==item_to_add.name){
                    $scope.listaspesa[i].num=$scope.listaspesa[i].num+1;
                    $anchorScroll();
                    return;
                }
}
            item_to_add.num++;
            $scope.listaspesa.push(item_to_add);  
            $anchorScroll();
            // body...
        };
        $http.get("data/startup/listaProdotti.json")
            .success(function(response,status){
                console.log("win",response,status);
                $scope.dispo=response;
            })
            .error(function(response,status){
                console.log("fail",response,status);
            }); 
}]);


app.directive('colorbox', function() {
  return {   
    restrict: 'AC',    
    link: function (scope, element, attrs) {        
      $(element).colorbox(attrs.colorbox);     
    }
  };  
});


app.controller("marketplaceCtrl",['$scope',"$http","$location",'$anchorScroll',
    function($scope,$http,$location,$anchorScroll){
        $scope.orders=[];
        $scope.visible=[];
        $scope.clicki=-1;
        $scope.viewd=function  (indicei) {
            console.log("nuovo indice "+indicei);
            if(indicei==$scope.clicki){
$scope.clicki=-1;
            }else{
            $scope.clicki=indicei;
        }
            // body...
        }
        $scope.isclicked=function  (indicei) {
            console.log("indice:"+indicei+" clicki:"+$scope.clicki);
            if($scope.clicki == indicei){
                
                return false;
            }
            else{
                
                return true;
            }
            // body...
        }
        $http.get("data/startup/ordini.json")
            .success(function(response,status){
                console.log("win",response,status);
                $scope.orders=response;
                for(ord in $scope.orders){
                    $scope.visible.push(false);
                }
            })
            .error(function(response,status){
                console.log("fail",response,status);
            }); 
}]);










