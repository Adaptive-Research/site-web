
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

function openInNewTab(url)
{
  var win = window.open(url, '_blank');
  win.focus();
}


function openInNewWindow(sURL)
{
  msg = open("","DisplayWindow","width=1200,height=600");
  res = GetHTMLPage(sURL) ;
  msg.document.write(res) ;
}


function PopUpTexte(sURL)
{
  openInNewTab(sURL) ; 
}

