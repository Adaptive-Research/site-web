<?php


require_once $baseREP.'/PHP/class_access.php' ;
require_once $baseREP.'/PHP/lang.php' ;

use \Page\Access ;



if (isset($_GET['SessionID']))
    session_id($_GET['SessionID']) ;

if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
  $objAC = new Access ;
  if (! $objAC->IsVisibleBy('./Article_showall.php',$_SESSION['current_user']->group_name))
  {
    header('Location: ./') ;
    exit() ;
  }
}
else
{
  header('Location: ./') ;
  exit() ;
}




$MyError = "" ;





// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$contenu = file_get_contents($fheader) ;


$contenu = $contenu."<br>" ;
$contenu = $contenu."<br>" ;
$contenu = $contenu."<br>" ;


$contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
$contenu = $contenu."<table class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;

$contenu = $contenu."<thead style=\"background-color:#AAAAAA\" > <tr>  <th style=\"width:5%\">Numéro</th> <th style=\"width:5%\">id</th> <th>URL Channel</th> <th>Site Web</th> <th>Article</th> </thead>\n";


include $baseREP.'/PHP/config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}


// la requête pour récupérer des articles
$sql = "select r.Channel_URL, r.SiteWeb, a.* from Articles as a, RSS as r  where a.iscurrent = 1  and r.id = a.idRSS and HasBeenLoaded = 1 and a.HasBeenCleaned is NULL order by id asc " ;

$result = $conn->query($sql);

if ($result->num_rows > 0)
{
  // on vérifie que l'on a les droits pour accéder à la page
  // si on n'a pas les droits, on est redirigé vers la page index.php

  $objAC = new Access ;

  // output data of each row
	$i = 1 ;
  while($row = $result->fetch_assoc())
  {
    $contenu = $contenu."<tr>" ;

    $contenu = $contenu."<td>".$i."</td>" ;

    $contenu = $contenu."<td>".$row['id']."</td>" ;
    $contenu = $contenu."<td>".$row['Channel_URL']."</td>" ;
    $contenu = $contenu."<td>".$row['SiteWeb']."</td>" ;
    $contenu = $contenu."<td>".$row['Article_Link']."</td>" ;

    $contenu = $contenu."</tr>\n" ;



  	$i = $i+1 ;
  }


}
else
  $MyError = "<h3>pas d'article à récupérer</h3>";


$contenu = $contenu."</table>\n" ;
$contenu = $contenu."</div>" ;




// on ferme la connection à la base
$conn->close();




// début de la modification du contenu
$RepStatic = "./static" ;
$RepTemplates = "./templates" ;

$contenu = str_replace('[STATIC]',$RepStatic,$contenu) ;
$contenu = str_replace('[TEMPLATES]',$RepTemplates,$contenu) ;



require_once $baseREP.'/MenuFooter.php' ;



echo $contenu ;


if ($MyError <> "")
	echo "<script>alert('".$MyError."');</script>";


?>
