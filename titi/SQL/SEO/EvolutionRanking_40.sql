-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 02, 2022 at 01:42 PM
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
-- Table structure for table `EvolutionRanking_40`
--

CREATE TABLE `EvolutionRanking_40` (
  `idActivity` int DEFAULT NULL,
  `Domaine` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `idActivityRun_0` int DEFAULT '31',
  `TotalOrganicRanking_0` int DEFAULT NULL,
  `TotalScoring_0` float DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `EvolutionRanking_40`
--

INSERT INTO `EvolutionRanking_40` (`idActivity`, `Domaine`, `idActivityRun_0`, `TotalOrganicRanking_0`, `TotalScoring_0`, `date`) VALUES
(40, 'yateo.com', 31, 1, 23.5, '2022-06-14 04:13:35'),
(40, 'seo.fr', 31, 2, 15.6, '2022-06-14 04:13:35'),
(40, 'quentinfosse.fr', 31, 3, 11.7, '2022-06-14 04:13:35'),
(40, 'sortlist.fr', 31, 4, 8.6, '2022-06-14 04:13:35'),
(40, 'noiise.com', 31, 5, 6.6, '2022-06-14 04:13:35'),
(40, 'eskimoz.fr', 31, 6, 5.9, '2022-06-14 04:13:35'),
(40, '1ere-position.fr', 31, 7, 4.6, '2022-06-14 04:13:35'),
(40, 'twaino.com', 31, 8, 3.7, '2022-06-14 04:13:35'),
(40, 'digitiz.fr', 31, 9, 2.7, '2022-06-14 04:13:35'),
(40, 'netinshape.fr', 31, 24, 0.7, '2022-06-14 04:13:35'),
(40, 'paulvengeons.fr', 31, 11, 1.7, '2022-06-14 04:13:35'),
(40, 'la-revanche-des-sites.fr', 31, 18, 1, '2022-06-14 04:13:35'),
(40, 'cybercite.fr', 31, 14, 1, '2022-06-14 04:13:35'),
(40, 'junto.fr', 31, 10, 2, '2022-06-14 04:13:35'),
(40, 'ekko-media.com', 31, 17, 1, '2022-06-14 04:13:35'),
(40, 'smartkeyword.io', 31, 19, 1, '2022-06-14 04:13:35'),
(40, 'agence90.fr', 31, 13, 1, '2022-06-14 04:13:35'),
(40, 'digimood.com', 31, 16, 1, '2022-06-14 04:13:35'),
(40, 'ads-up.fr', 31, 12, 1, '2022-06-14 04:13:35'),
(40, 'daydou.com', 31, 15, 1, '2022-06-14 04:13:35'),
(40, 'daware.io', 31, 22, 0.7, '2022-06-14 04:13:35'),
(40, 'premiere.page', 31, 27, 0.7, '2022-06-14 04:13:35'),
(40, 'oscar-referencement.com', 31, 25, 0.7, '2022-06-14 04:13:35'),
(40, 'wynk.fr', 31, 29, 0.7, '2022-06-14 04:13:35'),
(40, 'seoh.fr', 31, 28, 0.7, '2022-06-14 04:13:35'),
(40, 'agence-ska.com', 31, 20, 0.7, '2022-06-14 04:13:35'),
(40, 'agency-inside.com', 31, 21, 0.7, '2022-06-14 04:13:35'),
(40, 'pixalione.fr', 31, 26, 0.7, '2022-06-14 04:13:35'),
(40, 'l-agenceweb.com', 31, 23, 0.7, '2022-06-14 04:13:35'),
(40, 'bew-web-agency.fr', 31, 31, 0.4, '2022-06-14 04:13:35'),
(40, 'referencement-manuel.com', 31, 35, 0.4, '2022-06-14 04:13:35'),
(40, 'lafabriquedunet.fr', 31, 32, 0.4, '2022-06-14 04:13:35'),
(40, 'search-foresight.com', 31, 36, 0.4, '2022-06-14 04:13:35'),
(40, 'abysseo.com', 31, 30, 0.4, '2022-06-14 04:13:35'),
(40, 'websurmesure.dev', 31, 39, 0.4, '2022-06-14 04:13:35'),
(40, 'optimize360.fr', 31, 34, 0.4, '2022-06-14 04:13:35'),
(40, 'seo-monkey.fr', 31, 37, 0.4, '2022-06-14 04:13:35'),
(40, 'oktoweb.fr', 31, 33, 0.4, '2022-06-14 04:13:35'),
(40, 'spark.do', 31, 38, 0.4, '2022-06-14 04:13:35'),
(40, 'webtech.fr', 31, 50, 0.2, '2022-06-14 04:13:35'),
(40, 'netlinking.fr', 31, 45, 0.2, '2022-06-14 04:13:35'),
(40, 'neoseo.fr', 31, 44, 0.2, '2022-06-14 04:13:35'),
(40, 'seodoc.fr', 31, 48, 0.2, '2022-06-14 04:13:35'),
(40, 'darwin-agency.com', 31, 41, 0.2, '2022-06-14 04:13:35'),
(40, 'yumens.fr', 31, 51, 0.2, '2022-06-14 04:13:35'),
(40, 'publish-it.fr', 31, 47, 0.2, '2022-06-14 04:13:35'),
(40, 'egatereferencement.com', 31, 42, 0.2, '2022-06-14 04:13:35'),
(40, 'seohackers.fr', 31, 49, 0.2, '2022-06-14 04:13:35'),
(40, 'marketing.airforce', 31, 43, 0.2, '2022-06-14 04:13:35'),
(40, 'prostarseo.com', 31, 80, 0.1, '2022-06-14 04:13:35'),
(40, 'vip-agence.com', 31, 90, 0.1, '2022-06-14 04:13:35'),
(40, 'kobitseo.fr', 31, 71, 0.1, '2022-06-14 04:13:35'),
(40, 'brioude-internet.fr', 31, 58, 0.1, '2022-06-14 04:13:35'),
(40, 'visibleo.co', 31, 91, 0.1, '2022-06-14 04:13:35'),
(40, 'webloom.fr', 31, 93, 0.1, '2022-06-14 04:13:35'),
(40, 'foxglove-partner.com', 31, 65, 0.1, '2022-06-14 04:13:35'),
(40, 'atlasseo.fr', 31, 57, 0.1, '2022-06-14 04:13:35'),
(40, 'conseilsmarketing.com', 31, 40, 0.2, '2022-06-14 04:13:35'),
(40, 'meridigital.com', 31, 76, 0.1, '2022-06-14 04:13:35'),
(40, 'wedig.fr', 31, 94, 0.1, '2022-06-14 04:13:35'),
(40, 'punchify.me', 31, 81, 0.1, '2022-06-14 04:13:35'),
(40, 'click2cell.com', 31, 60, 0.1, '2022-06-14 04:13:35'),
(40, 'searchbooster.fr', 31, 82, 0.1, '2022-06-14 04:13:35'),
(40, 'uplix.fr', 31, 88, 0.1, '2022-06-14 04:13:35'),
(40, 'semji.com', 31, 83, 0.1, '2022-06-14 04:13:35'),
(40, 'lesresoteurs.fr', 31, 72, 0.1, '2022-06-14 04:13:35'),
(40, 'orixa-media.com', 31, 46, 0.2, '2022-06-14 04:13:35'),
(40, 'seo-design.fr', 31, 84, 0.1, '2022-06-14 04:13:35'),
(40, 'open-linking.com', 31, 77, 0.1, '2022-06-14 04:13:35'),
(40, 'velcomeseo.fr', 31, 89, 0.1, '2022-06-14 04:13:35'),
(40, '4webleshalles.fr', 31, 54, 0.1, '2022-06-14 04:13:35'),
(40, 'jloo.com', 31, 69, 0.1, '2022-06-14 04:13:35'),
(40, 'linkedin.com', 31, 74, 0.1, '2022-06-14 04:13:35'),
(40, 'jinfo.fr', 31, 68, 0.1, '2022-06-14 04:13:35'),
(40, 'votrecom.fr', 31, 92, 0.1, '2022-06-14 04:13:35'),
(40, 'elyum.fr', 31, 63, 0.1, '2022-06-14 04:13:35'),
(40, 'keyboost.fr', 31, 70, 0.1, '2022-06-14 04:13:35'),
(40, 'dialekta.com', 31, 61, 0.1, '2022-06-14 04:13:35'),
(40, 'surplace-aemporter.fr', 31, 87, 0.1, '2022-06-14 04:13:35'),
(40, 'experts-referencement.com', 31, 64, 0.1, '2022-06-14 04:13:35'),
(40, '360-webmarketing.fr', 31, 52, 0.1, '2022-06-14 04:13:35'),
(40, 'pango.fr', 31, 79, 0.1, '2022-06-14 04:13:35'),
(40, 'digiberries.fr', 31, 62, 0.1, '2022-06-14 04:13:35'),
(40, 'zaacom.fr', 31, 95, 0.1, '2022-06-14 04:13:35'),
(40, 'abcdigitaltouch.fr', 31, 55, 0.1, '2022-06-14 04:13:35'),
(40, 'seosamba.fr', 31, 85, 0.1, '2022-06-14 04:13:35'),
(40, 'optimoz.fr', 31, 78, 0.1, '2022-06-14 04:13:35'),
(40, 'localranker.fr', 31, 75, 0.1, '2022-06-14 04:13:35'),
(40, 'statum.fr', 31, 86, 0.1, '2022-06-14 04:13:35'),
(40, 'h2o-seo.fr', 31, 66, 0.1, '2022-06-14 04:13:35'),
(40, '410-gone.fr', 31, 53, 0.1, '2022-06-14 04:13:35'),
(40, 'lets-clic.com', 31, 73, 0.1, '2022-06-14 04:13:35'),
(40, 'ibfy.fr', 31, 67, 0.1, '2022-06-14 04:13:35'),
(40, 'agenceseoparis.fr', 31, 56, 0.1, '2022-06-14 04:13:35'),
(40, 'zuzu.fr', 31, 96, 0.1, '2022-06-14 04:13:35'),
(40, 'cleatis.fr', 31, 59, 0.1, '2022-06-14 04:13:35');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
