<?php


require_once $baseREP.'/PHP/class_access.php' ;
require_once $baseREP.'/PHP/lang.php' ;

use \Page\Access ;

function ChangeDate($d)
{
  $y = substr($d,0,4) ;
  $m = substr($d,5,2) ;
  $dd = substr($d,8,2) ;
  return $dd."  ".$m."  ".$y ;
}

$MyError = "" ;

if (isset($_GET['SessionID']))
    session_id($_GET['SessionID']) ;

if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
  $objAC = new Access ;
  if (! $objAC->IsVisibleBy('./Contacts_showall.php',$_SESSION['current_user']->group_name))
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









// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$contenu = file_get_contents($fheader) ;


$contenu = $contenu."<br>" ;
$contenu = $contenu."<br>" ;
$contenu = $contenu."<br>" ;

$contenu = $contenu."<div  class=\"table-responsive\">\n" ;
$contenu = $contenu."<table class=\"table table-bordered\" style=\"background-color:#FFFFFF;border:solid #000000\" >\n" ;

$contenu = $contenu."<thead style=\"background-color:#AAAAAA\" > <tr>   <th style=\"width:10%\">Prénom</th>  <th style=\"width:10%\">Nom</th>   <th style=\"width:10%\">Entreprise</th> <th style=\"width:10%\">Fonction</th> <th style=\"width:10%\">Type Event</th> <th style=\"width:10%\">Date Event</th><th>Commentaire</th> </thead>\n";




include $baseREP.'/PHP/config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8") ;
// Check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}


// la requête pour récupérer les utilisateurs
$sql = "select * from Contacts_Rencontres as cr,  Contacts as c where c.iscurrent = 1 and cr.idContacts = c.id order by Prenom,Nom, Entreprise, DateEvent" ;

$result = $conn->query($sql);

if ($result->num_rows > 0)
{
  // on vérifie que l'on a les droits pour accéder à la page
  // si on n'a pas les droits, on est redirigé vers la page index.php

  $objAC = new Access ;

  // output data of each row
	$i = 1 ;

  $PN_1 = "" ;
  $BKColor = "#FFFFFF" ;
  while($row = $result->fetch_assoc())
  {

    // changement de couleur en fonction de la personne
    $PN = $row['Entreprise']."_".$row['Prenom']."_".$row['Nom'] ;

    if ($PN_1 != $PN)
    {
      $PN_1 = $PN ;
      if ($BKColor == "#FFFFFF")
        $BKColor = "#FFEEFF" ;
      else
        $BKColor = "#FFFFFF" ;
    }

    $contenu = $contenu."<tr bgcolor=\"".$BKColor."\">\n" ;

    $contenu = $contenu."<td>".$row['Prenom']."</td>" ;
    $contenu = $contenu."<td>".$row['Nom']."</td>" ;
    $contenu = $contenu."<td>".$row['Entreprise']."</td>" ;
    $contenu = $contenu."<td>".$row['Fonction']."</td>" ;
    $contenu = $contenu."<td>".$row['TypeEvent']."</td>" ;
    //$contenu = $contenu."<td>".ChangeDate($row['DateEvent'])."</td>" ;
    $contenu = $contenu."<td>".ChangeDate($row['DateEvent'])."</td>" ;
    $contenu = $contenu."<td>".$row['Commentaire']."</td>" ;

    $contenu = $contenu."</tr>\n" ;


  	$i = $i+1 ;
  }


}
else
{
  $MyError = "<h3>pas de contact dans la base</h3>";
}


$contenu = $contenu."</table>\n" ;
$contenu = $contenu."</div>" ;





// on ferme la connection à la base
$conn->close();






require_once $baseREP.'/MenuFooter.php' ;


echo $contenu ;

if ($MyError <> "")
  echo "<script>alert('".$MyError."');</script>";

?>
