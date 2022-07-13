<?php
   

require_once $baseREP.'/PHP/lang.php' ;

require_once $baseREP.'/PHP/class_user.php' ;
use \User\User ;					# pour utiliser la classe User du namespace User

require_once $baseREP.'/PHP/class_userError.php' ;
use \User\UserError ;   	# pour utiliser la classe UserError du namespace User

require_once $baseREP.'/PHP/class_LogUser.php' ;
use \Log\LogUser ;





// définition des fichiers à lire
$fheader = $baseLP."/templates/header.html" ;
$fichier = $baseLP."/templates/EmailSent.html" ;
$footer = $baseLP."/templates/footer2.html" ;





// récupération du contenu
$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;
$contenu = $contenu.file_get_contents($footer) ;





echo $contenu ;

?>