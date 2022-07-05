<?php


require_once $baseREP.'/PHP/lang.php' ;


require_once $baseREP.'/PHP/class_Article.php' ;
use \WEB\Article;

require_once $baseREP.'/PHP/class_Job.php' ;
use \WEB\Job ;

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
  if (! $objAC->IsVisibleBy('./Article_CollectData.php',$_SESSION['current_user']->group_name))
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


$sjob = "Article_CollectData.php" ;
$objJ = new Job ;
$objJ->SetJob($sjob,$_SESSION['current_user']->id) ;
$objJ->Save() ;
$idJob = $objJ->GetId($sjob,$_SESSION['current_user']->id) ;


$MyError = "" ;


// définition des variables

$objA = new Article ;



// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$contenu = file_get_contents($fheader) ;


$contenu = $contenu."<br>" ;
$contenu = $contenu."<br>" ;
$contenu = $contenu."<br>" ;


$contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
$contenu = $contenu."<table class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;

$contenu = $contenu."<thead style=\"background-color:#AAAAAA\" > <tr>  <th>Article</th> <th>Fichier</th> </thead>\n";


include $baseREP.'/PHP/config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset('utf8');



// la requête pour récupérer des articles
$sql = "select r.Repertoire,a.* from Articles as a, RSS as r where a.iscurrent = 1 and (a.HasBeenLoaded is NULL or a.HasBeenLoaded = 0) and r.id = a.idRSS order by a.id ASC " ;
$result = $conn->query($sql);
if ($result->num_rows > 0)
{
  // on vérifie que l'on a les droits pour accéder à la page
  // si on n'a pas les droits, on est redirigé vers la page index.php

  // output data of each row
	$i = 1 ;
  while( ($row = $result->fetch_assoc()) && ($i < 51) )
  {
    $contenu = $contenu."<tr>" ;

    $url = $row['Article_Link'] ;
    $id = $row['id'] ;

    $contenu = $contenu."<td>".$url."</td>" ;

    // récupération de la page HTML ou du fichier XML
    $NomFichier = $home.$row['Repertoire'] ;
    if (substr($NomFichier, -1) != "/")
      $NomFichier = $NomFichier."/" ;
    $NomFichier = $NomFichier."Article-".$id.".txt" ;

    // récupération de la page
    $page = file_get_contents($url) ;

    $monfichier = fopen($NomFichier, 'w+');
    fputs($monfichier, $page); // On écrit le nouveau nombre de pages vues
    fclose($monfichier);

    chmod($NomFichier,0777) ;


    // mise à jour de la table Articles
    $objA->UpdateFile($id,$NomFichier) ;

    $contenu = $contenu."<td>".$NomFichier."</td>" ;
    $contenu = $contenu."</tr>\n" ;

  	$i = $i+1 ;
  }


}
else
  $MyError = "<h3>plus d'articles dans la base</h3>";


$contenu = $contenu."</table>\n" ;
$contenu = $contenu."</div>" ;




// on ferme la connection à la base
$conn->close();

$objJ->UpdateStatus($idJob, 1,"") ;



// début de la modification du contenu
$RepStatic = "./static" ;
$RepTemplates = "./templates" ;

$contenu = str_replace('[STATIC]',$RepStatic,$contenu) ;
$contenu = str_replace('[TEMPLATES]',$RepTemplates,$contenu) ;



require_once $baseREP.'/MenuFooter.php' ;



echo $contenu ;


if ($MyError <> "")
	echo "<script>alert('".$MyError."');</script>";


?>
