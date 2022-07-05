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

echo "<br><br><br><br>" ;

$contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
$contenu = $contenu."<table class=\"table table-bordered\" style=\"background-color:#FFFFFF;border:solid #0000FF\" >\n" ;
$contenu = $contenu."<thead style=\"background-color:#AAAAAA\" > <tr>  <th style=\"width:30%\">Secteur</th> <th>Nombre d'entreprises</th> </thead>\n";


$sql = "select a.Secteur, count(*) as nombre from Entreprises e left join Activity a on  e.idSecteur = a.id  where e.iscurrent = 1 group by a.Secteur " ;

$result = $conn->query($sql);
if ($result->num_rows > 0)
{
  while($row = $result->fetch_assoc())
  {
    array_push($stack, $row['Secteur']);
    $contenu = $contenu."<tr>" ;

    if ( empty($row['Secteur']) || (trim($row['Secteur']) == "") )
      $contenu = $contenu."<td>".'<a href="#NULL"><h4><b>Pas de secteur défini</b></h4></a>'."</td>" ;
    else
      $contenu = $contenu."<td>".'<a href="#'.$row['Secteur'].'"><h4><b>'.$row['Secteur'].'</b></h4></a>'."</td>" ;

    $contenu = $contenu."<td>".$row['nombre']."</td>" ;

    $contenu = $contenu."</tr>\n" ;
  }
}

$contenu = $contenu."</table>\n" ;
$contenu = $contenu."</div>" ;






// pour toutes les sociétés dont le secteur n'est pas null
foreach ($stack as &$Secteur)
{

    $i = 1 ;

    if (!empty($Secteur))
    {
      $contenu = $contenu."<div id=\"".$Secteur."\"></div>\n" ;
      $contenu = $contenu."<h2><b>Secteur: ".$Secteur."</b></h2><br>\n" ;
    }
    else {
      $contenu = $contenu."<div id=\"NULL\"></div>\n" ;
      $contenu = $contenu."<h2><b>Pas de secteur défini</b></h2><br>\n" ;
    }

    $contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
    $contenu = $contenu."<table class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;
    $contenu = $contenu."<thead style=\"background-color:#AAAAAA\" > <tr>  <th style=\"width:3%\">Numéro</th>  <th style=\"width:12%\">Entreprise</th> <th style=\"width:12%\">Site Web</th> <th style=\"width:3%\">Client</th> <th>Description</th> </thead>\n";

    if (!empty($Secteur))
      $sql = "select e.* from Entreprises e, Activity a where e.iscurrent = 1 and e.idSecteur = a.id  and a.Secteur like '%".$Secteur."%'  order by e.Entreprise asc" ;
    else
      $sql = "select * from Entreprises where iscurrent = 1  and (idSecteur is NULL or idSecteur = 0) order by Entreprise asc " ;

    $result = $conn->query($sql);
    while($row = $result->fetch_assoc())
    {

      $contenu = $contenu."<tr>" ;

      $contenu = $contenu."<td>".$i."</td>" ;

      $contenu = $contenu."<td><a href =\"Entreprise_modify.php?id=".$row['id']."\">".$row['Entreprise']."</a></td>" ;

      if (empty($row['SiteWeb']) == false)
        $contenu = $contenu."<td><a href =\"".$row['SiteWeb']."\">".$row['SiteWeb']."</a></td>" ;
      else
        $contenu = $contenu."<td>".$row['SiteWeb']."</td>" ;

      $contenu = $contenu."<td>".$row['TypeClient']."</td>" ;
      $contenu = $contenu."<td>".$row['Description']."</td>" ;

      $contenu = $contenu."</tr>\n" ;

	     $i = $i+1 ;
    }

    $contenu = $contenu."</table>\n" ;
    $contenu = $contenu."</div>" ;
    $contenu = $contenu."<br><br><br><br>\n" ;

}





// on ferme la connection à la base
$conn->close();





require_once $baseREP.'/MenuFooter.php' ;



echo $contenu ;


if ($MyError <> "")
	echo "<script>alert('".$MyError."');</script>";


?>
