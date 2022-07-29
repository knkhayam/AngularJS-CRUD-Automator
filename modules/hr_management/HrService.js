app.service('HrService', function(AppService){
    // main data
    this.data = [];
    this.temp_id = 1;
    this.heading = "Human Resource Management";
    this.url = "hr_management";

    /// Structure /// Only those columns that needs to be visible
    // Type 1 is <input>    Type 2 is <Select> // more to coming soon
    this.columns = [
        {
            name: "Name",
            db_name: "name",
            required: true,
            type: 1,
            type_name: "text"
        },
        {
            name: "Designation",
            db_name: "designation",
            required: true,
            type: 1,
            type_name: "text"
        },
        
        // {
        //     name: "Age",
        //     db_name: "age",
        //     required: true,
        //     type: 1,
        //     type_name: "number"
        // },
        // {
        //     name: "Gender",
        //     db_name: "gender",
        //     required: true,
        //     type: 2,
        //     options: ["Male", "Female"]
        // }
    ];

    
    this.add_record = function(record)
    {
        //pre
        record.id = this.temp_id;
        this.temp_id++;
        this.data.push(record);
        this.save_update_data();
        alertify.notify('Record added successfully', 'success', AppService.alertify_timeout, function(){ });
    }

    this.update_record = function(record)
    {
        //pre
        for(let i =0;i<this.data.length; i++)
        {
            if(this.data[i].id == record.id)
            {
                this.data[i] = record;
                break;
            }
        }
        this.save_update_data();
        alertify.notify('Record updated successfully', 'success', AppService.alertify_timeout, function(){ });
    }

    this.delete_record = function(id)
    {
        //pre
        for(let i=0;i<this.data.length; i++)
        {
            if(this.data[i].id == id)
            {
                this.data.splice(i, 1);
                break;
            }
        }
        this.save_update_data();
        alertify.notify('Record deleted successfully', 'success', AppService.alertify_timeout, function(){ });
    }



    // Data Storage /// Currently Local Version ////
    this.load_data = function()
    {
        if(localStorage.getItem(this.url)) // currently we will get storage unique url basis //
        {
            this.data = JSON.parse(localStorage.getItem(this.url));
            this.temp_id = this.data[this.data.length - 1].id + 1;
        }
    }

    this.save_update_data = function()
    {
        localStorage.setItem(this.url, JSON.stringify(this.data));
    }

    this.load_data();
    
});