
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



function GetRun(sURL,idActivity)
{
  NewURL = sURL +  '/API/ShowRunActivity/'+ idActivity + '/' ;
  console.log(NewURL) ;
  res = GetHTMLPage(NewURL) ;
  console.log(res) ;
  var items = JSON.parse(res);

  var selectBox = document.getElementById("ListeRun") ;

  var str = ""
  var Compteur = 0 ;
  var idActivityRun = -1 ;

  for (var item of items) {
    if (Compteur == 0)
      idActivityRun = item['id'] ;
    str += "<option value=\"" + item['id'] + "\">" + item['DateRun'] + "</option>" ; 
    Compteur = Compteur+1 ;
  }  

  selectBox.innerHTML = str;

  if (idActivityRun >= 0)
    GetDomaines(sURL,idActivityRun) ;
}


function GetDomaines(sURL,idActivityRun)
{
  NewURL = sURL +  '/API/ShowDomaines/'+ idActivityRun + '/' ;
  res = GetHTMLPage(NewURL) ;
  var items = JSON.parse(res);

  var selectBox = document.getElementById("ListeDomaines") ;

  var str = "<option value=\"\"> </option>" ;
  for (var item of items) {
    str += "<option value=\"" + item['Domaine'] + "\">" + item['Domaine'] + " (" + item['TotalScoring'] +")</option>" ;
  }

  selectBox.innerHTML = str;
}



function GetRunForProfession(sURL,idProfession)
{
  console.log("GetRunForProfession") ;
  NewURL = sURL +  '/API/ShowRunProfession/'+ idProfession + '/' ;
  console.log(NewURL) ;
  res = GetHTMLPage(NewURL) ;
  console.log(res) ;
  var items = JSON.parse(res);

  var selectBox = document.getElementById("ListeRun") ;

  var str = ""
  for (var item of items) {
    str += "<option value=\"" + item['id'] + "\">" +item['Ville'] + " " + item['CodePostal'] + " " + item['DateRun'] + "</option>" ; 
  }  

  selectBox.innerHTML = str;
}





function ShowValue(v)
{
    console.log(v) ;  
}
