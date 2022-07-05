<?php
	//Author: Henok Hailemariam @2017
	// Modified by Daniel @2018
	namespace SEO;

	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;



	class Keywords_Activity{

		private $db;

		public $ID ;
		public $idKeywords ;
		public $idActivity ;

		public $ListOfKeywordsActivity ;


		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset('utf8') ;

			$this->idKeywords = 0 ;
			$this->idActivity = 0 ;
		}



		public function DeleteActivity($id)
		{
			$sql = "update Keywords_Activity set iscurrent = 0 where idActivity = ".$id  ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
			{
				return true;
			}
			return false ;
		}

		public function LoadListOfKeywords($idActivity,$AllOptions = true)
		{
			$KA = [] ;
			$sql = "select * from Keywords_Activity where iscurrent = 1 and idActivity = ".$idActivity ;
			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					array_push($KA,$rows[$i]->idKeywords) ;
				}
			}

			$sql = "select * from Keywords where iscurrent = 1 order by Keywords" ;
			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListOfKeywordsActivity = "" ;

				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($AllOptions)
					{
						if (in_array($rows[$i]->id,$KA))
							$this->ListOfKeywordsActivity = $this->ListOfKeywordsActivity."<option name=\"Keywords\" selected=\"selected\" value=\"".$rows[$i]->id."\">".$rows[$i]->Keywords."</option>\n" ;
						else
							$this->ListOfKeywordsActivity = $this->ListOfKeywordsActivity."<option name=\"Keywords\" value=\"".$rows[$i]->id."\">".$rows[$i]->Keywords."</option>\n" ;
					}
					else
					{
						if (in_array($rows[$i]->id,$KA))
							$this->ListOfKeywordsActivity = $this->ListOfKeywordsActivity."<option name=\"Keywords\" value=\"".$rows[$i]->id."\">".$rows[$i]->Keywords."</option>\n" ;
					}
				}

				return true;
			}
			return false ;
		}



		public function SetKeywordsActivity($a,$kw)
		{
			// on limite la taille des Keywords à 200 caractères
			$this->idActivity = $a ;
			$this->idKeywords = $kw ;
		}


		public function Load($id)
		{
			$stmt = $this->db->query("select * from Keywords_Activity where id = ".$id) ;
			if($this->db->getRowCount() >= 1)
			{
				$this->ID = $stmt[0]->id ; 							  // $id de la version en cours
				$this->idKeywords = $stmt[0]->idKeywords ;
				$this->idActivity = $stmt[0]->idActivity ;
				return true;
			}
			return false ;
		}


		public function GetLastIDCreated()
		{
			$stmt = $this->db->query("select * from Keywords_Activity where iscurrent = 1 order by id desc ");
			if($this->db->getRowCount() >= 1)
				return $stmt[0]->id;
			return 0 ;
		}




		public function Save()
		{

			if($this->searchKeywordsActivity($this->idKeywords,$this->idActivity))
				return 0 ;

			$sql = "insert into Keywords_Activity (iscurrent, idKeywords, idActivity) values(?,?,?)" ;

			$stmt = $this->db->query($sql , [1,$this->idKeywords,$this->idActivity]);
			if($stmt->affected_rows == 1)
			{
				$this->ID = $this->GetLastIDCreated() ;
				return 1;
			}
			return -1 ;
		}


		public function searchKeywordsActivity($kw,$a)
		{
			$sql = "select * from Keywords_Activity where iscurrent = 1 and idKeywords = ".$kw." and idActivity = ".$a ;
			$stmt = $this->db->query($sql);
			if($this->db->getRowCount())
				return $stmt[0];
			return false;
		}
	}
