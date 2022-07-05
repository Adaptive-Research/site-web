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


$idActivity = 0 ;
if ( isset($_POST['Submit']) )
  $idActivity = $_POST['Activity'] ;

  $objA = new Activity ;





// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$fichierHTML = $baseREP."/templates/SelectActivity.html" ;

$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichierHTML) ;



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
  include $baseREP.'/PHP/config.php';

  $conn = new mysqli($servername, $username, $password, $dbname);

  $conn->set_charset("utf8") ;
  if ($conn->connect_error)
      die("Connection failed: " . $conn->connect_error);

  #echo "<script>alert('test 0');</script>";    

  #$conn.query('SET SESSION MAX_EXECUTION_TIME=1200') ; 
  #$conn.query('SET GLOBAL MAX_EXECUTION_TIME=1200') ;

  #echo "<script>alert('test 10');</script>";
  
  $sql0 = " select Max(id) as idActivityRun from Activity_Run where idActivity  = ".$idActivity ;
  $result0 = $conn->query($sql0);
  if ($result0->num_rows > 0)
  {
    $row0 = $result0->fetch_assoc() ;
    $idActivityRun = $row0['idActivityRun'] ;


    $sql = "select idActivity,idActivityRun, Domaine, TotalScoring, Keywords,OrganicRanking,Ranking,Scoring,TypeURL,URL  FROM Keywords_Ranking where idActivityRun = ".$idActivityRun." " ; 
    $sql = $sql." and TotalScoring < 2 and OrganicRanking is not null order by idActivity, idActivityRun, TotalScoring asc, Domaine asc, Keywords asc, Ranking asc  " ;


   
    $Compteur = 0 ;
    $result = $conn->query($sql);
    if ($result->num_rows > 0)
    {

     
      
      $contenu = $contenu."<br>" ;
      $contenu = $contenu."<b>".$result->num_rows." résultats</b><br>" ;
      $contenu = $contenu."<br>" ;



      $contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
      $contenu = $contenu."<table id=\"TableResults\" class=\"table table-bordered\" style=\"background-color:#FFFFFF;border:solid #0000FF\" >\n" ;
      $contenu = $contenu."<thead style=\"background-color:#AAAAAA\" >   <th style=\"width:5%\">Numéro</th> <th style=\"width:25%\">Domaine</th>  <th>Scoring du site</th> <th>Keywords</th> <th>Ranking</th> <th>Organic Ranking</th> <th>Scoring de la page</th> <th>URL</th> </thead>\n";
      $contenu = $contenu."<tbody>" ;
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
          

        

        if ($Domain_1 != $row['Domaine'])
        {
          $Domain_1 = $row['Domaine'] ;
          if ($BKColorDomaine == "#FFFFFF")
            $BKColorDomaine = "#EEEEFF" ;
          else
            $BKColorDomaine = "#FFFFFF" ;
        }

        if ($row['OrganicRanking'] == "")
          $BKColor = "#FFFFBB" ;
        else
          $BKColor = $BKColorDomaine ;



        $Domaine = $row['Domaine'] ;
        $TotalScoring = $row['TotalScoring'] ;
        $URL = $row['URL'] ;

        
        $contenu = $contenu."<tr style=\"background-color:".$BKColor."\" >" ;
        $contenu = $contenu."<td>".$Compteur."</td>" ;
        $contenu = $contenu."<td><a href=\"https://www.".$Domaine."\" target=\"_blank\" >".$Domaine."</a></td>" ;
        
        $contenu = $contenu."<td>".$TotalScoring."</td>" ;
        
        $contenu = $contenu."<td>".$row['Keywords']."</td>" ;
        $contenu = $contenu."<td>".$row['Ranking']."</td>" ;
        
        $contenu = $contenu."<td>".$row['OrganicRanking']."</td>" ;
        $contenu = $contenu."<td>".$row['Scoring']."</td>" ;
        
        $contenu = $contenu."<td><a href=\"".$URL."\" target=\"_blank\" >".$URL."</a></td>" ;
        
        $contenu = $contenu."</tr>\n" ;
      

      }
      //echo "<script>alert('test_4 ".$Compteur."');</script>";

      $contenu = $contenu."</tbody>" ;
      $contenu = $contenu."</table>\n" ;
      $contenu = $contenu."</div>\n" ;
    }
  
  }





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

if ($MyError <> "")
  echo "<script>alert('".$MyError."');</script>";

?>
