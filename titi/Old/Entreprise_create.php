<?php

require_once $baseREP.'/PHP/lang.php' ;


require_once $baseREP.'/PHP/class_Entreprise.php' ;
use \WEB\Entreprise ;

require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;


if (isset($_GET['SessionID']))
    session_id($_GET['SessionID']) ;

if (session_status() == PHP_SESSION_NONE)
    session_start();


//echo "<script>alert('daniel');</script>";

// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
	$objAC = new Access ;
	if (! $objAC->IsVisibleBy('./Entreprise_create.php',$_SESSION['current_user']->group_name))
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



$objE = new Entreprise ;


// on a cliqué sur le bouton de sauvegarde de l'article
if ( isset($_POST['Submit']) ) // Soit c'est la 1ère sauvegarde, soit c'est au moins une sauvegarde supplémentaire
{
  $NomEntreprise = htmlspecialchars($_POST['NomEntreprise']) ;
 	$objE->SetEntreprise($NomEntreprise,htmlspecialchars($_POST['SiteWeb']),htmlspecialchars($_POST['Secteur']),
  htmlspecialchars($_POST['TypeClient']),htmlspecialchars($_POST['Description'])) ;
 	$res = $objE->Save() ;



	if ( $res == -1)
		echo "<script>alert('Problème de sauvegarde');</script>";

  if ( $res == -2)
		echo "<script>alert('Entreprise déjà existante');</script>";

  if ( $res == -3)
		echo "<script>alert('Entreprise vide');</script>";

}












// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichier = $baseREP."/templates/Entreprise_create.html" ;


// récupération du contenu
$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;


$objE->BuildListeSecteurs(0) ;
$contenu = str_replace('[OPTIONS_SECTEURS]',$objE->ListeSecteurs,$contenu) ;



require_once $baseREP.'/MenuFooter.php' ;




echo $contenu ;


?>
