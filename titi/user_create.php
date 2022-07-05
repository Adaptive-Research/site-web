<?php





require_once $baseREP.'/PHP/class_Langues.php' ;
require_once $baseREP.'/PHP/lang.php' ;
use \Langues\Langue ;

require_once $baseREP.'/PHP/class_user.php' ;
use \User\User ;

require_once $baseREP.'/PHP/class_userError.php' ;
use \User\UserError ;   	# pour utiliser la classe UserError du namespace User

require_once $baseREP.'/PHP/class_groups.php' ;
use \User\Groups ;

require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;

$MyError = "" ;





if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
	$objAC = new Access ;
	if (! $objAC->IsVisibleBy('./user_create.php',$_SESSION['current_user']->group_name))
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
	$objU = new User ;


	if (!empty($_POST['Email']) )
	{
		try
		{
			$res = $objU->addUser(htmlspecialchars($_POST['Genre']),htmlspecialchars($_POST['Prenom']),htmlspecialchars($_POST['Nom']),htmlspecialchars($_POST['Email']),htmlspecialchars($_POST['Password1']), htmlspecialchars($_POST['Langue']), htmlspecialchars($_POST['group_name']), $_SESSION['current_user']->id ) ;
			if (!$res)
				$MyError = "Problème de sauvegarde de l'utilisateur" ;
			else
				$MyError = "Utilisateur sauvegardé" ;
		}
		catch(UserError $u)
		{
			$MyError = $u->getMessage();
			echo "<script>alert('".$MyError."');</script>";
			exit() ;
		}
	}
	else
	{
		$MyError = "Email vide" ;
	}
}










// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichier = $baseREP."/templates/user_create.html" ;



// récupération du contenu
$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;






$objG = new Groups ;
if (!$objG->IsListLoaded)
{
  if (isset($_POST['group_name']))
    $grp = $_POST['group_name'] ;
  else
    $grp = "" ;

	if (!$objG->LoadList($grp))
	{
    $msg = $contenu."<h3>List Of Groups empty</h3>";
    echo $msg ;
    exit() ;
	}
}
$contenu = str_replace('[OPTIONS_GROUP]',$objG->ListOfGroups,$contenu) ;



$objL = new Langue ;
if (!$objL->LoadList("Anglais"))
{
  $msg = $contenu."<h3>List Of Languages empty</h3>";
  echo $msg ;
  exit() ;
}
$contenu = str_replace('[OPTIONS_LANGUE]',$objL->ListOfLanguages,$contenu) ;



require_once $baseREP.'/MenuFooter.php' ;



use \Footer\Footer ;
$objF = new Footer ;
$objF->baseREP = $baseREP ;
$contenu = $contenu.$objF->getFooterForGroup($group) ;


include $baseREP.'/ManageCouleurServeurs.php';



echo $contenu ;

if ($MyError <> "")
	echo "<script>alert('".$MyError."');</script>";

?>
