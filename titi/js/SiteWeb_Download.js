    Server = "http://seo.test"
    
    
    
    
    function Download(Domaine) {
       
        url = Server + '/SEO/Download-SiteWeb' ;
        params = 'command=get&p1='+Domaine  ;
    
        console.log("Download:    " + url + ' --> ' + params) ;
    
        var x = fetch(url, {method: "POST",  headers: {  Accept: '*', 'Content-Type': 'application/x-www-form-urlencoded'} , body:params   } );
    }
    
    
    
    

    