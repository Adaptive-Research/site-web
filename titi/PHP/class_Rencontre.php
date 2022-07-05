<?php
	//Author: Henok Hailemariam @2017
	// Modified by Daniel @2018
	namespace User;

	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;



	class Rencontre{

		private $db;

		public $ID ;

		public $idContacts ;
		public $DateEvent ;
		public $TypeEvent ;
		public $Commentaire ;


		public $Author ;

		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset('utf8') ;

			$this->idContacts = -1 ;
			$this->DateEvent = date("Y-m-d H:i:s") ;
			$this->TypeEvent = "" ;
			$this->Commentaire = "" ;
		}



		public function Delete($id)
		{
			$sql = "update Contacts_Rencontres set iscurrent = 0 where id = ".$id  ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
			{
				return true;
			}
			return false ;
		}



		public function SetRencontre($id,$te,$c, $a)
		{
			$this->idContacts = $id ;
			$this->TypeEvent = $te ;
			// on limite la taille du commentaire à 1499 caractères
			$this->Commentaire = substr($c,0,1499) ;
			$this->Author = $a ;
		}


		public function Load($id)
		{
			$stmt = $this->db->query("select * from Contacts_Rencontres where id = ".$id) ;
			if($this->db->getRowCount() >= 1)
			{
				$this->ID = $stmt[0]->id ; 							  // $id de la version en cours

				$this->SetRencontre($stmt[0]->idContacts, $stmt[0]->TypeEvent, $stmt[0]->Commentaire ,$stmt[0]->Author) ;
				return true;
			}
			return false ;
		}


		public function GetLastIDCreated()
		{
			$stmt = $this->db->query("select * from Contacts_Rencontres where iscurrent = 1 order by id desc ");
			if($this->db->getRowCount() >= 1)
				return $stmt[0]->id;
			return 0 ;
		}






		public function Save()
		{

			if($this->searchRencontre($this->idContacts, $this->DateEvent, $this->TypeEvent))
				return 0 ;

			$sql = "insert into Contacts_Rencontres (iscurrent, idContacts, DateEvent, TypeEvent, Commentaire, Author) " ;
			$sql = $sql." values(?,?,?,?,?,?)" ;

			$stmt = $this->db->query($sql , [1,$this->idContacts,$this->DateEvent,$this->TypeEvent,$this->Commentaire,$this->Author]);
			if($stmt->affected_rows == 1)
			{
				$this->ID = $this->GetLastIDCreated() ;
				return 1;
			}
			return -1 ;
		}


		public function searchRencontre($id,$de,$te)
		{
			$sql = "select * from Contacts_Rencontres where idContacts = ".$id." " ;
			$sql = $sql." and DateEvent = '".$de."' and TypeEvent = '".$te."' and iscurrent = 1" ;
			$stmt = $this->db->query($sql);
			if($this->db->getRowCount())
				return $stmt[0];
			return false;
		}

	}
