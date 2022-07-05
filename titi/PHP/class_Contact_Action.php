<?php
	//Author: Henok Hailemariam @2017
	// Modified by Daniel @2018
	namespace User;

	require_once $baseREP.'/PHP/class_database.php' ;
	require_once $baseREP.'/PHP/class_PHPMail.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;

	const cookieName = "loggedInUser";
	const cookieExpirationDate = 1; //in days
	const linkToPasswordResetPage = "./resetPassword?token=";


	class User{

		private $db;

		public $ID ;


		public $Genre ;
		public $Prenom ;
		public $Nom ;

		public $Email ;
		public $group_name ;
		public $Langue ;


		public function __construct(){
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
		}



		public function Delete($id)
		{
			$sql = "delete from users where id = ".$id  ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
			{
				return true;
			}
			return false ;
		}

		public function DeleteFromMail($m)
		{
			$sql = "delete from users where Email = '".$m."'" ;
			$stmt = $this->db->query($sql) ;
			if($stmt->affected_rows == 1)
			{
				return true;
			}
			return false ;
		}


		public function SetUser($ge,$p,$n,$e,$l,$g)
		{
			$this->Genre = $ge ;
			$this->Prenom = $p ;
			$this->Nom = $n ;
			$this->Email = $e ;
			$this->Langue = $l;
			$this->group_name = $g ;
		}


		public function Load($id)
		{
			$stmt = $this->db->query("select * from users where id = ".$id) ;
			if($this->db->getRowCount() >= 1)
			{
				$this->ID = $stmt[0]->id ; 							  // $id de la version en cours

				$this->SetUser($stmt[0]->Genre, $stmt[0]->Prenom, $stmt[0]->Nom, $stmt[0]->Email,$stmt[0]->Langue, $stmt[0]->group_name) ;

				return true;
			}
			return false ;
		}


		public function GetLastIDCreated()
		{
			$stmt = $this->db->query("select * from users where iscurrent = 1 order by id desc ");
			if($this->db->getRowCount() >= 1)
				return $stmt[0]->id;
			return 0 ;
		}



		public function GetValueLangue($l)
		{
			$stmt = $this->db->query("select Value from Langues where Langue = '".$l."'" );
			if($this->db->getRowCount() >= 1)
				return $stmt[0]->Value;
			return "" ;
		}

		public function UpdateValueLangue($idUser, $v)
		{
			$stmt = $this->db->query("update `users` set ValueLangue  = ? where id = ?", [$v, $idUser]);
			if($stmt->affected_rows == 1)
				return true ;
			return false ;
		}


		public function addUser($genre,$prenom,$nom, $email , $pass, $l, $gn, $a)
		{

			if($this->searchUser($email))
				throw new UserError("Email address already exists.");

			$stmt = $this->db->query("insert into users (iscurrent, Genre, Prenom, Nom, Email, Password, email_verified, Langue, group_name,author) values(?,?,?,?,?,?,?,?,?,?)", [1,$genre,$prenom,$nom,$email, $this->generatePassHash($pass),0, $l, $gn,$a]);
			if($stmt->affected_rows == 1)
			{
				$idUser = $this->GetLastIDCreated() ;

				$ValueLangue = $this->GetValueLangue($l) ;
				$this->UpdateValueLangue($idUser,$ValueLangue) ;

				return true;
			}
			return false;
		}


		public function searchUser($email, $id = null){
			if($id){
				$col = "id";
				$val = $id;
			}
			else
			{
				$col = "Email";
				$val = $email;
			}
			$stmt = $this->db->query("select * from `users` where {$col} = ? and iscurrent = 1",[$val]);
			if($this->db->getRowCount()){
				return $stmt[0];
			}
			return false;
		}


		public function login($email, $pass, $remember_me = null)
		{
			if(!$this->isUserLoggedIn())
			{
				$user = $this->searchUser($email);
				if($user)
				{
					if(password_verify($pass, $user->Password))
						$this->createSession($user, $remember_me);
					else
						throw new UserError("Invalid email/Password");
				}
				else
					throw new UserError("Invalid email/Password");
			}
			else
				throw new UserError("Already logged in");
		}


		public function checkSession()
		{
			if(!$this->isUserLoggedIn()){
				$cookie = $this->getCookie();

				if($cookie){
					$tokenDetails = $this->retrieveCookieToken($cookie[0]);
					if($tokenDetails){
						if(hash_equals($tokenDetails->token, $cookie[1])){
							$user = $this->searchUser(null, $tokenDetails->user_id);
							$this->createSession($user);
							return true;
						}
						else{
							$this->deleteCookieToken($cookie[0]);
							$this->removeCookie();
						}
					}
					else{
						$this->removeCookie();
					}
				}
			}
			return false;
		}


		public function forgotPassword($email)
		{
			if(!$this->isUserLoggedIn())
			{

				$user = $this->searchUser($email);
				if($user){
					$obj = new PHPMail;
					$token = $this->generateToken();
					$msg = "Please follow the link below to reset your password<br/><br/>".linkToPasswordResetPage.$token;
					$obj->sendMail($email, "Password Reset Request", $msg, "Reset your password");
					$stmt = $this->db->query("insert into `password_reset_requests` (email, token, expiration_date) values(?,?,?)", [$email, $token, time() + (24 * 60 * 60)]);
				}
				return "We have received your request. Follow the instructions once you receive an email";
			}
			else
			{
				throw new UserError("User already logged in.");
			}
		}

		public function logMeOut()
		{
			if($this->isUserLoggedIn()){
				$cookie = $this->getCookie();
				$this->deleteCookieToken($cookie[0]);
				$this->removeCookie();
				unset($_SESSION['current_user']);
				session_destroy();
				return true;
			}
			else
				throw new UserError("No logged in User");
		}

		public function logeMeOutOfAllDevices($id)
		{
			if($this->logMeOut()){
				$stmt = $this->db->query("delete from user_sessions where user_id = ?",[$id]);
			}
		}

		public function isUserLoggedIn()
		{

			if(isset($_SESSION['current_user']))
			{
				//echo "<script>alert('".$_SESSION['current_user']->Email."');</script>";
				return true;
			}
			return false;
		}


		public function verifyToken($token)
		{
			$stmt = $this->db->query("select * from `password_reset_requests` where `token` = ?", [$token]);
			if($this->db->getRowCount() < 1){
				throw new UserError("Link has expired or doesn't exist.");
				return false;
			}
			else{
				if(time() < $stmt[0]->expiration_date){
					return $stmt[0]->email;
				}
				$stmt = $this->db->query("delete from `password_reset` where `token` = ?", [$token]);
				throw new UserError("The Link has expired.");
			}
		}

		public function resetPassword($password, $email)
		{
			$hash = $this->generatePassHash($password);
			$stmt = $this->db->query("update `users` set password  = ? where email = ?", [$hash, $email]);
			if($stmt->affected_rows == 1){
				$stmt = $this->db->query("delete from `password_reset_requests` where email = ?",[$email]);
			}
		}

		//should be used with cron job
		public function deleteExpriedSessions()
		{
			$stmt = $this->db->query("delete from `user_sessions` where expires > ?", [time()]);
		}


		private function deleteCookieToken($token_id)
		{
			$stmt = $this->db->query("delete from user_sessions where id = ?",[$token_id]);
		}


		private function createSession($user, $rememb = null)
		{
			unset($user->password);

			if($rememb){
				$this->createCookie($user->id);
			}

			$_SESSION['current_user'] = $user;
			$this->updateLogin($user->email);

		}


		private function createCookie($user_id)
		{
			$cookieToken = $this->addCookieToken($user_id, $this->generateToken(30));
			$cookieVal = $cookieToken[0]."#".$cookieToken[1];

			setcookie("loggedInUser", $cookieVal, time() + (86400 * cookieExpirationDate), "/"); // 86400 = 1 day
		}

		private function addCookieToken($id, $token)
		{
			$time = time() + (86400 * cookieExpirationDate);
			$stmt = $this->db->query("insert into `user_sessions`(user_id, token, expires) values(?,?,?)",[$id, $token, $time]);
			return [$stmt->insert_id, $token];
		}

		private function getCookie()
		{
			if(isset($_COOKIE[cookieName])){
				return explode("#",$_COOKIE[cookieName]);
			}
			return false;
		}


		private function retrieveCookieToken($token_id)
		{
			$stmt = $this->db->query("select * from user_sessions where id = ?", [$token_id]);
			if($this->db->getRowCount() < 1){
				return false;
			}
			return $stmt[0];
		}


		private function updateLogin($email)
		{
			$stmt = $this->db->query("update `users` set `last_login` = ? where `email` = ?",[time(), $email]);
		}

		private function generatePassHash($str)
		{
			return password_hash($str, PASSWORD_BCRYPT, array('cost' => 10));
		}


		private function generateToken($length = 20)
		{
			return bin2hex(random_bytes($length));
		}


		private function removeCookie()
		{
			unset($_COOKIE[cookieName]);
			setcookie(cookieName, '', time() - 3600, '/');
		}
	}
