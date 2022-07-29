let module_routes = [
  "hr_management",

];


app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : "views/dashboard.html"
    });

    /// Modules section ///
    for(let i=0;i < module_routes.length;i++)
    {
      let m = module_routes[i];
      $routeProvider
      .when("/" + m, {
      templateUrl : "modules/" + m + "/views/index.html"
      })
      .when("/" + m + "/update/:id", {
      templateUrl : "modules/" + m + "/views/update.html"
      });
    }
    

    $routeProvider
    .when("/table-report", {
      templateUrl : "views/table-report.html"
    })

    
  });