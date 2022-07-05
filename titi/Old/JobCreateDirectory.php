<?php

require_once $baseREP.'/PHP/class_RSS.php' ;

use \WEB\RSS ;



function GetDirectory($url)
{
  $pos =  strpos($url,'https://') ;
  if ($pos === false)
  {
    $pos1 =  strpos($url,'http://') ;
    if ($pos1 === false)
      return "-1" ;
    $url = str_replace('http://','',$url) ;
  }
  else
    $url = str_replace('https://','',$url) ;
  return $url ;
}

function GetSiteWeb($url)
{
  $pos =  strpos($url,'://') ;
  if ($pos !== false)
  {
    $pos1 =  strpos($url,'/',$pos+3) ;
    if ($pos1 !== false)
      return substr($url,0,$pos1) ;
    return $url ;
  }

  return "" ;
}


function CreateDirectory($ho, $rep)
{
  $res = chdir($ho) ;
  if (!$res)
    return -1 ;

// on nettoie le répertoire cible
  if (substr($rep, -1) == "/")
    $rep = substr($rep,0,strlen($rep)-1) ;

  //echo "rep= ".$rep."<br>" ;


  $repCible = $ho ;
  $pos_1 = 0 ;
  $pos = strpos($rep,"/") ;
  while ( $pos !== false )
  {
    $nr = substr($rep,$pos_1,$pos-$pos_1) ;

    $repCible = $repCible.$nr ;
    if (!file_exists($repCible))
    {
      mkdir($repCible, 0777, false);
      chmod($repCible,0777) ;
    }
    $repCible = $repCible."/" ;

    $pos_1 = $pos+1 ;
    $pos = strpos($rep,"/",$pos_1) ;
  }

  $nr = substr($rep,$pos_1,strlen($rep)-$pos_1) ;
  $repCible = $repCible.$nr ;

  if (!file_exists($repCible))
  {
    mkdir($repCible, 0777, true);
    chmod($repCible,0777) ;
  }

  echo "repCible= ".$repCible."<br>" ;

}

$objR = new RSS ;



include $baseREP.'/PHP/config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error)
    die("Connection failed: " . $conn->connect_error);




	// on récupère tous les items à changer et on fait toutes les modifications
//$sql1 = "select * from RSS where iscurrent = 1 and Repertoire is NULL" ;
$sql1 = "select * from RSS where iscurrent = 1" ;
echo "sql: ".$sql1."<br>" ;
$result1 = $conn->query($sql1);
if ($result1->num_rows > 0)
{

  // output data of each row
  while($row1 = $result1->fetch_assoc())
  {
		$url = $row1['Channel_URL'] ;
    //echo "URL= ".$url."<br>" ;

    $SiteWeb = GetSiteWeb($url) ;
    $objR->UpdateSiteWeb($url,$SiteWeb) ;


    $repertoireCible = GetDirectory($url) ;
    if ($repertoireCible != "-1")
    {
      CreateDirectory($home,$repertoireCible) ;  // $home est définie dans config.php
      $objR->UpdateDirectory($url,$repertoireCible) ;
    }
	}

}



$conn->close();




?>
