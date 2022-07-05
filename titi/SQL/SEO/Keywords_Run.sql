-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 13, 2022 at 06:05 PM
-- Server version: 8.0.28-0ubuntu0.20.04.3
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Brain`
--

-- --------------------------------------------------------

--
-- Table structure for table `Keywords_Run`
--

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

