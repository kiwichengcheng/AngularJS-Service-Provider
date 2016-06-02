var myModule = angular.module("MyServiceApp",[]);
myModule.factory("MyService", ["$http",function($http){
    var doRequest = function(){
        return $http({
            url:"data.json",
            method:"GET"
        });
    }
    return {
        getData : function(){
            return doRequest();
        }
    }
}]);

myModule.controller("ServiceController",["$scope", "$timeout", "MyService", 
    function($scope, $timeout, MyService){
        var timeout;
        $scope.$watch("username", function(newUserName){
            if(newUserName){
                if(timeout){
                    $timeout.cancel(timeout);
                }
                var timeout = $timeout(function(){
                    MyService.getData().success(function(data, status){
                        $scope.users=data;
                    });
                },350)
            }
        });
}]);