<?php


require_once $baseREP.'/PHP/class_access.php' ;
require_once $baseREP.'/PHP/lang.php' ;
require_once $baseREP.'/PHP/class_Job.php' ;


use \Page\Access ;
use \WEB\Job ;



if (isset($_GET['SessionID']))
    session_id($_GET['SessionID']) ;

if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
  $objAC = new Access ;
  if (! $objAC->IsVisibleBy('./Article_Nettoyer.php',$_SESSION['current_user']->group_name))
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


$sjob = "Article_Nettoyer.php" ;
$objJ = new Job ;
$objJ->SetJob($sjob,$_SESSION['current_user']->id) ;
$objJ->Save() ;
$idJob = $objJ->GetId($sjob,$_SESSION['current_user']->id) ;


$MyError = "" ;





// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$contenu = file_get_contents($fheader) ;



include $baseREP.'/PHP/config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset('utf8');


$contenu = $contenu."<br>" ;
$contenu = $contenu."<br>" ;
$contenu = $contenu."<br>" ;

$contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
$contenu = $contenu."<table class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;


// la requête pour récupérer des articles
$sql1 = "select SiteWeb, CommandeNettoyage from RSS where CommandeNettoyage is not NULL " ;
$result1 = $conn->query($sql1);
if ($result1->num_rows > 0)
{
  // on vérifie que l'on a les droits pour accéder à la page
  // si on n'a pas les droits, on est redirigé vers la page index.php

	$i = 1 ;
  $j = 1 ;
  $SiteWeb_1 = '' ;
  while($row1 = $result1->fetch_assoc())
  {
    $SiteWeb = $row1['SiteWeb'] ;
    /*
     le SiteWeb est http://feeds.arstechnica.com
     les articles ont la forme https://arstechnica.com/?p=1468403
    */

    $pos1 = strpos( $SiteWeb, ":/" ) + 2 ;
    $pos2 = strpos( $SiteWeb, '.' , $pos1+1) ;
    $pos3 = strpos( $SiteWeb, '.' , $pos2+1) ;

    while ($pos3 !== false)
    {
      $pos1 = $pos2 ;
      $pos2 = strpos( $SiteWeb, '.' , $pos1+1) ;
      $pos3 = strpos( $SiteWeb, '.' , $pos2+1) ;
    }

    $chaine = substr( $SiteWeb, $pos1+1, strlen($SiteWeb) - $pos1 ) ;

    /*
    // test
    $contenu = $contenu."<tr>" ;
    $contenu = $contenu."<td>".$SiteWeb."</td>" ;
    $contenu = $contenu."<td>".$chaine."</td>" ;
    $contenu = $contenu."<td></td>" ;
    $contenu = $contenu."</tr>\n" ;
    */

    if (strcmp($SiteWeb,$SiteWeb_1) !== 0)
    {

      $sql2 = "select * from Articles where HasBeenCleaned is NULL and HasBeenLoaded = 1 and Article_Link like '%".$chaine."%'" ;
      $result2 = $conn->query($sql2);
      if ($result2->num_rows > 0)
      {

        while($row2 = $result2->fetch_assoc())
        {
          $contenu = $contenu."<tr>" ;

          $contenu = $contenu."<td>".$j."</td>" ;

          $contenu = $contenu."<td>".$row2['id']."</td>" ;
          $contenu = $contenu."<td>".$row2['Article_Title']."</td>" ;
          $contenu = $contenu."<td>".$row2['Fichier']."</td>" ;

          $contenu = $contenu."</tr>\n" ;
          $j = $j+1 ;
        }

        // Nettoyage des Articles
        $commande = "cd ".$basePython."; python3 ".$py_Articles.$row1['CommandeNettoyage']." ".$row1['SiteWeb']  ;
        //echo "<script>alert('".$commande."');</script>";
        shell_exec($commande) ;
      }

    }

    $SiteWeb_1 = $SiteWeb ;
  	$i = $i+1 ;
  }
}
else
  $MyError = "<h3>pas d'article à nettoyer</h3>";


$contenu = $contenu."</table>\n" ;
$contenu = $contenu."</div>" ;


// on divise le texte en phrases
$commande = "cd ".$bassePython." ; python3 ".$py_Syntaxe."FindPhrase.py"  ;
shell_exec($commande) ;


// on ferme la connection à la base
$conn->close();

$objJ->UpdateStatus($idJob, 1,"") ;


/*
// début de la modification du contenu
$RepStatic = "./static" ;
$RepTemplates = "./templates" ;

$contenu = str_replace('[STATIC]',$RepStatic,$contenu) ;
$contenu = str_replace('[TEMPLATES]',$RepTemplates,$contenu) ;
*/


require_once $baseREP.'/MenuFooter.php' ;



echo $contenu ;


if ($MyError <> "")
	echo "<script>alert('".$MyError."');</script>";


?>
