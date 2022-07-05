<?php


require_once $baseREP.'/PHP/lang.php' ;

require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;


require_once $baseREP.'/PHP/class_Activity.php' ;
use \Entreprise\Activity ;




$MyError = "" ;


if (session_status() == PHP_SESSION_NONE)
	session_start();



// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
  $objAC = new Access ;
  if (! $objAC->IsVisibleBy('./SEO_AnalyserRanking.php',$_SESSION['current_user']->group_name))
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


$idActivity = 1 ;
$objA = new Activity ;




// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichierHTML = $baseREP."/templates/SEO_FindArticles.html" ;

$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichierHTML) ;



if ( isset($_POST['Submit']) )
{
  $idActivity = $_POST['Activity'] ;
  $objA->Load($idActivity) ;
  $Secteur = $objA->Secteur ;


  include $baseREP.'/PHP/config.php';

  $conn = new mysqli($servername, $username, $password, $dbname);
  $conn->set_charset("utf8") ;
  if ($conn->connect_error)
      die("Connection failed: " . $conn->connect_error);


  $contenu = $contenu."<br>" ;


  $contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
  $contenu = $contenu."<table class=\"table table-bordered\" style=\"background-color:#FFFFFF;border:solid #0000FF\" >\n" ;
  $contenu = $contenu."<thead style=\"background-color:#AAAAAA\" > <tr>   <th style=\"width:5%\">Numéro</th> <th style=\"width:25%\">Domaine</th> <th style=\"width:30%\">Mots Clés</th> <th>Ranking</th> </thead>\n";

  $sql = "select Domaine, Keywords, Min(Ranking) as Ranking from ( " ;
  $sql = $sql."select kra.Domaine, k.Keywords, kra.idKeywords_Run, Min(kra.Ranking) as Ranking from Keywords_Ranking kra, Keywords_Run kru, Keywords k " ;
  $sql = $sql."where kra.idKeywords_Run = kru.id and kru.idKeywords = k.id and k.id in " ;
  $sql = $sql."(select idKeywords from Keywords_Activity ka, Activity a where ka.idActivity = a.id and a.Secteur = '".$Secteur."') " ;
  $sql = $sql."and kra.iscurrent = 1 and kru.iscurrent = 1 and k.iscurrent = 1 and kra.TypeURL = 'Lien' " ;
  $sql = $sql."group by kra.Domaine, k.Keywords, kra.idKeywords_Run) as temp2 group by Domaine, Keywords" ;

  $Compteur = 0 ;
  $result = $conn->query($sql);
  if ($result->num_rows > 0)
  {
    while($row = $result->fetch_assoc())
    {
      $Compteur = $Compteur+1 ;
      $contenu = $contenu."<tr>" ;

      $contenu = $contenu."<td>".$Compteur."</td>" ;
      $contenu = $contenu."<td>".$row['Domaine']."</td>" ;
      $contenu = $contenu."<td>".$row['Keywords']."</td>" ;
      $contenu = $contenu."<td>".$row['Ranking']."</td>" ;

      $contenu = $contenu."</tr>\n" ;
    }
  }

  $contenu = $contenu."</table>\n" ;
  $contenu = $contenu."</div>" ;


  $conn->close();
}




require_once $baseREP.'/MenuFooter.php' ;


// on charge la selectBox qui contient les activités
if (!$objA->LoadList($idActivity))
{
  $msg = $contenu."<h3>empty list Of Activities</h3>";
  echo $msg ;
  exit() ;
}
$contenu = str_replace('[OPTIONS_ACTIVITY]',$objA->ListOfActivities,$contenu) ;




use \Footer\Footer ;
$objF = new Footer ;
$objF->baseREP = $baseREP ;
$contenu = $contenu.$objF->getFooterForGroup($group) ;



include $baseREP.'/ManageCouleurServeurs.php';




echo $contenu ;

if ($MyError <> "")
  echo "<script>alert('".$MyError."');</script>";

?>
