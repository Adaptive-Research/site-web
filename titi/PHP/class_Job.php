<?php

	// Author Daniel @2018

	namespace WEB;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class Job
	{

		public $NomJob;
		public $Status;
		public $InfoSup;
		public $Author ;


		private $db;




		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
			$this->Status = 0 ;
			$this->InfoSup = "" ;
		}


		public function SetJob($nj,$a)
		{
			$this->NomJob = $nj ;
			$this->Author = $a ;
			return 1 ;
		}



		public function Clear()	// Cette fonction remet à 0 les liens de l'article avec ses ancêtres.
		{
			$this->ID = 0 ;
		}


		public function UpdateStatus($id,$s,$i)
		{
			$this->Status = $s ;
			$this->InfoSup = $i ;

			$sql = "update Jobs set Status = ".$s." , InfoSup = '".$i."' where id = ".$id  ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
				return true;
			return false ;
		}


		public function Delete($id)
		{
			$sql = "update Jobs set iscurrent = 0 where iscurrent = 1 and id = ".$id  ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
				return true;
			return false ;
		}



		public function Save()
		{
				$sql = "insert into Jobs (iscurrent,NomJob,Status,InfoSup,Author) values(?,?,?,?,?)" ;
				$stmt = $this->db->query($sql,[1,$this->NomJob,$this->Status,$this->InfoSup,$this->Author]);
				if($stmt->affected_rows == 1)
						return 1;
		}


		public function GetId($NomJob,$idUser)
		{
			$stmt = $this->db->query("select * from Jobs where NomJob = '".$NomJob."' and Author = ".$idUser." order by date desc") ;
			if($this->db->getRowCount() >= 1)
			{
				return $stmt[0]->id ;
			}
			return -1 ;
		}





	} // fin de la classe
