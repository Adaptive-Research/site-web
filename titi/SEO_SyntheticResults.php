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


  //echo "<script>alert('".$servername." ".$username." ".$dbname."');</script>";
  $conn = new mysqli($servername, $username, $password, $dbname);
  $conn->set_charset("utf8") ;
  if ($conn->connect_error)
      die("Connection failed: " . $conn->connect_error);


  $NbMotsCles = 0 ;    
  $sql0 = "select  * FROM Activity_Run where id = ".$idActivityRun ;
  $result0 = $conn->query($sql0);
  if ($result0->num_rows > 0)
  {
    $row0 = $result0->fetch_assoc() ;
    $Run1 = $row0['FirstIdKeywords_Run'] ;
    $RunLast = $row0['LastIdKeywords_Run'] ;
    $NbMotsCles = $RunLast - $Run1 + 1 ;
  }  

  //echo "<script>alert('".$idActivityRun."');</script>";

  $sql = "select  sr.Domaine, sr.TotalOrganicRanking, sr.TotalScoring, Apparitions.Apparitions, Pubs.Pubs,R13.R13, R410.R410,Pubs10.Pubs10,NombrePages FROM SiteWeb_Ranking sr " ;

  $sql = $sql." left outer join " ;
  $sql = $sql." ( select idActivityRun, Domaine,count(*) as Apparitions FROM Keywords_Ranking WHERE OrganicRanking is not NULL and idActivityRun = ".$idActivityRun." group by idActivityRun, Domaine ) as Apparitions " ;
  $sql = $sql."  on sr.idActivityRun = Apparitions.idActivityRun and sr.Domaine = Apparitions.Domaine " ;
  
  $sql = $sql." left outer join " ;
  $sql = $sql." (select idActivityRun,Domaine,count(*) as R13  FROM Keywords_Ranking WHERE OrganicRanking is not NULL and OrganicRanking >= 1 and OrganicRanking <= 3  and idActivityRun = ".$idActivityRun." group by idActivityRun,Domaine ) as R13 " ;
  $sql = $sql."  on sr.idActivityRun = R13.idActivityRun and sr.Domaine = R13.Domaine " ;

  $sql = $sql." left outer join " ;
  $sql = $sql." (select idActivityRun,Domaine,count(*) as R410  FROM Keywords_Ranking WHERE OrganicRanking is not NULL and OrganicRanking >= 4 and OrganicRanking <= 10  and idActivityRun = ".$idActivityRun." group by idActivityRun,Domaine ) as R410 " ;
  $sql = $sql."  on sr.idActivityRun = R410.idActivityRun and sr.Domaine = R410.Domaine " ;

  $sql = $sql." left outer join " ;
  $sql = $sql."  (select idActivityRun, Domaine, count(*) as Pubs  FROM Keywords_Ranking WHERE OrganicRanking is NULL and idActivityRun = ".$idActivityRun." group by idActivity, Domaine ) As Pubs " ;
  $sql = $sql."  on sr.idActivityRun = Pubs.idActivityRun and sr.Domaine = Pubs.Domaine " ;

  $sql = $sql." left outer join " ;
  $sql = $sql."  (select idActivityRun, Domaine, count(*) as Pubs10  FROM Keywords_Ranking WHERE OrganicRanking is NULL and Ranking <= 10 and idActivityRun = ".$idActivityRun." group by idActivity, Domaine ) As Pubs10 " ;
  $sql = $sql."  on sr.idActivityRun = Pubs10.idActivityRun and sr.Domaine = Pubs10.Domaine " ;

  $sql = $sql." left outer join " ;
  $sql = $sql."  (select * FROM SiteWeb_Domaines) As nbp " ;
  $sql = $sql."  on nbp.Domaine =sr.Domaine" ;


  $sql = $sql."  where sr.idActivityRun = ".$idActivityRun." order by sr.TotalOrganicRanking asc " ;


  //echo "<script>alert('".$sql."');</script>";

  $Compteur = 0 ;
  $result = $conn->query($sql);
  if ($result->num_rows > 0)
  {


    $contenu = $contenu."<b>".$result->num_rows." résultats</b><br>" ;
    $contenu = $contenu."<br>" ;

    $contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
    $contenu = $contenu."<table class=\"table table-bordered\" style=\"background-color:#FFFFFF;border:solid #0000FF\" >\n" ;
    $contenu = $contenu."<thead style=\"background-color:#AAAAAA\" >  <th style=\"width:5%\">Numéro</th> <th style=\"width:25%\">Domaine</th> " ;
    $contenu = $contenu."<th style=\"width:8%\"> Ranking organique</th> " ;
    $contenu = $contenu."<th style=\"width:8%\">Scoring organique</th>" ;
    $contenu = $contenu."<th>Mots clés</th>" ;
    $contenu = $contenu."<th style=\"width:10%\">Référencement naturel</th>" ;
    $contenu = $contenu."<th>1 à 3</th>" ;
    $contenu = $contenu."<th>4 à 10</th>" ;
    $contenu = $contenu."<th>Pubs</th>" ;
    $contenu = $contenu."<th>1 à 10 </th>" ;
    $contenu = $contenu."<th>Référencement naturel+Pubs</th>" ;
    $contenu = $contenu."<th>Nombre pages</th>" ;
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
      $TotalOrganicRanking = $row['TotalOrganicRanking'] ;
      $TotalOrganicScoring = $row['TotalScoring'] ;
      $Apparitions = $row['Apparitions'] ;
      $R13 = $row['R13'] ;
      $R410 = $row['R410'] ;
      $Pubs = $row['Pubs'] ;
      $Pubs10 = $row['Pubs10'] ;
      $NombrePages = $row['NombrePages'] ;


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
      $contenu = $contenu."<td>".$TotalOrganicRanking."</td>" ;
      $contenu = $contenu."<td>".$TotalOrganicScoring."</td>" ;
      $contenu = $contenu."<td>".$NbMotsCles."</td>" ;
      $contenu = $contenu."<td>".$Apparitions."</td>" ;
      $contenu = $contenu."<td>".$R13."</td>" ;
      $contenu = $contenu."<td>".$R410."</td>" ;
      $contenu = $contenu."<td>".$Pubs."</td>" ;
      $contenu = $contenu."<td>".$Pubs10."</td>" ;
      if (is_numeric($Apparitions) && is_numeric($Pubs) )
      {
        $total = $Apparitions + $Pubs ;
        $contenu = $contenu."<td>".$total."</td>" ;
      }  
      else {
        if (is_null($Apparitions) && is_null($Pubs) == false )
          $contenu = $contenu."<td>". $Pubs."</td>" ;
        if (is_null($Apparitions) == false && is_null($Pubs))
          $contenu = $contenu."<td>". $Apparitions."</td>" ;
      }
      $contenu = $contenu."<td>".$NombrePages."</td>" ;

      
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
