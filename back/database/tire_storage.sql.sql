-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tire_storage
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(100) NOT NULL,
  `car_registration_number` varchar(20) NOT NULL,
  `car_model` varchar(50) DEFAULT NULL,
  `tire_size` varchar(20) DEFAULT NULL,
  `tire_manufacturer` varchar(50) DEFAULT NULL,
  `warehouse_name` varchar(100) DEFAULT NULL,
  `number_of_tires` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'John Smith','ABC123','Toyota Camry','205/55R16','Michelin','Warehouse 1',4),(3,'Mark Brown','DEF456','Ford Focus','225/45R17','Goodyear','Warehouse 3',4),(4,'Emma Davis','GHJ123','Nissan Altima','205/60R16','Dunlop','Warehouse 1',4),(5,'Sophia Williams','KLM456','Chevrolet Malibu','215/55R17','Pirelli','Warehouse 2',4),(6,'Donna Doe','XYZ1234','Toyota Corolla','205/55R16','Michelin','Main Warehouse',3),(11,'Anna Smith','HELL1384','Toyota Camry\"','205/55R16','Michelin','SomeNameWarehouse',4),(12,'Otto Wane','ABC4483','Toyota Camry','205/55R17','Michelin','SomeNameWarehouse',3),(13,'Таня','SDDF','Toyota Carolla','205/55R16','Michelin','SomeNameWarehouse',2),(17,'Anna Smith','ABC4483','Toyota Camry','205/55R16','Michelin','SomeNameWarehouse',2);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tires`
--

DROP TABLE IF EXISTS `tires`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tires` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `tire_size` varchar(20) DEFAULT NULL,
  `tire_manufacturer` varchar(50) DEFAULT NULL,
  `tire_position` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `tires_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tires`
--

LOCK TABLES `tires` WRITE;
/*!40000 ALTER TABLE `tires` DISABLE KEYS */;
INSERT INTO `tires` VALUES (8,3,'225/45R17','Michelin','Front Left'),(39,1,'205/60R16','Dunlop','Back Left'),(88,11,'e','e','e'),(137,1,'205/60R16','Goodyear','Front Left');
/*!40000 ALTER TABLE `tires` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-21 21:17:49
