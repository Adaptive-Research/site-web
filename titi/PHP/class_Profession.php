<?php

	// Author Daniel @2022

	namespace Entreprise;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class Profession
	{

		public $Profession;
		public $ID ;
		public $ListOfProfessions ;

		private $db;




		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
			$this->ID = 0 ;
			$this->Profession = "" ;
		}

		public function LoadList($id,$isRun)
		{
			if ($isRun == false)
				$sql = "select * from Profession where iscurrent = 1 order by Profession" ;
			else
				$sql = "select * from Profession where id in (select distinct idProfession from Profession_Run) and iscurrent = 1 order by Profession" ;

			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListOfProfessions = "<option  value=\"0\"> </option>\n" ;

				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($rows[$i]->id == $id)
						$this->ListOfProfessions = $this->ListOfProfessions."<option selected=\"selected\" value=\"".$rows[$i]->id."\">".$rows[$i]->Profession." (".$rows[$i]->id .") </option>\n" ;
					else
						$this->ListOfProfessions = $this->ListOfProfessions."<option  value=\"".$rows[$i]->id."\">".$rows[$i]->Profession." (".$rows[$i]->id .")</option>\n" ;
				}
				return true;
			}
			return false ;
		}

		public function SetProfession($a)
		{
			$this->Profession = $a ;
			return 1 ;
		}



		public function Clear()	// Cette fonction remet à 0 les liens de l'article avec ses ancêtres.
		{
			$this->ID = 0 ;
		}



		public function Delete($id)
		{
			$sql = "update Profession set iscurrent = 0 where id = ".$id ;
			$stmt = $this->db->query($sql);
		}


		public function Save()
		{
			$this->Profession = trim($this->Profession) ;
			if (isset($this->Profession))
			{
				if (!empty($this->Profession))
				{
					$res = $this->Profession_exists($this->Profession) ;
					if (!$res)
					{
						$sql = "insert into Profession (Profession) values(\"".$this->Profession."\")" ;
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

		public function Profession_exists($p)
		{
			$stmt = $this->db->query("select * from Profession where Profession = \"".$p."\"") ;
			if($this->db->getRowCount() >= 1)
				return true;
			return false ;
		}


		public function Load($id)
		{
			$stmt = $this->db->query("select * from Profession where id = ".$id) ;
			if($this->db->getRowCount() >= 1)
			{
				$this->ID = $stmt[0]->id ;
				$this->Profession = $stmt[0]->Profession ;
				return true;
			}
			return false ;
		}



	} // fin de la classe
