<?php

require_once $baseREP.'/PHP/lang.php' ;
require_once $baseREP.'/PHP/class_Langues.php' ;
use \Langues\Langue ;

require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;


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
	if (! $objAC->IsVisibleBy('./Keywords_Activity_create.php',$_SESSION['current_user']->group_name))
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




$objK = new Keywords_Activity ;
if ( isset($_POST['Submit']) )
{
    $idActivity = $_POST['Activity'] ;

    $objK->DeleteActivity($idActivity) ;
    // on peut entrer autant de Keywords que l'on veut
    foreach ($_POST['Keywords'] as $SelectedOption)
    {
      $objK->SetKeywordsActivity($_POST['Activity'], $SelectedOption) ;
      $res = $objK->Save() ;
    }
}





// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichier = $baseREP."/templates/Keywords_Activity_create.html" ;


// récupération du contenu
$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;
$contenu = str_replace('[SERVEUR_WEB]',$ServeurWeb,$contenu) ;




$objA = new Activity ;
if (!$objA->LoadList($idActivity))
{
  $msg = $contenu."<h3>empty list Of Activities</h3>";
  echo $msg ;
  exit() ;
}
$contenu = str_replace('[OPTIONS_ACTIVITY]',$objA->ListOfActivities,$contenu) ;






if (!$objK->LoadListOfKeywords($idActivity))
{
  $msg = $contenu."<h3>empty list Of Keywords</h3>";
  echo $msg ;
  exit() ;
}
$contenu = str_replace('[OPTIONS_KEYWORDS]',$objK->ListOfKeywordsActivity,$contenu) ;





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
