




DROP TABLE IF EXISTS 'Activity' ;
CREATE TABLE `Activity` (
  `id` int NOT NULL,
  `iscurrent` int DEFAULT NULL,
  `Secteur` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;



INSERT INTO `Activity` (`id`, `iscurrent`, `Secteur`, `date`) VALUES
(1, 1, 'agence webmarketing', '2019-07-10 06:20:43'),
(27, 1, 'crm', '2019-07-19 05:53:32'),
(29, 1, 'agence de rédaction de contenu', '2019-08-15 05:52:40'),
(30, 1, 'ssii', '2019-08-06 05:48:20'),
(31, 1, 'experts comptable', '2019-09-03 05:54:18');
(32, 1, 'seo', '2022-04-15 05:54:18');


ALTER TABLE `Activity`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Activity`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;









DROP TABLE IF EXISTS `Keywords_Activity` ;
CREATE TABLE `Keywords_Activity` (
  `id` int NOT NULL,
  `iscurrent` int DEFAULT NULL,
  `idActivity` int DEFAULT NULL,
  `idKeywords` bigint DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


ALTER TABLE `Keywords_Activity`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Keywords_Activity`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=263;
COMMIT;









drop table if EXISTS `Activity_Run` ;
CREATE TABLE `Activity_Run` (
  `id` int NOT NULL,
  `iscurrent` int DEFAULT NULL,
  `idActivity` int DEFAULT NULL,
  `FirstIdKeywords_Run` int DEFAULT NULL,
  `LastIdKeywords_Run` int DEFAULT NULL,
  `DateRun` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

ALTER TABLE `Activity_Run`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Activity_Run`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;














DROP TABLE IF EXISTS `Keywords_NewURL` ;
CREATE TABLE `Keywords_NewURL` (
  `id` bigint NOT NULL,
  `iscurrent` int DEFAULT '1',
  `TypeURL` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT 'Lien',
  `URL` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `idKeywords` bigint DEFAULT '0',
  `idKeywords_Run` bigint DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

ALTER TABLE `Keywords_NewURL`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Keywords_NewURL`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;








DROP TABLE IF EXISTS  `Keywords_Ranking` ;



CREATE TABLE `Keywords_Ranking` (
  `id` bigint NOT NULL,
  `iscurrent` int DEFAULT NULL,
  `idActivity` int DEFAULT NULL,
  `idActivityRun` int DEFAULT NULL,
  `idKeywords_Run` bigint DEFAULT NULL,
  `Keywords` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `Ranking` int DEFAULT NULL,
  `OrganicRanking` int DEFAULT NULL,
  `TypeURL` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `URL` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `Domaine` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `TotalScoring` float DEFAULT NULL,
  `HasBeenUsed` int DEFAULT '0',
  `Scoring` float DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;




ALTER TABLE `Keywords_Ranking` ADD PRIMARY KEY (`id`);
ALTER TABLE `Keywords_Ranking` ADD KEY (`idActivity`);
ALTER TABLE `Keywords_Ranking` ADD KEY (`idActivityRun`);
ALTER TABLE `Keywords_Ranking` ADD KEY (`idKeywords_Run`);
ALTER TABLE `Keywords_Ranking` ADD KEY (`Domaine`);




ALTER TABLE `Keywords_Ranking`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;







Drop table if exists `Keywords_Run` ;
CREATE TABLE `Keywords_Run` (
  `id` bigint NOT NULL,
  `iscurrent` int DEFAULT NULL,
  `idKeywords` bigint DEFAULT NULL,
  `Moteur` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `HasRunned` int DEFAULT '0',
  `HasComputedOrganicRanking` int DEFAULT '0',
  `HasComputedScoring` int DEFAULT '0',
  `DateRun` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

ALTER TABLE `Keywords_Run`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Keywords_Run`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;











DROP TABLE IF EXISTS `PagesWeb` ;
CREATE TABLE `PagesWeb` (
  `id` bigint NOT NULL,
  `iscurrent` int DEFAULT '1',
  `URL` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `Domaine` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `Title` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `HasBeenRetrieved` int DEFAULT '0',
  `HasBeenUsed` int DEFAULT '0',
  `HasTitleInText` int DEFAULT '0',
  `BestRanking` int DEFAULT '200',
  `BestOrganicRanking` int DEFAULT '200',
  `Error` int DEFAULT '0',
  `MsgError` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

ALTER TABLE `PagesWeb`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `PagesWeb`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;






DROP TABLE IF EXISTS `PagesWeb_MentionsLegales` ;
CREATE TABLE `PagesWeb_MentionsLegales` (
  `id` bigint NOT NULL,
  `iscurrent` int DEFAULT '1',
  `Domaine` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `URL` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `HasBeenRetrieved` int DEFAULT '0',
  `HasBeenUsed` int DEFAULT '0',
  `Error` int DEFAULT '0',
  `MsgError` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

ALTER TABLE `PagesWeb_MentionsLegales`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `PagesWeb_MentionsLegales`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;



DROP TABLE IF EXISTS `Scoring_After_Run` ;
DROP TABLE IF EXISTS `Scoring_Type` ;







use Brain ;
DROP TABLE IF EXISTS `SiteWeb_Lead` ;
CREATE TABLE `SiteWeb_Lead` (
    `id` int NOT NULL,
    `iscurrent` int DEFAULT NULL,
    `idActivity` int DEFAULT NULL,

    `Domaine` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `idActivityRun` int DEFAULT NULL, --sert a garder une trace du scoring. Le scoring a été calculé lors de quel Run de secteur d'activité ?
    `Scoring` float DEFAULT NULL, 
    `isNew` int DEFAULT NULL,  -- sert à différencier les sites qui se sont rajoutés et que l'on n'a pas encore qualifiés
  
    `isRelevant` int DEFAULT NULL,
    `Type` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `Marketing` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `Zone` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

ALTER TABLE `SiteWeb_Lead`
  ADD PRIMARY KEY (`id`);

ALTER TABLE`SiteWeb_Lead`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;
