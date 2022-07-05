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
-- Table structure for table `EvolutionRanking_41`
--

CREATE TABLE `EvolutionRanking_41` (
  `idActivity` int DEFAULT NULL,
  `Domaine` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `idActivityRun_0` int DEFAULT '32',
  `TotalOrganicRanking_0` int DEFAULT NULL,
  `TotalScoring_0` float DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `EvolutionRanking_41`
--

INSERT INTO `EvolutionRanking_41` (`idActivity`, `Domaine`, `idActivityRun_0`, `TotalOrganicRanking_0`, `TotalScoring_0`, `date`) VALUES
(41, 'digimood.com', 32, 1, 23.5, '2022-06-14 04:13:37'),
(41, 'noiise.com', 32, 2, 15.6, '2022-06-14 04:13:37'),
(41, '1ere-position.fr', 32, 3, 11.7, '2022-06-14 04:13:37'),
(41, 'rgdesign.fr', 32, 4, 8.6, '2022-06-14 04:13:37'),
(41, 'paulvengeons.fr', 32, 5, 6.6, '2022-06-14 04:13:37'),
(41, 'darwin-agency.com', 32, 6, 5.9, '2022-06-14 04:13:37'),
(41, 'sortlist.fr', 32, 7, 4.6, '2022-06-14 04:13:37'),
(41, '410-gone.fr', 32, 8, 3.7, '2022-06-14 04:13:37'),
(41, 'junto.fr', 32, 9, 2.7, '2022-06-14 04:13:37'),
(41, 'eskimoz.fr', 32, 10, 1.7, '2022-06-14 04:13:37'),
(41, 'velcomeseo.fr', 32, 20, 1, '2022-06-14 04:13:37'),
(41, 'jalis.fr', 32, 14, 1, '2022-06-14 04:13:37'),
(41, 'seodoc.fr', 32, 18, 1, '2022-06-14 04:13:37'),
(41, 'monsieur-seo.com', 32, 16, 1, '2022-06-14 04:13:37'),
(41, 'seohackers.fr', 32, 19, 1, '2022-06-14 04:13:37'),
(41, 'seo-monkey.fr', 32, 17, 1, '2022-06-14 04:13:37'),
(41, 'inforcom.fr', 32, 13, 1, '2022-06-14 04:13:37'),
(41, 'digitiz.fr', 32, 12, 1, '2022-06-14 04:13:37'),
(41, 'la-revanche-des-sites.fr', 32, 15, 1, '2022-06-14 04:13:37'),
(41, 'wecomm.fr', 32, 21, 1, '2022-06-14 04:13:37'),
(41, 'wsimarseille.fr', 32, 29, 0.7, '2022-06-14 04:13:37'),
(41, 'smartkeyword.io', 32, 25, 0.7, '2022-06-14 04:13:37'),
(41, 'votrecom.fr', 32, 28, 0.7, '2022-06-14 04:13:37'),
(41, '1789.fr', 32, 22, 0.7, '2022-06-14 04:13:37'),
(41, 'neocamino.com', 32, 23, 0.7, '2022-06-14 04:13:37'),
(41, 'aurone.com', 32, 11, 1.4, '2022-06-14 04:13:37'),
(41, 'premiere-racine.fr', 32, 24, 0.7, '2022-06-14 04:13:37'),
(41, 'twaino.com', 32, 27, 0.7, '2022-06-14 04:13:37'),
(41, 'smartweb-group.com', 32, 26, 0.7, '2022-06-14 04:13:37'),
(41, 'pacom1.com', 32, 34, 0.4, '2022-06-14 04:13:37'),
(41, 'agence-ska.com', 32, 30, 0.4, '2022-06-14 04:13:37'),
(41, 'seo-design.fr', 32, 37, 0.4, '2022-06-14 04:13:37'),
(41, 'immobilier-am.fr', 32, 32, 0.4, '2022-06-14 04:13:37'),
(41, 'orixa-media.com', 32, 33, 0.4, '2022-06-14 04:13:37'),
(41, 'romualdparis.com', 32, 36, 0.4, '2022-06-14 04:13:37'),
(41, 'yumens.fr', 32, 39, 0.4, '2022-06-14 04:13:37'),
(41, 'referencime.fr', 32, 35, 0.4, '2022-06-14 04:13:37'),
(41, 'startbiz.fr', 32, 38, 0.4, '2022-06-14 04:13:37'),
(41, 'hello-referencement.com', 32, 31, 0.4, '2022-06-14 04:13:37'),
(41, 'a2conseilfrance.fr', 32, 40, 0.2, '2022-06-14 04:13:37'),
(41, 'marie-ledru.com', 32, 48, 0.2, '2022-06-14 04:13:37'),
(41, 'optimiz.me', 32, 50, 0.2, '2022-06-14 04:13:37'),
(41, 'netpub.fr', 32, 49, 0.2, '2022-06-14 04:13:37'),
(41, 'david-groult.fr', 32, 44, 0.2, '2022-06-14 04:13:37'),
(41, 'cherrypy.org', 32, 43, 0.2, '2022-06-14 04:13:37'),
(41, 'benjaminthiers.net', 32, 41, 0.2, '2022-06-14 04:13:37'),
(41, 'k-digital.fr', 32, 46, 0.2, '2022-06-14 04:13:37'),
(41, 'futurdigital.fr', 32, 45, 0.2, '2022-06-14 04:13:37'),
(41, 'vaniseo.com', 32, 51, 0.2, '2022-06-14 04:13:37'),
(41, 'lafrenchtech-aixmarseille.fr', 32, 69, 0.1, '2022-06-14 04:13:37'),
(41, 'facebook.com', 32, 63, 0.1, '2022-06-14 04:13:37'),
(41, 'mturcan.pro', 32, 77, 0.1, '2022-06-14 04:13:37'),
(41, 'indeed.com', 32, 65, 0.1, '2022-06-14 04:13:37'),
(41, 'lernvid.com', 32, 70, 0.1, '2022-06-14 04:13:37'),
(41, 'webloom.fr', 32, 95, 0.1, '2022-06-14 04:13:37'),
(41, 'bulletindescommunes.net', 32, 54, 0.1, '2022-06-14 04:13:37'),
(41, 'marseille-online.com', 32, 74, 0.1, '2022-06-14 04:13:37'),
(41, 'aseox.fr', 32, 53, 0.1, '2022-06-14 04:13:37'),
(41, 'top-referencement.fr', 32, 91, 0.1, '2022-06-14 04:13:37'),
(41, 'softrevolutionzine.org', 32, 87, 0.1, '2022-06-14 04:13:37'),
(41, 'comparer-numerique.com', 32, 57, 0.1, '2022-06-14 04:13:37'),
(41, 'sub-yu.fr', 32, 89, 0.1, '2022-06-14 04:13:37'),
(41, 'europages.fr', 32, 62, 0.1, '2022-06-14 04:13:37'),
(41, 'integralvision.fr', 32, 66, 0.1, '2022-06-14 04:13:37'),
(41, 'lesresoteurs.fr', 32, 71, 0.1, '2022-06-14 04:13:37'),
(41, 'seo13.fr', 32, 86, 0.1, '2022-06-14 04:13:37'),
(41, 'myrevenue-partner.com', 32, 78, 0.1, '2022-06-14 04:13:37'),
(41, 'massiliae-consulting.com', 32, 75, 0.1, '2022-06-14 04:13:37'),
(41, 'traitsimple.fr', 32, 93, 0.1, '2022-06-14 04:13:37'),
(41, 'clementgillet.fr', 32, 56, 0.1, '2022-06-14 04:13:37'),
(41, 'linkedin.com', 32, 47, 0.2, '2022-06-14 04:13:37'),
(41, 'thibault-touzet.com', 32, 90, 0.1, '2022-06-14 04:13:37'),
(41, 'petitlien.fr', 32, 82, 0.1, '2022-06-14 04:13:37'),
(41, 'reactic.io', 32, 84, 0.1, '2022-06-14 04:13:37'),
(41, 'sokeo.fr', 32, 88, 0.1, '2022-06-14 04:13:37'),
(41, 'luciolaria.com', 32, 73, 0.1, '2022-06-14 04:13:37'),
(41, 'xmediacreation.com', 32, 96, 0.1, '2022-06-14 04:13:37'),
(41, 'daydou.com', 32, 60, 0.1, '2022-06-14 04:13:37'),
(41, 'cultureua.com', 32, 59, 0.1, '2022-06-14 04:13:37'),
(41, 'trafic-influence.com', 32, 92, 0.1, '2022-06-14 04:13:37'),
(41, 'primordia-web.fr', 32, 83, 0.1, '2022-06-14 04:13:37'),
(41, 'webanymous.fr', 32, 94, 0.1, '2022-06-14 04:13:37'),
(41, 'seo-camp.org', 32, 85, 0.1, '2022-06-14 04:13:37'),
(41, 'hygiene-biocide.fr', 32, 64, 0.1, '2022-06-14 04:13:37'),
(41, 'open-linking.com', 32, 79, 0.1, '2022-06-14 04:13:37'),
(41, 'lafabriquedunet.fr', 32, 68, 0.1, '2022-06-14 04:13:37'),
(41, 'logarankseo.com', 32, 72, 0.1, '2022-06-14 04:13:37'),
(41, 'pagerank-10.com', 32, 80, 0.1, '2022-06-14 04:13:37'),
(41, 'consultant-seo-marseille.fr', 32, 58, 0.1, '2022-06-14 04:13:37'),
(41, 'agence-seo.com', 32, 52, 0.1, '2022-06-14 04:13:37'),
(41, 'pagesjaunes.fr', 32, 81, 0.1, '2022-06-14 04:13:37'),
(41, 'mindfruits.biz', 32, 76, 0.1, '2022-06-14 04:13:37'),
(41, 'duteilavocats.com', 32, 61, 0.1, '2022-06-14 04:13:37'),
(41, 'business.site', 32, 42, 0.2, '2022-06-14 04:13:37'),
(41, 'chirurgiens-dentistes.fr', 32, 55, 0.1, '2022-06-14 04:13:37'),
(41, 'justacote.com', 32, 67, 0.1, '2022-06-14 04:13:37');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
