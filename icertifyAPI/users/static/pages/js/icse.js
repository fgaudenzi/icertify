var app = angular.module('icseApp',['ngRoute','ui.select','ui.bootstrap']);




app.controller("icseCtrl",['$scope',"$http",
	 function($scope,$http){
	 	$scope.cm={};
	 	$scope.cmS={};
	 	$scope.collectors=[];
	 	$scope.tampers=[];
	 	$scope.debug=[];
	 	$scope.cmS.xml_att="";
	 	$http.get("data/cms.json")
            .success(function(response,status){
                
                $scope.cms=response;
            })
            .error(function(response,status){
                console.log("fail",response,status);
            }); 
            
    
            $scope.loadCM = function(certmodel) {
            	$scope.cmS=certmodel;
            	$http.get(certmodel.path)
            .success(function(response,status){
                $scope.cmS.xml_att=response;
                $scope.cms.id=certmodel.id;
            })
            .error(function(response,status){
                console.log("fail",response,status);
            }); 
  }
  			$scope.startCert= function(cmToTest) {
  				$scope.certStatus="NOT_ISSUED";
  				$scope.collectors=cmToTest.collectors;
  				$scope.tampers=cmToTest.tamper;
  				$scope.processTest();

  				//$scope.tampers=JSON.parse('[{"desc":"disable ssl/tsl support","value":"chttps","selected":false},{"desc":"change file system policy","value":"cFile","selected":false}]');
  				
  			}

  			$scope.restartCert=function(){

  				$scope.processTest();
  			}

  			$scope.isTrueC=function (res) {
  				//alert(res);
  				if(res=="true")
  					return true;
  				else
  				return false;
  				// body...
  			};
  			$scope.isFalseC=function (res) {
  				//alert(res);
  				if(res=="true")
  					return false;
  				else
  				return true;
  				// body...
  			};
  			$scope.isTrueCert=function (res) {
  				//alert(res);
  				if(res=="ISSUED")
  					return true;
  				else
  				return false;
  				// body...
  			};
  			$scope.isNotDefCert=function (res) {
  				//alert(res);
  				if(res=="NOT_ISSUED")
  					return true;
  				else
  				return false;
  				// body...
  			};
  			$scope.isFalseCert=function (res) {
  				//alert(res);
  				if(res=="REVOKED")
  					return true;
  				else
  				return false;
  				// body...
  			};

  	$scope.sleep=function (ms)
	{
		var dt = new Date();

		dt.setTime(dt.getTime() + ms);
		while (new Date().getTime() < dt.getTime());
	}


  			$scope.processTest=function () {
  				
  				for (i=0; i<$scope.collectors.length; i++) { 
  					//alert(cmToTest.collectors[i].id);
  					//console.log("element:"+el_coll);
  						
  						$scope.collectors[i].result="true";
    					for (k =0;k<$scope.tampers.length ;k++) {
    						$scope.sleep(1000);
    						//alert($scope.tampers[k].value+ "  "+$scope.collectors[i].id );
    						if($scope.tampers[k].value==$scope.collectors[i].id){
    							if($scope.tampers[k].selected==true){ 
    								//alert($scope.collectors[i].id+" False");
    								$scope.collectors[i].result="false";
    								//$scope.certStatus="REVOKED"
    							}
    							if($scope.tampers[k].selected==false){ 
    								//alert($scope.collectors[i].id+" True");
    								$scope.collectors[i].result="true";}
    						}
    					};
  				}
  				var checker=true;
  				for (i=0; i<$scope.collectors.length; i++) { 
  					if($scope.collectors[i].result=="false")
  						checker=false;
  				}
  				if(checker){
  					$scope.certStatus="ISSUED";
  				}else{
  					$scope.certStatus="REVOKED";
  				}

  			}
           


}]);


 