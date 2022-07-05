    
    
    
    function AddInfo_SetRelevant(Server, id) {
        console.log('AddInfo_SetRelevant') ;
    
        var checkBox = document.getElementById("isRelevant_"+id);
    
        if (checkBox.checked == true)
            w = "1" ;
        else 
            w = "0" ;
       
        url = Server + "/SEO/SetRelevant" ;
        params = 'command=get&p1='+id + '&p2='+w  ;
    
        console.log('SetRelevant:' + url + ' --> ' + params) ;
    
        var x = fetch(url, {method: "POST",  headers: {  Accept: '*', 'Content-Type': 'application/x-www-form-urlencoded'} , body:params   } );
    }
    
    
    
    
    
    function AddInfo_SetInputText(Server, id,Domaine,Msg,idInput,FinURL) {
        console.log(Msg + " " + id + " " + Domaine) ;
    
    
        var inputText = document.getElementById(idInput+id);
        w = inputText.value ;
    
       
        url = Server + FinURL ;
        params = 'command=get&p1='+Domaine + '&p2='+w  ;
    
        console.log(Msg + "    " + url + ' --> ' + params) ;
    
       var x = fetch(url, {method: "POST",  headers: {  Accept: '*', 'Content-Type': 'application/x-www-form-urlencoded'} , body:params   } );
    }
    
    
    function AddInfo_SetType(Server,id,Domaine) {
        AddInfo_SetInputText(Server,id,Domaine,'AddInfo_SetType',"type_","/SEO/SetType")
    }
    
    
    function AddInfo_SetMarketing(Server,id,Domaine) {
        AddInfo_SetInputText(Server,id,Domaine,'AddInfo_SetMarketing',"marketing_","/SEO/SetMarketing")
    }
    
    
    function AddInfo_SetZone(Server,id,Domaine) {
        AddInfo_SetInputText(Server,id,Domaine,'AddInfo_SetZone',"zone_","/SEO/SetZone")
        
    }
    
    
    

    