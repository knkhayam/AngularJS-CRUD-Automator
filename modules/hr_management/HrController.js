app.controller('HrController', function($scope, HrService, AppService, $routeParams, $timeout){

    let service = HrService;

    $scope.data = service.data;
    $scope.columns = service.columns;
    $scope.heading = service.heading;
    $scope.url = service.url;

    $timeout(function(){$('.data-table').DataTable();},100);
    

    $scope.get_vals = function(d)
    {
        var item = [];
        for(let i =0;i<$scope.columns.length;i++)
        {
            item.push(d[$scope.columns[i].name]);
        }
        return item;
    };

    $scope.show_update = function(){
        $scope.id = $routeParams.id;
        $scope.title = "Add New Record";
        $scope.record = {};
        if($scope.id >= 0)
        {
            var record = $scope.data.find(s=>s.id ==$scope.id);   
            $scope.updating = true;
            $scope.record = angular.copy(record);
            $scope.title = "Update Record";
        }
    }

    $scope.update = function(){
        if(!$scope.updating)
            service.add_record($scope.record);
        else
            service.update_record($scope.record);

        window.location.href = "#!/" + $scope.url;
        $('.data-table').DataTable(); // This needs to be done to update data table. if removed, confirm by sorting column after changes.
        
    }

    $scope.delete = function(id){
        if(confirm('Are you sure to delete this record? '))
        {
            service.delete_record(id);
            $scope.data = service.data;
            $('.data-table').DataTable();
        }
    }

    $scope.report = function()
    {
        AppService.data = service.data;
        AppService.columns = service.columns;
        AppService.heading = service.heading;

        window.location.href = "#!/" + AppService.table_report_link;
    }

});