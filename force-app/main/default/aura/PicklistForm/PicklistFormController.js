({ 
    /*
    onSuccess : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been Saved successfully."
        });
        toastEvent.fire();
    },
    
    onLoad : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Loaded!",
            "message": "The record has been Loaded successfully ."
        });
        toastEvent.fire();
    },
    
    onError : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Error!",
            "message": "Error."
        });
        toastEvent.fire();
    }
    */
    handleEditClick : function(component, event, helper) {
        var evt = $A.get("e.force:navigateToComponent");
        console.log('Event '+evt);
        var accountFromId = component.get("v.recordId");
        evt.setParams({
            componentDef  : "c:DependentPicklist" ,
            componentAttributes : {
                accId : accountFromId
            }
        

        });
      
        evt.fire();
        
    }

})