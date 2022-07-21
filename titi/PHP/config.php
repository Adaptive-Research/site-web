<?php


// Ce fichier sert à définir les bases de données de prod et de dev
$servername = $_SERVER["SERVER_ADDR"] ; // serveur de base de données
$username = "dba";
$password = "dbaRohita;156";
$dbname = "SEO";
$RepertoireData = "/data-dev/SEO" ;




// base de données de dev et repertoires data de dev
if ($_SERVER["SERVER_NAME"] == "plusdeca.test") 
{
    $servername = "192.168.1.206" ;
    $ServeurWeb = "http://78.249.128.56:8003" ; // serveurs Web de dev
}



// en ip6 l'adresse de localhost est ::1 , mais si on met cette adresse pour servername, cela ne fonctionne pas, donc on doit forcer a 127.0.0.1
if ($_SERVER["SERVER_NAME"] == "localhost") 
{
    $servername = "127.0.0.1" ;
    $ServeurWeb = "http://localhost" ;
    $RepertoireData = "/data-dev/SEO" ;
}

if ($_SERVER["SERVER_NAME"] == "seo.test" )
{
    $ServeurWeb = "http://seo.test" ;
}




$PG = $RepertoireData.'/PagesGoogle' ; 
$RG = $RepertoireData.'/RankingGoogle' ;
$SW = $RepertoireData.'/SitesWeb' ;
$PW = $RepertoireData.'/PagesWeb' ;


?>
