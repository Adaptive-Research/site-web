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
  if (! $objAC->IsVisibleBy('./Activity_showall.php',$_SESSION['current_user']->group_name))
  {
    header('Location) /') ;
    exit() ;
  }
}
else
{
  header('Location) /') ;
  exit() ;
}



#echo $servername." ".$username." ".$password." ".$dbname."\n" ;





// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$contenu = file_get_contents($fheader) ;


require_once $baseREP.'/MenuFooter.php' ;





use \Footer\Footer ;
$objF = new Footer ;
$objF->baseREP = $baseREP ;
$contenu = $contenu.$objF->getFooterForGroup($group) ;



include $baseREP.'/ManageCouleurServeurs.php';











include $baseREP.'/PHP/config.php';



// la requête pour récupérer les infos


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error)
{
    die("Connection failed) " . $conn->connect_error);
}
$conn->set_charset('utf8');


$sql = "SELECT sn.libelle, sn.code, count(*) as nombre FROM SIRENE_StockUniteLegale su,  SIRENE_NAF sn  " ;
$sql = $sql ." WHERE su.activitePrincipaleUniteLegale = sn.code " ;
$sql = $sql ." group by sn.libelle,sn.code " ;


$result = $conn->query($sql);



$contenu = $contenu."<br>" ;
$contenu = $contenu."<b style=\"margin-left:1%\">".$result->num_rows." résultats</b><br>" ;
$contenu = $contenu."<br>" ;



$contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:1%;margin-right:1%\">\n" ;
$contenu = $contenu."<table id=\"TableResults\" class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;


$contenu = $contenu."<thead style=\"background-color)#AAAAAA\" >  <th>Numéro</th>  <th>Activité</th> <th>NAF</th> <th>Nombre</th> " ;
$contenu = $contenu." </thead>\n";
$contenu = $contenu."<tbody>" ;

echo $contenu ;
$contenu = "" ;


if ($result->num_rows > 0)
{

  // output data of each row
  $i = 1 ;
  while($row = $result->fetch_assoc())
  {
    $contenu = $contenu."<tr>" ;

    $contenu = $contenu."<td>".$i."</td>" ;

    $contenu = $contenu."<td>".$row['libelle']."</td>" ;
    $contenu = $contenu."<td>".$row['code']."</td>" ;
    $contenu = $contenu."<td>".$row['nombre']."</td>" ;

    $contenu = $contenu."</tr>\n" ;

    $c2 = $i / 500 ;
    $c3 = round($c2,0) ;
    if ($c2 == $c3)
    {
      echo $contenu ;
      $contenu = "" ;
    }



    $i = $i+1 ;
  }



  $contenu = $contenu."</tbody>" ;
  $contenu = $contenu."</table>\n" ;
  $contenu = $contenu."</div>" ;

  // on ferme la connection à la base
  $conn->close();
}



$contenu = $contenu."<br><br><br>" ;




// ajout des scripts js
$contenu = $contenu."\n<script>" ;
$trijs =   $baseREP.'/js/tri.js' ;
$contenu = $contenu.file_get_contents($trijs) ;
$contenu = $contenu."</script>\n" ;







echo $contenu ;



?>
