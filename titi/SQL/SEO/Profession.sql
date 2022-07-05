-- phpMyAdmin SQL Dump
-- version 5.1.1



use SEO ;


DROP TABLE IF EXISTS Profession ;
CREATE TABLE `Profession` (
  `id` int NOT NULL,
  `Profession` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  iscurrent int  default 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


ALTER TABLE `Profession`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Profession`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;


INSERT INTO `Profession` (`id`, `Profession`) VALUES
(1, 'agent immobilier'),
(2, 'agence digitale'),
(3, 'agence marketing'),
(4, 'agence communication'),
(5, 'agence seo'),
(6, 'avocat'),
(7, 'cuisiniste'),
(8, 'expert comptable'),
(9, 'graphiste'),
(10, 'coach sportif'),
(11, 'coach de vie'),
(12, 'maçon'),
(13, 'menuisier'),
(14, 'paysagiste'),
(15, 'pizzeria'),
(16, 'plombier'),
(17, 'architecte'),
(18, 'architecte d\'intérieur'),
(19, 'restaurant'),
(20, 'agent général d\'assurance'),
(21, 'agence d\'assurance'),
(22, 'agence d\'immobilier d\'entreprise'),
(23, 'agence d\'intérim'),
(24, 'agence de location de maisons de vacances'),
(25, 'agence de location de matériel'),
(26, 'agence de marketing'),
(27, 'agence de publicité'),
(28, 'agence de relations publiques'),
(29, 'agence de services d\'aide à domicile'),
(30, 'agence de voyages'),
(31, 'agence immobilière'),
(32, 'agence pour l\'emploi'),
(33, 'artiste'),
(34, 'association ou organisation'),
(35, 'atelier de menuiserie'),
(36, 'atelier de métallerie'),
(37, 'auto-école'),
(38, 'banque'),
(39, 'barbecue'),
(40, 'cabinet d\'expertise comptable'),
(41, 'centre d\'amincissement'),
(42, 'centre de coaching'),
(43, 'centre de formation continue'),
(44, 'charpentier'),
(45, 'chaudronnerie'),
(46, 'chinoise'),
(47, 'coach particulier'),
(48, 'coaching professionnel'),
(49, 'commercial agent'),
(50, 'comptable'),
(51, 'concepteur de sites web'),
(52, 'conseil'),
(53, 'conseiller en gestion des affaires'),
(54, 'conseiller financier'),
(55, 'constructeur de maisons personnalisées'),
(56, 'constructeur immobilier'),
(57, 'consultant en informatique'),
(58, 'consultant en ingénierie'),
(59, 'consultant en marketing'),
(60, 'consultant immobilier'),
(61, 'courtier en prêts hypothécaires'),
(62, 'couvreur'),
(63, 'entrepreneur'),
(64, 'entrepreneur spécialisé dans l\'isolation'),
(65, 'entreprise de construction'),
(66, 'expert-comptable'),
(67, 'fabricant'),
(68, 'fabricant de meubles'),
(69, 'fenêtre en aluminium'),
(70, 'fondation'),
(71, 'forgeron'),
(72, 'fournisseur d\'accès internet'),
(73, 'fournisseur de fenêtres'),
(74, 'fournisseur de matériaux de construction'),
(75, 'fournisseur de systèmes de sécurité'),
(76, 'gare'),
(77, 'grossiste'),
(78, 'halal'),
(79, 'hamburger'),
(80, 'hôtel de ville'),
(81, 'institut de beauté'),
(82, 'magasin'),
(83, 'magasin d\'alimentation bio'),
(84, 'magasin d\'antiquités'),
(85, 'magasin de bois de chauffage'),
(86, 'magasin de bricolage'),
(87, 'magasin de fenêtres en pvc'),
(88, 'magasin de matériel électrique'),
(89, 'magasin de meubles'),
(90, 'magasin de meubles de cuisine'),
(91, 'magasin de vêtements'),
(92, 'musée d\'art'),
(93, 'mutuelle de santé'),
(94, 'négociant en bois'),
(95, 'office de tourisme'),
(96, 'peintre en bâtiment'),
(97, 'pizza'),
(98, 'programme de bien-être'),
(99, 'publicité'),
(100, 'restaurant de grillades à la française'),
(101, 'restauration rapide'),
(102, 'salle de gym'),
(103, 'serrurier'),
(104, 'service d\'hypnothérapie'),
(105, 'service d\'élagage'),
(106, 'service de marketing internet'),
(107, 'service de pose de parquet'),
(108, 'service de restauration de meubles anciens'),
(109, 'service de serrurerie d\'urgence'),
(110, 'siège social'),
(111, 'société de crédit foncier'),
(112, 'société immobilière'),
(113, 'soudeur'),
(114, 'sushis'),
(115, 'tapissier décorateur'),
(116, 'turque'),
(117, 'vitrier');

INSERT INTO `Profession` ( `Profession`) VALUES
("naturopathe"),
("kinesitherapeute"),
("médecin"),
("osthéopathe"),
("pharmacien"),
("dentiste") ;

INSERT INTO `Profession` ( `Profession`) VALUES
("ophtalmologiste") ;




-- Cette table garde une trace de toutes les lancements de jobs pour récupérer les informations google pour un secteur d'activité donné

use SEO ;

drop table if EXISTS `Profession_Run` ;
CREATE TABLE `Profession_Run` (
  id int NOT NULL,
  idProfession int DEFAULT NULL,
  Ville varchar(50) DEFAULT NULL,
  CodePostal varchar(8) DEFAULT NULL,
  HasBeenParsed int DEFAULT 0,
  DateRun timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


--
ALTER TABLE `Profession_Run`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Profession_Run`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;








-- on recupere les infos google et on remplit
-- Titre,
-- Ligne,
-- TypeEntreprise
-- Telephone
-- URL



drop table if EXISTS `Profession_Entreprises` ;
CREATE TABLE `Profession_Entreprises` (
  id int NOT NULL,

  Titre varchar(200) DEFAULT NULL,
  TypeEntreprise varchar(100) DEFAULT NULL,
  
  Telephone varchar(15) DEFAULT NULL,

  NumeroVoie  varchar(4) DEFAULT NULL,
  TypeVoie varchar(4)  DEFAULT NULL,
  LibelleVoie varchar(100) DEFAULT NULL,
  CodePostal varchar(5)  DEFAULT NULL,
  LibelleCommune varchar(100)  DEFAULT NULL,
  
  URL  varchar(500) DEFAULT NULL,


  VilleMinu varchar(50) DEFAULT NULL, -- la ville est deduite de Ligne et de la ville de recherche et on la passe en minuscule
  VilleHasBeenSearched int DEFAULT 0


) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;





ALTER TABLE `Profession_Entreprises`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `Profession_Entreprises`
  ADD KEY (`Titre`);


ALTER TABLE `Profession_Entreprises`
  ADD KEY (`TypeEntreprise`);



ALTER TABLE `Profession_Entreprises`
  ADD KEY (`Telephone`);



ALTER TABLE `Profession_Entreprises`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;






drop table if EXISTS `Profession_Entreprises_ResultsRuns` ;
CREATE TABLE `Profession_Entreprises_ResultsRuns` (

id int NOT NULL,
idProfessionRun int DEFAULT NULL,

Ligne varchar(100) DEFAULT NULL,

Ranking int default NULL,

NombreAvis int default 0,
Rating float default 0,

idEntreprise int NOT NULL


) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


ALTER TABLE `Profession_Entreprises_ResultsRuns`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `Profession_Entreprises_ResultsRuns`
  ADD KEY (`idEntreprise`);


ALTER TABLE `Profession_Entreprises_ResultsRuns`
  ADD KEY (`idProfessionRun`);


ALTER TABLE `Profession_Entreprises_ResultsRuns`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;




