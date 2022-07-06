-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  lun. 11 nov. 2019 à 20:43
-- Version du serveur :  5.7.27-0ubuntu0.18.04.1
-- Version de PHP :  7.2.24-1+ubuntu18.04.1+deb.sury.org+1


use SEO ;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `Brain`
--

-- --------------------------------------------------------

--
-- Structure de la table `Langues`
--

CREATE TABLE `Langues` (
  `Langue` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `Value` varchar(3) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `Langues`
--

INSERT INTO `Langues` (`Langue`, `Value`) VALUES
('Allemand', 'DE'),
('Anglais', 'EN'),
('Espagnol', 'ES'),
('Français', 'FR');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Langues`
--
ALTER TABLE `Langues`
  ADD PRIMARY KEY (`Langue`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
