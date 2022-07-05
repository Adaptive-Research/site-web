<?php

	// Author Daniel @2018

	namespace WEB;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class RSS
	{

		public $Channel_URL;

		public $TypeURL ;
		public $Channel_Title;
		public $SiteWeb ;
		public $Repertoire ;
		public $Intervalle_Day ;
		public $Intvervalle_Time ;

		public $LastRecuperation ;


		public $Author ;
		public $ID ;


		private $db;







		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
			$this->ID = 0 ;
		}



		public function SetRSS($u,$a)
		{
			$u = trim($u) ;
			if (empty($u))
				return -1 ;

			$this->TypeURL = "RSS" ;
			$this->Channel_URL = $u ;
			$this->Author = $a ;
			$this->Intervalle_Day = 0 ;
			$this->Intervalle_Time = "04:00:00" ;
			return 1 ;
		}

		public function SetBLOG($u,$a)
		{
			$u = trim($u) ;
			if (empty($u))
				return -1 ;

			$this->TypeURL = "blog" ;
			$this->Channel_URL = $u ;
			$this->Author = $a ;
			$this->Intervalle_Day = 7 ;
			$this->Intervalle_Time = "00:00:00" ;

			return 1 ;
		}


		public function Clear()	// Cette fonction remet à 0 les liens de l'article avec ses ancêtres.
		{
			$this->ID = 0 ;
		}




		public function Delete($id)
		{
			$sql = "update RSS set iscurrent = 0 where iscurrent = 1 and id = ".$id  ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
				return true;
			return false ;
		}


		public function DeleteURL($url)
		{
			$sql = "update RSS set iscurrent = 0 where iscurrent = 1 and url = '".$url."'"  ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
				return true;
			return false ;
		}

		public function UpdateSiteWeb($url,$rep)
		{
			$sql = "update RSS set SiteWeb = '".$rep."' where iscurrent = 1 and Channel_URL = '".$url."'" ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
				return true;
			return false ;
		}



		public function UpdateDirectory($url,$rep)
		{
			$sql = "update RSS set Repertoire = '".$rep."' where iscurrent = 1 and Channel_URL = '".$url."'" ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
				return true;
			return false ;
		}

		public function UpdateLastRecuperation($id,$rep)
		{
			$sql = "update RSS set LastRecuperation = '".$rep."' where iscurrent = 1 and id = ".$id ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
				return true;
			return false ;
		}

		public function Save()
		{
			$this->Channel_URL = trim($this->Channel_URL) ;
			if (isset($this->Channel_URL))
			{
				if (!empty($this->Channel_URL))
				{
					$res = $this->URL_exists($this->Channel_URL) ;
					if (!$res)
					{
						$stmt = $this->db->query("insert into RSS (iscurrent,TypeURL,Channel_URL,Intervalle_Day, Intervalle_Time,Author) values(?,?,?,?,?,?)", [1,$this->TypeURL,$this->Channel_URL,$this->Intervalle_Day,$this->Intervalle_Time,$this->Author]);
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




		public function URL_exists($url)
		{
			$stmt = $this->db->query("select id from RSS where iscurrent = 1 and Channel_URL = '".$url."'") ;
			if($this->db->getRowCount() >= 1)
				return true;

			return false ;
		}


		public function Load($id)
		{
			$stmt = $this->db->query("select * from RSS where id = ".$id) ;
			if($this->db->getRowCount() >= 1)
			{
				$this->ID = $stmt[0]->id ;
				$this->TypeURL = $stmt[0]->TypeURL ;
				$this->Channel_URL = $stmt[0]->Channel_URL ;
				$this->Intervalle_Day = $stmt[0]->Intervalle_Day ;
				$this->Intervalle_Time = $stmt[0]->Intervalle_Time ;
				$this->Channel_Title = $stmt[0]->Channel_Title ;
				$this->SiteWeb = $stmt[0]->SiteWeb ;
				$this->Repertoire = $stmt[0]->Repertoire ;
				$this->LastRecuperation = $stmt[0]->LastRecuperation ;
				$this->Author = $stmt[0]->Author ;

				return true;
			}
			return false ;
		}



	} // fin de la classe
