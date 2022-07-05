<?php

require_once $baseREP.'/PHP/class_RSS.php' ;
require_once $baseREP.'/PHP/class_access.php' ;



use \WEB\RSS ;
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
	if (! $objAC->IsVisibleBy('./RSS_delete.php',$_SESSION['current_user']->group_name))
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
if ( isset($id)   ) // Soit c'est la 1ère sauvegarde, soit c'est au moins une sauvegarde supplémentaire
{
  $objR = new RSS ;
  $objR->Delete($id) ;
}

header('Location: '.$baseURL.'/show-RSS') ;
exit() ;






?>
