

use SEO ;

CREATE TABLE `Config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iscurrent` int(11) DEFAULT NULL,
  `typeitem` varchar(100) NOT NULL,
  `parameter` varchar(100) NOT NULL,
  `item` varchar(100) NOT NULL,
  `ordre` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_bin ;


INSERT INTO `Config` (`id`, `iscurrent`, `typeitem`, `parameter`, `item`, `ordre`, `date`) VALUES
(1, NULL, '[Messages]', 'FR', 'Messages', 0, '2019-02-02 08:59:09'),
(2, NULL, '[Messages]', 'EN', 'Mails', 0, '2019-02-02 08:59:09'),
(3, NULL, '[Messages]', 'ES', 'Mensages', 0, '2019-02-02 08:59:09'),
(4, NULL, '[Actualités]', 'DE', 'Nachrichten', 0, '2019-02-02 08:59:09');



use SEO ;
drop table if exists password_reset_requests ;
CREATE TABLE IF NOT EXISTS password_reset_requests (
  id INT(11) NOT NULL AUTO_INCREMENT,
  email varchar(250) NOT NULL,
  token varchar(250) NOT NULL,
  expiration_date varchar(250) NOT NULL,
  PRIMARY KEY (id)
) ;



use SEO ;
drop table if exists users;
CREATE TABLE IF NOT EXISTS users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  iscurrent INT,

  Genre VARCHAR(5) NOT NULL,          
  Prenom  VARCHAR(75),                  
  Nom  VARCHAR(75),                     

  Email varchar(250) NOT NULL,
  Password varchar(250) NOT NULL,
  email_verified int,

  group_name varchar(50) NOT NULL,

  ValueLangue VARCHAR(3),                
  Langue VARCHAR(30),                   

  author INT(11),                        

  date_registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  last_login int(11),
  PRIMARY KEY (id)
) ;

insert into users (iscurrent,Genre,Prenom,Nom,Email,Password,email_verified,ValueLangue,Langue,group_name) values (1,'Homme','Daniel','Dupard','ddupard68@gmail.com','$2y$10$Tq78wolGcEXPK5A4oLh/nOWqh.yVcD6NWkTK/AqBxCiVs04766fqC',1,'FR','Français','FullAdmin') ;
insert into users (iscurrent,Genre,Prenom,Nom,Email,Password,email_verified,ValueLangue,Langue,group_name) values (1,'Homme','Demo','','demo@gmail.com','$2y$10$WMjwKgPHhyFSU668nLyr/O3mInqoNhd9ITz7YMpj6s37HRikH4wu2',1,'FR','Français','Demo') ;



use SEO ;
drop table if exists user_groups ;
CREATE TABLE IF NOT EXISTS user_groups (
  group_name varchar(50) NOT NULL,
  PRIMARY KEY (group_name)
) ;


use SEO ;
insert into user_groups (group_name) values ('Guest') ; 
insert into user_groups (group_name) values ('Demo') ;
insert into user_groups (group_name) values ('FullAdmin') ;



use SEO ;
drop table if exists user_sessions ;
CREATE TABLE IF NOT EXISTS user_sessions (
  id INT(11) NOT NULL AUTO_INCREMENT,
  token varchar(250) NOT NULL,
  user_id INT(11) NOT NULL,
  expires INT(11) NOT NULL,
  PRIMARY KEY (id)
) ;



use SEO ;
drop table if exists  pages_visibleby ;
CREATE TABLE IF NOT EXISTS pages_visibleby (
  page_name varchar(200) NOT NULL,			 
  visibleby varchar(50),                 
  PRIMARY KEY (page_name,visibleby)
) ;



use SEO ;
insert into pages_visibleby (page_name,visibleby) values ('./index.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./index.php','Demo') ;

insert into pages_visibleby (page_name,visibleby) values ('./index_FullAdmin.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./index_Demo.php','Demo') ;

use SEO ;
insert into pages_visibleby (page_name,visibleby) values ('./JobGenerateFiles.php','FullAdmin') ;

use SEO ;
insert into pages_visibleby (page_name,visibleby) values ('./Article_CollectData.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./Article_showall.php','FullAdmin') ;

use SEO ;
insert into pages_visibleby (page_name,visibleby) values ('./Article_showANettoyer.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./Article_Nettoyer.php','FullAdmin') ;


use SEO ;
insert into pages_visibleby (page_name,visibleby) values ('./users.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./user_delete.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./user_modify.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./user_create.php','FullAdmin') ;

use SEO ;
insert into pages_visibleby (page_name,visibleby) values ('./RSS_CollectData.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./RSS_create.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./RSS_delete.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./RSS_showall.php','FullAdmin') ;

use SEO ;
insert into pages_visibleby (page_name,visibleby) values ('./Entreprise_create.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./Entreprise_showall.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./Article_Sans_Entreprise.php','FullAdmin') ;


use SEO ;
insert into pages_visibleby (page_name,visibleby) values ('./ArticlesFromDatabase_showall.php','FullAdmin') ;

use SEO ;
insert into pages_visibleby (page_name,visibleby) values ('./SEO_AnalyserRanking.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./SEO_FindBest.php','FullAdmin') ;


use SEO ;
insert into pages_visibleby (page_name,visibleby) values ('./Keywords_Activity_create.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./Keywords_run.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./Keywords_create.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./Keywords_showall.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./KeywordsRun_showall.php','FullAdmin') ;

use SEO ;
insert into pages_visibleby (page_name,visibleby) values ('./Activity_create.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./Activity_delete.php','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('./Activity_showall.php','FullAdmin') ;






use SEO ;
insert into pages_visibleby (page_name,visibleby) values ('','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('','FullAdmin') ;


use SEO ;
insert into pages_visibleby (page_name,visibleby) values ('','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('','FullAdmin') ;
insert into pages_visibleby (page_name,visibleby) values ('','FullAdmin') ;
