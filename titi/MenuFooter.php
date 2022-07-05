<?php

require_once $baseREP.'/PHP/class_menu.php' ;
require_once $baseREP.'/PHP/class_menuError.php' ;
require_once $baseREP.'/PHP/class_footer.php' ;


use \Menu\Menu ;                    # pour utiliser la classe Menu du namespace Menu
use \Menu\MenuError ;       # pour utiliser la classe MenuError du namespace Menu



// pour les CSS
//$contenu = str_replace('[TINYREP]', "." ,$contenu) ;


// on remplace [MENU] par le le menu obtenu de l'objet menu
$objM = new Menu ;
$objM->baseREP = $baseREP ;
$group = "Guest" ;


if(isset($_SESSION['current_user']))
{
  if(isset($_SESSION['current_user']->group_name))
    $group = $_SESSION['current_user']->group_name ;
  $language = $_SESSION['current_user']->ValueLangue ;
}


// on remplace l'adresse du bouton go par une adresse valide
$smenu = $objM->getMenuForGroup($group,$language) ;
$contenu = str_replace('[MENU]', $smenu ,$contenu) ;










?>
