({
    fetchPicklistValues: function(component) {
        // call the server side function  
        
        var action = component.get("c.getDependentMap"); 
       
              
        //set callback   
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                 
                //store the return response from server (map<string,List<string>>)  
                var StoreResponse = response.getReturnValue();
                //console.log(StoreResponse);
                var dataImportFields=[];
                //var array = Array.from(StoreResponse.keys()); 
                //console.log(array);
                var keysList = Object.keys(StoreResponse);
                //console.log(keysList);
                for(var key of keysList) {
                var item = {
                    "value":  key,
                    "label": key
                };
                dataImportFields.push(item);
                }
               component.set('v.options', dataImportFields);
                
                //console.log(dataImportFields);
                // once set #StoreResponse to depnedentFieldMap attribute 
                component.set("v.depnedentFieldMap",StoreResponse);
                
                let map = new Map();
                
                for (var singlekey in StoreResponse) {
                    //console.log(StoreResponse[singlekey]);
                    for(var l in StoreResponse[singlekey])
                    {   // l--> list<list<string>>
                         //console.log(StoreResponse[singlekey][l]);
                        for(var m in StoreResponse[singlekey][l])
                        {    //console.log(StoreResponse[singlekey][l][m]);  //m-->list<string>
                             map.set(StoreResponse[singlekey][l][m], singlekey);
                        }
                    }
                }
                console.log(map);
                component.set('v.controllingFieldMap', map);
                
                // create a empty array for store map keys(@@--->which is controller picklist values) 
                var listOfkeys = []; // for store all map keys (controller picklist values)
                var ControllerField = []; // for store controller picklist value to set on lightning:select. 
                
                // play a for loop on Return map 
                // and fill the all map key on listOfkeys variable.
                for (var singlekey in StoreResponse) {
                    listOfkeys.push(singlekey);
                }
                
                //set the controller field value for lightning:select
                if (listOfkeys != undefined && listOfkeys.length > 0) {
                    ControllerField.push('--- None ---');
                }
                
                for (var i = 0; i < listOfkeys.length; i++) {
                    ControllerField.push(listOfkeys[i]);
                }  
                // set the ControllerField variable values to country(controller picklist field)
                component.set("v.listControllingValues", ControllerField);
                
                
                
            }else{
                alert('Something went wrong..1');
            }
        });
        $A.enqueueAction(action);
        
                  
    },
    
    fetchSelectedValues: function(component) {
        // call the server side function  
       
        var action = component.get("c.fetchRecords"); 
        action.setParams({

            "RId": component.get("v.recordId")
            
        });
        
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                
                var StoreResponse = response.getReturnValue();
                //console.log(StoreResponse);
                
                //var keysList = Object.keys(StoreResponse[0]);
                //console.log(StoreResponse[0]);
                var city=[];
                var item = {
                       "value":  '--- None ---',
                       "label": '--- None ---'
                        };
                city.push(item);
                var depnedentFieldMap = component.get("v.depnedentFieldMap");
                //console.log(depnedentFieldMap);
                for(var i of StoreResponse[0])
                {
                    if (i != '--- None ---') {
                    var ListOfDependentFields= depnedentFieldMap[i][0];
                    for( var j of ListOfDependentFields)
                    {   var item = {
                       "value":  j,
                       "label": j
                        };
                        
                        city.push(item);
                    }
                    //console.log(ListOfDependentFields);
                    }    
                }
                //console.log(city);
                var cnt=0;
                component.set('v.option1', city);
                for(var i of StoreResponse)
                {var dataImportFields=[];
                 for(var value of i) {
                  dataImportFields.push(value);
                  }
                 //console.log(dataImportFields);
                 var s='v.value'+cnt;
                  component.set(s, dataImportFields);
                 cnt++;
                }
                   
              
                  
               
                
            }
            else
            {
                alert('Something went wrong..2');
            }   
        
        });
        
        $A.enqueueAction(action);                    
    },
    
    fetchDepValues: function(component, ListOfDependentFields, dependentFields, xyz, dependentFieldsGlobal) {
        // create a empty array var for store dependent picklist values for controller field  
        //var dependentFields = [];
        //console.log(dependentFields);
        //dependentFields.push('--- None ---');
        for (var i = 0; i < ListOfDependentFields.length; i++) {
            dependentFields.push(ListOfDependentFields[i]);
        }
        // set the dependentFields variable values to store(dependent picklist field) on lightning:select
        var dataImportCityFields=[];
        for(var key of dependentFields) {
                var item = {
                    "value":  key,
                    "label": key
                };
                dataImportCityFields.push(item);
                }
        //component.set(xyz, dataImportCityFields);
        dependentFieldsGlobal.push(dataImportCityFields);
        //console.log(dependentFieldsGlobal);
        
        //component.set('v.cityOptions', dataImportCityFields);
        //component.set('v.monOptions', dataImportCityFields);
        component.set("v.listDependingValues", dependentFields);
        
        
        
        
        
        
        //console.log(dependentFields);
        
    },
    saveResponse: function(component) {
        // call the server side function  
        
        var action = component.get("c.saveRecords"); 
        
        action.setParams({
            "Mains": component.get("v.value0"),
            "Options1": component.get("v.value1"),
            "RId": component.get("v.recordId")
            
        });
        //console.log(component.get("v.values"));
        //set callback   
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                //store the return response from server (map<string,List<string>>)  
                var StoreResponse = response.getReturnValue();
                
                 component.set("v.truthy" , true);
                var truth= component.get("v.truthy");
                //console.log(truth);
                
                
               
                this.fetchSelectedValues(component);
                 
                
                 $A.get('e.force:refreshView').fire();
                 //console.log("working............"); 
                component.set("v.showSpinner",false);
            }
            else{
                alert('Callback Failed...');
            }
        });
        $A.enqueueAction(action);
       
      },
     showHideSpinner : function(component) {
        var showValue = component.get('v.show');
        
        if(showValue) {
           // console.log('showValue'+showValue);
            var spinner = component.find("spinner");
            //console.log('spinner'+spinner);
        	$A.util.removeClass(spinner, "slds-hide");
        } else {
            //console.log('showValue'+showValue);
            var spinner = component.find("spinner");
            //console.log('spinner'+spinner);
        	$A.util.addClass(spinner, "slds-hide");
        }
    },
   
})