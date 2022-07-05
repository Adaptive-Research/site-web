<?php

require_once $baseREP.'/PHP/lang.php' ;

require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;

require_once $baseREP.'/PHP/class_Activity.php' ;
use \Entreprise\Activity ;

require_once $baseREP.'/PHP/class_KeywordsRun.php' ;
use \SEO\Keywords_Run ;

require_once $baseREP.'/PHP/class_Keywords.php' ;
use \SEO\Keywords ;






$MyError = "" ;


if (session_status() == PHP_SESSION_NONE)
	session_start();



// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
  $objAC = new Access ;
  if (! $objAC->IsVisibleBy('./KeywordsRun_showall.php',$_SESSION['current_user']->group_name))
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
$objA = new Activity ;




if ( isset($_POST['Submit']) )
{
  $idActivity = $_POST['Activity'] ;

  $idKeywords = $_POST['idKeywords'] ;
  $MotCle = $_POST['Keywords'] ;

  if (! empty($idKeywords )) // On a cliqué sur un bouton de lancemnt manuel de script
  {
    $objKR = new Keywords_Run ;

    $objKR->SetRun('google',$idKeywords) ;
    $res = $objKR->Save() ;
    $idRun = $objKR->ID ;

    // python GetGoogleResultsFromKeywords.py "agence webmarketing" 23
    $nc1 = $py_Keywords.'GetGoogleResultsFromKeywords.py "'.$MotCle.'" '.$idRun ;
    $commande = "cd ".$basePython." ; python3 ".$nc1 ;
    shell_exec($commande) ;


  }

}






$fheader = $baseREP."/templates/header.html" ;
$fichierHTML = $baseREP."/templates/KeywordsRun_showall.html" ;
$fichierCode = $baseREP."/js/OpenHTML.js" ;

$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichierHTML) ;

$contenu = $contenu."\n<script>" ;
$contenu = $contenu.file_get_contents($fichierCode) ;
$contenu = $contenu."</script>\n" ;







include $baseREP.'/PHP/config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8") ;
// Check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}


$contenu = $contenu."<br>" ;


$stack = array();


$contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
$contenu = $contenu."<table class=\"table table-bordered\" style=\"background-color:#FFFFFF;border:solid #0000FF\" >\n" ;
$contenu = $contenu."<thead style=\"background-color:#AAAAAA\" > <tr>   <th style=\"width:5%\">Numéro</th> <th style=\"width:30%\">Mots clés</th> <th>Nombre de recherches</th> <th>Date dernière recherche</th> <th>id dernière recherche</th> <th>Lancer une recherche</th> </thead>\n";

if ($idActivity == 0)
  $sql = "select k.id, k.Keywords, count(*) as nombre, Max(kr.DateRun) as dr, Max(kr.id) as idr from Keywords k, Keywords_Run kr where  k.iscurrent = 1 and kr.iscurrent = 1  and kr.idKeywords = k.id group by k.id, k.Keywords " ;
else {
  $sql = "select k.id, k.Keywords, count(*) as nombre, Max(kr.DateRun) as dr, Max(kr.id) as idr from Keywords k, Keywords_Activity ka, Keywords_Run kr where ka.iscurrent = 1 and k.iscurrent = 1 and kr.iscurrent = 1 and ka.idKeywords = k.id and ka.idActivity = ".$idActivity." and kr.idKeywords = k.id group by k.id,k.Keywords " ;

}


$result = $conn->query($sql);
if ($result->num_rows > 0)
{
  $compteur = 0 ;
  while($row = $result->fetch_assoc())
  {
    $compteur = $compteur+1 ;
    array_push($stack, $row['Keywords']);
    $contenu = $contenu."<tr>" ;

    $contenu = $contenu."<td>".$compteur."</td>" ;
    $contenu = $contenu."<td>".'<a href="#'.$row['Keywords'].'"><h4><b>'.$row['Keywords'].'</b></h4></a>'."</td>" ;
    $contenu = $contenu."<td>".$row['nombre']."</td>" ;
    $contenu = $contenu."<td>".$row['dr']."</td>" ;
    $contenu = $contenu."<td>".$row['idr']."</td>" ;



    // lancer une recherche plus fréquemment que tous les 14 jours a peu d'intérêt
    $LastRecuperation = $row['dr'];
    $DateFin = date('Y-m-d H:i:s',strtotime('+14 day',strtotime($LastRecuperation))) ;

    $DateJour = strtotime(date('Y-m-d H:i:s')) ;
    $DateFin2 = strtotime($DateFin) ;

    if ($DateJour >= $DateFin2)
    {
      $contenu = $contenu."<td>" ;
      $contenu = $contenu."<form  action=\"/show-Keywords-Run\" method=\"post\">" ;
      $contenu = $contenu."<input id=\"Keywords\" name=\"Keywords\" type=\"hidden\" value=\"".$row['Keywords']."\">" ;
      $contenu = $contenu."<input id=\"idKeywords\" name=\"idKeywords\" type=\"hidden\" value=\"".$row['id']."\">" ;
      $contenu = $contenu."<input type=\"submit\" name=\"Submit\"  value=\"Lancer\"/>" ;
      $contenu = $contenu."</form>" ;
      $contenu = $contenu."</td>" ;
    }
    else
      $contenu = $contenu."<td></td>" ;


    $contenu = $contenu."</tr>\n" ;
  }
}

$contenu = $contenu."</table>\n" ;
$contenu = $contenu."</div>" ;





// pour toutes les sociétés dont le secteur n'est pas null
foreach ($stack as &$MC)
{
    $i = 1 ;

    $contenu = $contenu."<div id=\"".$MC."\"></div>\n" ;
    $contenu = $contenu."<br><br><br><br>\n" ;

    $contenu = $contenu."<h3><b> ".$MC."</b></h3><br>\n" ;

    $contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
    $contenu = $contenu."<table class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;
    $contenu = $contenu."<thead style=\"background-color:#AAAAAA\" > <tr>   <th style=\"width:5%\">Moteur</th>  <th style=\"width:5%\">idRun</th> <th style=\"width:15%\">Date de recherche</th> <th>Voir le résultat</th> </thead>\n";

    $sql = "select * from Keywords k, Keywords_Run kr where k.iscurrent = 1 and kr.iscurrent = 1 and kr.idKeywords = k.id  and k.Keywords = \"".$MC."\"  order by kr.Moteur, kr.DateRun desc" ;

    $result = $conn->query($sql);
    while($row = $result->fetch_assoc())
    {
      $contenu = $contenu."<tr>" ;

      $contenu = $contenu."<td>".$row['Moteur']."</td>" ;
      $contenu = $contenu."<td>".$row['id']."</td>" ;
      $contenu = $contenu."<td>".$row['DateRun']."</td>" ;

      $f2 = "/API/RankingGoogle/".$row['id']."/" ;

      $contenu = $contenu."<td>" ;
      $contenu = $contenu."<form>" ;
      $contenu = $contenu."<input type=\"button\" onClick=\"PopUpTexte('".$f2."')\"  value=\"Voir\"/>" ;
      $contenu = $contenu."</form>" ;
      $contenu = $contenu."</td>" ;


      $contenu = $contenu."</tr>\n" ;

	     $i = $i+1 ;
    }

    $contenu = $contenu."</table>\n" ;
    $contenu = $contenu."</div>" ;
}





// on ferme la connection à la base
$conn->close();




require_once $baseREP.'/MenuFooter.php' ;

// on charge la selectBox qui contient les activités
if (!$objA->LoadActivitiesWithKeywords($idActivity))
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
