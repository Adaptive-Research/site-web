<?php


//echo "<script>alert('".$baseREP."');</script>";

require_once $baseREP.'/PHP/class_Langues.php' ;
require_once $baseREP.'/PHP/lang.php' ;
use \Langues\Langue ;

require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;

require_once $baseREP.'/PHP/class_Contact.php' ;
use \User\Contact ;

require_once $baseREP.'/PHP/class_TypeContact.php' ;
use \Contacts\TypeContact ;





if (isset($_GET['SessionID']))
    session_id($_GET['SessionID']) ;

if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
	$objAC = new Access ;
	if (! $objAC->IsVisibleBy('./Contacts_modify.php',$_SESSION['current_user']->group_name))
	{
		header('Location: /') ;
		exit() ;
	}
}
else
{
	header('Location: /') ;
	exit() ;
}



$MyError = "" ;
$objC = new Contact ;



if ( isset($_POST['Publish'])  )
{

	if (!empty($_POST['Email']) )
	{
    $objL = new Langue ;
    $VL = $objL->GetValueLangue(htmlspecialchars($_POST['Langue'])) ;

    $Email = htmlspecialchars($_POST['Email']) ;
    $Sexe = htmlspecialchars($_POST['Sexe']) ;
    $Prenom = htmlspecialchars($_POST['Prenom']) ;
    $Nom = htmlspecialchars($_POST['Nom']) ;
    $SW = htmlspecialchars($_POST['SiteWeb']) ;
    $Ent = htmlspecialchars($_POST['Entreprise']) ;
    $IDTC = htmlspecialchars($_POST['TypeContact']) ;
    $Fonc = htmlspecialchars($_POST['Fonction']) ;
    $Tel1 = htmlspecialchars($_POST['Telephone1']) ;
    $Tel2 = htmlspecialchars($_POST['Telephone2']) ;
    $LI = htmlspecialchars($_POST['LinkedIn']) ;
    $Fa = htmlspecialchars($_POST['Facebook']) ;
    $In = htmlspecialchars($_POST['Instagram']) ;
    $Vi = htmlspecialchars($_POST['Viadeo']) ;



    $objC->ValueLangue = $ValueLangue ;
		$objC->SetContact($Sexe,$Prenom,$Nom,$VL,$SW,$Ent,$IDTC,$Fonc,$Tel1,$Tel2,$Email,$LI,$Fa,$In,$Vi,$_SESSION['current_user']->id) ;

    $res = $objC->Modify() ;
		if ($res == -1)
    {
			$MyError = "Problème de sauvegarde du Contact" ;
      echo "<script>alert('".$MyError."');</script>";
    }
	}
	else
	{
		$MyError = "[Email vide]" ;
    echo "<script>alert('".$MyError."');</script>";
	}
}















// C'est le cas où modify est appelé à partir d'un lien HTML
if (isset($id))
{
	$objC->Load($id) ;

	$_POST['Publish'] = "Modify" ;

	$_POST['Sexe'] = $objC->Sexe;
	$_POST['Prenom'] = $objC->Prenom ;
	$_POST['Nom'] = $objC->Nom ;
  $_POST['Entreprise'] = $objC->Entreprise ;
  $_POST['Fonction'] = $objC->Fonction ;
  $_POST['Telephone1']	= $objC->Telephone1 ;
  $_POST['Telephone2'] = $objC->Telephone2 ;
  $_POST['Email'] = $objC->Email ;
  $_POST['LinkedIn'] = $objC->LinkedIn ;
  $_POST['Facebook'] = $objC->Facebook ;
  $_POST['Instagram'] = $objC->Instagram ;
  $_POST['Viadeo'] = $objC->Viadeo ;
}











$fheader = $baseREP."/templates/header.html" ;
$fichier = $baseREP."/templates/Contact_modify.html" ;

$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;








$objL = new Langue ;
$sLangue = $objL->GetLangueFromValueLangue($objC->ValueLangue) ;

if (!$objL->LoadList($sLangue))
{
  $msg = "<h3>List Of Languages empty</h3>";
  echo "<script>alert('".$msg."');</script>";
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


// si on a publié pour la 1ère fois un article ou si on a republié un article alors il faut modifier le contenu de la forme pour
// pouvoir modifier le contenu déjà envoyé
if ( isset($_POST['Publish']) )
{
	// on doit réafficher les informations sauvegardées
	if ($_POST['Sexe'] == "Femme")
		$contenu = str_replace('value="Femme"','value="Femme" selected="selected"',$contenu) ;

	$contenu = str_replace('name="Prenom"','name="Prenom" value ="'.htmlspecialchars($_POST['Prenom']).'"',$contenu) ;
	$contenu = str_replace('name="Nom"','name="Nom" value ="'.htmlspecialchars($_POST['Nom']).'"',$contenu) ;
  $contenu = str_replace('name="Entreprise"','name="Entreprise" value ="'.htmlspecialchars($_POST['Entreprise']).'"',$contenu) ;
  $contenu = str_replace('name="Fonction"','name="Fonction" value ="'.htmlspecialchars($_POST['Fonction']).'"',$contenu) ;
  $contenu = str_replace('name="Telephone1"','name="Telephone1" value ="'.htmlspecialchars($_POST['Telephone1']).'"',$contenu) ;
  $contenu = str_replace('name="Telephone2"','name="Telephone2" value ="'.htmlspecialchars($_POST['Telephone2']).'"',$contenu) ;
  $contenu = str_replace('name="Email"','name="Email" value ="'.htmlspecialchars($_POST['Email']).'"',$contenu) ;


  $contenu = str_replace('name="LinkedIn"','name="LinkedIn" value ="'.$_POST['LinkedIn'].'"',$contenu) ;
  $contenu = str_replace('name="Facebook"','name="Facebook" value ="'.$_POST['Facebook'].'"',$contenu) ;
  $contenu = str_replace('name="Instagram"','name="Instagram" value ="'.$_POST['Instagram'].'"',$contenu) ;
  $contenu = str_replace('name="Viadeo"','name="Viadeo" value ="'.$_POST['Viadeo'].'"',$contenu) ;
}




require_once $baseREP.'/MenuFooter.php' ;

// C'est obligatoire car l'adresse est /Modify-Contact/3/ et pas /Modify-Contact
$contenu = str_replace('./css', "../../css" ,$contenu) ;




echo $contenu ;



?>
