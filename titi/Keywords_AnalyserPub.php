<?php

require_once $baseREP.'/PHP/lang.php' ;

require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;

require_once $baseREP.'/PHP/class_Activity.php' ;
use \Entreprise\Activity ;



if (isset($_GET['SessionID']))
    session_id($_GET['SessionID']) ;

if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
	$objAC = new Access ;
	if (! $objAC->IsVisibleBy('./Keywords_run.php',$_SESSION['current_user']->group_name))
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


function ChangeDate($d)
{
  $y = substr($d,0,4) ;
  $m = substr($d,5,2) ;
  $dd = substr($d,8,2) ;
  return $dd."  ".$m."  ".$y ;
}



$idActivity = 0 ;
if ( isset($_POST['Submit']) )
  $idActivity = $_POST['Activity'] ;
$objA = new Activity ;









$fheader = $baseREP."/templates/header.html" ;
$fichierHTML = $baseREP."/templates/SelectActivity.html" ;

$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichierHTML) ;

require_once $baseREP.'/MenuFooter.php' ;

// on charge la selectBox qui contient les activités
if (!$objA->LoadActivitiesWithKeywords($idActivity))
{
  $msg = $contenu."<h3>empty list Of Activities</h3>";
  echo $msg ;
  exit() ;
}
$contenu = str_replace('[OPTIONS_ACTIVITY]',$objA->ListOfActivities,$contenu) ;



include $baseREP.'/ManageCouleurServeurs.php';

echo $contenu ;
$contenu = "" ;






$contenu = $contenu."<br><br>" ;





$a = $ServeurWeb."/API/ShowAds/".$idActivity."/" ;

$FichierJSON = file_get_contents($a) ;
$arr = json_decode($FichierJSON,true) ;

$contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
$contenu = $contenu."<table id=\"TableResults\" class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;

if ($idActivity > 0)
  $contenu = $contenu."<thead style=\"background-color:#AAAAAA\" >  <th style=\"width:3%\">Numéro</th>  <th style=\"width:12%\">Keywords</th> <th style=\"width:12%\">Date Lancement</th> <th style=\"width:12%\">Nombre Annonces</th>  </thead>\n";
else
  $contenu = $contenu."<thead style=\"background-color:#AAAAAA\" >  <th style=\"width:3%\">Numéro</th>  <th style=\"width:12%\">Keywords</th> <th style=\"width:12%\">Date Lancement</th> <th style=\"width:12%\">Nombre Annonces</th>  </thead>\n";
$contenu = $contenu."<tbody>" ;


echo $contenu ;
$contenu = "" ;

$Compteur = 0 ;
$K_1 = "" ;
$BKColor = "#FFFFFF" ;
foreach($arr as $key => $value )
{
  $Compteur = $Compteur+1 ;

  $c2 = $Compteur / 500 ;
  $c3 = round($c2,0) ;
  if ($c2 == $c3)
  {
    echo $contenu ;
    $contenu = "" ;
  }



  if ($K_1 != $value['Keywords'])
  {
    $K_1 = $value['Keywords'] ;
    if ($BKColor == "#FFFFFF")
      $BKColor = "#FFEEFF" ;
    else
      $BKColor = "#FFFFFF" ;
  }

  $contenu = $contenu."<tr style=\"background-color:".$BKColor."\" >" ;

  $contenu = $contenu."<td>".$Compteur."</td>" ;

  $contenu = $contenu."<td>".$value["Keywords"]."</td>" ;
  $contenu = $contenu."<td>".ChangeDate($value["DateRun"])."</td>" ;
  $contenu = $contenu."<td>".$value["NombreAnnonces"]."</td>" ;

  $contenu = $contenu."</tr>\n" ;
}

$contenu = $contenu."</tbody>" ;
$contenu = $contenu."</table>\n" ;
$contenu = $contenu."</div>" ;













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

if (isset($MyError))
	echo "<script>alert('".$MyError."');</script>";

?>
