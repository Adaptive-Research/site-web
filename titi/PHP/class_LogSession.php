<?php

	// Author Daniel @2018

	namespace Log;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class LogSession
	{
		public $idSession;
		public $IP ;
		public $UserAgent ;		// le UserAgent permet de savoir si cela vient d'un portable ou d'un pc
		public $Referer ;			// le Referer permet de savoir si c'est direct ou si cela a été redirigé à partir d'un site
		public $Accept ;
		public $Accept_Language ;
		public $Accept_Encoding ;

		private $db;



		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
			$this->idSession = "" ;
			$this->IP = "" ;
			$this->UserAgent = "" ;
			$this->Referer = "" ;
		}


		public function SetSession($ids,$ip,$ua,$a,$ae,$al,$ref)
		{
			$this->idSession = $ids ;
			$this->IP = $ip ;
			$this->UserAgent = $ua;
			$this->Accept = $a ;
			$this->Acccept_Encoding = $ae ;
			$this->Accept_Language = $al ;
			$this->Referer = $ref ;
		}


		public function Save()
		{
				$this->UserAgent = str_replace("'",'"',$this->UserAgent) ;
				$sql = "insert into LogSession (idSession,IP,UserAgent,Accept,Accept_Language, Accept_Encoding, Referer) values('".$this->idSession."','" ;
				$sql = $sql.$this->IP."','".$this->UserAgent."','".$this->Accept."','".$this->Accept_Language."','".$this->Accept_Encoding."','".$this->Referer."')" ;

				$stmt = $this->db->query($sql);
				if($stmt->affected_rows == 1)
						return 1;

				return -1 ;
		}



		public function Load($ids)
		{
			$stmt = $this->db->query("select * from LogSession where idSession = '".$ids."'") ;
			if($this->db->getRowCount() >= 1)
			{
				$this->idSession = $ids ;
				$this->IP = $stmt[0]->IP ;
				$this->UserAgent = $stmt[0]->UserAgent ;
				$this->Referer = $stmt[0]->Referer ;

				return true;
			}
			return false ;
		}



	} // fin de la classe
