<?php


require_once $baseREP.'/PHP/class_access.php' ;
require_once $baseREP.'/PHP/lang.php' ;

use \Page\Access ;


require_once $baseREP.'/PHP/class_ProfessionEntreprise.php' ;
use \Entreprise\Profession_Entreprises ;


require_once $baseREP.'/PHP/class_Ville.php' ;
use \Entreprise\Ville ;




if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
  $objAC = new Access ;
  if (! $objAC->IsVisibleBy('./Activity_showall.php',$_SESSION['current_user']->group_name))
  {
    header('Location: /') ;
    exit() ;
  }
}
else
{
  header('Location: /') ;
  exit() ;
}



#echo $servername." ".$username." ".$password." ".$dbname."\n" ;


$MyError = "" ;





// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichier = $baseREP."/templates/SelectSEOLOCAL2.html" ;
$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;



$Keywords = "" ;

if ( isset($_POST['Submit']) )
{
  $Keywords = $_POST['Keywords'] ;
}
$Keywords = strtolower($Keywords) ;










require_once $baseREP.'/MenuFooter.php' ;





use \Footer\Footer ;
$objF = new Footer ;
$objF->baseREP = $baseREP ;
$contenu = $contenu.$objF->getFooterForGroup($group) ;



include $baseREP.'/ManageCouleurServeurs.php';











include $baseREP.'/PHP/config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset('utf8');

// la requête pour récupérer les infos
$sql = "SELECT  * FROM Profession_Entreprises pe where 1 = 0 order by Titre " ;
if ($Keywords != "")
  $sql = "SELECT  * FROM Profession_Entreprises pe where LOWER(pe.TypeEntreprise) like \"%".$Keywords."%\" order by Titre"  ;

$result = $conn->query($sql);


if ($result->num_rows > 0)
{
  // on vérifie que l'on a les droits pour accéder à la page
  // si on n'a pas les droits, on est redirigé vers la page index.php


  //$contenu = $contenu." <button type=\"button\" onclick=\"test()\">Click Me!</button> " ;

  $contenu = $contenu."<br>" ;
  $contenu = $contenu."<b>".$result->num_rows." résultats</b><br>" ;
  $contenu = $contenu."<br>" ;



  $contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
  $contenu = $contenu."<table id=\"TableResults\" class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;

  $contenu = $contenu."<thead style=\"background-color:#AAAAAA\" >  <th>Numéro</th>  <th style=\"width:20%\">Titre</th> <th style=\"width:10%\">Type</th> <th> Ville</th>  <th>Téléphone</th>  " ;
  //$contenu = $contenu." <th>Ligne</th> " ;
  $contenu = $contenu." </thead>\n";
  $contenu = $contenu."<tbody>" ;

  echo $contenu ;
  $contenu = "" ;




  // output data of each row
	$i = 1 ;
  while($row = $result->fetch_assoc())
  {
    $contenu = $contenu."<tr>" ;

    $contenu = $contenu."<td>".$i."</td>" ;

    if ($row['URL'] != null) 
      $contenu = $contenu."<td><a href=\"".$row['URL']."\" target=\"_blank\" >".$row['Titre']."</a></td>" ;
    else
      $contenu = $contenu."<td>".$row['Titre']."</td>" ;
    
    $contenu = $contenu."<td>".$row['TypeEntreprise']."</td>" ;
    $contenu = $contenu."<td>".$row['VilleMinu']."</td>" ;
    $contenu = $contenu."<td>".$row['Telephone']."</td>" ;
   
    

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


}



// on ferme la connection à la base
$conn->close();



// ajout des scripts js
$contenu = $contenu."\n<script>" ;
$trijs =   $baseREP.'/js/tri.js' ;
$contenu = $contenu.file_get_contents($trijs) ;
$contenu = $contenu."</script>\n" ;







echo $contenu ;



?>
