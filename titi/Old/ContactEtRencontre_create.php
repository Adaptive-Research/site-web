<?php

require_once $baseREP.'/PHP/lang.php' ;
require_once $baseREP.'/PHP/class_Langues.php' ;
use \Langues\Langue ;

require_once $baseREP.'/PHP/class_Contact.php' ;
use \User\Contact ;

require_once $baseREP.'/PHP/class_Rencontre.php' ;
use \User\Rencontre ;

require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;

require_once $baseREP.'/PHP/class_TypeContact.php' ;
use \Contacts\TypeContact ;


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
	if (! $objAC->IsVisibleBy('./Contacts_create.php',$_SESSION['current_user']->group_name))
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





// on a cliqué sur le bouton de sauvegarde du user
if ( isset($_POST['Submit']) ) // Soit c'est la 1ère sauvegarde, soit c'est au moins une sauvegarde supplémentaire
{

	if (!empty($_POST['Nom']) || !empty($_POST['Prenom']) || !empty($_POST['Email']) )
	{
    $objL = new Langue ;
    $ValueLangue = $objL->GetValueLangue(htmlspecialchars($_POST['Langue'])) ;

    //echo "<script>alert('Langue = ".$_POST['Langue']." et ValueLangue = ".$ValueLangue." ');</script>";


    $objC = new Contact ;
		$objC->SetContact(htmlspecialchars($_POST['Sexe']),htmlspecialchars($_POST['Prenom']),htmlspecialchars($_POST['Nom']),
    $ValueLangue,htmlspecialchars($_POST['SiteWeb']),htmlspecialchars($_POST['Entreprise']),$_POST['TypeContact'],htmlspecialchars($_POST['Fonction']),
    htmlspecialchars($_POST['Telephone1']),htmlspecialchars($_POST['Telephone2']),htmlspecialchars($_POST['Email']),
    htmlspecialchars($_POST['LinkedIn']),htmlspecialchars($_POST['Facebook']),htmlspecialchars($_POST['Instagram']),
    htmlspecialchars($_POST['Viadeo']), $_SESSION['current_user']->id) ;

    $res = $objC->Save() ;
    // Save
    // renvoie 0 quand la sauvegarde a réussi
    // renvoie une valeur > 0 (l'id du contact) quand le contact existait déjà
    // renvoie -1 quand la sauvegarde a échoué
		if ($res == -1)
			$MyError = "Problème de sauvegarde du Contact" ;
    else
    {
      if ($res > 0)
        $objC->ID = $res ;

      $objR = new Rencontre ;
      $objR->SetRencontre($objC->ID,htmlspecialchars($_POST['TypeEvent']),htmlspecialchars($_POST['Commentaire']),$_SESSION['current_user']->id ) ;
      $res = $objR->Save() ;

      if ($res == -1)
        $MyError = "Problème de sauvegarde de la rencontre" ;

      if ($res == 0)
        $MyError = "Rencontre déjà existante" ;
    }


	}
	else
	{
		$MyError = "Email vide" ;
    echo "<script>alert('".$MyError."');</script>";
    exit() ;
	}
}











// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichier = $baseREP."/templates/ContactEtRencontre_create.html" ;

$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;


$objL = new Langue ;
if (!$objL->LoadList("Français"))
{
  $msg = $contenu."<h3>List Of Languages empty</h3>";
  echo $msg ;
  exit() ;
}
$contenu = str_replace('[OPTIONS_LANGUE]',$objL->ListOfLanguages,$contenu) ;


$objTC = new TypeContact ;
if (!$objTC->LoadList("Prospect"))
{
  $msg = $contenu."<h3>List Of TypeContact empty</h3>";
  echo $msg ;
  exit() ;
}
$contenu = str_replace('[OPTIONS_TYPECONTACT]',$objTC->ListOfTypes,$contenu) ;





require_once $baseREP.'/MenuFooter.php' ;









echo $contenu ;

if ($MyError <> "")
	echo "<script>alert('".$MyError."');</script>";

?>
