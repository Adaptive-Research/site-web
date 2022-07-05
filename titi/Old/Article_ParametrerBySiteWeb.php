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

if ( ! isset($_GET['SiteWeb'])   )
{
  header('Location: ./Article_ShowAllInitial.php') ;
  exit() ;
}




include $baseREP.'/PHP/config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset('utf8');


$MyError = "" ;





// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$contenu = file_get_contents($fheader) ;


$contenu = $contenu."<br>" ;
$contenu = $contenu."<br>" ;
$contenu = $contenu."<br>" ;


$contenu = $contenu."<h2><b>".$_GET['SiteWeb']."</b></h2><br>\n" ;

$contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
$contenu = $contenu."<table class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;
$contenu = $contenu."<thead style=\"background-color:#AAAAAA\" > <tr>  <th style=\"width:5%\">Numéro</th> <th style=\"width:5%\">id</th> <th>Article</th> <th>Date</th> </thead>\n";






$i = 1 ;
$sql2 = "select a.* from Articles as a, RSS as r where a.iscurrent = 1 and a.HasBeenLoaded = 1 and r.id = a.idRSS and r.SiteWeb = \"".$_GET['SiteWeb']."\" " ;
$result2 = $conn->query($sql2);
while($row2 = $result2->fetch_assoc())
{
  $contenu = $contenu."<tr>" ;
  $contenu = $contenu."<td>".$i."</td>" ;
  $contenu = $contenu."<td>".$row2['id']."</td>" ;
  $contenu = $contenu.'<td><a href="./Article_Parametrer.php?id='.$row2['id'].'">'.$row2['Article_Link'].'</a></td>' ;
  $contenu = $contenu."<td>".$row2['date']."</td>" ;
  $contenu = $contenu."</tr>\n" ;

  $i = $i + 1 ;
}


$contenu = $contenu."</table>\n" ;
$contenu = $contenu."</div><br><br>" ;






// on ferme la connection à la base
$conn->close();





require_once $baseREP.'/MenuFooter.php' ;



echo $contenu ;


if ($MyError <> "")
	echo "<script>alert('".$MyError."');</script>";


?>
