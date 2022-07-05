<?php


require_once $baseREP.'/PHP/class_access.php' ;
require_once $baseREP.'/PHP/lang.php' ;

use \Page\Access ;



require_once $baseREP.'/PHP/class_DownloadedDomain.php' ;
use \Entreprise\DownloadedDomain ;


require_once $baseREP.'/PHP/class_DateDomaine.php' ;
use \Entreprise\DateDomaine ;




if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
  $objAC = new Access ;
  if (! $objAC->IsVisibleBy('./Keywords_create.php',$_SESSION['current_user']->group_name))
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



$idDomaine = -1 ;
if ( isset($_POST['Submit']) )
  $idDomaine = $_POST['Domaine'] ;


$idDate = 0 ;
if ( isset($_POST['Submit']) )
  $idDate = $_POST['Date'] ;




// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichierHTML = $baseREP."/templates/SelectDomaine.html" ;

$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichierHTML) ;



require_once $baseREP.'/MenuFooter.php' ;



// on charge la selectBox qui contient les Domaines
$objD = new DownloadedDomain ;
if (!$objD->Load($idDomaine))
{
  $msg = $contenu."<h3>empty list Of Domains</h3>";
  echo $msg ;
  exit() ;
}
$contenu = str_replace('[OPTIONS_DOMAINES]',$objD->ListOfDomains,$contenu) ;
$contenu = str_replace('[SERVEUR_WEB]',$ServeurWeb,$contenu) ;




if ($idDomaine > -1)
{
  // on charge la selectBox qui contient les Domaines
  $objDates = new DateDomaine ;
  if (!$objDates->Load($idDomaine,$idDate))
  {
    $msg = $contenu."<h3>empty list Of Dates for Domain</h3>";
    echo $msg ;
    exit() ;
  }
  $contenu = str_replace('[OPTIONS_DATES]',$objDates->ListOfDates,$contenu) ;
}






// ajout des scripts js
$contenu = $contenu."\n<script>" ;
$FichierJS =  $baseREP.'/js/GetDateForDownloadedDomain.js' ;
$contenu = $contenu.file_get_contents($FichierJS) ;
$contenu = $contenu."</script>\n" ;







if ($idDomaine > -1)
{

  include $baseREP.'/PHP/config.php';

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error)
  {
      die("Connection failed: " . $conn->connect_error);
  }


  // la requête pour récupérer des articles
  $sql = "select do.Domaine, da.sdate, p.URL from SiteWeb_Pages p , SiteWeb_Domaines do, SiteWeb_DatesDomaines da where p.idDomaine = do.id and da.id = p.idDate " ;

  if ($idDate != 0)
    $sql = $sql." and da.id = ".$idDate ;
    
  $sql = $sql." order by Domaine, URL asc " ;

  $result = $conn->query($sql);



  $contenu = $contenu."<br>" ;
  $contenu = $contenu."<b>".$result->num_rows." résultats</b><br>" ;
  $contenu = $contenu."<br>" ;



  $contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
  $contenu = $contenu."<table class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;

  $contenu = $contenu."<thead style=\"background-color:#AAAAAA\" > <tr>  <th style=\"width:5%\">Numéro</th> <th>Domaine</th>  <th>Date</th> <th>Page</th> </thead>\n";


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
      $contenu = $contenu."<td>".$row['Domaine']."</td>" ;
      $contenu = $contenu."<td>".$row['sdate']."</td>" ;
      $contenu = $contenu."<td><a href=\"".$row['URL']."\" target=\"_blank\" >".$row['URL']."</a></td>" ;



      $contenu = $contenu."</tr>\n" ;



      $i = $i+1 ;
    }


  }
  else
    $MyError = "<h3>pas de sites Web dans la base</h3>";


  $contenu = $contenu."</table>\n" ;
  $contenu = $contenu."</div>" ;




  // on ferme la connection à la base
  $conn->close();
}


use \Footer\Footer ;
$objF = new Footer ;
$objF->baseREP = $baseREP ;
$contenu = $contenu.$objF->getFooterForGroup($group) ;


include $baseREP.'/ManageCouleurServeurs.php';








echo $contenu ;


if ($MyError <> "")
	echo "<script>alert('".$MyError."');</script>";


?>
