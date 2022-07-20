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
/*
    $username = "dba";
    $password = "dbaRohita;156";
    $dbname = "SEO";
*/
    $ServeurWeb = "http://78.249.128.56:8003" ; // serveurs Web de dev
  
 //   $RepertoireData = "/data-dev/SEO" ;

}


/*
// base de données de dev et repertoires data de dev
if ($_SERVER["SERVER_NAME"] == "localhost") 
{
    $servername = $_SERVER["SERVER_ADDR"] ;
    $username = "dba";
    $password = "dbaRohita;156";
    $dbname = "SEO";

    $ServeurWeb = "http://localhost" ;

    $RepertoireData = "/data-dev/SEO" ;
}
*/

if ($_SERVER["SERVER_ADDR"] == "192.168.1.68" )
{
/*    
    $servername = $_SERVER["SERVER_ADDR"] ;
    $username = "dba";
    $password = "dbaRohita;156";
    $dbname = "SEO";
*/
    $ServeurWeb = "http://seo.test" ;
    //$RepertoireData = "/data-dev/SEO" ;
}




$PG = $RepertoireData.'/PagesGoogle' ; 
$RG = $RepertoireData.'/RankingGoogle' ;
$SW = $RepertoireData.'/SitesWeb' ;
$PW = $RepertoireData.'/PagesWeb' ;


#echo "<script>alert('".$servername." ".$username." ".$dbname."');</script>";

?>
