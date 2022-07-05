<?php
	//Author: Henok Hailemariam @2017
	// Modified by Daniel @2018
	namespace SEO;

	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;



	class Keywords{

		private $db;

		public $ID ;
		public $Keywords ;
		public $ListOfKeywords ;


		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset('utf8') ;

			$this->Keywords = "" ;
		}



		public function Delete($id)
		{
			$sql = "update Keywords set iscurrent = 0 where id = ".$id  ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
			{
				return true;
			}
			return false ;
		}

		public function LoadList($id)
		{
			$sql = "select * from Keywords where iscurrent = 1 order by Keywords" ;
			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListOfKeywords = "" ;

				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($rows[$i]->id == $id)
						$this->ListOfKeywords = $this->ListOfKeywords."<option selected=\"selected\" value=\"".$rows[$i]->id."\">".$rows[$i]->Keywords."</option>\n" ;
					else
						$this->ListOfKeywords = $this->ListOfKeywords."<option  value=\"".$rows[$i]->id."\">".$rows[$i]->Keywords."</option>\n" ;
				}

				return true;
			}
			return false ;
		}


		public function LoadListOfKeywordsWithNoRun()
		{
			$sql = "select * from Keywords k where id not in (select idKeywords from Keywords_Run where iscurrent = 1)  " ;
			//$sql = "select * from Keywords where iscurrent = 1 order by Keywords" ;
			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListOfKeywords = "" ;

				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($rows[$i]->id == $id)
						$this->ListOfKeywords = $this->ListOfKeywords."<option selected=\"selected\" value=\"".$rows[$i]->id."\">".$rows[$i]->Keywords."</option>\n" ;
					else
						$this->ListOfKeywords = $this->ListOfKeywords."<option  value=\"".$rows[$i]->id."\">".$rows[$i]->Keywords."</option>\n" ;
				}

				return true;
			}
			return false ;
		}




		public function SetKeywords($kw)
		{
			// on limite la taille des Keywords à 200 caractères
			$this->Keywords = substr($kw,0,200) ;
		}


		public function Load($id)
		{
			$stmt = $this->db->query("select * from Keywords where id = ".$id) ;
			if($this->db->getRowCount() >= 1)
			{
				$this->ID = $stmt[0]->id ; 							  // $id de la version en cours
				$this->Keywords = $stmt[0]->Keywords ;
				return true;
			}
			return false ;
		}


		public function GetLastIDCreated()
		{
			$stmt = $this->db->query("select * from Keywords where iscurrent = 1 order by id desc ");
			if($this->db->getRowCount() >= 1)
				return $stmt[0]->id;
			return 0 ;
		}




		public function Save()
		{


			if($this->searchKeywords($this->Keywords))
				return 0 ;

			$sql = "insert into Keywords (iscurrent, Keywords) values(?,?)" ;

			$stmt = $this->db->query($sql , [1,$this->Keywords]);
			if($stmt->affected_rows == 1)
			{
				$this->ID = $this->GetLastIDCreated() ;
				return 1;
			}
			return -1 ;
		}


		public function searchKeywords($kw)
		{
			$sql = "select * from Keywords where iscurrent = 1 and Keywords = \"".$kw."\" " ;
			$stmt = $this->db->query($sql);
			if($this->db->getRowCount())
				return $stmt[0];
			return false;
		}

	}
