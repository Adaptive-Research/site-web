<?php

require_once $baseREP.'/PHP/lang.php' ;
require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;


require_once $baseREP.'/PHP/class_Activity.php' ;
use \Entreprise\Activity ;



function ChangeDate($d)
{
  $y = substr($d,0,4) ;
  $m = substr($d,5,2) ;
  $dd = substr($d,8,2) ;
  return $dd."  ".$m."  ".$y ;
}

$MyError = "" ;


if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
  $objAC = new Access ;
  if (! $objAC->IsVisibleBy('./Keywords_showall.php',$_SESSION['current_user']->group_name))
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


$idActivity = 0 ;
if ( isset($_POST['Submit']) )
  $idActivity = $_POST['Activity'] ;









// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichierHTML = $baseREP."/templates/SelectActivity.html" ;

$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichierHTML) ;



$contenu = $contenu."<br>" ;
$contenu = $contenu."<br>" ;
$contenu = $contenu."<br>" ;

$contenu = $contenu."<div  class=\"table-responsive\">\n" ;
$contenu = $contenu."<table id=\"TableResults\" class=\"table table-striped table-bordered\" style=\"background-color:#FFFFFF;border:solid #0000FF\" >\n" ;
$contenu = $contenu."<thead style=\"background-color:#AAAAAA\" >   <th style=\"width:5%\">Numéro</th>  <th style=\"width:25%\">Secteur d'activité</th>    <th>Mots clés</th>  </thead>\n";
$contenu = $contenu."<tbody>" ;





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
if ($idActivity > 0)
{
  $sql = "select * from Keywords k, Keywords_Activity ka, Activity a where ka.idKeywords = k.id " ;
  $sql = $sql." and a.id = ka.idActivity and k.iscurrent = 1 and ka.iscurrent = 1 and a.iscurrent = 1 and ka.idActivity = ".$idActivity." order by a.Secteur, k.Keywords" ;
}
else
{
  $sql = "select * from Keywords k, Keywords_Activity ka, Activity a where ka.idKeywords = k.id " ;
  $sql = $sql." and a.id = ka.idActivity and k.iscurrent = 1 and ka.iscurrent = 1 and a.iscurrent = 1 order by a.Secteur, k.Keywords" ;
}

$result = $conn->query($sql);
if ($result->num_rows > 0)
{
  // output data of each row
	$i = 1 ;
  $Secteur_1 = "" ;
  $BKColor = "#FFFFFF" ;
  while($row = $result->fetch_assoc())
  {
    if ($Secteur_1 != $row['Secteur'])
    {
      $Secteur_1 = $row['Secteur'] ;
      if ($BKColor == "#FFFFFF")
        $BKColor = "#FFEEFF" ;
      else
        $BKColor = "#FFFFFF" ;
    }
    $contenu = $contenu."<tr style=\"background-color:".$BKColor."\" >" ;

    $contenu = $contenu."<td>".$i."</td>" ;
    $contenu = $contenu."<td>".$row['Secteur']."</td>" ;
    $contenu = $contenu."<td>".$row['Keywords']."</td>" ;

    $contenu = $contenu."</tr>\n" ;

  	$i = $i+1 ;
  }


}
else
{
  $MyError = "<h3>pas de mots clés dans la base</h3>";
}


$contenu = $contenu."</tbody>" ;
$contenu = $contenu."</table>\n" ;
$contenu = $contenu."</div>" ;





// on ferme la connection à la base
$conn->close();







require_once $baseREP.'/MenuFooter.php' ;

// on charge la selectBox qui contient les activités
#echo "<script>alert('".$servername." ".$username." ".$dbname."');</script>";

$objA = new Activity ;
if (!$objA->LoadActivitiesWithKeywords($idActivity))
{
  $msg = $contenu."<h3>empty list Of Activities</h3>";
  echo $msg ;
  exit() ;
}
$contenu = str_replace('[OPTIONS_ACTIVITY]',$objA->ListOfActivities,$contenu) ;


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
