<?php
   

require_once $baseREP.'/PHP/lang.php' ;

require_once $baseREP.'/PHP/class_user.php' ;
use \User\User ;					# pour utiliser la classe User du namespace User

require_once $baseREP.'/PHP/class_userError.php' ;
use \User\UserError ;   	# pour utiliser la classe UserError du namespace User

require_once $baseREP.'/PHP/class_LogUser.php' ;
use \Log\LogUser ;


$MyError = "" ;



if (session_status() == PHP_SESSION_NONE)
    session_start();


if (isset($_POST['Submit']))
{
    if (empty($_POST['Email']))
    {
        unset($_POST['Submit']) ;
    }
    else
    {

        $obj = new User;
        try
        {
            # quand l'utilisateur se loggue, on crée une session
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
}









// définition des fichiers à lire
$fheader = $baseLP."/templates/header.html" ;
$fichier = $baseLP."/templates/Signin.html" ;
$footer = $baseLP."/templates/footer2.html" ;


// récupération du contenu
$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;
$contenu = $contenu.file_get_contents($footer) ;



echo $contenu ;

?>