<?php

	// Author Daniel @2018

	namespace Log;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class LogUser
	{

		public $idSession;
		public $idUser;


		private $db;




		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
			$this->idSession = "" ;
			$this->idUser = 0 ;
		}




		public function SetUser($ids,$u)
		{
			$this->idSession = $ids ;
			$this->idUser = $u ;
		}




		public function Save()
		{
				$sql = "insert into LogUser (idSession,idUser) values('".$this->idSession."',".$this->idUser.")" ;
				$stmt = $this->db->query($sql);
				if($stmt->affected_rows == 1)
						return 1;

				return -1 ;
		}



		public function Load($ids)
		{
				$stmt = $this->db->query("select * from LogUser where idSession = '".$ids."'") ;
				if($this->db->getRowCount() >= 1)
				{
					$this->idSession = $ids ;
					$this->idUser = $stmt[0]->idUser ;

					return true;
				}
				return false ;
		}



	} // fin de la classe
