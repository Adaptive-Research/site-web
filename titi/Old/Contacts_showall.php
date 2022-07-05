<?php


require_once $baseREP.'/PHP/class_access.php' ;
require_once $baseREP.'/PHP/lang.php' ;

use \Page\Access ;


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
$contenu = $contenu."<table class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;

$contenu = $contenu."<thead style=\"background-color:#AAAAAA\" > <tr> <th style=\"width:5%\">Edit</th> <th style=\"width:5%\">Del.</th>  <th style=\"width:10%\">Type Contact/th>  <th style=\"width:10%\">Prénom</th>  <th style=\"width:10%\">Nom</th> <th style=\"width:10%\">Site Web</th>  <th style=\"width:10%\">Entreprise</th> <th style=\"width:10%\">Fonction</th> <th style=\"width:10%\">Téléphone</th><th>Email</th> </thead>\n";




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
$sql = "select c.*, tc.Type from Contacts as c , TypeContact as tc where c.iscurrent = 1 and tc.id = c.idTypeContact order by tc.id, c.id" ;

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
    $contenu = $contenu."<tr>\n" ;

    // le menu ci-dessous n'est visible que si on donne les droits
    if(isset($_SESSION['current_user']))
    {
      if ($objAC->IsVisibleBy('./Contacts_modify.php',$_SESSION['current_user']->group_name))
      {
        $contenu = $contenu."<td><a href=\"/Modify-Contact/".$row['id']."/\"> <img src=\"./templates/img/b_edit.png\" title=\"Modifier\" alt=\"Modifier\"></a>";
        $contenu = $contenu." " ;
      }
      else
        $contenu = $contenu."<td>" ;

      $contenu = $contenu."</td>" ;

      if ($objAC->IsVisibleBy('./Contacts_delete.php',$_SESSION['current_user']->group_name))
      {

        $contenu = $contenu."<td><a href=\"/Delete-Contact/".$row['id']."/\"> <img src=\"./templates/img/b_drop.png\" title=\"Supprimer\" alt=\"Supprimer\"></a>";
        $contenu = $contenu." " ;
      }
      else
        $contenu = $contenu."<td>" ;

      $contenu = $contenu."</td>" ;
    }

    $contenu = $contenu."<td>".$row['Type']."</td>" ;
    $contenu = $contenu."<td>".$row['Prenom']."</td>" ;
    $contenu = $contenu."<td>".$row['Nom']."</td>" ;
    $contenu = $contenu."<td>".$row['SiteWeb']."</td>" ;
    $contenu = $contenu."<td>".$row['Entreprise']."</td>" ;
    $contenu = $contenu."<td>".$row['Fonction']."</td>" ;
    $contenu = $contenu."<td>".$row['Telephone1']."</td>" ;
    $contenu = $contenu."<td>".$row['Email']."</td>" ;



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
