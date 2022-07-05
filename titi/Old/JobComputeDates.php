<?php

require_once $baseREP.'/PHP/class_access.php' ;

use \Page\Access ;



if (isset($_GET['SessionID']))
    session_id($_GET['SessionID']) ;

// on lance une session si cela n'existe pas
if (session_status() == PHP_SESSION_NONE)
	session_start();



  // on vérifie que l'on a les droits pour accéder à la page
  // si on n'a pas les droits, on est redirigé vers la page index.php
  if ( isset($_SESSION['current_user']) )
  {
  	$objAC = new Access ;
  	if (! $objAC->IsVisibleBy('./JobComputeDates.php',$_SESSION['current_user']->group_name))
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



function SetCalculationHasBeenDone($conn,$idP)
{
  $sql = "update Periodicite set CalculationHasBeenDone = 1 where id = ".$idP  ;
  $res = $conn->query($sql) ;
  return $res ;
}

function InsertDateToQuestionReponse($conn, $idP, $j)
{
  $sql = "insert into QuestionReponse (iscurrent,idPeriodicite,DateQuestion) values(1,".$idP.",'".$j."')" ;
  $res = $conn->query( $sql );
  return $res ;
}

// liste des fonctions utiles pour le traitement
function ComputeDatesJour($conn, $idP,$DD,$DF,$Jour)
{
  $day_of_week_DD = date('N',$DD) ; // Date de début ==>  1 = Monday   -> 7 = Sunday
  $day_of_week_jour = date('N',strtotime($Jour)) ; // Jour à calculer  ==> 1 = Monday   -> 7 = Sunday

  $Delta = $day_of_week_jour - $day_of_week_DD ;
  if ($Delta < 0)
    $Delta = $Delta + 7 ;

  $debut = strtotime($DD.' + '.$Delta.' days') ;
  $fin = strtotime($DF) ;

  $res = true ;
  for ($j = $debut ; $j <= $fin ; $j= strtotime($jour.' + 7 days'))
  {
    $jour = date('Y-m-d',$j) ;
    $res1 = InsertDateToQuestionReponse( $conn, $idP, $jour) ;
    if ($res1)
      echo $jour." OK<br>" ;
    else
      echo "ERREUR ".$jour."<br>" ;

    $res = $res & $res1 ;

  }

  return $res ;
}

function ComputeDatesMois()
{

}

function ComputeDatesAnnee()
{

}




// début du traitement

include $baseREP.'/PHP/config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error)
{
  die("Connection failed: " . $conn->connect_error);
}







	// on récupère tous les items à changer et on fait toutes les modifications
$sql1 = "select * from Periodicite where iscurrent = 1 and CalculationHasBeenDone = 0" ;
//echo "sql: ".$sql1."<br>" ;
$result1 = $conn->query($sql1);
if ($result1->num_rows > 0)
{
  while($row1 = $result1->fetch_assoc())
  {
    $idPeriodicite = $row1['id'] ;
    $DateDebut = $row1['DateDebut'] ;
    $DateFin = $row1['DateFin'] ;

    $res = true ;
    if ($row1['TypePeriode'] == "jour")
    {
      if ($row1['Lundi'] == 1)
        $res = $res & ComputeDatesJour($conn,$idPeriodicite,$DateDebut,$DateFin,'Monday') ;

      if ($row1['Mardi'] == 1)
        $res = $res & ComputeDatesJour($conn,$idPeriodicite,$DateDebut,$DateFin,'Tuesday') ;

      if ($row1['Mercredi'] == 1)
        $res = $res & ComputeDatesJour($conn,$idPeriodicite,$DateDebut,$DateFin,'Wednesday') ;

      if ($row1['Jeudi'] == 1)
        $res = $res & ComputeDatesJour($conn,$idPeriodicite,$DateDebut,$DateFin,'Thursday') ;

      if ($row1['Vendredi'] == 1)
        $res = $res & ComputeDatesJour($conn,$idPeriodicite,$DateDebut,$DateFin,'Friday') ;

        if ($row1['Samedi'] == 1)
          $res = $res & ComputeDatesJour($conn,$idPeriodicite,$DateDebut,$DateFin,'Saturday') ;

        if ($row1['Dimanche'] == 1)
          ComputeDatesJour($conn,$idPeriodicite,$DateDebut,$DateFin,'Sunday') ;

        if ($res)
        {
          SetCalculationHasBeenDone($conn,$idPeriodicite) ;
          echo "Succès de l'insertion des dates pour chaque question ()".$idPeriodicite.")<br>" ;
        }
        else
          echo "Echec de l'insertion des dates pour chaque question (".$idPeriodicite.")<br>" ;

    }
    if ($row1['TypePeriode'] == "mois")
    {

    }
    if ($row1['TypePeriode'] == "annee")
    {

    }
  }
}
else
  echo "pas d'insertion à faire <br>" ;




$conn->close();
?>
