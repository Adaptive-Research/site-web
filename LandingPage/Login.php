<?php

//echo "<script>alert('login.php');</script>";

require_once $baseREP.'/PHP/lang.php' ;

require_once $baseREP.'/PHP/class_user.php' ;
use \User\User ;					# pour utiliser la classe User du namespace User

require_once $baseREP.'/PHP/class_userError.php' ;
use \User\UserError ;   	# pour utiliser la classe UserError du namespace User


//echo "<script>alert('".$baseREP."');</script>";

$MyError = "" ;



if (session_status() == PHP_SESSION_NONE)
	session_start();




if (isset($_POST['Submit']))
{
	// on ne commence une session que s'il y a une adresse mail
	if (empty($_POST['Email']))
	{
		unset($_POST['Submit']) ;
		header("Location: /LOGIN") ;
	}

	$obj = new User;
	try
	{
		// Il y a le cas, où l'utilisateur s'est déjà loggué avec un compte, il revient en arrière et se loggue avec un compte
		// on doit délogguer l'ancienne session et relancer une session
		if(isset($_SESSION['current_user']))
		{
				$obj->logMeOut();
				// Comme la session est détruite par $obj->logMeOut() , il faut en relancer une
				if (session_status() == PHP_SESSION_NONE)
					session_start();
		}

		$obj->login(htmlspecialchars($_POST['Email']), htmlspecialchars($_POST['Password']), 1);

		if ($_SESSION['current_user']->group_name == "FullAdmin")
			header('Location: /FullAdmin') ;
		if ($_SESSION['current_user']->group_name == "Demo")
			header('Location: /Demo') ;

			exit() ;
	}
	catch (UserError $u)
	{
		$MyError = $u->getMessage();
	}
}




if (isset($_POST['Submit2']))
{
	// on ne commence une session que s'il y a une adresse mail
	if (empty($_POST['Email']))
	{
		unset($_POST['Submit2']) ;
		header("Location: /LOGIN") ;
	}

	$genre = "?" ;
	$prenom =  htmlspecialchars($_POST['Prenom']) ;
	$nom =  htmlspecialchars($_POST['Nom']) ;
	$email =  htmlspecialchars($_POST['Email']) ;
	$l = "Français" ;
	$gn = "Demo" ;
	$pass = htmlspecialchars($_POST['Password1']) ;
	$pass2 = password_hash($pass, PASSWORD_BCRYPT, array('cost' => 10));
	$a = 4 ; # c'est l'id du site web


	$obj = new User;
	try
	{
		// Il y a le cas, où l'utilisateur s'est déjà loggué avec un compte, il revient en arrière et se loggue avec un compte
		// on doit délogguer l'ancienne session et relancer une session
		if(isset($_SESSION['current_user']))
		{
				$obj->logMeOut();
				// Comme la session est détruite par $obj->logMeOut() , il faut en relancer une
				if (session_status() == PHP_SESSION_NONE)
					session_start();
		}
		#echo "<script>alert('addUser');</script>";
		$obj->addUser($genre,$prenom,$nom, $email , $pass2, $l, $gn, $a) ;
		header("Location: /EmailSent") ;
		exit() ;
	}
	catch (UserError $u)
	{
		header("Location: /LOGIN") ;
		exit() ;
	
	}
}









    
// définition des fichiers à lire
$fichier = $baseLP."/templates/Login.html" ;


// récupération du contenu
$contenu = "" ;

$contenu = $contenu.$_POST['Submit'] ;
$contenu = $contenu.file_get_contents($fichier) ;


// script pour effacer les cookies de session PHP 
$contenu = $contenu.'
<script>
     document.cookie = "PHPSESSID=;Path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
</script>
' ;


echo $contenu ;

?>