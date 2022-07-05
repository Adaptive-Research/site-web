<?php

require_once $baseREP.'/PHP/class_Contact.php' ;
require_once $baseREP.'/PHP/class_access.php' ;



use \User\Contact ;
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
	if (! $objAC->IsVisibleBy('./Contacts_delete.php',$_SESSION['current_user']->group_name))
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





if ( isset($id)  ) 
{

	$objC = new Contact ;
  $objC->Delete($id) ;


}

header('Location: /show-Contacts') ;
exit() ;






?>
