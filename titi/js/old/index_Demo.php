<?php

require_once $baseREP.'/PHP/lang.php' ;
require_once $baseREP.'/PHP/class_access.php' ;


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
    if (! $objAC->IsVisibleBy('./index_Demo.php',$_SESSION['current_user']->group_name))
    {
        header('Location: ./logout') ;
        exit() ;
    }

}
else
{
    header('Location: ./') ;
    exit() ;
}








$fheader = $baseREP."/templates/header.html" ;
$contenu = file_get_contents($fheader) ;




require_once $baseREP.'/MenuFooter.php' ;




echo $contenu  ;



?>
