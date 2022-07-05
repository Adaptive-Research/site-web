<?php


require_once $baseREP.'/PHP/lang.php' ;
require_once $baseREP.'/PHP/class_access.php' ;


use \Page\Access ;


if (session_status() == PHP_SESSION_NONE)
    session_start();





// définition des variables



$RepStatic = "./static" ;
$RepTemplates = "./templates" ;


// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$contenu = file_get_contents($fheader) ;


// début de la modification du contenu.php?SessionID=
$contenu = str_replace('[STATIC]',$RepStatic,$contenu) ;
$contenu = str_replace('[TEMPLATES]',$RepTemplates,$contenu) ;

/*
$chaine = print_r($_SESSION, true);
$contenu = $contenu."<br><br><br><br><br>SESSION<br>".$chaine."<br>" ;
*/






require_once $baseREP.'/MenuFooter.php' ;

use \Footer\Footer ;
$objF = new Footer ;
$objF->baseREP = $baseREP ;
$contenu = $contenu.$objF->getFooterForGroup($group) ;



include $baseREP.'/ManageCouleurServeurs.php';





echo $contenu  ;



?>
