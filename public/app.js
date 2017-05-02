var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.grouping', 'ui.grid.selection']);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  var main = this;
  
  main.gridOptions = {
   // treeRowHeaderAlwaysVisible: true,
   // headerTemplate: 'header-template.html',
    
    enableGridMenu: true,
    enableSorting: false,
    multiSelect: true,
    columnDefs: [
      {name: 'team', grouping: { groupPriority: 0 }, width: 100, enableColumnMenu: false},
      {name:'name', width: 100, enableColumnMenu: false},
      {name:'username',}
      ],
    data: [
      { team: 'Developer', name: 'Kamal',username:'@kamal' },
      { team: 'Developer', name: 'Nalin',username:'@nalin'  },
      { team: 'Tester', name: 'Rajni',username:'@rajni'},
      { team: 'Tester', name: 'Pawan',username:'@pawan'}, 
      { team: 'Executive', name: 'Rohit',username:'@rohit'},
      { team: 'Executive', name: 'Shailender',username:'@shailender'}, 
    ],
    onRegisterApi: function( gridApi ) {
      main.gridApi = gridApi;
    }
  };
  
}]);
