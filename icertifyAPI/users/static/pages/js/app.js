//crea l'applicazione come modulo

//la definisco per poterla riutilizzare in seguito
//importo il modulo - definendo un modulo ng-app non è sufficiente nell'html va aggiunto il nome del modulo
//myApp è un modulo applicazione mentre ngRoute usato da myapp è un solo un modulo che espone servizi
var app = angular.module("miaApp",['ngRoute']);


//configurazione rotte con routeprovider
app.config(['$routeProvider',function($routeProvider){

	$routeprovider
		.when('/home',
		{
			templateUrl:'partial/home.html',
			controller:'childCtrl'
		})
		.when('/user',
		{
			templateUrl:'partial/user.html',
			controller:'childCtrl'
		})
		.when('/contact',
		{
			templateUrl:'partial/contact.html',
			controller:'childCtrl'
		})
		.otherwise({redirectTo:'/home'})

}]);


app.controller("mainCtrl",['$scope',function($scope){
	console.log("I'm your father");
}]);
app.controller("childctrl",['$scope',function($scope){
	console.log("really, but i'm black!?");
}]);

app.controller("childctrl",['$scope',function($scope){
	console.log("really, but i'm black!?");
}]);
