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
  if (! $objAC->IsVisibleBy('./SEO_FindBest.php',$_SESSION['current_user']->group_name))
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
if ( isset($_POST['Submit']) )
  $idActivity = $_POST['Activity'] ;

$sType = "Ranking" ;
if ( isset($_POST['Submit']) )
  $sType = $_POST['Type'] ;




// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichierHTML = $baseREP."/templates/SelectActivity6.html" ;

$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichierHTML) ;



require_once $baseREP.'/MenuFooter.php' ;


// on charge la selectBox qui contient les activités
$objA = new Activity ;
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
  include $baseREP.'/PHP/config.php';

  $conn = new mysqli($servername, $username, $password, $dbname);
  $conn->set_charset("utf8") ;
  if ($conn->connect_error)
      die("Connection failed: " . $conn->connect_error);



  $Table = "EvolutionRanking_".$idActivity ;   

  $sql = "SELECT count(*) AS  TotalColonnes FROM information_schema.columns  WHERE table_name = '".$Table."'" ;
  $result = $conn->query($sql) ;
  $row = $result->fetch_assoc() ;
  $TotalColonnes = $row['TotalColonnes'] ;
  $NbColonnes = ($TotalColonnes - 3) / 3 ;



  $sql = "select  * FROM ".$Table."  order by TotalOrganicRanking_0 asc" ;
  $Compteur = 0 ;
  $result = $conn->query($sql);
  if ($result->num_rows > 0)
  {
    //$contenu = $contenu."<br> Table: ".$Table."<br>" ;
    $contenu = $contenu."<b>".$result->num_rows." résultats</b><br>" ;
    $contenu = $contenu."<br>" ;

    $contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
    $contenu = $contenu."<table class=\"table table-bordered\" style=\"background-color:#FFFFFF;border:solid #0000FF\" >\n" ;
    
    if ($sType == "Ranking")
      $contenu = $contenu."<thead style=\"background-color:#AAAAAA\" >  <th style=\"width:5%\">Numéro</th> <th style=\"width:25%\">Domaine</th> <th> Last Ranking </th> " ;
    if ($sType == "Scoring")
      $contenu = $contenu."<thead style=\"background-color:#AAAAAA\" >  <th style=\"width:5%\">Numéro</th> <th style=\"width:25%\">Domaine</th> <th> Last Scoring </th> " ;
    
    
    
    for ($i = 1; $i < $NbColonnes; $i++) 
    {
      if ($sType == "Ranking")
        $contenu = $contenu."<th>Ranking -".$i."</th>" ;
      if ($sType == "Scoring")
        $contenu = $contenu."<th>Scoring -".$i."</th>" ;
    }
    $contenu = $contenu."</thead>\n";
    $contenu = $contenu."<tbody>" ;

    echo $contenu ;
    $contenu = "" ;
    


    $Domain_1 = "" ;
    $BKColor = "#FFFFFF" ;
    while($row = $result->fetch_assoc())
    {
      $Compteur = $Compteur+1 ;

      $c2 = $Compteur / 500 ;
      $c3 = round($c2,0) ;
      if ($c2 == $c3)
      {
        echo $contenu ;
        $contenu = "" ;
      }

      $Domaine = $row['Domaine'] ;
      $TotalOrganicRanking_0 = $row['TotalOrganicRanking_0'] ;
      $TotalScoring_0 = $row['TotalScoring_0'] ;

      if ($Domain_1 != $Domaine)
      {
        $Domain_1 = $row['Domaine'] ;
        if ($BKColor == "#FFFFFF")
          $BKColor = "#FFEEFF" ;
        else
          $BKColor = "#FFFFFF" ;
      }
      $contenu = $contenu."<tr style=\"background-color:".$BKColor."\" >" ;

      $contenu = $contenu."<td>".$Compteur."</td>" ;
      $contenu = $contenu."<td><a href=\"https://www.".$Domaine."\" target=\"_blank\" >".$Domaine."</a></td>" ;
      if ($sType == "Ranking")
        $contenu = $contenu."<td>".$TotalOrganicRanking_0."</td>" ;
      if ($sType == "Scoring")
        $contenu = $contenu."<td>".$TotalScoring_0."</td>" ;
      
      for ($i = 1; $i < $NbColonnes; $i++) {
        if ($sType == "Ranking")
          $field = 'TotalOrganicRanking_'.$i ;
        if ($sType == "Scoring")
          $field = 'TotalScoring_'.$i ;
        
        $contenu = $contenu."<td>".$row[$field]."</td>" ;
      }
      
      $contenu = $contenu."</tr>\n" ;
    }

    $contenu = $contenu."</tbody>" ;
    $contenu = $contenu."</table>\n" ;
    $contenu = $contenu."</div>" ;
  }



  $conn->close();
}






// ajout des scripts js
$contenu = $contenu."\n<script>" ;
$trijs =   $baseREP.'/js/AddInfo.js' ;
$contenu = $contenu.file_get_contents($trijs) ;
$contenu = $contenu."</script>\n" ;



use \Footer\Footer ;
$objF = new Footer ;
$objF->baseREP = $baseREP ;
$contenu = $contenu.$objF->getFooterForGroup($group) ;


// on remplace les couleurs en fonction du serveur de dev ou de prod en changeant la classe des balises
include $baseREP.'/ManageCouleurServeurs.php';


echo $contenu ;

if ($MyError <> "")
  echo "<script>alert('".$MyError."');</script>";

?>
