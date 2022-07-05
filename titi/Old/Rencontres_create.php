<?php

require_once $baseREP.'/PHP/class_Contact.php' ;
require_once $baseREP.'/PHP/class_Rencontre.php' ;
require_once $baseREP.'/PHP/class_access.php' ;
require_once $baseREP.'/PHP/class_Langues.php' ;
require_once $baseREP.'/PHP/lang.php' ;


use \Langues\Langue ;
use \User\Contact ;
use \User\Rencontre ;
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


$objC = new Contact ;



// on a cliqué sur le bouton de sauvegarde du user
if ( isset($_POST['Submit']) ) // Soit c'est la 1ère sauvegarde, soit c'est au moins une sauvegarde supplémentaire
{


    $objR = new Rencontre ;
    $objR->SetRencontre(htmlspecialchars($_POST['Interlocuteur']),htmlspecialchars($_POST['TypeEvent']),htmlspecialchars($_POST['Commentaire']),$_SESSION['current_user']->id ) ;
    $res = $objR->Save() ;

    if ($res == -1)
			$MyError = "Problème de sauvegarde de la rencontre" ;

    if ($res == 0)
      $MyError = "Rencontre déjà existante" ;

}










// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichier = $baseREP."/templates/Rencontre_create.html" ;


// récupération du contenu
$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;


$objC->BuildListOfInterlocuteurs() ;
$contenu = str_replace('[OPTIONS_INTERLOCUTEURS]',$objC->ListOfInterlocuteurs,$contenu) ;



require_once $baseREP.'/MenuFooter.php' ;




echo $contenu ;

if ($MyError <> "")
	echo "<script>alert('".$MyError."');</script>";

?>
