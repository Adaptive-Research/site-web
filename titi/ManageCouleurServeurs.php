
<?php

// Ce fichier sert à gérer l'affichage des couleurs pour les serveurs de prod et de dev


// on remplace les couleurs en fonction du serveur de dev ou de prod en changeant la classe des balises
if ($_SERVER["SERVER_ADDR"] == "192.168.1.68" or $_SERVER["SERVER_ADDR"] == "127.0.0.1")
{
  $contenu = str_replace('-fulladmin','-fulladmin-dev',$contenu) ;
}


?>