-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 02, 2022 at 01:22 PM
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
-- Table structure for table `SiteWeb_Domaines`
--

drop table if exists SiteWeb_Domaines ;
CREATE TABLE `SiteWeb_Domaines` (
  `id` bigint NOT NULL,
  `Domaine` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `NombrePages` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `SiteWeb_Domaines`
--

INSERT INTO `SiteWeb_Domaines` (`id`, `Domaine`, `NombrePages`) VALUES
(1, 'adaptive-research.eu', 24),
(4, 'twaino.com', 1074),
(5, 'yateo.com', 964),
(6, 'seo.fr', 232),
(7, 'quentinfosse.fr', 7),
(8, 'noiise.com', 268),
(9, 'eskimoz.fr', 348),
(10, '1ere-position.fr', 568),
(11, 'digitiz.fr', 2252),
(12, 'junto.fr', 362),
(13, 'cybercite.fr', 327),
(14, 'zilmeo.fr', 17),
(15, '410-gone.fr', 55),
(16, 'foxglove-partner.com', 126),
(17, 'digimood.com', 345),
(18, 'rgdesign.fr', 428),
(19, 'paulvengeons.fr', 64),
(20, 'darwin-agency.com', 410),
(21, 'sortlist.fr', 1),
(22, 'semji.com', 629),
(23, 'optimize360.fr', 1416),
(24, 'aurone.com', 596),
(25, 'yumens.fr', 1283),
(26, 'netoffensive.blog', 451),
(27, 'pixalione.fr', 553),
(28, 'hellodarwin.com', 12),
(29, 'webconversion.fr', 437),
(30, 'inboundvalue.com', 396),
(31, 'plezi.co', 956),
(32, 'sendinblue.com', 3451),
(33, 'comexplorer.com', 915);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `SiteWeb_Domaines`
--
ALTER TABLE `SiteWeb_Domaines`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `SiteWeb_Domaines`
--
ALTER TABLE `SiteWeb_Domaines`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
