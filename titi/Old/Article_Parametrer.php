<?php


require_once $baseREP.'/PHP/class_access.php' ;
require_once $baseREP.'/PHP/lang.php' ;

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
  if (! $objAC->IsVisibleBy('./Article_showall.php',$_SESSION['current_user']->group_name))
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




$MyError = "" ;





// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$contenu = file_get_contents($fheader) ;


$contenu = $contenu."<br>" ;
$contenu = $contenu."<br>" ;
$contenu = $contenu."<br>" ;



include './PHP/config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset('utf8');

if ( ! isset($_GET['id'])   )
{
  header('Location: ./Article_ParametrerAll.php') ;
  exit() ;
}

$p1 = file_get_contents( $baseREP.'/templates/Article_Parametrer.html') ;


// la requête pour récupérer des articles
$sql = "select a.* from Articles as a where id = ".$_GET['id'] ;
$result = $conn->query($sql);

if ($result->num_rows > 0)
{
  $row = $result->fetch_assoc() ;

  $FichierArticle = $row['Fichier'] ;

  // on copie le fichier initial dans le répertoire temp du serveur web
  $ArticleHTML = str_replace('.txt','.html',$FichierArticle) ;
  $element = pathinfo($ArticleHTML);
  $element2 = pathinfo($_SERVER['SCRIPT_FILENAME']) ;
  $ArticleHTML = $element2['dirname']."/temp/".$element['basename'] ;

  if ( !  file_exists ( $ArticleHTML ) )
    copy($FichierArticle ,$ArticleHTML) ;

  $URL_ArticleHTML = "http://localhost/Brain/temp/".$element['basename'] ;
  $p1 = str_replace('[ARTICLE_INITIAL]',$URL_ArticleHTML,$p1) ;

  $ContenuArticle = file_get_contents($FichierArticle) ;
  $p1 = str_replace('[CONTENU_ARTICLE]',$ContenuArticle,$p1) ;


  $FichierNettoye = str_replace('.txt','-Nettoye.txt',$FichierArticle) ;
  $ContenuArticleNettoye = file_get_contents($FichierNettoye) ;

  $p1 = str_replace('[NETTOYE]',$ContenuArticleNettoye,$p1) ;


  $contenu = $contenu.$p1 ;
}
else
  $MyError = "<h3>pas d'article à récupérer</h3>";









// on ferme la connection à la base
$conn->close();




require_once $baseREP.'/MenuFooter.php' ;



echo $contenu ;


if ($MyError <> "")
	echo "<script>alert('".$MyError."');</script>";


?>
