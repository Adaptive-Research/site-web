<?php

require_once $baseREP.'/PHP/class_user.php' ;
require_once $baseREP.'/PHP/PageMessage.php' ;
require_once $baseREP.'/PHP/class_access.php' ;
require_once $baseREP.'/PHP/lang.php' ;
require_once $baseREP.'/PHP/class_groups.php' ;
require_once $baseREP.'/PHP/class_company.php' ;
require_once $baseREP.'/PHP/class_Langues.php' ;



use \Langues\Langue ;
use \Company\Company ;
use \User\Groups ;


use \User\User ;
use \Page\Access ;


$MyError = "" ;




if (isset($_GET['SessionID']))
    session_id($_GET['SessionID']) ;

if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
	$objAC = new Access ;
	if (! $objAC->IsVisibleBy('./user_modify.php',$_SESSION['current_user']->group_name))
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





// on a cliqué sur le bouton de sauvegarde de l'article
if ( isset($_POST['Publish'])  ) // Soit c'est la 1ère sauvegarde, soit c'est au moins une sauvegarde supplémentaire
{

	if (!empty($_POST['Email']) )
	{
		$objU = new User ;
		$objU->DeleteFromMail(htmlspecialchars($_POST['Email'])) ;
		$res = $objU->addUser(htmlspecialchars($_POST['Genre']),htmlspecialchars($_POST['Prenom']),htmlspecialchars($_POST['Nom']),htmlspecialchars($_POST['Email']),htmlspecialchars($_POST['Password1']),htmlspecialchars($_POST['Telephone']),htmlspecialchars($_POST['NomCompany']),htmlspecialchars($_POST['Langue']),htmlspecialchars($_POST['group_name']),$_SESSION['current_user']->id ) ;
		if (!$res)
			$MyError = "[Problème de sauvegarde de l'utilisateur]" ;
		else
			$MyError = "[Utilisateur sauvegardé]" ;
	}
	else
	{
		$MyError = "[Email vide]" ;
	}
}















// C'est le cas où modify est appelé à partir d'un lien HTML
if (isset($_GET['id']))
{
	unset($_SESSION['user']) ;

	$objU = new User;
	$objU->Load($_GET['id']) ;


	$_POST['Publish'] = "Modify" ;

	$_POST['Genre'] = $objU->Genre ;
	$_POST['Prenom'] = $objU->Prenom ;
	$_POST['Nom'] = $objU->Nom ;
	$_POST['Email'] = $objU->Email ;
	$_POST['Password1'] = "" ;
	$_POST['Password2'] = "" ;
	$_POST['Telephone'] = $objU->Telephone ;
	$_POST['Langue'] = $objU->Langue ;
	$_POST['NomCompany'] = $objU->NomCompany ;
	$_POST['group_name'] = $objU->group_name ;


	unset($_GET['id']) ;
}












// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichier = $baseREP."/templates/user_modify.html" ;


// récupération du contenu
$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;







require_once $baseREP.'/MenuFooter.php' ;




$objG = new Groups ;
if (!$objG->IsListLoaded)
{
	if (!$objG->LoadList($_POST['group_name']))
	{
    $msg = $contenu."<h3>List Of Groups empty</h3>";
    echo "<script>alert('".$msg."');</script>";
    exit() ;
	}
}
$contenu = str_replace('[OPTIONS_GROUP]',$objG->ListOfGroups,$contenu) ;



$objC = new Company ;
if (!$objC->IsListLoaded)
{
	if (!$objC->LoadList($_POST['NomCompany']))
	{
    $msg = $contenu."<h3>List Of Company empty</h3>";
    echo "<script>alert('".$msg."');</script>";
    exit() ;
	}
}
$contenu = str_replace('[OPTIONS_COMPANY]',$objC->ListOfCompany,$contenu) ;


$objL = new Langue ;
if (!$objL->LoadList($_POST['Langue']))
{
  $msg = $contenu."<h3>List Of Languages empty</h3>";
  echo "<script>alert('".$msg."');</script>";
  exit() ;
}
$contenu = str_replace('[OPTIONS_LANGUE]',$objL->ListOfLanguages,$contenu) ;




// si on a publié pour la 1ère fois un article ou si on a republié un article alors il faut modifier le contenu de la forme pour
// pouvoir modifier le contenu déjà envoyé
if ( isset($_POST['Publish']) )
{
	// on doit réafficher les informations sauvegardées
	if ($_POST['Genre'] == "Femme")
		$contenu = str_replace('value="Femme"','value="Femme" selected="selected"',$contenu) ;

	$contenu = str_replace('name="Prenom"','name="Prenom" value ="'.htmlspecialchars($_POST['Prenom']).'"',$contenu) ;
	$contenu = str_replace('name="Nom"','name="Nom" value ="'.htmlspecialchars($_POST['Nom']).'"',$contenu) ;
	$contenu = str_replace('name="Email"','name="Email" value ="'.htmlspecialchars($_POST['Email']).'"',$contenu) ;
	$contenu = str_replace('name="Password1"','name="Password1" value ="'.htmlspecialchars($_POST['Password1']).'"',$contenu) ;
	$contenu = str_replace('name="Password2"','name="Password2" value ="'.htmlspecialchars($_POST['Password2']).'"',$contenu) ;
	$contenu = str_replace('name="Telephone"','name="Telephone" value="'.htmlspecialchars($_POST['Telephone']).'"',$contenu) ;
}




echo $contenu ;

if ($MyError <> "")
	echo "<script>alert('".$MyError."');</script>";


?>
