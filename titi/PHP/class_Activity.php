<?php

	// Author Daniel @2018

	namespace Entreprise;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class Activity
	{

		public $Secteur;
		public $ID ;
		public $ListOfActivities ;

		private $db;




		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
			$this->ID = 0 ;
			$this->Secteur = "" ;
		}

		public function LoadList($id)
		{
			$sql = "select * from Activity where iscurrent = 1 order by Secteur" ;
			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListOfActivities = "<option  value=\"0\"> </option>\n" ;

				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($rows[$i]->id == $id)
						$this->ListOfActivities = $this->ListOfActivities."<option selected=\"selected\" value=\"".$rows[$i]->id."\">".$rows[$i]->Secteur." (".$rows[$i]->id .") </option>\n" ;
					else
						$this->ListOfActivities = $this->ListOfActivities."<option  value=\"".$rows[$i]->id."\">".$rows[$i]->Secteur." (".$rows[$i]->id .")</option>\n" ;
				}
				return true;
			}
			return false ;
		}


		public function LoadActivitiesWithKeywords($id)
		{
			$sql = "select distinct a.id, a.Secteur from Activity a, Keywords_Activity ka where ka.iscurrent = 1 and ka.idActivity = a.id and a.iscurrent = 1  order by a.Secteur" ;
			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListOfActivities = "<option  value=\"0\"> </option>\n" ;

				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($rows[$i]->id == $id)
						$this->ListOfActivities = $this->ListOfActivities."<option selected=\"selected\" value=\"".$rows[$i]->id."\">".$rows[$i]->Secteur." (".$rows[$i]->id .")</option>\n" ;
					else
						$this->ListOfActivities = $this->ListOfActivities."<option  value=\"".$rows[$i]->id."\">".$rows[$i]->Secteur." (".$rows[$i]->id .")</option>\n" ;
				}
				return true;
			}
			return false ;
		}


		public function SetActivity($a)
		{
			$this->Secteur = $a ;
			return 1 ;
		}



		public function Clear()	// Cette fonction remet à 0 les liens de l'article avec ses ancêtres.
		{
			$this->ID = 0 ;
		}




		public function Delete($id)
		{
			$sql = "update Activity set iscurrent = 0 where iscurrent = 1 and id = ".$id  ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
				return true;
			return false ;
		}


		public function Save()
		{
			$this->Secteur = trim($this->Secteur) ;
			if (isset($this->Secteur))
			{
				if (!empty($this->Secteur))
				{
					$res = $this->Secteur_exists($this->Secteur) ;
					if (!$res)
					{
						$sql = "insert into Activity (iscurrent,Secteur) values(1,\"".$this->Secteur."\")" ;
						$stmt = $this->db->query($sql);
						if($stmt->affected_rows == 1)
								return 1;

						return -1 ;
					}
					else
						return -2 ;
				}
				return -3 ;
			}
		}

		public function Secteur_exists($Secteur)
		{
			$stmt = $this->db->query("select * from Activity where Secteur = \"".$Secteur."\"") ;
			if($this->db->getRowCount() >= 1)
				return true;
			return false ;
		}


		public function Load($id)
		{
			$stmt = $this->db->query("select * from Activity where id = ".$id) ;
			if($this->db->getRowCount() >= 1)
			{
				$this->ID = $stmt[0]->id ;
				$this->Secteur = $stmt[0]->Secteur ;
				return true;
			}
			return false ;
		}



	} // fin de la classe
