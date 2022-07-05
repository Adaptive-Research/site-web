-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 13, 2022 at 06:02 PM
-- Server version: 8.0.28-0ubuntu0.20.04.3
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


--
-- Database: `Brain`
--

-- --------------------------------------------------------

--
-- Cette table est la table de base pour calculer les scorings d'un domaine. Elle recoit les liens trouves sur les pages ggogle et calcule 
-- le Ranking et l'OrganicRanking. Le Ranking est la place (1er, 2eme, 3eme) du lien. L'organicRanking est la place du lien en excluant les annonces payantes 
-- On calcule ensuite un Scoring du lien en fonction de la place du lien


use SEO ;


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


--
-- Indexes for table `Keywords_Ranking`
--
ALTER TABLE `Keywords_Ranking` ADD PRIMARY KEY (`id`);
ALTER TABLE `Keywords_Ranking` ADD KEY (`idActivity`);
ALTER TABLE `Keywords_Ranking` ADD KEY (`idActivityRun`);
ALTER TABLE `Keywords_Ranking` ADD KEY (`idKeywords_Run`);
ALTER TABLE `Keywords_Ranking` ADD KEY (`Domaine`);
ALTER TABLE `Keywords_Ranking` ADD KEY (`Keywords`);
ALTER TABLE `Keywords_Ranking` ADD KEY (`Ranking`);
ALTER TABLE `Keywords_Ranking` ADD KEY (`TotalScoring`);
ALTER TABLE `Keywords_Ranking` ADD KEY (`Scoring`);




-- ALTER TABLE `Keywords_Ranking` ADD COLUMN   `Scoring` float DEFAULT NULL  after HasBeenUsed ;
-- ALTER TABLE `Keywords_Ranking` ADD COLUMN   idActivity int DEFAULT NULL  after iscurrent ;
-- ALTER TABLE `Keywords_Ranking` ADD COLUMN  `Keywords` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL after  `idKeywords_Run` ;
-- ALTER TABLE `Keywords_Ranking` ADD COLUMN `TotalScoring` float DEFAULT NULL after Domaine ;


--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Keywords_Ranking`
--
ALTER TABLE `Keywords_Ranking`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;
