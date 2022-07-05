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


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
	$objAC = new Access ;
	if (! $objAC->IsVisibleBy('./Entreprise_modify.php',$_SESSION['current_user']->group_name))
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

// on ne vient sur cette page qu'en ayant passé le paramètre id
if  ( ! isset($_GET['id']) )
{
  header('Location: ./') ;
	exit() ;
}



$objE = new Entreprise ;


// on a cliqué sur le bouton de sauvegarde de l'article
if ( isset($_POST['Submit']) ) // Soit c'est la 1ère sauvegarde, soit c'est au moins une sauvegarde supplémentaire
{
  $NomEntreprise = htmlspecialchars($_POST['NomEntreprise'],"UTF-8") ;

  $objE->Delete($_GET['id']) ;
  $des = htmlspecialchars($_POST['Description'],"UTF-8") ;

 	$objE->SetEntreprise($NomEntreprise,htmlspecialchars($_POST['SiteWeb']),htmlspecialchars($_POST['Secteur']),
  htmlspecialchars($_POST['TypeClient']),$des) ;
 	$res = $objE->Save() ;

	if ( $res == -1)
		echo "<script>alert('Problème de sauvegarde');</script>";

  if ( $res == -3)
		echo "<script>alert('Entreprise vide');</script>";

}






// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichier = $baseREP."/templates/Entreprise_create.html" ;


// récupération du contenu
$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;







$objE ->Load($_GET['id']) ;

//$_POST['TypeClient'] = $objE->TypeClient ;

// on doit réafficher l'article sauvegardé
$contenu = str_replace('name="NomEntreprise"','name="NomEntreprise" value ="'.$objE->Entreprise.'"',$contenu) ;
$contenu = str_replace('name="SiteWeb"','name="SiteWeb" value ="'.$objE->SiteWeb.'"',$contenu) ;
$contenu = str_replace('name="Description"></textarea>','name="Description">'.$objE->Description.'</textarea>',$contenu) ;

// on met à jour la boite de sélection des types de client
$contenu = str_replace('value="'.$objE->TypeClient.'"', 'value="'.$objE->TypeClient.'" selected',$contenu) ;

// on met à jour la boite de selection des Secteurs
$objE->BuildListeSecteurs($objE->idSecteur) ;
$contenu = str_replace('[OPTIONS_SECTEURS]',$objE->ListeSecteurs,$contenu) ;
$contenu = str_replace('Entreprise_create.php','Entreprise_modify.php?SessionID='.session_id().'&id='.$_GET['id'],$contenu) ;




require_once $baseREP.'/MenuFooter.php' ;



echo $contenu ;


?>
