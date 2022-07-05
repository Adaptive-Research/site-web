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
  if (! $objAC->IsVisibleBy('./Entreprise_showall.php',$_SESSION['current_user']->group_name))
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




include $baseREP.'/PHP/config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset('utf8');

$stack = array();

echo "<br><br>" ;




// pour toutes les sociétés dont le secteur n'est pas null

  $i = 1 ;
  $contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
  $contenu = $contenu."<table class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;
  $contenu = $contenu."<thead style=\"background-color:#AAAAAA\" > <tr>  <th style=\"width:3%\">Numéro</th>  <th style=\"width:12%\">Entreprise</th> <th style=\"width:12%\">Site Web</th> <th style=\"width:3%\">Client</th> <th>Description</th> </thead>\n";

  $sql = "select * from Entreprises as e where iscurrent = 1 and e.idSecteur  = 1 order by Entreprise asc " ;
  $result = $conn->query($sql);
  while($row = $result->fetch_assoc())
  {

    $contenu = $contenu."<tr>" ;

    $contenu = $contenu."<td>".$i."</td>" ;

    $contenu = $contenu."<td>".$row['Entreprise']."</td>" ;
    if (empty($row['SiteWeb']) == false)
      $contenu = $contenu."<td><a href =\"".$row['SiteWeb']."\">".$row['SiteWeb']."</a></td>" ;
    else {
      $contenu = $contenu."<td>".$row['SiteWeb']."</td>" ;
    }
    $contenu = $contenu."<td>".$row['TypeClient']."</td>" ;
    $contenu = $contenu."<td>".$row['Description']."</td>" ;

    $contenu = $contenu."</tr>\n" ;

     $i = $i+1 ;
  }

  $contenu = $contenu."</table>\n" ;
  $contenu = $contenu."</div>" ;
  $contenu = $contenu."<br><br><br><br>\n" ;




// on ferme la connection à la base
$conn->close();





require_once $baseREP.'/MenuFooter.php' ;



echo $contenu ;


if ($MyError <> "")
	echo "<script>alert('".$MyError."');</script>";


?>
