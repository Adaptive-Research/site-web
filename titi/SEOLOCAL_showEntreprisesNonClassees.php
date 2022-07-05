<?php


require_once $baseREP.'/PHP/class_access.php' ;
require_once $baseREP.'/PHP/lang.php' ;

use \Page\Access ;



if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
  $objAC = new Access ;
  if (! $objAC->IsVisibleBy('./Activity_showall.php',$_SESSION['current_user']->group_name))
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



#echo $servername." ".$username." ".$password." ".$dbname."\n" ;


$MyError = "" ;





// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$contenu = file_get_contents($fheader) ;



require_once $baseREP.'/MenuFooter.php' ;

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
$sql = "SELECT  p.Profession, pr.Ville, pr.CodePostal, pe.id,pe.Titre,per.Ligne, pe.URL, per.Ranking FROM Profession_Entreprises pe, Profession_Run pr, Profession_Entreprises_ResultsRuns per,Profession p where pe.VilleMinu is null " ;
$sql = $sql." and per.idProfessionRun = pr.id and per.idEntreprise = pe.id and pr.idProfession = p.id order by Titre " ;

$result = $conn->query($sql);



$contenu = $contenu."<br>" ;
$contenu = $contenu."<br>" ;
$contenu = $contenu."<br>" ;

//$contenu = $contenu." <button type=\"button\" onclick=\"test()\">Click Me!</button> " ;

$contenu = $contenu."<br>" ;
$contenu = $contenu."<b>".$result->num_rows." résultats</b><br>" ;
$contenu = $contenu."<br>" ;



$contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
$contenu = $contenu."<table id=\"TableResults\" class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;

$contenu = $contenu."<thead style=\"background-color:#AAAAAA\" >  <th style=\"width:5%\">Numéro</th> <th>Titre</th> <th>Profession</th> <th>Ville</th> <th>CodePostal</th>  <th>idEntreprise</th> <th>Titre</th> <th>Ligne</th> <th>Site Web</th> <th>Ranking</th> </thead>\n";
$contenu = $contenu."<tbody>" ;



if ($result->num_rows > 0)
{
  // on vérifie que l'on a les droits pour accéder à la page
  // si on n'a pas les droits, on est redirigé vers la page index.php


  // output data of each row
	$i = 1 ;
  while($row = $result->fetch_assoc())
  {
    $contenu = $contenu."<tr>" ;

 
    $contenu = $contenu."<td>".$i."</td>" ;
    $contenu = $contenu."<td>".$row['Profession']."</td>" ;
    $contenu = $contenu."<td>".$row['Ville']."</td>" ;
    $contenu = $contenu."<td>".$row['CodePostal']."</td>" ;
    $contenu = $contenu."<td>".$row['id']."</td>" ;
    $contenu = $contenu."<td>".$row['Titre']."</td>" ;
    $contenu = $contenu."<td>".$row['Ligne']."</td>" ;
    $contenu = $contenu."<td><a href=\"".$row['URL']."\" target=\"_blank\" >".$row['URL']."</a></td>" ;
    
    $contenu = $contenu."<td>".$row['Ranking']."</td>" ;

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


}
else
  $MyError = "<h3>pas de Flux RSS dans la base</h3>";

$contenu = $contenu."</tbody>" ;
$contenu = $contenu."</table>\n" ;
$contenu = $contenu."</div>" ;




// on ferme la connection à la base
$conn->close();







require_once $baseREP.'/MenuFooter.php' ;


// ajout des scripts js
$contenu = $contenu."\n<script>" ;


$trijs =   $baseREP.'/js/tri.js' ;
$contenu = $contenu.file_get_contents($trijs) ;


$contenu = $contenu."</script>\n" ;







use \Footer\Footer ;
$objF = new Footer ;
$objF->baseREP = $baseREP ;
$contenu = $contenu.$objF->getFooterForGroup($group) ;



include $baseREP.'/ManageCouleurServeurs.php';



echo $contenu ;


if ($MyError <> "")
	echo "<script>alert('".$MyError."');</script>";


?>
