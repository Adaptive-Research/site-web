<?php


require_once $baseREP.'/PHP/lang.php' ;

require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;

require_once $baseREP.'/PHP/class_Activity.php' ;
use \Entreprise\Activity ;


require_once $baseREP.'/PHP/class_ActivityRun.php' ;
use \Entreprise\ActivityRun ;



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
    header('Location: /') ;
    exit() ;
  }
}
else
{
  header('Location: /') ;
  exit() ;
}


$idActivity = 1 ;
if ( isset($_POST['Submit']) )
  $idActivity = $_POST['Activity'] ;



$idActivityRun = 0 ;
if ( isset($_POST['Submit']) )
  $idActivityRun = $_POST['Run'] ;
  



// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichierHTML = $baseREP."/templates/SelectActivity4.html" ;

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
$contenu = str_replace('[SERVEUR_WEB]',$ServeurWeb,$contenu) ;


// on charge la selectBox qui contient les Runs seulement si on a selectionne une activite
if ($idActivity > 0)
{
  $objAR = new ActivityRun ;
  if (!$objAR->LoadList($idActivity,$idRun))
  {
    $msg = $contenu."<h3>empty list Of Runs</h3>";
    echo $msg ;
    exit() ;
  }
  $contenu = str_replace('[OPTIONS_RUN]',$objAR->ListOfRuns,$contenu) ;
}



// ajout des scripts js
$contenu = $contenu."\n<script>" ;
$FichierJS =   $baseREP.'/js/GetRun.js' ;
$contenu = $contenu.file_get_contents($FichierJS) ;
$contenu = $contenu."</script>\n" ;



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


    
  $sql = "select sr.id as idRanking, si.id as idInfo, sr.Domaine, sr.TotalScoring,  sr.isRelevant, si.Type,si.Marketing, si.Zone  FROM SiteWeb_Ranking sr left outer  join  SiteWeb_Info si " ;
  $sql = $sql."  on sr.Domaine = si.Domaine WHERE sr.idActivityRun = ".$idActivityRun." order by sr.TotalScoring desc, sr.Domaine asc " ;


  $Compteur = 0 ;
  $result = $conn->query($sql);
  if ($result->num_rows > 0)
  {
    $contenu = $contenu."<br>" ;
    $contenu = $contenu."<b>".$result->num_rows." résultats</b><br>" ;
    $contenu = $contenu."<br>" ;

    $contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
    $contenu = $contenu."<table class=\"table table-bordered\" style=\"background-color:#FFFFFF;border:solid #0000FF\" >\n" ;
    $contenu = $contenu."<thead style=\"background-color:#AAAAAA\" >  <th style=\"width:5%\">Numéro</th> <th style=\"width:25%\">Domaine</th>  <th>Total Scoring</th>  <th>Pertinent</th>  <th>Type</th> <th>Marketing</th> <th>Zone géographique</th> </thead>\n";

    echo $contenu ;
    $contenu = "" ;
    



    $Domain_1 = "" ;
    $BKColor = "#FFFFFF" ;
    while($row = $result->fetch_assoc())
    {
      $Compteur = $Compteur+1 ;

      $c2 = $Compteur / 300 ;
      $c3 = round($c2,0) ;
      if ($c2 == $c3)
      {
        echo $contenu ;
        $contenu = "" ;
      }

      $Domaine = $row['Domaine'] ;
      $Scoring = $row['TotalScoring'] ;
      $Type = $row['Type'] ;
      $Zone = $row['Zone'] ;
      $Marketing = $row['Marketing'] ;
      $isRelevant = $row['isRelevant'] ;
      $id =  $row['idRanking'] ;

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
      $contenu = $contenu."<td>".$Scoring."</td>" ;

      if ($isRelevant)
        $checked = " checked " ;
      else
        $checked = " " ;
      $contenu = $contenu."<td style=\"text-align: center;\"><input type=\"checkbox\" id=\"isRelevant_".$id."\" ".$checked." onclick=\"AddInfo_SetRelevant('".$ServeurWeb."',".$id.")\" > </td>" ;




      $contenu = $contenu."<td><input type=\"text\" id=\"type_".$id."\"  value=\"".$Type."\" size=\"30\" oninput=\"AddInfo_SetType('".$ServeurWeb."',".$id.",'".$Domaine."') \"></td>" ;
      $contenu = $contenu."<td><input type=\"text\" id=\"marketing_".$id."\"  value=\"".$Marketing."\" size=\"80\" oninput=\"AddInfo_SetMarketing('".$ServeurWeb."',".$id.",'".$Domaine."')\"></td>" ;
      $contenu = $contenu."<td><input type=\"text\" id=\"zone_".$id."\"   value=\"".$Zone."\" size=\"30\" oninput=\"AddInfo_SetZone('".$ServeurWeb."',".$id.",'".$Domaine."')\"></td>" ;

      $contenu = $contenu."</tr>\n" ;
    }

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
