<?php

require_once $baseREP.'/PHP/lang.php' ;
require_once $baseREP.'/PHP/class_Langues.php' ;
use \Langues\Langue ;

require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;

require_once $baseREP.'/PHP/class_Keywords.php' ;
use \SEO\Keywords ;

require_once $baseREP.'/PHP/class_KeywordsActivity.php' ;
use \SEO\Keywords_Activity ;

require_once $baseREP.'/PHP/class_Activity.php' ;
use \Entreprise\Activity ;

require_once $baseREP.'/PHP/class_KeywordsRun.php' ;
use \SEO\Keywords_Run ;


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


$objK = new Keywords ;

if ( isset($_POST['Submit']) )
{


  $objKR = new Keywords_Run ;

  foreach ($_POST['Keywords'] as $SelectedOption)
  {
    $objKR->SetRun('google',$SelectedOption) ;
    $res = $objKR->Save() ;
    $idRun = $objKR->ID ;


    // python GetGoogleResultsFromKeywords.py  "agence webmarketing 23
    $objK->load($SelectedOption) ;
    $MotCle = $objK->Keywords ;
    $nc1 = $py_Keywords.'GetGoogleResultsFromKeywords.py "'.$MotCle.'" '.$idRun ;
    $commande = "cd ".$basePython." ; python3 ".$nc1 ;
    shell_exec($commande) ;
  }

  // Ajout du Domaine à tous les nouveaux résultats de Ranking
  $nc1 = $py_Keywords."AddDomaine.py" ;
  $commande = "cd ".$basePython." ; python3 ".$nc1 ;
  shell_exec($commande) ;

}


// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichier = $baseREP."/templates/Keywords_run.html" ;


// récupération du contenu
$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;


$objK->LoadListOfKeywordsWithNoRun() ;
$contenu = str_replace('[OPTIONS_KEYWORDS]',$objK->ListOfKeywords,$contenu) ;







require_once $baseREP.'/MenuFooter.php' ;





use \Footer\Footer ;
$objF = new Footer ;
$objF->baseREP = $baseREP ;
$contenu = $contenu.$objF->getFooterForGroup($group) ;





include $baseREP.'/ManageCouleurServeurs.php';



echo $contenu ;

if (isset($MyError))
	echo "<script>alert('".$MyError."');</script>";

?>
