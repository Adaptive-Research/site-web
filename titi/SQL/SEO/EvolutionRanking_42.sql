-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 02, 2022 at 01:43 PM
-- Server version: 8.0.29-0ubuntu0.20.04.3
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SEO`
--

-- --------------------------------------------------------

--
-- Table structure for table `EvolutionRanking_42`
--

CREATE TABLE `EvolutionRanking_42` (
  `idActivity` int DEFAULT NULL,
  `Domaine` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `idActivityRun_0` int DEFAULT '33',
  `TotalOrganicRanking_0` int DEFAULT NULL,
  `TotalScoring_0` float DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `EvolutionRanking_42`
--

INSERT INTO `EvolutionRanking_42` (`idActivity`, `Domaine`, `idActivityRun_0`, `TotalOrganicRanking_0`, `TotalScoring_0`, `date`) VALUES
(42, 'noiise.com', 33, 1, 23.5, '2022-06-14 04:13:39'),
(42, '1ere-position.fr', 33, 2, 15.6, '2022-06-14 04:13:39'),
(42, 'eskimoz.fr', 33, 3, 11.7, '2022-06-14 04:13:39'),
(42, 'sortlist.fr', 33, 4, 8.6, '2022-06-14 04:13:39'),
(42, 'cybercite.fr', 33, 5, 6.6, '2022-06-14 04:13:39'),
(42, 'semji.com', 33, 6, 5.9, '2022-06-14 04:13:39'),
(42, 'zilmeo.fr', 33, 7, 4.6, '2022-06-14 04:13:39'),
(42, '410-gone.fr', 33, 8, 3.7, '2022-06-14 04:13:39'),
(42, 'optimize360.fr', 33, 9, 2.7, '2022-06-14 04:13:39'),
(42, 'foxglove-partner.com', 33, 10, 1.7, '2022-06-14 04:13:39'),
(42, 'webconversion.fr', 33, 20, 1, '2022-06-14 04:13:39'),
(42, '1789.fr', 33, 11, 1, '2022-06-14 04:13:39'),
(42, 'agence-wam.fr', 33, 12, 1, '2022-06-14 04:13:39'),
(42, 'ckc-net.com', 33, 14, 1, '2022-06-14 04:13:39'),
(42, 'digitiz.fr', 33, 16, 1, '2022-06-14 04:13:39'),
(42, 'paulvengeons.fr', 33, 18, 1, '2022-06-14 04:13:39'),
(42, 'web-konseil.com', 33, 19, 1, '2022-06-14 04:13:39'),
(42, 'junto.fr', 33, 17, 1, '2022-06-14 04:13:39'),
(42, 'brioude-internet.fr', 33, 13, 1, '2022-06-14 04:13:39'),
(42, 'digimood.com', 33, 15, 1, '2022-06-14 04:13:39'),
(42, 'la-revanche-des-sites.fr', 33, 24, 0.7, '2022-06-14 04:13:39'),
(42, 'smartkeyword.io', 33, 28, 0.7, '2022-06-14 04:13:39'),
(42, 'ideagency.fr', 33, 22, 0.7, '2022-06-14 04:13:39'),
(42, 'yumens.fr', 33, 30, 0.7, '2022-06-14 04:13:39'),
(42, 'moov-up.fr', 33, 25, 0.7, '2022-06-14 04:13:39'),
(42, 'seohackers.fr', 33, 27, 0.7, '2022-06-14 04:13:39'),
(42, 'seodoc.fr', 33, 26, 0.7, '2022-06-14 04:13:39'),
(42, 'darwin-agency.com', 33, 21, 0.7, '2022-06-14 04:13:39'),
(42, 'votrecom.fr', 33, 29, 0.7, '2022-06-14 04:13:39'),
(42, 'korleon-biz.com', 33, 23, 0.7, '2022-06-14 04:13:39'),
(42, 'smartweb-group.com', 33, 40, 0.4, '2022-06-14 04:13:39'),
(42, 'monsieur-motcle.com', 33, 35, 0.4, '2022-06-14 04:13:39'),
(42, 'netlinking.fr', 33, 36, 0.4, '2022-06-14 04:13:39'),
(42, 'twaino.com', 33, 41, 0.4, '2022-06-14 04:13:39'),
(42, 'azwebsolutions.fr', 33, 33, 0.4, '2022-06-14 04:13:39'),
(42, 'seo-design.fr', 33, 39, 0.4, '2022-06-14 04:13:39'),
(42, 'pandaseo.fr', 33, 38, 0.4, '2022-06-14 04:13:39'),
(42, 'amauryduval.com', 33, 32, 0.4, '2022-06-14 04:13:39'),
(42, 'doko.fr', 33, 34, 0.4, '2022-06-14 04:13:39'),
(42, 'pagesjaunes.fr', 33, 37, 0.4, '2022-06-14 04:13:39'),
(42, 'agencemayflower.com', 33, 43, 0.2, '2022-06-14 04:13:39'),
(42, '3petitsclics.com', 33, 42, 0.2, '2022-06-14 04:13:39'),
(42, 'lyoncapitale.fr', 33, 46, 0.2, '2022-06-14 04:13:39'),
(42, 'linkeo-lyon.com', 33, 45, 0.2, '2022-06-14 04:13:39'),
(42, 'metadosi.fr', 33, 47, 0.2, '2022-06-14 04:13:39'),
(42, 'digital-lead.fr', 33, 44, 0.2, '2022-06-14 04:13:39'),
(42, 'top10-strategie.fr', 33, 49, 0.2, '2022-06-14 04:13:39'),
(42, 'premiere.page', 33, 48, 0.2, '2022-06-14 04:13:39'),
(42, 'agence-web-lyon.fr', 33, 31, 0.4, '2022-06-14 04:13:39'),
(42, 'seo-monkey.fr', 33, 85, 0.1, '2022-06-14 04:13:39'),
(42, 'david-groult.fr', 33, 63, 0.1, '2022-06-14 04:13:39'),
(42, 'stairkaze.com', 33, 88, 0.1, '2022-06-14 04:13:39'),
(42, 'agence-ska.com', 33, 55, 0.1, '2022-06-14 04:13:39'),
(42, 'velcomeseo.fr', 33, 92, 0.1, '2022-06-14 04:13:39'),
(42, 'optimiz.me', 33, 83, 0.1, '2022-06-14 04:13:39'),
(42, 'adcom.fr', 33, 51, 0.1, '2022-06-14 04:13:39'),
(42, 'toolyon.com', 33, 90, 0.1, '2022-06-14 04:13:39'),
(42, 'surplace-aemporter.fr', 33, 89, 0.1, '2022-06-14 04:13:39'),
(42, 'elyum.fr', 33, 64, 0.1, '2022-06-14 04:13:39'),
(42, 'internet-lyon.eu', 33, 72, 0.1, '2022-06-14 04:13:39'),
(42, 'cleatis.fr', 33, 60, 0.1, '2022-06-14 04:13:39'),
(42, 'mediadvance.fr', 33, 78, 0.1, '2022-06-14 04:13:39'),
(42, 'nowleads.fr', 33, 80, 0.1, '2022-06-14 04:13:39'),
(42, 'blog-du-net.net', 33, 58, 0.1, '2022-06-14 04:13:39'),
(42, 'aseox.fr', 33, 56, 0.1, '2022-06-14 04:13:39'),
(42, 'limone-web.fr', 33, 74, 0.1, '2022-06-14 04:13:39'),
(42, 'softrevolutionzine.org', 33, 87, 0.1, '2022-06-14 04:13:39'),
(42, 'site-internet-sans-engagement.com', 33, 86, 0.1, '2022-06-14 04:13:39'),
(42, 'agence-seo.com', 33, 54, 0.1, '2022-06-14 04:13:39'),
(42, 'empirik.fr', 33, 65, 0.1, '2022-06-14 04:13:39'),
(42, 'indeed.com', 33, 71, 0.1, '2022-06-14 04:13:39'),
(42, 'agence-naga.fr', 33, 53, 0.1, '2022-06-14 04:13:39'),
(42, 'culture-commune.fr', 33, 61, 0.1, '2022-06-14 04:13:39'),
(42, 'capsule-b.com', 33, 59, 0.1, '2022-06-14 04:13:39'),
(42, 'gmbtop3.com', 33, 70, 0.1, '2022-06-14 04:13:39'),
(42, 'adweiss-consulting.com', 33, 52, 0.1, '2022-06-14 04:13:39'),
(42, 'oktoweb.fr', 33, 81, 0.1, '2022-06-14 04:13:39'),
(42, 'tribunedelyon.fr', 33, 50, 0.2, '2022-06-14 04:13:39'),
(42, 'mon-expert-digital.com', 33, 79, 0.1, '2022-06-14 04:13:39'),
(42, 'mappy.com', 33, 77, 0.1, '2022-06-14 04:13:39'),
(42, 'gda.fr', 33, 69, 0.1, '2022-06-14 04:13:39'),
(42, 'bee4.fr', 33, 57, 0.1, '2022-06-14 04:13:39'),
(42, 'facebook.com', 33, 67, 0.1, '2022-06-14 04:13:39'),
(42, 'foursquare.com', 33, 68, 0.1, '2022-06-14 04:13:39'),
(42, 'k-digital.fr', 33, 73, 0.1, '2022-06-14 04:13:39'),
(42, 'visicrea.fr', 33, 93, 0.1, '2022-06-14 04:13:39'),
(42, 'fabrica.cat', 33, 66, 0.1, '2022-06-14 04:13:39'),
(42, 'louisereferencement.fr', 33, 75, 0.1, '2022-06-14 04:13:39'),
(42, 'orosand.fr', 33, 84, 0.1, '2022-06-14 04:13:39'),
(42, 'webloom.fr', 33, 95, 0.1, '2022-06-14 04:13:39'),
(42, 'wikilink.io', 33, 96, 0.1, '2022-06-14 04:13:39'),
(42, 'lyon-entreprises.com', 33, 76, 0.1, '2022-06-14 04:13:39'),
(42, 'trouver-ouvert.fr', 33, 91, 0.1, '2022-06-14 04:13:39'),
(42, 'open-linking.com', 33, 82, 0.1, '2022-06-14 04:13:39'),
(42, 'cylex-locale.fr', 33, 62, 0.1, '2022-06-14 04:13:39'),
(42, 'webanymous.fr', 33, 94, 0.1, '2022-06-14 04:13:39');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
