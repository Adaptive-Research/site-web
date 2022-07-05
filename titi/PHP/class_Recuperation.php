<?php

	// Author Daniel @2018

	namespace WEB;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class Recuperation
	{

		public $ID ;
		public $idRSS ;
		public $Fichier ;


		private $db;







		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
			$this->ID = 0 ;
		}



		public function SetRecup($i,$f)
		{
			$this->idRSS = $i ;
			$this->Fichier = $f ;
			return 1 ;
		}



		public function Clear()	// Cette fonction remet à 0 les liens de l'article avec ses ancêtres.
		{
			$this->ID = 0 ;
		}




		public function Delete($id)
		{
			$sql = "update Recuperations set iscurrent = 0 where iscurrent = 1 and id = ".$id  ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
				return true;
			return false ;
		}



		public function Save()
		{
			$stmt = $this->db->query("insert into Recuperations (iscurrent,idRSS,Fichier) values(?,?,?)", [1,$this->idRSS,$this->Fichier]);
			if($stmt->affected_rows == 1)
					return 1;

			return -1 ;
		}





		public function Load($id)
		{
			$stmt = $this->db->query("select * from Recuperations where id = ".$id) ;
			if($this->db->getRowCount() >= 1)
			{
				$this->ID = $stmt[0]->id ;
				$this->SetRecup($stmt[0]->idRSS, $stmt[0]->Fichier ) ;
				return true;
			}
			return false ;
		}



	} // fin de la classe
