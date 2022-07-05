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
  if (! $objAC->IsVisibleBy('./RSS_showall.php',$_SESSION['current_user']->group_name))
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

$contenu = $contenu."<thead style=\"background-color:#AAAAAA\" > <tr>  <th style=\"width:5%\">Numéro</th> <th style=\"width:4%\">id</th> <th style=\"width:5%\">Effacer</th> <th>URL du blog</th> <th style=\"width:10%\">Dernière Récup.</th> <th>Titre du Flux RSS</th> </thead>\n";


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
$sql = "select * from RSS where iscurrent = 1 and TypeURL = 'blog' order by id desc " ;

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

    // le menu ci-dessous n'est visible que si on donne les droits
    if(isset($_SESSION['current_user']))
    {

      if ($objAC->IsVisibleBy('./RSS_delete.php',$_SESSION['current_user']->group_name))
        $contenu = $contenu."<td><a href=\"./delete-Blog/".$row['id']."/\"> <img src=\"./templates/img/b_drop.png\" title=\"Supprimer\" alt=\"Supprimer\"></a>";
      else
      	 $contenu = $contenu."<td>" ;

      $contenu = $contenu."</td>" ;
    }

    $contenu = $contenu."<td>".$row['Channel_URL']."</td>" ;
    $contenu = $contenu."<td>".$row['LastRecuperation']."</td>" ;

    $contenu = $contenu."<td>".$row['Channel_Title']."</td>" ;


    $contenu = $contenu."</tr>\n" ;



  	$i = $i+1 ;
  }


}
else
  $MyError = "<h3>pas de Flux RSS dans la base</h3>";


$contenu = $contenu."</table>\n" ;
$contenu = $contenu."</div>" ;




// on ferme la connection à la base
$conn->close();





require_once $baseREP.'/MenuFooter.php' ;



echo $contenu ;


if ($MyError <> "")
	echo "<script>alert('".$MyError."');</script>";


?>
