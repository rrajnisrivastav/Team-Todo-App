var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http, $window,$location) {
	
       $scope.formData = {};
	   $scope.completeData = [];
	   $scope.notcompleteData = [];
	   $scope.categoryData = [];
	var createChart = function(){
	var todoChart = new FusionCharts({
		type: 'stackedcolumn2d',
		renderAt: 'chart-container',
			width: '500',
			height: '300',
			dataFormat: 'json',
			dataSource: {
				"chart": {
					"theme": "ocean",
					"caption": "Todo List of Employees",
					"xAxisname": "Names",
					"yAxisName": "Number of Todos",
					"showSum": "1",
					//"numberSuffix": "%",
					//"yaxismaxvalue":"10%"
					
					
					
				},
				"categories": [{
					"category": $scope.categoryData
				}],
				"dataset": [{
					"seriesname": "Complete",
					"data": $scope.completeData
				}, {
					"seriesname": "Not Complete",
					"data": $scope.notcompleteData
				}]
			}
	});
	todoChart.render();
	}
    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
           console.log(data)
			$scope.todo= {};
			for(var i = 0; i<data.todos.length;i++) {
				if($scope.todo[data.todos[i].name] === undefined) {
					$scope.todo[data.todos[i].name] = [];
					
				}
				
				var obj= {
		             id :data.todos[i]._id,
					 name:data.todos[i].todo
				}
				$scope.todo[data.todos[i].name].push(obj);
				    
		   
	  
			}   
			
			for(var i in $scope.todo){
				var objc = {
							"label": i
						}
				var compobj = {
					value: 0,
					name:i
				}
				var notCompObj = {
					value: $scope.todo[i].length,
					name:i
				}
				$scope.categoryData.push(objc);
				$scope.completeData.push(compobj); 
				$scope.notcompleteData.push(notCompObj);
			
			}
			createChart();
            console.log("---",$scope.todo,$scope.categoryData);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

	
	/*	$http.get('/api/todos/count')
			.success(function(data) {
			$scope.countObj = [];
			for(var i = 0; i<data.length;i++) {
				var obj = {
					label: data[i]._id,
					value: data[i].count
				};
				
				console.log(obj);
				$scope.countObj.push(obj);
			}   
            console.log($scope.countObj);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
	*/
	
	 
					
    // when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		  
		   var data = $scope.formData.text.split(' ');
		   var name = data[0];
		  
		   var todo = data.slice(1,data.length).join(' ');

       	   var obj= {
		   name :name, todo:todo
		   
	  }
      
        $http.post('/api/todos',obj)
            .success(function(data) {
                $scope.formData = {}; 
                $scope.todos = data;
                console.log(data);
			})
			.error(function(data) {
				  console.log('Error:' + data);
			});
	}
	 
	 
	 
	//delete only one Todo of particular person
	$scope.delTodo = function(id) {
		$http.delete('/api/todo/' + id)
                        .success(function(data) {
                                $scope.todos = data;
							
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });

    };
	
	
	$scope.stateChanged = function (event,key) {
		var data = $scope.todo;
		
		for(var c=0;c < $scope.notcompleteData.length;c++){
			if($scope.notcompleteData[c].name == key){
				(event)?$scope.notcompleteData[c].value = $scope.notcompleteData[c].value-1:$scope.notcompleteData[c].value = $scope.notcompleteData[c].value+1;
			}
		}
		for(var d=0;d < $scope.completeData.length;d++){
					if($scope.completeData[d].name === key){
						console.log('cc',$scope.completeData[d]);
					(event)?$scope.completeData[d].value = $scope.completeData[d].value+1:$scope.completeData[d].value = $scope.completeData[d].value-1;
			}
		}
		console.log(event,key,$scope.todo,$scope.notcompleteData,$scope.completeData);
		createChart();
	}		 

   // delete all Todos of a person
    $scope.deleteTodo = function(name) {
	     var r = confirm('Are you sure you want to delete');
		 if(r == false){
			 this.remove();
			$route. reload();
		 }

		$http.delete('/api/todos/' + name)
                        .success(function(data) {
                                $scope.todos = data;
								
                        })
						
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
	                		  

    }; 
   // delete all Todos of all person
    $scope.deleteAllTodo = function() {
		var input;
		input = prompt('Are you sure you want to delete all Todos','yes')
		if(input === null)
			return false;

		$http.delete('/api/alltodo/')
                        .success(function(data) {
                                $scope.todos = data;
							
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
				

    };
}
