
function GetHTMLPage(url)
{
  var req = new XMLHttpRequest();
  req.open('GET',url,false) ;
  req.send(null) ;

  if (req.status == 200)
    return req.response ;
  else
    return -1 ;
}



function GetVilles(sURL,CodePostal)
{
  NewURL = sURL +  '/API/ShowCities/'+ CodePostal + '/' ;
  console.log(NewURL) ;
  res = GetHTMLPage(NewURL) ;
  console.log(res) ;
  var items = JSON.parse(res);

  var selectBox = document.getElementById("ListeVilles") ;

  var str = ""
  var Compteur = 0 ;

  for (var item of items) {
    str += "<option value=\"" + item['VilleMinu'] + "\">" + item['VilleMinu']  +" </option>" ; 
    Compteur = Compteur+1 ;
  }  

  selectBox.innerHTML = str;
}





function ShowValue(v)
{
    console.log(v) ;  
}
