-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: SEO
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Activity_Run`
--

DROP TABLE IF EXISTS `Activity_Run`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Activity_Run` (
  `id` int NOT NULL AUTO_INCREMENT,
  `iscurrent` int DEFAULT NULL,
  `idActivity` int DEFAULT NULL,
  `FirstIdKeywords_Run` int DEFAULT NULL,
  `LastIdKeywords_Run` int DEFAULT NULL,
  `DateRun` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Activity_Run`
--

LOCK TABLES `Activity_Run` WRITE;
/*!40000 ALTER TABLE `Activity_Run` DISABLE KEYS */;
INSERT INTO `Activity_Run` VALUES (1,1,1,1,60,'2022-05-04 06:53:00'),(2,1,37,61,120,'2022-05-04 15:49:43'),(3,1,32,121,130,'2022-05-04 19:01:14'),(4,1,29,131,145,'2022-05-05 03:29:41'),(5,1,34,146,152,'2022-05-05 04:44:08'),(6,1,36,153,170,'2022-05-05 04:59:16'),(7,1,33,171,176,'2022-05-05 06:08:15'),(8,1,27,177,179,'2022-05-05 06:24:50'),(9,1,30,180,190,'2022-05-05 06:32:18'),(10,1,38,191,191,'2022-05-05 06:33:46'),(11,1,31,192,197,'2022-05-05 07:34:22'),(12,1,26,198,199,'2022-05-05 07:34:26'),(13,1,38,200,204,'2022-05-05 08:19:02'),(14,1,37,205,264,'2022-05-06 12:34:19'),(15,1,1,265,324,'2022-05-08 19:18:38'),(16,1,32,325,334,'2022-05-08 21:27:54'),(17,1,38,335,339,'2022-05-09 09:48:55'),(18,1,29,340,354,'2022-05-09 14:13:07'),(19,1,37,355,414,'2022-05-09 14:17:26'),(20,1,37,415,474,'2022-05-09 16:04:35'),(21,1,36,475,492,'2022-05-09 18:41:21'),(22,1,39,493,500,'2022-05-10 09:08:05'),(23,1,39,501,502,'2022-05-10 09:44:02'),(24,1,39,503,510,'2022-05-10 10:37:15'),(25,1,37,511,570,'2022-05-13 07:59:01'),(26,1,39,571,578,'2022-05-13 10:56:25'),(27,1,39,579,586,'2022-05-17 03:44:36'),(28,1,37,587,646,'2022-05-17 23:43:47'),(29,1,1,647,706,'2022-05-28 16:13:43'),(30,1,32,707,716,'2022-05-31 10:06:05'),(31,1,40,717,717,'2022-06-14 01:59:02'),(32,1,41,718,718,'2022-06-14 01:59:05'),(33,1,42,719,719,'2022-06-14 01:59:08');
/*!40000 ALTER TABLE `Activity_Run` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-06 10:16:37
