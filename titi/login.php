<?php

//echo "<script>alert('login.php');</script>";

require_once $baseREP.'/PHP/lang.php' ;

require_once $baseREP.'/PHP/class_user.php' ;
use \User\User ;					# pour utiliser la classe User du namespace User

require_once $baseREP.'/PHP/class_userError.php' ;
use \User\UserError ;   	# pour utiliser la classe UserError du namespace User

require_once $baseREP.'/PHP/class_LogUser.php' ;
use \Log\LogUser ;


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
		header("Location: ./login") ;
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

    $objU = new LogUser ;
    $objU->SetUser(session_id(),$_SESSION['current_user']->id);
    $objU->Save() ;

		if ($_SESSION['current_user']->group_name == "FullAdmin")
			header('Location: ./FullAdmin') ;
		if ($_SESSION['current_user']->group_name == "Demo")
			header('Location: ./Demo') ;

			exit() ;
	}
	catch (UserError $u)
	{
		$MyError = $u->getMessage();
	}
}




	// définition des fichiers à lire
	$fheader = $baseREP."/templates/header.html" ;
	$fichier = $baseREP."/templates/login.html" ;
	$ffooter = $baseREP."/templates/footer.html" ;

	//echo "<script>alert('".$fheader."');</script>";


	// récupération du contenu
	$contenu = file_get_contents($fheader) ;
	$contenu = $contenu.file_get_contents($fichier) ;






  require_once $baseREP.'/MenuFooter.php' ;



	echo $contenu ;


	if ($MyError <> "")
		echo "<script>alert('".$MyError."');</script>";


?>
