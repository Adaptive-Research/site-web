<?php

require_once $baseREP.'/PHP/lang.php' ;
require_once $baseREP.'/PHP/class_Langues.php' ;
use \Langues\Langue ;

require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;

require_once $baseREP.'/PHP/class_Activity.php' ;
use \Entreprise\Activity ;



if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
	$objAC = new Access ;
	if (! $objAC->IsVisibleBy('./Keywords_run.php',$_SESSION['current_user']->group_name))
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


function ChangeDate($d)
{
  $y = substr($d,0,4) ;
  $m = substr($d,5,2) ;
  $dd = substr($d,8,2) ;
  return $dd."  ".$m."  ".$y ;
}



$idActivity = 0 ;
if ( isset($_POST['Submit']) )
  $idActivity = $_POST['Activity'] ;

$objA = new Activity ;




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


$contenu = $contenu."<br><br><br><br>" ;


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

  $sql0 = " select Max(id) as idActivityRun from Activity_Run where idActivity  = ".$idActivity ;
    //$contenu = $contenu.$sql0."<br>" ;


    
  $result0 = $conn->query($sql0);
  if ($result0->num_rows > 0)
  {
    $row0 = $result0->fetch_assoc() ;
    $idActivityRun = $row0['idActivityRun'] ;


    $sql = "select kr.Domaine,  k.Keywords,  kr.Ranking, kr.URL from Keywords_Ranking kr,  Keywords_Run kru, Keywords k " ;
    $sql = $sql."where kr.idActivityRun = ".$idActivityRun."  and kr.OrganicRanking is NULL and kr.Domaine IS NOT null " ;
    $sql = $sql."and kru.id = kr.idKeywords_Run and k.id = kru.idKeywords " ;
    $sql = $sql."order by kr.Domaine,k.Keywords, kr.Ranking asc  " ;

    /*
    select kr.Domaine,  k.Keywords,  kr.Ranking, kr.URL from Keywords_Ranking kr,  Keywords_Run kru, Keywords k
    where kr.idActivityRun = 1 and kr.OrganicRanking is NULL and kr.Domaine IS NOT null
    and kru.id = kr.idKeywords_Run and k.id = kru.idKeywords order by kr.Domaine,k.Keywords, kr.Ranking asc 
    

    select  * from  Keywords_Ranking kr where kr.idActivityRun = 1 and kr.OrganicRanking is NULL and kr.Domaine IS NOT null order by kr.Domaine asc
    */    
        
    $Compteur = 0 ;
    $result = $conn->query($sql);
    if ($result->num_rows > 0)
    {

      $contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
      $contenu = $contenu."<table id=\"TableResults\" class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;

      $contenu = $contenu."<thead style=\"background-color:#AAAAAA\" >  <th style=\"width:5%\">Numéro</th> <th style=\"width:25%\">Domaine</th>   <th>Keywords</th> <th>Ranking</th>  <th>URL</th> </thead>\n";
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

        $BKColor = $BKColorDomaine ;


        $contenu = $contenu."<tr style=\"background-color:".$BKColor."\" >" ;

        $contenu = $contenu."<td>".$Compteur."</td>" ;
        $contenu = $contenu."<td>".$row['Domaine']."</td>" ;
        $contenu = $contenu."<td>".$row['Keywords']."</td>" ;
        $contenu = $contenu."<td>".$row['Ranking']."</td>" ;
        $contenu = $contenu."<td><a href=\"".$row['URL']."\" target=\"_blank\" >".$row['URL']."</a></td>" ;

        $contenu = $contenu."</tr>\n" ;
      }
    }

    $contenu = $contenu."</tbody>" ;
    $contenu = $contenu."</table>\n" ;
    $contenu = $contenu."</div>" ;
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

if (isset($MyError))
	echo "<script>alert('".$MyError."');</script>";

?>
