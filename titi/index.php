<?php

//echo "<script>alert('index2.php');</script>";

require_once $baseREP.'/PHP/class_access.php' ;



if (session_status() == PHP_SESSION_NONE)
	session_start();


if (!isset($_GET['SessionID']))
{
	session_regenerate_id() ;
	unset($_SESSION['current_user']) ;
}


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
		if ($_SESSION['current_user']->group_name == "FullAdmin")
			header('Location: ./FullAdmin') ;
		if ($_SESSION['current_user']->group_name == "Demo")
			header('Location: ./Demo') ;
				exit() ;

}
else
{
	header('Location: /login') ;
	exit() ;
}

?>
