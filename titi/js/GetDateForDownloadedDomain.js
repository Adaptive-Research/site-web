
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



function GetDateForDownloadedDomain(sURL,idDomaine)
{
  NewURL = sURL +  '/API/ShowDatesForDownloadedDomain/'+ idDomaine + '/' ;
  console.log(NewURL) ;
  res = GetHTMLPage(NewURL) ;
  console.log(res) ;
  var items = JSON.parse(res);

  var selectBox = document.getElementById("ListeDates") ;

  var str = ""

  for (var item of items) {
    str += "<option value=\"" + item['id'] + "\">" + item['sdate'] + "</option>" ; 
  }  

  selectBox.innerHTML = str;

}




function ShowValue(v)
{
    console.log(v) ;  
}
