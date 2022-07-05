<?php

require_once $baseREP.'/PHP/lang.php' ;

require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;



require_once $baseREP.'/PHP/class_Activity.php' ;
use \Entreprise\Activity ;




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
$fichierCode = $baseREP."/js/OpenHTML.js" ;


$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;

$contenu = $contenu."\n<script>" ;
$contenu = $contenu.file_get_contents($fichierCode) ;
$contenu = $contenu."\n</script>" ;



$idActivity = 0 ;
if ( isset($_POST['Submit']) )
  $idActivity = $_POST['Activity'] ;

  $objA = new Activity ;




require_once $baseREP.'/MenuFooter.php' ;


// on charge la selectBox qui contient les activités
if (!$objA->LoadActivitiesWithKeywords($idActivity))
{
  $msg = $contenu."<h3>empty list Of Activities</h3>";
  echo $msg ;
  exit() ;
}
$contenu = str_replace('[OPTIONS_ACTIVITY]',$objA->ListOfActivities,$contenu) ;

include $baseREP.'/ManageCouleurServeurs.php';
echo $contenu ;
$contenu = "" ;






if ( isset($_POST['Submit']) )
{
  $KeywordsTitre = trim($_POST['KeywordsTitre']) ;
  if (!empty($KeywordsTitre))
  {
    $KeywordsTitre = str_replace(" ", "%", $KeywordsTitre);
    $KeywordsTitre = strtoupper($KeywordsTitre) ;
  }

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



  $sql = "select kr.idActivity, a.Secteur,  pw.id, kr.Keywords, pw.Title, pw.URL, Min(kr.OrganicRanking) as OrganicRanking from PagesWeb pw, Keywords_Ranking kr, Activity a  where a.id = kr.idActivity and  kr.URL = pw.URL and pw.error = 0 and pw.HasBeenRetrieved = 1 and kr.OrganicRanking is not NULL " ;
  if ($idActivity != 0)
    $sql = $sql." and kr.idActivity = ".$idActivity." " ;

    if (!empty($Keywords))
    $sql = $sql." and upper(kr.Keywords) like '%".$Keywords."%'" ;

  if (!empty($KeywordsTitre))
    $sql = $sql." and upper(pw.Title) like '%".$KeywordsTitre."%'" ;
    
  if (!empty($Domain))
    $sql = $sql." and upper(pw.URL) like '%".$Domain."%'" ;
  $sql = $sql."  group by  kr.idActivity, a.Secteur, pw.id, kr.Keywords,pw.Title,pw.URL order by  kr.idActivity,  OrganicRanking asc , kr.Keywords " ;


  $result = $conn->query($sql);


  $contenu = $contenu."<b>".$result->num_rows." résultats</b><br>" ;
  $contenu = $contenu."<br>" ;

  $contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
  $contenu = $contenu."<table id=\"TableResults\" class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;
  $contenu = $contenu."<thead style=\"background-color:#AAAAAA\">  <th style=\"width:5%\">Numéro</th> <th>Secteur</th>  <th>Mots clés</th> <th>Organic Ranking</th> <th>Titre</th> <th>URL</th>   <th> Voir les liens</th> <th> Voir le texte</th> </thead>\n";
  $contenu = $contenu."<tbody>" ;

  if ($result->num_rows > 0)
  {

  	$i = 1 ;
    while($row = $result->fetch_assoc())
    {
      $contenu = $contenu."<tr>" ;

      $contenu = $contenu."<td>".$i."</td>" ;
      $contenu = $contenu."<td>".$row['Secteur']."</td>" ;
      $contenu = $contenu."<td>".$row['Keywords']."</td>" ;
      $contenu = $contenu."<td>".$row['OrganicRanking']."</td>" ;
      $contenu = $contenu."<td>".$row['Title']."</td>" ;
      $contenu = $contenu."<td> <a href=\"".$row['URL']."\" target=\"_blank\">".$row['URL']."</a></td>" ;

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

      $c2 = $i / 250 ;
      $c3 = round($c2,0) ;
      if ($c2 == $c3)
      {
        echo $contenu ;
        $contenu = "" ;
      }
    }
  }
  else
  {
    $MyError = "<h3>pas d'articles dans la base</h3>";
    echo "<script>alert('".$MyError."');</script>";
  }

  $contenu = $contenu."</tbody>" ;
  $contenu = $contenu."</table>\n" ;
  $contenu = $contenu."</div>" ;


  // on ferme la connection à la base
  $conn->close();
}





// ajout des scripts js
$contenu = $contenu."\n<script>" ;
$trijs =   $baseREP.'/js/tri.js' ;
$contenu = $contenu.file_get_contents($trijs) ;
$contenu = $contenu."</script>\n" ;



use \Footer\Footer ;
$objF = new Footer ;
$objF->baseREP = $baseREP ;
$contenu = $contenu.$objF->getFooterForGroup($group) ;



include $baseREP.'/ManageCouleurServeurs.php';


echo $contenu ;




?>
