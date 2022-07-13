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
    $Prenom = $_POST['Prenom'] ;
    $Nom =  $_POST['Nom'] ;
    $Email = $Post['Email'] ;
    $genre = "Homme" ;


    if (empty($Prenom) or empty($Nom) or empty($Email) )
    {
        unset($_POST['Submit']) ;
    }
    else
    {

        $obj = new User;
        try
        {
            # on ajoute l'utilisateur
            $obj->addUser($genre,$Prenom,$Nom,htmlspecialchars($Email), htmlspecialchars($_POST['Password']), 0,"Français","demo",4);
            header('Location: /EmailSent') ;
            
        }
        catch (UserError $u)
        {
            $MyError = $u->getMessage();
            echo "<script>alert('".$MyError."');</script>";
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


$contenu = str_replace('[PRENOM]',$Prenom,$contenu) ;
$contenu = str_replace('[NOM]',$Nom,$contenu) ;
$contenu = str_replace('[EMAIL]',$Email,$contenu) ;




echo $contenu ;

?>