<?php

	// Author Daniel @2018

	namespace WEB;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class Article
	{
		public $ID ;
		public $HasBeenLoaded ;
		public $idRSS ;
		public $Article_Link;
		public $Article_Title ;
		public $Article_Description;
		public $Article_Date;

		public $Fichier ;


		private $db;







		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
			$this->ID = 0 ;
		}

		public function SetInfosArticle($id, $l,$t)
		{
			$this->HasBeenLoaded = 0 ;
			$this->idRSS = $id ;
			$this->Article_Link = $l ;
			$this->Article_Title = $t ;
			$this->Article_Description = "" ;
			$this->Article_Date = "" ;
			$this->Fichier = "" ;
			return 1 ;
		}



		public function SetArticle($h, $id, $l,$t,$de,$da,$f)
		{
			$this->HasBeenLoaded = $h ;
			$this->idRSS = $id ;
			$this->Article_Link = $l ;
			$this->Article_Title = $t ;
			$this->Article_Description = $de ;
			$this->Article_Date = $da ;
			$this->Fichier = $f ;
			return 1 ;
		}



		public function Clear()	// Cette fonction remet à 0 les liens de l'article avec ses ancêtres.
		{
			$this->ID = 0 ;
		}


		public function UpdateFile($id,$f)
		{
			$sql = "update Articles set HasBeenLoaded = 1, Fichier = '".$f."' where id = ".$id  ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
				return true;
			return false ;
		}


		public function Delete($id)
		{
			$sql = "update Articles set iscurrent = 0 where iscurrent = 1 and id = ".$id  ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
				return true;
			return false ;
		}


		public function Save()
		{
			if (isset($this->Article_Link))
			{
				$link = trim($this->Article_Link) ;
				if (!empty($link))
				{
					$stmt = $this->db->query("select * from Articles where iscurrent = 1 and Article_Link = '".$link."'") ;
					if($this->db->getRowCount() < 1)
					{
						$stmt2 = $this->db->query("insert into Articles (iscurrent,HasBeenLoaded,idRSS, Article_Link, Article_Title) values(?,?,?,?,?)", [1,0,$this->idRSS, $link,$this->Article_Title]);
						if($stmt2->affected_rows == 1)
								return 1;
					}
				}
			}

			return -1 ;
		}



		public function Load($id)
		{
			$stmt = $this->db->query("select * from Articles where id = ".$id) ;
			if($this->db->getRowCount() >= 1)
			{
				$this->ID = $stmt[0]->id ;
				$this->SetArticle( $stmt[0]->HasBeenLoaded, $stmt[0]->idRSS, $stmt[0]->Article_Link, $stmt[0]->Article_Title, $stmt[0]->Article_Description, $stmt[0]->Article_Date, $stmt[0]->Fichier ) ;
				return true;
			}
			return false ;
		}



	} // fin de la classe
