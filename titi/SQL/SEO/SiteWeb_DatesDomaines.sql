-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 02, 2022 at 01:20 PM
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
-- Table structure for table `SiteWeb_DatesDomaines`
--

drop table if exists SiteWeb_DatesDomaines ;
CREATE TABLE `SiteWeb_DatesDomaines` (
  `id` bigint NOT NULL,
  `idDomaine` int NOT NULL,
  `sdate` varchar(30) COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `SiteWeb_DatesDomaines`
--

INSERT INTO `SiteWeb_DatesDomaines` (`id`, `idDomaine`, `sdate`) VALUES
(1, 1, '2022-11-05--09-54-14'),
(2, 1, '2022-11-05--09-56-30'),
(3, 1, '2022-11-05--09-57-36'),
(4, 1, '2022-11-05--09-59-18'),
(5, 1, '2022-11-05--10-00-17'),
(6, 1, '2022-11-05--10-00-34'),
(7, 1, '2022-11-05--10-01-26'),
(8, 2, '2022-11-05--11-47-19'),
(9, 3, '2022-11-05--11-47-37'),
(10, 1, '2022-14-06--06-54-25'),
(11, 1, '2022-14-06--07-00-51'),
(12, 1, '2022-14-06--07-02-36'),
(13, 1, '2022-14-06--07-03-42'),
(14, 1, '2022-14-06--07-04-54'),
(15, 1, '2022-14-06--07-08-31'),
(16, 1, '2022-14-06--07-09-12'),
(17, 1, '2022-14-06--07-10-02'),
(18, 1, '2022-14-06--07-11-43'),
(19, 1, '2022-14-06--07-39-44'),
(20, 4, '2022-14-06--07-41-57'),
(21, 4, '2022-14-06--07-45-28'),
(22, 5, '2022-14-06--08-17-31'),
(23, 5, '2022-14-06--08-30-57'),
(24, 6, '2022-14-06--08-48-27'),
(25, 7, '2022-14-06--08-55-36'),
(26, 7, '2022-14-06--08-55-42'),
(27, 8, '2022-14-06--08-57-06'),
(28, 7, '2022-14-06--09-11-07'),
(29, 7, '2022-14-06--09-12-19'),
(30, 7, '2022-14-06--09-12-43'),
(31, 7, '2022-14-06--09-18-13'),
(32, 7, '2022-14-06--09-22-22'),
(33, 9, '2022-14-06--09-27-39'),
(34, 10, '2022-14-06--09-39-46'),
(35, 10, '2022-14-06--09-47-29'),
(36, 10, '2022-14-06--10-16-03'),
(37, 4, '2022-14-06--10-23-00'),
(38, 11, '2022-14-06--10-24-10'),
(39, 12, '2022-14-06--11-17-03'),
(40, 13, '2022-19-06--11-51-40'),
(41, 14, '2022-19-06--12-07-01'),
(42, 15, '2022-19-06--12-35-29'),
(43, 16, '2022-19-06--12-38-31'),
(44, 16, '2022-19-06--12-42-22'),
(45, 17, '2022-19-06--12-45-41'),
(46, 18, '2022-19-06--12-56-09'),
(47, 19, '2022-19-06--13-08-08'),
(48, 20, '2022-19-06--13-10-56'),
(49, 21, '2022-19-06--14-31-29'),
(50, 22, '2022-19-06--14-33-37'),
(51, 23, '2022-19-06--14-47-13'),
(52, 24, '2022-19-06--14-57-19'),
(53, 25, '2022-20-06--21-32-50'),
(54, 26, '2022-20-06--23-18-27'),
(55, 27, '2022-21-06--00-45-17'),
(56, 28, '2022-21-06--01-27-33'),
(57, 29, '2022-21-06--10-48-08'),
(58, 30, '2022-21-06--11-36-03'),
(59, 31, '2022-21-06--11-49-19'),
(60, 32, '2022-21-06--12-37-13'),
(61, 33, '2022-21-06--15-29-00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `SiteWeb_DatesDomaines`
--
ALTER TABLE `SiteWeb_DatesDomaines`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `SiteWeb_DatesDomaines`
--
ALTER TABLE `SiteWeb_DatesDomaines`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
