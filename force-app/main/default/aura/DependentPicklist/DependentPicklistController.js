({
    
    doInit : function(component, event, helper) { 
        // get the fields API name and pass it to helper function  
 
        // call the helper function
       
        helper.fetchPicklistValues(component);
       
        helper.fetchSelectedValues(component);
        
            
            
    },
    handleSuccess: function(component, event, helper) {
        console.log("working1");
        $A.get('e.force:refreshView').fire();
        console.log("working2");
    },
    onLoad : function(component, event, helper) {
        
    },
    handleEditClick1 : function(component, event, helper) {
       
       
        helper.fetchSelectedValues(component);
       component.set("v.truthy" , false);
        var truth= component.get("v.truthy");
        console.log(truth);
        
        
    },
   
    
    handleSaveClick: function(component, event, helper) {
        var x= component.get("v.value0");
        var y= component.get("v.value1");
        //console.log(x);
        //console.log(y);
        
        component.set("v.showSpinner",true);
        let set1 = new Set();
         for(var val1 in x)
        {
            set1.add(x[val1]);
        }
        let set = new Set();
        var map= component.get("v.controllingFieldMap");
        for(var val1 in y)
        {   //console.log(y[val1]);
            //console.log(map.get(y[val1]));
            set.add(map.get(y[val1]));
        }
        console.log(set);
        console.log(set1);
        var data="", flag=1;
        if(set1.size!=0){
        if(set.size!=set1.size)
        {    flag=0;
            for(let x of set)
            {   //console.log(x);
                set1.delete(x);
            }
            //console.log(set1);
             var cnt=0;
            for(let x of set1)
            {  if(cnt==0)
               {data+=x; cnt=1;}
                else
                data+=', '+x;    
            }
        }
        }
         var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
        "type": "error",
        "title": "Error!",
        "message": "Invalid response! Select dependent values for "+data
        });
         var successEvent = $A.get("e.force:showToast");
        successEvent.setParams({
        "type": "success",
        "title": "Success!",
        "message": "Changes saved!"
        });
    
        if(flag==0)
        {    
            toastEvent.fire();
            component.set("v.showSpinner",false);
        }
        else
        {   
            helper.saveResponse(component);
            successEvent.fire();
        }
        
        
         
    
        
    },
  
    handleCancelClick: function(component, event, helper) {
        var options1x= component.get("v.option1x");
        console.log(options1x);
        helper.fetchSelectedValues(component);
    },
    onControllerFieldChange: function(component, event, helper) {     
        var controllerValueKey = event.getParam("value"); // get selected controller field value
        //console.log(controllerValueKey);
      var depnedentFieldMap = component.get("v.depnedentFieldMap");
        //console.log(depnedentFieldMap);
      var dependentFieldsGlobal =[];
       var total=component.get("v.totalDependent");
     /*   for(var i=0;i<total;i++){
            var z=i+1;
            var options= 'v.option'+z;
            component.set(options, dependentFieldsGlobal);
        } 
 
      */
      //dependentFields.push('--- None ---'); 
        
      for( var c of controllerValueKey){
         // console.log(c);
         // console.log(depnedentFieldMap[c].length);
          
        for(var i=1; i<=depnedentFieldMap[c].length; i++){   
        var dependentFields =[];
 
        dependentFields.push('--- None ---');
 
 
        if (c != '--- None ---') {
            var ListOfDependentFields = depnedentFieldMap[c][i-1];
 
           // console.log(ListOfDependentFields);
           // console.log(ListOfDependentFields.length);
            if(ListOfDependentFields.length > 0){
                component.set("v.bDisabledDependentFld" , false);  
                var options= 'v.option'+i;
             //   console.log(options);
 
                helper.fetchDepValues(component, ListOfDependentFields, dependentFields, options, dependentFieldsGlobal);     
            }else{
                component.set("v.bDisabledDependentFld" , true); 
                component.set("v.listDependingValues", ['--- None ---']);
            }  
 
        } else {
            component.set("v.listDependingValues", ['--- None ---']);
            component.set("v.bDisabledDependentFld" , true);
        }
 
         }
 
 
 
            // monumnets
            /*if (c != '--- None ---') {
            var ListOfDependentFields = depnedentFieldMap[c][1];
 
            console.log(ListOfDependentFields);
            console.log(ListOfDependentFields.length);
            if(ListOfDependentFields.length > 0){
                component.set("v.bDisabledDependentFld" , false);  
                var xyz= 'v.monOptions';
                helper.fetchDepValues(component, ListOfDependentFields, dependentFields2, xyz);    
            }else{
                component.set("v.bDisabledDependentFld" , true); 
                component.set("v.listDependingValues", ['--- None ---']);
            }  
 
        } else {
            component.set("v.listDependingValues", ['--- None ---']);
            component.set("v.bDisabledDependentFld" , true);
        }*/
        }
        var data = new Array(total);
 
        for (var i = 0; i < total; i++) { 
        	data[i] = []; 
        } 
       // console.log(size);
       // console.log(dependentFieldsGlobal);
       if(dependentFieldsGlobal.length==0)
       {
           var item = {
                    "value":  '--- None ---',
                    "label": '--- None ---'
           };
           for( var i=0; i<total; i++)
        {
            data[i].push(item);
        }
       }
        
        console.log(dependentFieldsGlobal);
        for( var i=0; i<dependentFieldsGlobal.length; i++)
        {   
            // 0 1 2 3 4 5 
 
            for(var j=0; j<dependentFieldsGlobal[i].length; j++){
                //console.log(dependentFieldsGlobal[i][j]);
                if(dependentFieldsGlobal[i][j].value!='--- None ---' ) {               
           			data[i%total].push(dependentFieldsGlobal[i][j]);
 
                }
 
            }
         }
 
       for(var i=0;i<total;i++){
            var z=i+1;
            var options= 'v.option'+z;
            //var optionsx= options+'x';
            component.set(options, data[i]);
            ///component.set(optionsx, data[i]);
            //var z= component.get(optionsx);
            //console.log(z);
           
          // console.log(data[i]);
        }
       
       //console.log(data);
    },
    
    onOption1FieldChange: function(component, event, helper) {     
        var controllerValueKey = event.getParam("value"); // get selected controller field value
        //console.log(controllerValueKey);
        
        
    },
    
      isRefreshed: function(component, event, helper) {
        location.reload();
               
    },
     spinnerDisplayHandler : function(component, event, helper) {
        console.log('show spinner value changes');
        helper.showHideSpinner(component); 
    },
    
    
    
})