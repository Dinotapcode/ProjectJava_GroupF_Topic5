-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: koifish
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `consultations`
--

DROP TABLE IF EXISTS `consultations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultations` (
  `consultations_id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`consultations_id`),
  KEY `fk_product` (`product_id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultations`
--

LOCK TABLES `consultations` WRITE;
/*!40000 ALTER TABLE `consultations` DISABLE KEYS */;
INSERT INTO `consultations` VALUES (13,'2024-12-07','03:37:00','trancongkhoa15@gmail.com',14,NULL),(14,'2024-11-29','00:44:00','trancongkhoa15@gmail.com',14,NULL),(18,'2024-11-28','22:49:00','test@gmail.com',14,NULL),(20,'2024-11-29','00:12:00','test@gmail.com',2,1),(21,'2024-11-27','20:58:00','test@gmail.com',14,1),(22,'2024-11-29','21:30:00','0947529910',14,4),(23,'2024-11-21','21:34:00','trancongkhoa15@gmail.com',14,4),(24,'2024-11-29','21:37:00','0947529910',14,4),(25,'2024-11-28','21:01:00','trancongkhoa15@gmail.com',14,5),(26,'2024-11-20','23:19:00','trancongkhoa15@gmail.com',26,4),(27,'2024-11-28','23:23:00','trancongkhoa15@gmail.com',14,4),(28,'2024-11-21','23:25:00','0947529910',14,4),(29,'2024-11-29','23:28:00','test@gmail.com',14,4),(30,'2024-11-28','01:52:00','test@gmail.com',13,4),(31,'2024-11-21','07:03:00','trancongkhoa15@gmail.com',14,4),(32,'2024-11-19','07:07:00','trancongkhoa15@gmail.com',14,4),(33,'2024-11-21','10:03:00','trancongkhoa15@gmail.com',14,4);
/*!40000 ALTER TABLE `consultations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `element`
--

DROP TABLE IF EXISTS `element`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `element` (
  `element` varchar(30) NOT NULL,
  `support` text,
  `conflict` text,
  PRIMARY KEY (`element`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `element`
--

LOCK TABLES `element` WRITE;
/*!40000 ALTER TABLE `element` DISABLE KEYS */;
INSERT INTO `element` VALUES ('Hỏa','Mộc','Thủy'),('Kim','Thổ','Hỏa'),('Mộc','Thủy','Kim'),('Thổ','Hỏa','Mộc'),('Thủy','Kim','Thổ');
/*!40000 ALTER TABLE `element` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `koi`
--

DROP TABLE IF EXISTS `koi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `koi` (
  `koi_id` int NOT NULL AUTO_INCREMENT,
  `element` varchar(30) DEFAULT NULL,
  `species` text,
  `quantity` text,
  `image` text,
  `description` text,
  PRIMARY KEY (`koi_id`),
  KEY `koi_ibfk_1` (`element`),
  CONSTRAINT `koi_ibfk_1` FOREIGN KEY (`element`) REFERENCES `element` (`element`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `koi`
--

LOCK TABLES `koi` WRITE;
/*!40000 ALTER TABLE `koi` DISABLE KEYS */;
INSERT INTO `koi` VALUES (1,'Kim','Showa','Chẵn','showa_image.jpg','Cá Koi Showa có màu sắc rực rỡ, mang lại may mắn cho gia chủ.'),(2,'Thủy','Asagi','Lẻ','e32dfe91-ab6c-464a-87b1-61662e87db24_asagi_image.jpg','Cá Koi Asagi tượng trưng cho sự bình yên.'),(3,'Mộc','Kohaku','Chẵn','kohaku_image.jpg','Cá Koi Kohaku mang lại sự thịnh vượng và giàu có.'),(5,'Thổ','Shiro Utsuri','Chẵn','shiroutsuri_image.jpg','Cá Koi Shiro Utsuri tượng trưng cho sự ổn định.'),(8,'Hoả','Tancho','Chẵn','0fc925f2-2120-4b9b-a73f-f332ff219264_tancho_image.jpg','hale');
/*!40000 ALTER TABLE `koi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(19,2) NOT NULL,
  `payment_date` date NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `subscription_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `subscription_id` (`subscription_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`subscription_id`) REFERENCES `subscription` (`subscription_id`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,50000.00,'2024-11-23','Completed',1,1);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ponds`
--

DROP TABLE IF EXISTS `ponds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ponds` (
  `pond_id` int NOT NULL AUTO_INCREMENT,
  `element` varchar(30) DEFAULT NULL,
  `shape` text,
  `location` text,
  `direction` text,
  PRIMARY KEY (`pond_id`),
  KEY `ponds_ibfk_1` (`element`),
  CONSTRAINT `ponds_ibfk_1` FOREIGN KEY (`element`) REFERENCES `element` (`element`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ponds`
--

LOCK TABLES `ponds` WRITE;
/*!40000 ALTER TABLE `ponds` DISABLE KEYS */;
INSERT INTO `ponds` VALUES (4,'Hỏa','Chữ nhật','Phía Nam','Đông Bắc'),(5,'Thổ','Vô định','Phía Nam','Nam'),(6,'Mộc','Tròn','Phía Đông Nam','Tây Bắc'),(10,'Mộc','Bầu dục','Phía Tây Nam','Tây Bắc'),(12,'Mộc','Chữ nhật','Phía Đông','Bắc'),(13,'Kim','Tròn','Phía Bắc','Bắc'),(14,'Mộc','Bầu dục','Phía Nam','Bắc');
/*!40000 ALTER TABLE `ponds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (8,'Phong thủy cá Koi không chỉ là về thiết kế hồ mà còn liên quan đến việc chọn loài cá phù hợp với mệnh của gia chủ. Hãy tìm hiểu cách chọn cá hợp phong thủy để tăng tài lộc.','2024-11-14 09:45:00','2024-11-14','post1.jpg','ACTIVE','Chọn cá Koi hợp phong thủy',NULL),(9,'Cá Koi màu đỏ tượng trưng cho tình yêu và sự may mắn, trong khi cá màu vàng biểu trưng cho sự giàu có. Bài viết này sẽ giúp bạn hiểu rõ ý nghĩa từng loại cá Koi.','2024-11-15 14:00:00','2024-11-15','post1.jpg','ACTIVE','Ý nghĩa màu sắc cá Koi',NULL),(10,'Bố trí hệ thống lọc nước đúng cách giúp duy trì môi trường sống lý tưởng cho cá Koi và ngăn ngừa các bệnh liên quan đến chất lượng nước.','2024-11-16 11:30:00','2024-11-16','post1.jpg','ACTIVE','Hệ thống lọc nước cho hồ cá Koi',NULL),(11,'Bạn có biết mỗi hướng đặt hồ cá Koi trong vườn đều mang ý nghĩa phong thủy khác nhau? Hãy khám phá cách chọn hướng phù hợp cho ngôi nhà của bạn.','2024-11-17 16:00:00','2024-11-17','post1.jpg','ACTIVE','Chọn hướng đặt hồ cá Koi',NULL),(12,'Một hồ cá Koi thiết kế đẹp không chỉ thu hút sự chú ý mà còn giúp cân bằng năng lượng trong ngôi nhà, mang lại sự hài hòa và thịnh vượng.','2024-11-18 18:20:00','2024-11-18','post1.jpg','ACTIVE','Hồ cá Koi và phong thủy gia đình',NULL);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `item` varchar(100) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `description` text,
  `info1` text,
  `info2` text,
  `info3` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'Hồ thủy sinh','aquarium','Hình vuông',1000000.00,'aquarium.jpg','Mô tả hồ thủy sinh...','1m x 0.5m x 0.5m','Kính cường lực','Nhật Bản'),(3,'Cá cảnh 1','fish','Cá Koi Asagi',1500000.00,'1.png','Mô tả cá phong thủy...','Đỏ','500g','Việt Nam'),(6,'Hồ thủy sinh 3','aquarium','Hình bầu dục',2200000.00,'aquarium.jpg','Mô tả hồ thủy sinh...','1m x 0.5m x 0.5m','Kính cường lực','Nhật Bản'),(7,'Cá đuôi đỏ','fish','Cá Koi Shiro Utsuri',1700000.00,'1.png','Mô tả cá phong thủy...','Đỏ','500g','Việt Nam'),(8,'Hồ thủy sinh 4','aquarium','Hình chữ nhật',2800000.00,'aquarium.jpg','Mô tả hồ thủy sinh...','1m x 0.5m x 0.5m','Kính cường lực','Nhật Bản'),(9,'Cá bảy màu','fish','Cá Koi Sanke',1600000.00,'1.png','Mô tả cá phong thủy...','Đỏ','500g','Việt Nam'),(11,'Cá phong thủy','Cá','Cá Koi Showa',23532.00,'78bcba6b-9b1a-46a7-ad8b-e7a821af0801.png','dfgdf','đrtre','500g','trung quốc'),(13,'khoa','Cá','Cá Koi Asagi',3534.00,'8da971c2-ce38-43cb-8a3e-991e597dd4ce.png','Mô tả cá phong thủy...','đỏ','500g','trung quốc'),(14,'khoa','Cá','Cá Koi Asagi',3534.00,'3f2af96a-e086-407d-bb95-f1f82843f57c.png','Mô tả cá phong thủy...','đỏ','500g','trung quốc'),(15,'gfgd','Cá','Cá Koi Asagi',345654.00,'1.png','dfgdf','Đỏ','thắng','thắng'),(16,'Cá phong thủy','Cá','Cá Koi Asagi',34543.00,'1.png','dfgdf','đrtre','543','trung quốc'),(24,'Cá phong thủy','fish','Cá Koi Shiro Utsuri',43655.00,'13d6e789-4d85-4839-a66c-959bc79a26bf_7.png','dfgdf','Đỏ','543','234'),(25,'gfgd','fish','Cá Koi Asagi',234532.00,'39511ee9-3b59-4c18-a6a5-005ceeb3f86c_5.png','Mô tả cá phong thủy...','Đỏ','thắng','234'),(26,'gfgd','aquarium','Hồ hình vuông',5474.00,'90016c91-b16a-42cc-ae1b-3f9a5b8c6471_6.png','','đrtre','thắng','234'),(27,'tét','aquarium','Hồ hình bầu dục',346453.00,'20a46921-6f58-4e5e-9949-9756dfc7615d_1.png','Mô tả cá phong thủy...','đrtre','543','234'),(28,'máy lọc không khí ','fish','Cá Koi Kohaku',9898.00,'40eb5be6-d7d5-49e5-9955-7f58017fecc3_test.jpg','SADAS','Đỏ','500g','việt nam'),(29,'gfgd','fish','Cá Koi Shiro Utsuri',453.00,'93003a56-359b-447e-a063-cf18e1c0a7f0_5.png','dfgdf','4243','500g','việt nam'),(30,'Cá phong thủy','fish','Cá Koi Asagi',5465.00,'4d1e9bf5-4fe9-4f00-949f-ba347ff04903_2.png','Mô tả cá phong thủy...','4243','543','trung quốc'),(31,'gfgd','fish','Cá Koi Shiro Utsuri',567865.00,'54f3ab6c-3a94-40d1-9b90-bcf4a4eb87fd_5.png','Mô tả cá phong thủy...','Đỏ','500g','khoa');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription` (
  `subscription_id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `duration` int NOT NULL,
  `price` double NOT NULL,
  `subscription_name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`subscription_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription`
--

LOCK TABLES `subscription` WRITE;
/*!40000 ALTER TABLE `subscription` DISABLE KEYS */;
INSERT INTO `subscription` VALUES (1,'3 ngày đăng bài.',3,50000,'Gói học sinh','Active');
/*!40000 ALTER TABLE `subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthday` date DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('ROLE_USER','ROLE_ADMIN') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `enabled` bit(1) NOT NULL,
  `wallet` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Nguyễn Văn Thắng','$2a$10$LbDSxcqtJyB38hH0yKjnguKsDXBKlaM3AitLZ7tVbnZ57IzOkj6wa','1970-01-02','6124b0d3-968c-4c70-952f-cf682e7c837e_1590394186812_image001_amkj.jpg','thang17102015@gmail.com','111','ROLE_ADMIN',NULL,'2024-11-23 01:00:54',_binary '','33332883333'),(2,'dwed','$2a$10$1DFd9ssghwxyiFXSRJY1sObWpRlCgQ2wkSAYQWa9ncRAFy1owglsC','1970-01-02',NULL,'111115@gmail.com','11','ROLE_USER',NULL,NULL,_binary '',NULL),(3,'Nguyễn Văn Thắng22','$2a$10$3h4cQjZSCNFGVHzS.J0BsO4ZzLNd1mnSWuSf3hF4ZeOjRgA5WNctq',NULL,NULL,'1@gmail.com',NULL,'ROLE_USER',NULL,NULL,_binary '\0',NULL),(4,'dwed','$2a$10$xr3QeTe8s97qmbETnomGEu0nC1b4eDgRvF9835yTKHw8LUTvrTV3m',NULL,NULL,'2251120113@ut.edu.vn',NULL,'ROLE_USER',NULL,NULL,_binary '\0',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_subscriptions`
--

DROP TABLE IF EXISTS `user_subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_subscriptions` (
  `user_id` int NOT NULL,
  `subscription_id` int NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`user_id`,`subscription_id`),
  KEY `subscription_id` (`subscription_id`),
  CONSTRAINT `user_subscriptions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `user_subscriptions_ibfk_2` FOREIGN KEY (`subscription_id`) REFERENCES `subscription` (`subscription_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_subscriptions`
--

LOCK TABLES `user_subscriptions` WRITE;
/*!40000 ALTER TABLE `user_subscriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_subscriptions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-23 11:08:36
