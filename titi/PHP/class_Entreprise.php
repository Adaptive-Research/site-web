<?php

	// Author Daniel @2018

	namespace WEB;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class Entreprise
	{

		public $Entreprise;
		public $SiteWeb ;
		public $idSecteur ;
		public $TypeClient ;
		public $Description ;


		public $ListeSecteurs ;


		public $ID ;


		private $db;




		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
			$this->ID = 0 ;
			$this->Entreprise = "" ;
			$this->SiteWeb = "" ;
			$this->Secteur = "" ;
			$this->TypeClient = "" ;

		}



		public function SetEntreprise($e,$sw,$se,$tc,$d)
		{
			$e = trim($e) ;
			if (empty($e))
				return -1 ;


			$this->Entreprise = $e ;
			$this->SiteWeb = $sw ;
			$this->idSecteur = $se ;
			$this->TypeClient = $tc ;
			$this->Description = $d ;

			return 1 ;
		}

		public function BuildListeSecteurs($va)
		{
			$stmt = $this->db->query("select * from Activity where iscurrent = 1 order by Secteur") ;
			$nb = $this->db->getRowCount() ;
			if( $nb >= 1 )
			{
				$contenu = "" ;
				$contenu =  $contenu."<option value=\"0\"></option>\n" ;
				for ($i = 0; $i < $nb ; $i++)
				{
					$chaine = $stmt[$i]->Secteur ;
					if ($stmt[$i]->id == $va)
						$contenu =  $contenu."<option value=\"".$stmt[$i]->id."\" selected>".$chaine."</option>\n" ;
					else
						$contenu =  $contenu."<option value=\"".$stmt[$i]->id."\">".$chaine."</option>\n" ;
			  }
				$this->ListeSecteurs = $contenu ;
			}
		}


		public function Clear()	// Cette fonction remet à 0 les liens de l'article avec ses ancêtres.
		{
			$this->ID = 0 ;
		}




		public function Delete($id)
		{
			$sql = "update Entreprises set iscurrent = 0 where iscurrent = 1 and id = ".$id  ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
				return true;
			return false ;
		}


		public function DeleteEntreprise($e)
		{
			$sql = "update Entreprises set iscurrent = 0 where iscurrent = 1 and Entreprise = '".$e."'"  ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
				return true;
			return false ;
		}


		public function Save()
		{
			$this->Entreprise = trim($this->Entreprise) ;
			if (isset($this->Entreprise))
			{
				if (!empty($this->Entreprise))
				{
						$sql = "insert into Entreprises (iscurrent,Entreprise,SiteWeb,idSecteur,TypeClient,Description) values(?,?,?,?,?,?)" ;
						$stmt = $this->db->query($sql, [1,$this->Entreprise,$this->SiteWeb,$this->idSecteur,$this->TypeClient,$this->Description]);
						if($stmt->affected_rows == 1)
								return 1;
						return -1 ;
				}
				return -3 ;
			}
		}




		public function Entreprise_exists($e)
		{
			$stmt = $this->db->query("select id from Entreprises where iscurrent = 1 and Entreprise = '".$e."'") ;
			if($this->db->getRowCount() >= 1)
				return true;

			return false ;
		}


		public function Load($id)
		{
			$stmt = $this->db->query("select * from Entreprises where iscurrent = 1 and id = ".$id) ;
			if($this->db->getRowCount() >= 1)
			{
				$this->ID = $stmt[0]->id ;
				$this->Entreprise = $stmt[0]->Entreprise ;
				$this->SiteWeb = $stmt[0]->SiteWeb ;
				$this->idSecteur = $stmt[0]->idSecteur;
				$this->TypeClient = $stmt[0]->TypeClient ;
				$this->Description = $stmt[0]->Description ;

				return true;
			}
			return false ;
		}



	} // fin de la classe
