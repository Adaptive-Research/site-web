<?php

require_once $baseREP.'/PHP/lang.php' ;
require_once $baseREP.'/PHP/class_Langues.php' ;
use \Langues\Langue ;

require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;


require_once $baseREP.'/PHP/class_Keywords.php' ;
use \SEO\Keywords ;

require_once $baseREP.'/PHP/class_Activity.php' ;
use \Entreprise\Activity ;

require_once $baseREP.'/PHP/class_KeywordsActivity.php' ;
use \SEO\Keywords_Activity ;




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

$idActivity = 0 ;

if ( isset($_POST['Submit']) )
  $idActivity = $_POST['Activity'] ;


$objKA = new Keywords_Activity ;



if ( isset($_POST['Submit']) )
{

	if (!empty(trim($_POST['Keywords']))  )
	{
    $objK = new Keywords ;

    // on peut entrer autant de Keywords que l'on veut
    $str = htmlspecialchars(trim($_POST['Keywords'])) ;
    $str = strtolower($str) ;
    $ListeKeywords = explode("\n", $str);

    for($i = 0; $i < sizeof($ListeKeywords);$i++)
    {
      //echo "<script>alert('".$ListeKeywords[$i]."');</script>";
      $objK->SetKeywords($ListeKeywords[$i]) ;
      $res = $objK->Save() ;
      $idKeywords = $objK->ID ;
      //echo "<script>alert('".$idKeywords."');</script>";


      $objKA->SetKeywordsActivity($idActivity, $idKeywords) ;
      $res2 = $objKA->Save() ;
    }
	}
	else
	{
		$MyError = "mots clés vides" ;
    echo "<script>alert('".$MyError."');</script>";
    exit() ;
	}
}





// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichier = $baseREP."/templates/Keywords_create.html" ;


// récupération du contenu
$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;

$contenu = str_replace('[SERVEUR_WEB]',$ServeurWeb,$contenu) ;


require_once $baseREP.'/MenuFooter.php' ;




// on charge la selectBox qui contient les activités
$objA = new Activity ;
if (!$objA->LoadList($idActivity))
{
  $msg = $contenu."<h3>empty list Of Activities</h3>";
  echo $msg ;
  exit() ;
}
$contenu = str_replace('[OPTIONS_ACTIVITY]',$objA->ListOfActivities,$contenu) ;


// on charge la SelectBox qui contient les mots associés à une activité
if (!$objKA->LoadListOfKeywords($idActivity,false))
{
  $msg = $contenu."<h3>empty list Of Keywords</h3>";
  echo $msg ;
  exit() ;
}
$contenu = str_replace('[OPTIONS_KEYWORDS]',$objKA->ListOfKeywordsActivity,$contenu) ;



use \Footer\Footer ;
$objF = new Footer ;
$objF->baseREP = $baseREP ;
$contenu = $contenu.$objF->getFooterForGroup($group) ;



include $baseREP.'/ManageCouleurServeurs.php';




echo $contenu ;

if (isset($MyError))
	echo "<script>alert('".$MyError."');</script>";

?>
