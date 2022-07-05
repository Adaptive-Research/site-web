<?php

require_once $baseREP.'/PHP/lang.php' ;

require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;


if (isset($_GET['SessionID']))
    session_id($_GET['SessionID']) ;

if (session_status() == PHP_SESSION_NONE)
    session_start();



if ( isset($_SESSION['current_user']) )
{
	$objAC = new Access ;
	if (! $objAC->IsVisibleBy('./ArticlesFromDatabase_showall.php',$_SESSION['current_user']->group_name))
	{
		header('Location: /') ;
		exit() ;
	}
}
else
{
	header('Location: /') ;
	exit() ;
}

//


$fheader = $baseREP."/templates/header.html" ;
$fichier = $baseREP."/templates/ArticlesFromDatabase_showall.html" ;
$fichierCode = $baseREP."/templates/CodeJavascript1.html" ;


$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;
$contenu = $contenu.file_get_contents($fichierCode) ;




if ( isset($_POST['Submit']) )
{
  $Keywords = trim($_POST['Keywords']) ;
  if (!empty($Keywords))
  {
    $Keywords = str_replace(" ", "%", $Keywords);
    $Keywords = strtoupper($Keywords) ;
  }

  $Domain = trim($_POST['Domain']) ;
  if (!empty($Domain))
  {
    $Domain = str_replace(" ", "%", $Domain);
    $Domain = strtoupper($Domain) ;
  }


  $contenu = $contenu."<br>" ;

  include $baseREP.'/PHP/config.php';

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error)
      die("Connection failed: " . $conn->connect_error);
  $conn->set_charset('utf8');

  // la requête pour récupérer des articles


  $sql = "select distinct pw.URL, Min(kr.Ranking) as Ranking, pw.* from PagesWeb pw, Keywords_Ranking kr where kr.URL = pw.URL and pw.error = 0 and pw.HasBeenRetrieved = 1 " ;
  if (!empty($Keywords))
    $sql = $sql." and upper(pw.Title) like '%".$Keywords."%'" ;
  if (!empty($Domain))
    $sql = $sql." and upper(pw.URL) like '%".$Domain."%'" ;
  $sql = $sql." group by pw.URL order by Ranking" ;

  $result = $conn->query($sql);


  $contenu = $contenu."<b>".$result->num_rows." résultats</b><br>" ;
  $contenu = $contenu."<br>" ;

  $contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
  $contenu = $contenu."<table class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;
  $contenu = $contenu."<thead style=\"background-color:#AAAAAA\">  <th style=\"width:5%\">Numéro</th> <th>Titre</th> <th>Ranking</th> <th>URL</th> <th> Titre dans le Texte ? </th> <th> Voir l'article original</th> <th> Voir les liens</th> <th> Voir le texte</th> </thead>\n";


  if ($result->num_rows > 0)
  {

  	$i = 1 ;
    while($row = $result->fetch_assoc())
    {
      $contenu = $contenu."<tr>" ;

      $contenu = $contenu."<td>".$i."</td>" ;
      $contenu = $contenu."<td>".$row['Title']."</td>" ;
      $contenu = $contenu."<td>".$row['Ranking']."</td>" ;
      $contenu = $contenu."<td>".$row['URL']."</td>" ;
      $contenu = $contenu."<td>".$row['HasTitleInText']."</td>" ;

      $f2 = "/API/ArticleFromURL/".$row['id']."/" ;
      $contenu = $contenu."<td>" ;
      $contenu = $contenu."<form>" ;
      $contenu = $contenu."<input type=\"button\" onClick=\"PopUpTexte('".$f2."')\"  value=\"Article\"/>" ;
      $contenu = $contenu."</form>" ;
      $contenu = $contenu."</td>" ;


      $f2 = "/API/ArticleLinksFromDatabase/".$row['id']."/" ;
      $contenu = $contenu."<td>" ;
      $contenu = $contenu."<form>" ;
      $contenu = $contenu."<input type=\"button\" onClick=\"PopUpTexte('".$f2."')\"  value=\"Liens\"/>" ;
      $contenu = $contenu."</form>" ;
      $contenu = $contenu."</td>" ;

      $f2 = "/API/ArticleTextFromDatabase/".$row['id']."/" ;
      $contenu = $contenu."<td>" ;
      $contenu = $contenu."<form>" ;
      $contenu = $contenu."<input type=\"button\" onClick=\"PopUpTexte('".$f2."')\"  value=\"Texte\"/>" ;
      $contenu = $contenu."</form>" ;
      $contenu = $contenu."</td>" ;


      $contenu = $contenu."</tr>\n" ;

    	$i = $i+1 ;
    }
  }
  else
  {
    $MyError = "<h3>pas d'articles dans la base</h3>";
    echo "<script>alert('".$MyError."');</script>";
  }

  $contenu = $contenu."</table>\n" ;
  $contenu = $contenu."</div>" ;


  // on ferme la connection à la base
  $conn->close();
}




require_once $baseREP.'/MenuFooter.php' ;

echo $contenu ;




?>
