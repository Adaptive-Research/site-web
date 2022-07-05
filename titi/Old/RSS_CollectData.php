<?php


require_once $baseREP.'/PHP/lang.php' ;


require_once $baseREP.'/PHP/class_RSS.php' ;
use \WEB\RSS ;

require_once $baseREP.'/PHP/class_Job.php' ;
use \WEB\Job ;

require_once $baseREP.'/PHP/class_Recuperation.php' ;
use \WEB\Recuperation ;

require_once $baseREP.'/PHP/class_access.php' ;
use \Page\Access ;

//echo "je suis ici<br>" ;

if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
  $objAC = new Access ;
  if (! $objAC->IsVisibleBy('./RSS_CollectData.php',$_SESSION['current_user']->group_name))
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

//echo "je suis ici 2<br>" ;


$objJ = new Job ;
$objJ->SetJob("RSS_CollectData.php",$_SESSION['current_user']->id) ;
$objJ->Save() ;
$idJob = $objJ->GetId("RSS_CollectData.php",$_SESSION['current_user']->id) ;


$MyError = "" ;

// définition des variables
$objR = new RSS ;
$objRecup = new Recuperation ;



// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$contenu = file_get_contents($fheader) ;



$contenu = $contenu."<br>" ;


$contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:0%;margin-right:1%\">\n" ;
$contenu = $contenu."<table class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;

$contenu = $contenu."<thead style=\"background-color:#AAAAAA\" > <tr>  <th>URL du Site Web</th> <th>LastRecuperation</th> <th>Fichier</th> <th>Today</th></thead>\n";

include $baseREP.'/PHP/config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset('utf8');


echo "<br>" ;
echo "<br>" ;


// la requête pour récupérer des articles
$sql = "select * from RSS where iscurrent = 1 order by LastRecuperation ASC " ;

$result = $conn->query($sql);
if ($result->num_rows > 0)
{
  // on vérifie que l'on a les droits pour accéder à la page
  // si on n'a pas les droits, on est redirigé vers la page index.php
	//echo "je suis ici 3<br>" ;

  // output data of each row
	$i = 1 ;
  $total_collecte = 0 ;
  while( ($row = $result->fetch_assoc()) && ($total_collecte < 16) )
  {
    // C'est ici que l'on définit si l'on doit récupérer ou non le site Web
    // Cela dépend de la date de dernière récupération et de l'intervalle parramétré pour le Site Web

    $LastRecuperation = $row['LastRecuperation'];
    if (!empty($row['Intervalle_Day']))
      $DateFin = date('Y-m-d H:i:s',strtotime('+'.$row['Intervalle_Day'].' day',strtotime($LastRecuperation))) ;
    else
      $DateFin = $LastRecuperation ;

    if (!empty($row['Intervalle_Time']))
    {
      $HeureAdd = date('H',strtotime($row['Intervalle_Time'])) ;
      $MinuteAdd = date('i',strtotime($row['Intervalle_Time'])) ;
      $SecondeAdd = date('i',strtotime($row['Intervalle_Time'])) ;

      $DateFin = date('Y-m-d H:i:s',strtotime('+'.$HeureAdd.' hour',strtotime($DateFin))) ;
      $DateFin = date('Y-m-d H:i:s',strtotime('+'.$MinuteAdd.' minutes',strtotime($DateFin))) ;
      $DateFin = date('Y-m-d H:i:s',strtotime('+'.$SecondeAdd.' seconds',strtotime($DateFin))) ;
    }

    // on convertit tout en date pour pouvoir faire des comparaisons
    $DateJour = strtotime(date('Y-m-d H:i:s')) ;
    $DateFin2 = strtotime($DateFin) ;

		//echo "DateJour: ".$DateJour."<br>" ;
		//echo "DateFin2: ".$DateFin2."<br>" ;


    // si on veut forcer la récupération on décommente la ligne ci-dessous
    //$DateJour = $DateFin2 ;

    if ($DateJour >= $DateFin2)
    {
			//echo "je suis ici 4<br>" ;
      $total_collecte = $total_collecte + 1 ;

      $contenu = $contenu."<tr>" ;

      $contenu = $contenu."<td>".$row['Channel_URL']."</td>" ;
      $contenu = $contenu."<td>".$row['LastRecuperation']."</td>" ;

      // récupération de la page HTML ou du fichier XML
      $NomFichier = $home.$row['Repertoire'] ;
      if (substr($NomFichier, -1) != "/")
        $NomFichier = $NomFichier."/" ;

      $Today = date("Y-m-d--H-i-s");
      if ($row['TypeURL'] == "RSS")
        $NomFichier = $NomFichier."RSS-".$Today.".txt" ;
      if ($row['TypeURL'] == "blog")
        $NomFichier = $NomFichier."blog-".$Today.".txt" ;


      // récupération de la page
      // La récupération plante, il faut vraiment faire un script python équivalent qui marche mieux


			if ($row['TypeURL'] == "RSS")
      {
        if ($row['DontRetrieveArticles'] != 1)
        {
					$nc1 = $py_Articles.'GetRSS.py "'.$NomFichier.'" '.$row['id'] ;
          $commande = "cd ".$basePython." ; python3 ".$nc1 ;
					shell_exec($commande) ;
/*
					echo "<br>" ;
					echo "NomFichierRSS: ".$NomFichier."<br>" ;
					echo "Channel_URL: ".$row['Channel_URL']."<br>" ;
					echo "idRSS: ".$row['id']."<br>" ;
					echo $commande."<br><br>" ;
*/

        }
      }
			//echo "je suis ici 5<br>" ;


      // pour un blog, on récupère la page du Site Web et on sauvegarde le fichier
      if ($row['TypeURL'] == "blog")
      {
        $page = file_get_contents($row['Channel_URL']);
	      $monfichier = fopen($NomFichier, 'w+');
	      fputs($monfichier, $page); // On écrit le nouveau nombre de pages vues
	      fclose($monfichier);
    	}
			//echo "je suis ici 6<br>" ;


      // on met à jour la table Recuperation
      $objRecup->SetRecup($row['id'],$NomFichier) ;
			//echo "je suis ici 6.1<br>" ;
      $objRecup->Save() ;
			//echo "je suis ici 6.2<br>" ;

      // on met à jour l'heure de la dernière récupération dans la table RSS
      $objR->UpdateLastRecuperation($row['id'],$Today) ;


			//echo "je suis ici 7<br>" ;


      // pour un blog, on récupère les articles après avoir récupéré la page du site web
      if ($row['TypeURL'] == "blog")
      {
        if (!is_null($row['CommandeArticles']))
        {
          // python3 Get-Articles.py 44 /test/blog-2019-04-12-16-42-35.txt
          // la commande python va ajouter les articles dans la base
          $nc1 = $py_Articles.$row['CommandeArticles'] ;
          $commande = "cd ".$basePython." ; python3 ".$nc1." ".$row['id']." ".$NomFichier  ;
          //echo "<script>alert('".$commande."');</script>";

          shell_exec($commande) ;
        }
      }

      // ajout d'un timer entre 20 et 70 seconds
       //$seconds = rand ( 20 , 50 ) ;
       //sleep ($seconds ) ;
       //$contenu = $contenu."<td>".$cmd."</td>" ;
       $contenu = $contenu."<td>".$NomFichier."</td>" ;
       $contenu = $contenu."<td>".$Today."</td>" ;
       $contenu = $contenu."</tr>\n" ;

   }
  	$i = $i+1 ;
  }



}
else
  $MyError = "<h3>pas d'info de Site Web dans la base</h3>";


$contenu = $contenu."</table>\n" ;
$contenu = $contenu."</div>" ;


//echo "test5<br>" ;


// on ferme la connection à la base
$conn->close();

$objJ->UpdateStatus($idJob, 1,"") ;


// début de la modification du contenu
$RepStatic = "./static" ;
$RepTemplates = "./templates" ;

$contenu = str_replace('[STATIC]',$RepStatic,$contenu) ;
$contenu = str_replace('[TEMPLATES]',$RepTemplates,$contenu) ;



require_once $baseREP.'/MenuFooter.php' ;


echo $contenu ;


if ($MyError <> "")
	echo "<script>alert('".$MyError."');</script>";


?>
