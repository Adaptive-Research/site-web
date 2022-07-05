<?php
	// Author Daniel @2018

	namespace Footer;


	class Footer{

		public $contenuGuest ;
		public $contenuDemo ;
		public $contenuFullAdmin ;
		public $baseREP ;


		private function getFooterForGuest(){

			if (!isset($contenuGuest))
			{
				$file = $this->baseREP."/templates/footer.html" ;
				$contenuGuest = file_get_contents($file) ;
			}

			return $contenuGuest ;
		}

		private function getFooterForDemo(){
			if (!isset($contenuDemo))
			{
				$file = $this->baseREP."/templates/FooterDemo.html" ;
				$contenuDemo = file_get_contents($file) ;
			}

			return $contenuDemo ;
		}





		private function getFooterForFullAdmin(){
			if (!isset($contenuFullAdmin))
			{
				$file = $this->baseREP."/templates/FooterFullAdmin.html" ;
				$contenuFullAdmin = file_get_contents($file) ;
			}

			return $contenuFullAdmin ;
		}



		public function getFooterForGroup($group){

			if ($group == "Guest")
				return $this->getFooterForGuest() ;

			if ( ($group == "Demo")  )
				return $this->getFooterForDemo() ;

			if  ($group == "FullAdmin")
				return $this->getFooterForFullAdmin() ;

			return $this->getFooterForGuest() ;
		}


	}
