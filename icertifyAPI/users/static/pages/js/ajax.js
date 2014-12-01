
function movieCtrl($scope,$http)
{
	$scope.cosa='order'
	$scope.reverse= false;
	$scope.carica=function(){
	
		$http.get("data/movies.json")
			.success(function(response,status){
				console.log("win",response,status);
				$scope.movies=response;
			})
			.error(function(response,status){
				console.log("fail",response,status);
			});
	}

	$scope.ordina=function(order_field) {
		if($scope.cosa=order_field)
			$scope.reverse=true;

		else{
			$scope.reverse= false;
			$scope.cosa=order_field;
		}
		console.log(	$scope.reverse);
		// body...
	}
}