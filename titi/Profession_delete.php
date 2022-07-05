<?php



require_once $baseREP.'/PHP/class_Profession.php' ;
use \Entreprise\Profession ;

require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;




if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
	$objAC = new Access ;
	if (! $objAC->IsVisibleBy('./Activity_delete.php',$_SESSION['current_user']->group_name))
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





// on a cliqué sur le bouton de sauvegarde de l'article
if ( isset($id)   ) // Soit c'est la 1ère sauvegarde, soit c'est au moins une sauvegarde supplémentaire
{
  $objR = new Profession ;
  $objR->Delete($id) ;
}

header('Location: '.$baseURL.'/show-Profession') ;
exit() ;






?>
