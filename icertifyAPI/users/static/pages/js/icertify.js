// Definisco il modulo principale
var app = angular.module('icertifyApp',['ngRoute','ui.select','ui.bootstrap']);
//var app2=angular.module('plunker',[]);
// Configurazione
app.config(['$routeProvider',
	function($routeProvider){

		// Setto le rotte, abbinando parziale a controller
		$routeProvider
            .when('/home',
            {
                templateUrl: 'partials/home.html',
                controller: 'partialCtrl'
            })
            .when('/user',
            {
                templateUrl: 'partials/user.html',
                controller: 'partialCtrl'
            })
            .when('/search',
            {
                templateUrl: 'partials/search.html',
                controller: 'searchCtrl'
            })
            .when('/signin',
            {
                templateUrl: 'partials/signin.html',
                controller: 'signinCtrl'
            })
            .when('/allusers',
            {
                templateUrl: 'partials/allUsers.html',
                controller: 'alluserCtrl'
            })
            .when('/ruleManagement',
            {
                templateUrl: 'partials/rules.html',
                controller: 'ruleCtrl'
            })
            .when('/contact',
            {
                templateUrl: 'partials/faq.html',
                controller: ''
            })
            // nel caso nessuna rotta è settata
            .otherwise({ redirectTo: '/home' });

	}]);


// Controllers
app.controller('icertCtrl',['$scope','$location',
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

app.controller('partialCtrl',['$scope',
	function($scope){

		console.log('tutto ok');

	}]);


app.controller('ruleCtrl',['$scope','$modal','$http',
    function($scope,$modal,$http){
        $scope.nameformula="";
        $scope.saveFormula=function  () {

            if($scope.nameformula==""){
                window.alert("YOU MUST ASSIGN A NAME TO YOUR RULE");
                return;
            }
            $http.get();
            formulas=[]
            if(formulas==null){
                formulas=[];
            }
            var formula={name:$scope.nameformula,formula:$scope.formula};
            console.log(formula);
            //formulas.push(formula);

            $http.post("/formula/", formula).
                success(function(data, status, headers, config) {
                    console.log("formula aggiunta:"+data);
                 }).
                error(function(data, status, headers, config) {
                    console.log("Errore Formula:"+data);
                 // called asynchronously if an error occurs
                 // or server returns response with an error status.
                });
            localStorage.setItem("formulas",JSON.stringify(formulas))
            window.alert("Formula "+$scope.nameformula+": SAVED.");
            $scope.formula=[];
            $scope.nameformula="";
            // body...
        }
        $scope.checkAddendo=function  (operator) {
             if(operator.op=="stack"||operator.op=='linkedin'||operator.op=='sap'){
                //console.log("addendo TRUE");
                return true;
            }else{
                //console.log("addendo FALSE");
                return false;
            }
        }
        $scope.checkOperator=function  (operator) {
            //console.log("OPERANDO:"+operator.key);
             if(operator.key=="open"||operator.key=='close'||operator.key=='op'){
               //console.log("operando TRUE");
                return true;
            }else{
                //console.log("operando FALSE");
                return false;
            }
        }
        $scope.formula=[];
        $scope.input_params=[]
      // $scope.operation=null;
        cons='[{"condition":"linkedin","path":"images/icertify/linkedin-logo.jpg"},{"condition":"sap","path":"images/icertify/sap-logo.jpg"},{"condition":"stackoverflow","path":"images/icertify/stack-logo.jpg"}]';  
        op='[{"op":"AND"},{"op":"OR"}]';
        fun='[{"fun":"("},{"fun":")"},{"fun":"Submits"}]';
        $scope.input_params=JSON.parse(cons);
        $scope.op_params=JSON.parse(op);
        $scope.fun_params=JSON.parse(fun);
        $scope.resultmodal="ciao";
    $scope.add=function  (operation) {
        var turl="";
        if(operation=="linkedin"){
            //window.alert("linkedin chosen");
            //turl="partials/modal/linkedin.html"
            var modalInstance = $modal.open({
      templateUrl: 'partials/modal/linkedin.html',
      controller: 'modalCtrl',
      size: 'sm',
        resolve: {
        caller: function () {
          return "linkedin";
        }
      }
    
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.resultmodal = selectedItem;
      $scope.formula.push(selectedItem);
      //console.log($scope.selected);
    });
         return;  // body...
        }


                if(operation=="stack"){
            //window.alert("linkedin chosen");
            //turl="partials/modal/linkedin.html"
            var modalInstance = $modal.open({
      templateUrl: 'partials/modal/stack.html',
      controller: 'modalCtrl',
      size: 'sm',
       resolve: {
        caller: function () {
          return "stack";
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.resultmodal = selectedItem;
      $scope.formula.push(selectedItem);
      //console.log($scope.selected);
    });
         return;  // body...
        }

                if(operation=="sap"){
            //window.alert("linkedin chosen");
            //turl="partials/modal/linkedin.html"
            var modalInstance = $modal.open({
      templateUrl: 'partials/modal/sap.html',
      controller: 'modalCtrl',
      size: 'sm',
       resolve: {
        caller: function () {
          return "sap";
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.resultmodal = selectedItem;
      $scope.formula.push(selectedItem);
      //console.log($scope.selected);
    });
         return;  // body...
        }



        if(operation=="delete"){
            $scope.formula.pop();
            return;
        }

        if(operation=="open"){
            value={"op":"(","key":"open","value":"("}
            $scope.formula.push(value);
            return;
        }
        if(operation=="close"){
            value={"op":")","key":"close","value":")"}
            $scope.formula.push(value);
            return;
        }
        if(operation=="AND"){
            value={"op":"AND","key":"op","value":0}
            $scope.formula.push(value);
            return;
        }
        if(operation=="OR"){
            value={"op":"OR","key":"op","value":0}
            $scope.formula.push(value);
            return;
        }


       };
       
    }]);


app.controller('modalCtrl',['$scope','$modalInstance','caller',
    function ($scope, $modalInstance,caller) {
$scope.confirm=function  () {
    if($scope.param.key!="")
    $modalInstance.close($scope.param);
}
$scope.cancel=function () {
    $modalInstance.dismiss('cancel');
    // body...
}

        $scope.certs=['SAP ERP', 'ERP Professional', 'Product Lifecycle Management', 'CRM', 'CRM Professional', 'Supply Chain Management', 'Supply Chain Management Professional', 'Supplier Relationship Management', 'SRM Professional', 'HCM Professional', 'Financials Professional', 'Warehouse Management Professional', 'HANA Associate', 'HANA Professional', 'HANA Specialist', 'Industry Solutions', 'Sybase Unwired Platform', 'BusinessObjects', 'Maine', 'SME', 'All-in-One', 'Solution Manager', 'Technology Professional', 'NetWeaver', 'NetWeaver Professional', 'Enterprise SOA', 'Enterprise SOA Professional', ' Human Capital Management'];
        $scope.param={"op":caller,"key":"","value":1};
         //console.log($scope.param);

//console.log($scope.confirm);
}]);




app.controller('linkedinInpCtrl',['$scope','$modalInstance','$http','userid',
    function($scope,$modalInstance,$http,userid){
        $scope.lastelement=function  (index) {
            //console.log("index:"+index+" length"+$scope.endorsments.length);
            if(index==$scope.endorsments.length-1){
                return true;
            }else{
                return false;
            }
            // body...
        }
var value={"key":"","value":0};
$scope.endorsments= [];
$scope.endorsments.push(value);

  $scope.add= function() {
    console.log("add end");
    value={"key":"","value":0};
    $scope.endorsments.push(value);
  }

  $scope.confirm = function() {
    console.log(userid);
    $scope.endorsments.forEach(function(entry) {
      if(entry.key!=""){
            var dataObj = {
                keyL : entry.key,
                value : entry.value
            };
            //console.log(dataObj);
            //console.log(dataObj.keyL);
            //console.log(dataObj.key);
            $http.post("/users/"+userid+"/linkedin/", dataObj).
                success(function(data, status, headers, config) {
                    console.log("linkedin aggiunto");
                    $modalInstance.close('success');
                 }).
                error(function(data, status, headers, config) {
                 // called asynchronously if an error occurs
                 // or server returns response with an error status.
                });
            console.log(entry);
       }
        
    });
    console.log($scope.endorsments);
  }


  /*$scope.confirm=function  () {
    if($scope.param.key!="")
    $modalInstance.close($scope.param);
}
$scope.cancel=function () {
    $modalInstance.dismiss('cancel');
    // body...
}*/
 }]); 

app.controller('stackoverflowInpCtrl',['$scope','$modalInstance','$http','userid',
    function($scope,$modalInstance,$http,userid){
        $scope.lastelement=function  (index) {
            //console.log("index:"+index+" length"+$scope.endorsments.length);
            if(index==$scope.endorsments.length-1){
                return true;
            }else{
                return false;
            }
            // body...
        }
var value={"key":"","value":0};
$scope.endorsments= [];
$scope.endorsments.push(value);

  $scope.add= function() {
    console.log("add end");
    value={"key":"","value":0};
    $scope.endorsments.push(value);
  }

  $scope.confirm = function() {
    console.log(userid);
    $scope.endorsments.forEach(function(entry) {
      if(entry.key!=""){
            var dataObj = {
                keyS : entry.key,
                value : entry.value
            };
            //console.log(dataObj);
            //console.log(dataObj.keyL);
            //console.log(dataObj.key);
            $http.post("/users/"+userid+"/stackoverflow/", dataObj).
                success(function(data, status, headers, config) {
                    console.log("linkedin aggiunto");
                    $modalInstance.close('success');
                 }).
                error(function(data, status, headers, config) {
                 // called asynchronously if an error occurs
                 // or server returns response with an error status.
                });
            console.log(entry);
       }
        
    });
    console.log($scope.endorsments);
  }


  /*$scope.confirm=function  () {
    if($scope.param.key!="")
    $modalInstance.close($scope.param);
}
$scope.cancel=function () {
    $modalInstance.dismiss('cancel');
    // body...
}*/
 }]);



app.controller('sapUserCtrl',['$scope','$modalInstance','$http','userid',
    function($scope,$modalInstance,$http,userid){
    $scope.certs=['SAP ERP', 'ERP Professional', 'Product Lifecycle Management', 'CRM', 'CRM Professional', 'Supply Chain Management', 'Supply Chain Management Professional', 'Supplier Relationship Management', 'SRM Professional', 'HCM Professional', 'Financials Professional', 'Warehouse Management Professional', 'HANA Associate', 'HANA Professional', 'HANA Specialist', 'Industry Solutions', 'Sybase Unwired Platform', 'BusinessObjects', 'Maine', 'SME', 'All-in-One', 'Solution Manager', 'Technology Professional', 'NetWeaver', 'NetWeaver Professional', 'Enterprise SOA', 'Enterprise SOA Professional', ' Human Capital Management'];


  $scope.cancel = function() {
    $modalInstance.close()
  }

  $scope.confirm = function() {
                    var dataObj = {
                cert : $scope.param.key
            };

            console.log(dataObj);
            //console.log(dataObj.keyL);
            //console.log(dataObj.key);
            $http.post("/users/"+userid+"/sap/", dataObj).
                success(function(data, status, headers, config) {
                    console.log("sap aggiunto");
                    $modalInstance.close('success');
                 }).
                error(function(data, status, headers, config) {
                 // called asynchronously if an error occurs
                 // or server returns response with an error status.
                });
            
                    $modalInstance.close();
                 }
                

 }]);







app.controller('showUserInfoCtrl',['$scope','$modalInstance','$http','userid',
    function($scope,$modalInstance,$http,userid){
$http.get("/users/"+userid)
            .success(function(response,status){
                $scope.user=response;
                console.log("USER:"+$scope.user);
                $http.get("../../users/"+userid+"/linkedin/")
                .success(function(response,status){
                 console.log("win",response,status);
                 $scope.user.linkedin=response;
                
                });
                $http.get("../../users/"+userid+"/stackoverflow/")
                .success(function(response,status){
                 console.log("win",response,status);
                 $scope.user.stackoverflow=response;
                
                });
                $http.get("../../users/"+userid+"/sap/")
                .success(function(response,status){
                 console.log("win",response,status);
                 $scope.user.sap=response;
                
                });
            })
            .error(function(response,status){
                console.log("fail",response,status);
            });


  $scope.confirm = function() {
                    $modalInstance.close('success');
                 }
                

 }]);






app.controller('alluserCtrl',['$scope','$http','$modal','fileReader',
    function($scope,$http,$modal,fileReader){
       /* $http.get("data/prof.json")
            .success(function(response,status){
                console.log("win",response,status);
                $scope.profs=response;
            })
            .error(function(response,status){
                console.log("fail",response,status);
            });*/ 
             $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          $scope.imageSrc = result;
                      });
    };
            $http.get("../../users")
            .success(function(response,status){
                console.log("win",response,status);
                $scope.profs=response;
            })
            .error(function(response,status){
                console.log("fail",response,status);
            });


            $scope.caricaModal=function  (operation,userid) {
                // body...
            console.log(userid);
            if(operation=="linkedin"){
            //window.alert("linkedin chosen");
            //turl="partials/modal/linkedin.html"
            var modalInstance = $modal.open({
      templateUrl: 'partials/modal/linkedin-info.html',
      controller: 'linkedinInpCtrl',
      size: 'lg',
        resolve: {
        userid: function () {
            console.log("in function:"+userid);
           return userid;
         },
        caller: function () {
          return "linkedin";
        }
      }
    
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.resultmodal = selectedItem;
    });
         return;  // body...
        }




         if(operation=="stackoverflow"){
            //window.alert("linkedin chosen");
            //turl="partials/modal/linkedin.html"
            var modalInstance = $modal.open({
      templateUrl: 'partials/modal/linkedin-user.html',
      controller: 'stackoverflowInpCtrl',
      size: 'lg',
        resolve: {
        userid: function () {
            console.log("in function:"+userid);
           return userid;
         },
        caller: function () {
          return "stackoverflow";
        }
      }
    
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.resultmodal = selectedItem;
    });
         return;  // body...
        }

  if(operation=="sap"){
            //window.alert("linkedin chosen");
            //turl="partials/modal/linkedin.html"
            var modalInstance = $modal.open({
      templateUrl: 'partials/modal/sap-user.html',
      controller: 'sapUserCtrl',
      size: 'lg',
        resolve: {
        userid: function () {
            console.log("in function:"+userid);
           return userid;
         },
        caller: function () {
          return "showuser";
        }
      }
    
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.resultmodal = selectedItem;
    });
         return;  // body...
        }
         if(operation=="all"){
            //window.alert("linkedin chosen");
            //turl="partials/modal/linkedin.html"
            var modalInstance = $modal.open({
      templateUrl: 'partials/modal/user-info.html',
      controller: 'showUserInfoCtrl',
      size: 'lg',
        resolve: {
        userid: function () {
            console.log("in function:"+userid);
           return userid;
         },
        caller: function () {
          return "showuser";
        }
      }
    
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.resultmodal = selectedItem;
    });
         return;  // body...
        }
        
    };
    }]);

app.controller("searchCtrl",['$scope',"$http",'$modal',
    function($scope,$http,$modal){
            $scope.checkAddendo=function  (operator) {
             if(operator.op=="stack"||operator.op=='linkedin'||operator.op=='sap'){
                //console.log("addendo TRUE");
                return true;
            }else{
                //console.log("addendo FALSE");
                return false;
            }
        }
        $scope.checkOperator=function  (operator) {
            //console.log("OPERANDO:"+operator.key);
             if(operator.key=="open"||operator.key=='close'||operator.key=='op'){
               //console.log("operando TRUE");
                return true;
            }else{
                //console.log("operando FALSE");
                return false;
            }
        }


    $scope.profs=[];
    $scope.certificates=[];
    $scope.formula={};
    $scope.caricaModal=function  (operation,userid) {
       if(operation=="all"){
            //window.alert("linkedin chosen");
            //turl="partials/modal/linkedin.html"
            var modalInstance = $modal.open({
      templateUrl: 'partials/modal/user-info.html',
      controller: 'showUserInfoCtrl',
      size: 'lg',
        resolve: {
        userid: function () {
            console.log("in function:"+userid);
           return userid;
         },
        caller: function () {
          return "showuser";
        }
      }
    
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.resultmodal = selectedItem;
    });
         return;  // body...
        }
    };



     $http.get("/users/")
            .success(function(response,status){
                console.log("win",response,status);
                $scope.profs=response;
            })
            .error(function(response,status){
                console.log("fail",response,status);
            }); 

    $scope.load=function(){
            $http.post("/search/", {id:$scope.formula.selected.id}).
                success(function(data, status, headers, config) {
                    console.log("formula aggiunta:"+data);
                    $scope.profs=data;
                 }).
                error(function(data, status, headers, config) {
                    console.log("Errore Formula:"+data);
                 // called asynchronously if an error occurs
                 // or server returns response with an error status.
                });
      console.log($scope.formula.selected.id);
    };
     $http.get("/formula/")
            .success(function(response,status){
                console.log("win",response,status);
                $scope.certificates=response;

            })
            .error(function(response,status){
                $scope.certificates=[];
                console.log("fail",response,status);
            }); 
    
}]);



app.controller("signinCtrl",['$scope',"fileReader",
    function($scope,fileReader){
     console.log(fileReader)
    $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          $scope.imageSrc = result;
                      });
    };
 
    
    /*$scope.profs=[];
    $scope.certificates=[];
    $scope.person={};
    

    $scope.load=function(){
    $http.get("data/prof.json")
            .success(function(response,status){
                console.log("win",response,status);
                $scope.profs=response;
            })
            .error(function(response,status){
                console.log("fail",response,status);
            }); 
    };
     $http.get("/formula/")
            .success(function(response,status){
                console.log("win",response,status);
                $scope.certificates=response;

            })
            .error(function(response,status){
                $scope.certificates=[];
                console.log("fail",response,status);
            }); */
    
}]);

app.directive("ngFileSelect",function(){

  return {
    link: function($scope,el){
      
      el.bind("change", function(e){
      
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      })
      
    }
    
  }
  
  
})