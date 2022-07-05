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




function ExecuteAsyncShellCommand($comando = null){
  if(!$comando){
      throw new Exception("No command given");
  }
  // If windows, else
  if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
      system($comando." > NUL");
  }else{
      shell_exec("/usr/bin/nohup ".$comando." >/dev/null 2>&1 &");
  }
}





$idActivity = 0 ;
$objA = new Activity ;




$fheader = $baseREP."/templates/header.html" ;
$fichierHTML = $baseREP."/templates/SelectActivity2.html" ;

$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichierHTML) ;







$contenu = $contenu."<br><br><br><br>" ;


if ( isset($_POST['Submit']) )
  $idActivity = $_POST['Activity'] ;




if ( isset($_POST['Launch']) )
{
  $idActivity = $_POST['Activity'] ;
  
  include $baseREP.'/PHP/config.php';
  $conn = new mysqli($servername, $username, $password, $dbname);
  $conn->set_charset("utf8") ;
  if ($conn->connect_error)
      die("Connection failed: " . $conn->connect_error);

  $sql = "select * from Activity_Run where idActivity = ".$idActivity." order by DateRun desc" ;

  $result = $conn->query($sql);
  if ($result->num_rows > 0)
  {
    
    $row = $result->fetch_assoc() ;
    $DateLastRun = $row['DateRun'] ;
    $DateFin = date('Y-m-d',strtotime('+13 day',strtotime($DateLastRun))) ;

    $DateJour = strtotime(date('Y-m-d')) ;
    $DateFin2 = strtotime($DateFin) ;

    #if ($DateJour >= $DateFin2)
    if ($DateJour >= $DateJour)
    {
      $nc1 = $RepertoirePython."/Keywords/aaa.sh ".$idActivity. "  2>&1 " ;
      $command = escapeshellcmd($nc1);
      ExecuteAsyncShellCommand($command) ;

  
  
      
      $contenu = $contenu."Running ".$command."</b><br>" ;
      $contenu = $contenu."<br>" ;
      $contenu = $contenu."<br>" ;
    }
    else
    {
      $contenu = $contenu."<b>Lancement non autorisé pour ce secteur</b><br>" ;
      $contenu = $contenu."Dernier Lancement pour ce secteur: ".ChangeDate($DateLastRun)."<br>" ;
      $contenu = $contenu."Prochain Lancement possible à partir de: ".ChangeDate($DateFin)."<br>" ;
      $contenu = $contenu."<br><br>" ;
    }
    
  }
  else
  {
    $nc1 = $RepertoirePython."/Keywords/aaa.sh ".$idActivity ;
    $command = escapeshellcmd($nc1);
    ExecuteAsyncShellCommand($command) ;

    $contenu = $contenu."Running ".$command."</b><br>" ;
    $contenu = $contenu."<br>" ;
    $contenu = $contenu."<br>" ;
  }
}



$a = $ServeurWeb."/API/ShowRunActivity/".$idActivity."/" ;

$FichierJSON = file_get_contents($a) ;
$arr = json_decode($FichierJSON,true) ;

$contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
$contenu = $contenu."<table id=\"TableResults\"  class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;

if ($idActivity > 0)
  $contenu = $contenu."<thead style=\"background-color:#AAAAAA\" >  <th style=\"width:3%\">Numéro</th>  <th style=\"width:12%\">Secteur</th> <th style=\"width:12%\">Date Lancement</th>  </thead>\n";
else
  $contenu = $contenu."<thead style=\"background-color:#AAAAAA\" >  <th style=\"width:3%\">Numéro</th> <th style=\"width:3%\">idActivity</th>  <th style=\"width:12%\">Secteur</th> <th style=\"width:12%\">Dernier Lancement</th>  </thead>\n";

$contenu = $contenu."<tbody>" ;  

$i = 0 ;
foreach($arr as $key => $value )
{
  $i = $i+1 ;
  $contenu = $contenu."<tr>" ;

  $contenu = $contenu."<td>".$i."</td>" ;

  $contenu = $contenu."<td>".$value["idActivity"]."</td>" ;
  $contenu = $contenu."<td>".$value["Secteur"]."</td>" ;
  $contenu = $contenu."<td>".ChangeDate($value["DateRun"])."</td>" ;

  $contenu = $contenu."</tr>\n" ;
}

$contenu = $contenu."</tbody>" ;
$contenu = $contenu."</table>\n" ;
$contenu = $contenu."</div>" ;




require_once $baseREP.'/MenuFooter.php' ;

// on charge la selectBox qui contient les activités
if (!$objA->LoadActivitiesWithKeywords($idActivity))
{
  $msg = $contenu."<h3>empty list Of Activities</h3>";
  echo $msg ;
  exit() ;
}
$contenu = str_replace('[OPTIONS_ACTIVITY]',$objA->ListOfActivities,$contenu) ;





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
