<?php


require_once $baseREP.'/PHP/class_access.php' ;
require_once $baseREP.'/PHP/lang.php' ;

use \Page\Access ;



require_once $baseREP.'/PHP/class_Profession.php' ;
use \Entreprise\Profession ;



require_once $baseREP.'/PHP/class_ProfessionRun.php' ;
use \Entreprise\ProfessionRun ;




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





$idProfession = 0 ;
if ( isset($_POST['Submit']) )
  $idProfession = $_POST['Profession'] ;


$idRun = 0 ;
if ( isset($_POST['Submit']) )
  $idRun = $_POST['Run'] ;










// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichier = $baseREP."/templates/SelectProfession4.html" ;
$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;



require_once $baseREP.'/MenuFooter.php' ;



// on charge la selectBox qui contient les professions

$objA = new Profession ;
if (!$objA->LoadList($idProfession,true))
{
  $msg = $contenu."<h3>empty list Of Professions</h3>";
  echo $msg ;
  exit() ;
}
$contenu = str_replace('[OPTIONS_PROFESSION]',$objA->ListOfProfessions,$contenu) ;
$contenu = str_replace('[SERVEUR_WEB]',$ServeurWeb,$contenu) ;



// on charge la selectBox qui contient les Runs seulement si on a selectionne une activite
if ($idProfession > 0)
{
  $objAR = new ProfessionRun ;
  if (!$objAR->LoadList($idProfession,$idRun))
  {
    $msg = $contenu."<h3>empty list Of Runs</h3>";
    echo $msg ;
    exit() ;
  }
  $contenu = str_replace('[OPTIONS_RUN]',$objAR->ListOfRuns,$contenu) ;
}


#echo "<script>alert('".$idRun."');</script>";





include $baseREP.'/PHP/config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset('utf8');


// la requête pour récupérer des articles
$sql = "select p.Profession, pr.Ville, pr.CodePostal, pe.Titre, pe.TypeEntreprise,pe.Telephone, per.Ligne,pe.VilleMinu, pe.URL, per.Ranking, per.NombreAvis, per.Rating from Profession_Run pr, Profession_Entreprises pe, Profession_Entreprises_ResultsRuns per,  Profession p where 
pr.id = ".$idRun." and per.idProfessionRun = pr.id and per.idEntreprise = pe.id  and pr.idProfession = p.id " ;

$result = $conn->query($sql);



$contenu = $contenu."<br>" ;

//$contenu = $contenu." <button type=\"button\" onclick=\"test()\">Click Me!</button> " ;

$contenu = $contenu."<br>" ;

$contenu = $contenu."<b>Run: ".$idRun."</b><br>" ;
$contenu = $contenu."<b>".$result->num_rows." résultats</b><br>" ;
$contenu = $contenu."<br>" ;



$contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
$contenu = $contenu."<table id=\"TableResults\" class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;

$contenu = $contenu."<thead style=\"background-color:#AAAAAA\" >  <th style=\"width:5%\">Numéro</th>  <th>Profession</th>  <th>Ville</th> <th>Code Postal</th> <th>Entreprise</th> <th>Type</th>  <th>Ville</th>  <th style=\"width:8%\">Téléphone</th> <th>Infos</th>   <th>Ranking</th> <th>Rating</th> <th>Nombre Avis</th> </thead>\n";
$contenu = $contenu."<tbody>" ;



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

    $contenu = $contenu."<td>".$row['Profession']."</td>" ;
    $contenu = $contenu."<td>".$row['Ville']."</td>" ;
    $contenu = $contenu."<td>".$row['CodePostal']."</td>" ;
    if ($row['URL'] != null) 
      $contenu = $contenu."<td><a href=\"".$row['URL']."\" target=\"_blank\" >".$row['Titre']."</a></td>" ;
    else
      $contenu = $contenu."<td>".$row['Titre']."</td>" ;

    $contenu = $contenu."<td>".$row['TypeEntreprise']."</td>" ;
    $contenu = $contenu."<td>".$row['VilleMinu']."</td>" ;
    $contenu = $contenu."<td>".$row['Telephone']."</td>" ;
    $contenu = $contenu."<td>".$row['Ligne']."</td>" ;
   
    $contenu = $contenu."<td>".$row['Ranking']."</td>" ;
    $contenu = $contenu."<td>".$row['Rating']."</td>" ;
    $contenu = $contenu."<td>".$row['NombreAvis']."</td>" ;



    $contenu = $contenu."</tr>\n" ;



  	$i = $i+1 ;
  }


}

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





// ajout des scripts js
$contenu = $contenu."\n<script>" ;
$FichierJS =   $baseREP.'/js/GetRun.js' ;
$contenu = $contenu.file_get_contents($FichierJS) ;
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
