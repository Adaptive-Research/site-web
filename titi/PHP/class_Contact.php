<?php
	//Author: Henok Hailemariam @2017
	// Modified by Daniel @2018
	namespace User;

	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;



	class Contact{

		private $db;

		public $ID ;

		public $Sexe ;
		public $Prenom ;
		public $Nom ;

		public $ValueLangue ;

		public $SiteWeb ;
		public $Entreprise ;
		public $idTypeContact ;
		public $Fonction ;

		public $Telephone1 ;
		public $Telephone2 ;

		public $Email ;

    public $LinkedIn ;
    public $Facebook ;
    public $Instagram ;
    public $Viadeo ;

		public $ListOfInterlocuteurs ;


		public $Author ;

		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset('utf8') ;

			$this->ID = -1 ;

			$this->Sexe = "" ;
			$this->Prenom = "" ;
			$this->Nom = "" ;
			$this->Entreprise = "" ;
			$this->idTypeContact = 1 ;
			$this->Fonction = "" ;
			$this->ValueLangue = "" ;

			$this->Telephone1 = "" ;
			$this->Telephone2 = "" ;
			$this->Email = "" ;

			$this->LinkedIn = "" ;
			$this->Facebook = "" ;
			$this->Instagram = "" ;
			$this->Viadeo = "" ;
		}



		public function Delete($id)
		{
			$sql = "update Contacts set iscurrent = 0 where id = ".$id  ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
			{
				return true;
			}
			return false ;
		}

		public function DeleteFromMail($m)
		{
			$sql = "update Contacts set iscurrent = 0 where Email = '".$m."'" ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
				return true;

			return false ;
		}


		public function SetContact($s,$p,$n,$vl,$sw,$en,$idTC,$fo,$t1,$t2,$em,$ll,$lf,$lin,$lv,$a)
		{
			$this->Sexe = $s ;
			$this->Prenom = $p ;
			$this->Nom = $n ;

			$this->ValueLangue  = $vl ;

			$this->SiteWeb = $sw ;
		  $this->Entreprise = $en;
			$this->idTypeContact = $idTC ;
		  $this->Fonction = $fo;

		  $this->Telephone1 = $t1 ;
		  $this->Telephone2 = $t2 ;

		  $this->Email = $em ;

		  $this->LinkedIn = $ll ;
		  $this->Facebook = $lf ;
		  $this->Instagram = $lin;
		  $this->Viadeo = $lv;

			$this->Author = $a ;
		}


		public function BuildListOfInterlocuteurs()
		{
			$stmt = $this->db->query("select * from Contacts where iscurrent = 1 order by Prenom") ;
			$nb = $this->db->getRowCount() ;
			if( $nb >= 1 )
			{
				$contenu = "" ;
				for ($i = 0; $i < $nb ; $i++)
				{
					$chaine = $stmt[$i]->Prenom." ".$stmt[$i]->Nom."  (".$stmt[$i]->Entreprise.")" ;
					$contenu =  $contenu."<option value=\"".$stmt[$i]->id."\">".$chaine."</option>\n" ;
			  }
				$this->ListOfInterlocuteurs = $contenu ;
			}
		}




		public function Load($id)
		{
			$stmt = $this->db->query("select * from Contacts where id = ".$id) ;
			if($this->db->getRowCount() >= 1)
			{
				$this->ID = $stmt[0]->id ; 							  // $id de la version en cours

				$this->Sexe = $stmt[0]->Sexe ;
				$this->Prenom = $stmt[0]->Prenom ;
				$this->Nom = $stmt[0]->Nom ;

				$this->ValueLangue  = $stmt[0]->ValueLangue ;

				$this->SiteWeb = $stmt[0]->SiteWeb ;
			  $this->Entreprise = $stmt[0]->Entreprise ;
				$this->idTypeContact = $stmt[0]->idTypeContact ;
			  $this->Fonction = $stmt[0]->Fonction ;

			  $this->Telephone1 = $stmt[0]->Telephone1 ;
			  $this->Telephone2 = $stmt[0]->Telephone2 ;

			  $this->Email = $stmt[0]->Email ;

			  $this->LinkedIn = $stmt[0]->LinkedIn ;
			  $this->Facebook = $stmt[0]->Facebook ;
			  $this->Instagram = $stmt[0]->Instagram ;
			  $this->Viadeo = $stmt[0]->Viadeo ;

				$this->Author = $stmt[0]->Author ;

				return true;
			}
			return false ;
		}


		public function GetLastIDCreated()
		{
			$stmt = $this->db->query("select * from Contacts where iscurrent = 1 order by id desc ");
			if($this->db->getRowCount() >= 1)
				return $stmt[0]->id;
			return 0 ;
		}



		public function GetLangue($vl)
		{
			$stmt = $this->db->query("select Langue from Langues where Value = '".$vl."'" );
			if($this->db->getRowCount() >= 1)
				return $stmt[0]->Langue;
			return "" ;
		}

// Save
// renvoie 0 quand la sauvegarde a réussi
// renvoie une valeur > 0 quand le contact existait déjà
// renvoie -1 quand la sauvegarde a échoué
		public function Save()
		{

			$res = $this->searchContact($this->Prenom,$this->Nom,$this->Entreprise,$this->Email) ;
			if ($res > 0)
				return $res ;

			$sql = "insert into Contacts (iscurrent, Sexe, Prenom, Nom, ValueLangue, SiteWeb, Entreprise, idTypeContact, Fonction, Telephone1, Telephone2, Email, " ;
			$sql = $sql."LinkedIn, Facebook, Instagram, Viadeo, Author) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ;

			$stmt = $this->db->query($sql , [1,$this->Sexe,$this->Prenom,$this->Nom,$this->ValueLangue,$this->SiteWeb,$this->Entreprise,$this->idTypeContact,$this->Fonction,
			$this->Telephone1,$this->Telephone2,$this->Email,
			$this->LinkedIn,$this->Facebook,$this->Instagram,$this->Viadeo,$this->Author]);
			if($stmt->affected_rows == 1)
			{
				$this->ID = $this->GetLastIDCreated() ;
				return 0 ;
			}
			return -1 ;
		}

		public function Modify()
		{
			$id = $this->searchContact($this->Prenom,$this->Nom,$this->Entreprise,$this->Email) ;
			if ($id < 0)
				$id = $this->searchContact2($this->Prenom,$this->Nom) ;
			if ($id < 0)
				$id = $this->searchContact3($this->Email) ;
			if ($id < 0)
				return $id ;


			$sql = "update Contacts set Sexe = '".$this->Sexe."', Prenom = '".$this->Prenom."', Nom = '".$this->Nom."', " ;
			$sql = $sql. " ValueLangue = '".$this->ValueLangue."', SiteWeb = '".$this->SiteWeb."', Entreprise = '".$this->Entreprise."', " ;
			$sql = $sql. " idTypeContact = ".$this->idTypeContact.", Fonction = '".$this->Fonction."', Telephone1 = '".$this->Telephone1."', " ;
			$sql = $sql. " Telephone2 = '".$this->Telephone2."', Email = '".$this->Email."', LinkedIn = '".$this->LinkedIn."', " ;
			$sql = $sql. " Facebook = '".$this->Facebook."', Instagram = '".$this->Instagram."', Viadeo = '".$this->Viadeo."' " ;
			$sql = $sql. " where id = ".$id ;

			//echo "<script>alert('".$sql."');</script>";


			$stmt = $this->db->query($sql);
			if($stmt->affected_rows == 1)
				return 0 ;

			return -1 ;
		}


		public function searchContact2($Prenom,$Nom)
		{
			$sql = "select * from Contacts where Prenom  = '".$Prenom."' and Nom = '".$Nom."' and iscurrent = 1" ;
			$stmt = $this->db->query($sql);
			if($this->db->getRowCount())
				return $stmt[0]->id;
			return -1;
		}

		public function searchContact3($Email)
		{
			$sql = "select * from Contacts where Email = '".$Email."' and iscurrent = 1" ;
			$stmt = $this->db->query($sql);
			if($this->db->getRowCount())
				return $stmt[0]->id;
			return -1;
		}


		public function searchContact($Prenom,$Nom,$Entreprise,$Email)
		{
			$sql = "select * from Contacts where Prenom  = '".$Prenom."' and Nom = '".$Nom."' and Entreprise = '".$Entreprise."' and Email = '".$Email."' and iscurrent = 1" ;
			$stmt = $this->db->query($sql);
			if($this->db->getRowCount())
				return $stmt[0]->id;
			return -1;
		}

	}
