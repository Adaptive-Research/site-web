<?php

require_once $baseREP.'/PHP/class_user.php' ;
require_once $baseREP.'/PHP/PageMessage.php' ;
require_once $baseREP.'/PHP/class_access.php' ;



use \User\User ;
use \Page\Access ;




if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
	$objAC = new Access ;
	if (! $objAC->IsVisibleBy('./user_delete.php',$_SESSION['current_user']->group_name))
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
	if (isset($DEBUG))
	{
		// l'utilisateur vient de rentrer son mot de passe
		$msg = "Variables<br>" ;
		$msg = $msg."id= ".htmlspecialchars($_GET['id'])."<br>" ;
		PageMessage($msg) ;
	}


	$objU = new User ;
  $objU->Delete($_GET['id']) ;


}

header('Location: ./users_showall.php?SessionID='.session_id()) ;
exit() ;






?>
