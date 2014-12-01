//Controller + contesto ($scope)
function todoCtrl($scope){
	

	if(localStorage.getItem("AngularTodo")){
		$scope.tasks=JSON.parse(localStorage.getItem("AngularTodo"));
	}else
	$scope.tasks=[];






	$scope.submit_job=function() {
		$scope.tasks.push($scope.nuova);
		$scope.nuova="";
		localStorage.setItem("AngularTodo",JSON.stringify($scope.tasks))
	};

 
	$scope.remove=function  (i) {
		$scope.tasks.splice(i,1);
		localStorage.setItem("AngularTodo",JSON.stringify($scope.tasks))
		// body...
	}
}

