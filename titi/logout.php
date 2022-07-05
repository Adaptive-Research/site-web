<?php

require_once $baseREP.'/PHP/lang.php' ;

require_once $baseREP.'/PHP/class_user.php' ;
use \User\User ;					# pour utiliser la classe User du namespace User

require_once $baseREP.'/PHP/class_userError.php' ;
use \User\UserError ;   	# pour utiliser la classe UserError du namespace User




if (session_status() == PHP_SESSION_NONE)
	session_start();


$obj = new User;
$obj->logMeOut();



header("Location: /") ;
exit() ;
?>
