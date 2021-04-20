public class dependentPicklist_UpdateCtrl {
 
    	@AuraEnabled
    public static Map<String,List<List<String>>> getDependentMap() {
        List< New_Picklist__mdt > State_city_list = [ SELECT Label, Id, State__c,City__c, Monuments__c FROM New_Picklist__mdt ORDER BY Label ];
    	Map<String,List<List<String>>> map_state_city= new Map<String,List<List<String>>>() ;
        Map<String , Integer > mark= new Map<String , Integer  >();
        for(New_Picklist__mdt a : State_city_list){
            mark.put(a.State__c,1);
        }
        //system.debug(mark);
        for(New_Picklist__mdt a : State_city_list){
 
 
 
            List< String > ss=new List<String >();
            List< String > mon=new List<String >();
            if(mark.get(a.State__c)==1){
               //system.debug(11);
            	for(New_Picklist__mdt b : State_city_list){
                    if(a.State__c==b.State__c){
                    if(b.City__c!=null)
                    {
                        ss.add(b.City__c);
                    }
                    else
                    {
                        mon.add(b.Monuments__c);
                    }  
 
                        //system.debug(b.City__c);
                        //system.debug(b.Monuments__c);
                    } 
            	}
                system.debug(ss);
                system.debug(mon);
                List<List<String>> newList= new List<List<String>>();
                newList.add(ss);
                newList.add(mon);
                 mark.put(a.State__c,0);
            	map_state_city.put(a.State__c,newList);
 
            }
 
            //map_City_state.put(a.City_picklist__c,a.State__c);
            //map_state_city[a.State__c].add(s);
         //  System.debug(getType(a.City_picklist__c))
            /*System.debug(a.Label);
            System.debug(a.State__c);
            System.debug(a.City_picklist__c);
			*/
        }
        System.debug(map_state_city);
        return map_state_city;
 
    }
 
    @AuraEnabled
    public static void saveRecords(List<String> Mains, List<String> Options1, String RId) {
        String a='xyz';
        String b='pqr';
        Integer cnt1=0;
 
        //String a= [SELECT State__c from Picklist_DB__c];
        //String b= [SELECT City__c from Picklist_DB__c];
        //String a= test.City__c;
        //String b= test.State__c;
 
        for(String x: Mains)
        {   if(cnt1==0)
            { a=x;
              cnt1++;
            }
            else
            a+=';'+x;   
 
        }
        cnt1=0;
        for(String x: Options1)
        {  if(cnt1==0)
            { b=x;
              cnt1++;
            }
            else
            b+=';'+x;   
 
        }
        //system.debug(a);
        //system.debug(b);
        if(a!='xyz')
        {   
            for(Picklist_DB__c x: [SELECT Id, State__c, City__c from Picklist_DB__c] )
            {   if(x.Id==RId){
            x.State__c=a;
            if(b!='pqr')
            {x.City__c=b;
            }
            else
            {
              x.City__c=null;  
            }    
            upsert x;
            system.debug(x.State__c);
            system.debug(x.City__c);
        }
            }
        }
        else
        {
            for(Picklist_DB__c x: [SELECT State__c, City__c from Picklist_DB__c] )
            {   if(x.Id==RId){
            x.State__c=null;
 
            x.City__c=null;  
 
            upsert x;
            system.debug(x.State__c);
            system.debug(x.City__c);
            }
        }
        }    
        //system.debug([SELECT State__c from Picklist_DB__c]);
        //system.debug(b);
        //return a;
 
    } 
 
    @AuraEnabled
    public static List<List<String>> fetchRecords(String RId) {
        List<List<String>> fetched=new List<List<String>>();
        String a,b;
 
        for(Picklist_DB__c x: [SELECT Id, State__c, City__c from Picklist_DB__c] )
        {  if(x.Id==RId){
            a=x.State__c;
            b=x.City__c;
        }
        }
        List<String> aa;
        List<String> xx= new List<String>();
        List<String> bb;    
        if(a!=null)
        {aa= a.split(';');
         fetched.add(aa);
        } 
        else
        {
            fetched.add(xx);
        }
        if(b!=null)
        {bb= b.split(';');
         fetched.add(bb);
        }  
 
 
 
        system.debug(aa);
        system.debug(bb);
        system.debug(fetched);
        return fetched;
    }
 
}