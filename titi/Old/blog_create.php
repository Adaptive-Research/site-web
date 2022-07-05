<?php

require_once $baseREP.'/PHP/class_RSS.php' ;
require_once $baseREP.'/PHP/class_access.php' ;
require_once $baseREP.'/PHP/lang.php' ;


use \WEB\RSS ;
use \Page\Access ;


if (isset($_GET['SessionID']))
    session_id($_GET['SessionID']) ;

if (session_status() == PHP_SESSION_NONE)
    session_start();


//echo "<script>alert('daniel');</script>";

// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
	$objAC = new Access ;
	if (! $objAC->IsVisibleBy('./RSS_create.php',$_SESSION['current_user']->group_name))
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
if ( isset($_POST['Submit']) ) // Soit c'est la 1ère sauvegarde, soit c'est au moins une sauvegarde supplémentaire
{
	$objR = new RSS ;

  $url = htmlspecialchars($_POST['URL']) ;
 	$objR->SetBLOG($url,$_SESSION['current_user']->id ) ;
 	$res = $objR->Save() ;

	if ( $res == 1)
		echo "<script>alert('Blog enregistré');</script>";

	if ( $res == -1)
		echo "<script>alert('Problème de sauvegarde');</script>";

  if ( $res == -2)
		echo "<script>alert('Blog déjà existant');</script>";

  if ( $res == -3)
		echo "<script>alert('Blog vide');</script>";

}










// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichier = $baseREP."/templates/blog_create.html" ;


// récupération du contenu
$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;





require_once $baseREP.'/MenuFooter.php' ;




echo $contenu ;


?>
