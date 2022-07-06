<?php



$servernamePROD = "" ;
$servernameDEV = "192.168.1.206" ;
$servernameDaniel = "192.168.1.68" ;






// Ce fichier sert à définir les bases de données de prod et de dev
$servername = $servernameDEV ; // serveur de base de données
$username = "dba";
$password = "dbaRohita;156";
$dbname = "SEO";




$ServeurWeb = "http://78.249.128.56:8003" ; // serveurs Web de dev

// Repertoires data de prod
$RepertoireData = "/data/SEO" ;
$RepertoirePython = "/var/www/html/PlusDeCA/titi/python" ;



// base de données de dev et repertoires data de dev
if ($_SERVER["SERVER_ADDR"] == "127.0.0.1") 
{
    $servername = $_SERVER["SERVER_ADDR"] ;
    $username = "dba";
    $password = "dbaRohita;156";
    $dbname = "SEO";

    #$ServeurWeb = "http://seo.test" ;


    $RepertoireData = "/data-dev/SEO" ;
    $RepertoirePython = "/var/www/html/SEO/titi/python" ;
}


if ($_SERVER["SERVER_ADDR"] == "192.168.1.68" )
{
    $servername = $_SERVER["SERVER_ADDR"] ;
    $username = "dba";
    $password = "dbaRohita;156";
    $dbname = "SEO";

    $ServeurWeb = "http://seo.test" ;

    $RepertoireData = "/data-dev/SEO" ;
}




$PG = $RepertoireData.'/PagesGoogle' ; 
$RG = $RepertoireData.'/RankingGoogle' ;
$SW = $RepertoireData.'/SitesWeb' ;
$PW = $RepertoireData.'/PagesWeb' ;


#echo "<script>alert('".$servername." ".$username." ".$dbname."');</script>";

?>
