<?php
	// Author Daniel @2018

	namespace Menu;


	class Menu{

		public $contenuGuest ;
		public $contenuDemo ;
		public $contenuFullAdmin ;
		public $baseREP ;


		private function getMenuForGuest($lang){

			if (!isset($contenuGuest))
			{
				$file = $this->baseREP."/LANG/".$lang."/MenuGuest.html" ;
				$contenuGuest = file_get_contents($file) ;
			}

			return $contenuGuest ;
		}


		private function getMenuForDemo($lang){

			if (!isset($contenuDemo))
			{
				$file = $this->baseREP."/LANG/".$lang."/MenuDemo.html" ;
				$contenuDemo = file_get_contents($file) ;

			}
			return $contenuDemo ;
		}



		private function getMenuForFullAdmin($lang){
			if (!isset($contenuFullAdmin))
			{
				$file = $this->baseREP."/LANG/".$lang."/MenuFullAdmin.html" ;
				$contenuFullAdmin = file_get_contents($file) ;
			}

			return $contenuFullAdmin ;
		}



		public function getMenuForGroup($group,$lang){

			if ($group == "Guest")
				return $this->getMenuForGuest($lang) ;

			if ( ($group == "Demo")  )
				return $this->getMenuForDemo($lang) ;

			if  ($group == "FullAdmin")
				return $this->getMenuForFullAdmin($lang) ;


			return $this->getMenuForGuest($lang) ;
		}


	}
