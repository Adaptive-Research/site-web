<?php
	//Author: Henok Hailemariam @2017
	// Modified by Daniel @2018
	namespace SEO;

	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;



	class Keywords_Run{

		private $db;

		public $ID ;
		public $idKeywords ;
		public $Moteur ;
		public $DateRun ;




		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset('utf8') ;

			$this->ID = 0 ;
			$this->idKeywords = 0 ;
			$this->Moteur = 'google' ;
			$this->DateRun = 0 ;
		}



		public function DeleteRun($id)
		{
			$sql = "update Keywords_Run set iscurrent = 0 where id = ".$id  ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
			{
				return true;
			}
			return false ;
		}




		public function SetRun($m,$kw)
		{
			// on limite la taille des Keywords à 200 caractères
			$this->Moteur = $m ;
			$this->idKeywords = $kw ;
		}


		public function Load($id)
		{
			$stmt = $this->db->query("select * from Keywords_Run where id = ".$id) ;
			if($this->db->getRowCount() >= 1)
			{
				$this->ID = $stmt[0]->id ; 							  // $id de la version en cours
				$this->idKeywords = $stmt[0]->idKeywords ;
				$this->Moteur = $stmt[0]->Moteur ;
				$this->DateRun = $stmt[0]->DateRun ;
				return true;
			}
			return false ;
		}


		public function GetLastIDCreated()
		{
			$stmt = $this->db->query("select * from Keywords_Run where iscurrent = 1 order by id desc ");
			if($this->db->getRowCount() >= 1)
				return $stmt[0]->id;
			return 0 ;
		}




		public function Save()
		{
			$sql = "insert into Keywords_Run (iscurrent, idKeywords, Moteur) values(?,?,?)" ;

			$stmt = $this->db->query($sql , [1,$this->idKeywords,$this->Moteur]);
			if($stmt->affected_rows == 1)
			{
				$this->ID = $this->GetLastIDCreated() ;
				return 1;
			}
			return -1 ;
		}


	}
