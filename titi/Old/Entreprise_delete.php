<?php

require_once $baseREP.'/PHP/class_access.php' ;
require_once $baseREP.'/PHP/class_Entreprise.php' ;



use \Page\Access ;
use \WEB\Entreprise ;




if (isset($_GET['SessionID']))
    session_id($_GET['SessionID']) ;

if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
	$objAC = new Access ;
	if (! $objAC->IsVisibleBy('./Entreprise_delete.php',$_SESSION['current_user']->group_name))
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
if ( isset($_GET['id'])   ) // Soit c'est la 1ère sauvegarde, soit c'est au moins une sauvegarde supplémentaire
{
	$objC = new Entreprise ;
  $objC->Delete($_GET['id']) ;
}

header('Location: ./Entreprise_showall.php') ;
exit() ;

?>
