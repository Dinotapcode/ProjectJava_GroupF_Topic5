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
INSERT INTO `koi` VALUES (1,'Kim','Showa','Chẵn','showa_image.jpg','Cá Koi Showa có màu sắc rực rỡ, mang lại may mắn cho gia chủ.'),(2,'Thủy','Asagi','Lẻ','e32dfe91-ab6c-464a-87b1-61662e87db24_asagi_image.jpg','Cá Koi Asagi tượng trưng cho sự bình yên.'),(3,'Mộc','Kohaku','Chẵn','kohaku_image.jpg','Cá Koi Kohaku mang lại sự thịnh vượng và giàu có.'),(5,'Thổ','Shiro Utsuri','Chẵn','shiroutsuri_image.jpg','Cá Koi Shiro Utsuri tượng trưng cho sự ổn định.'),(8,'Hoả','Tancho','Lẻ','0fc925f2-2120-4b9b-a73f-f332ff219264_tancho_image.jpg','Cá Koi Tancho tượng trưng cho sức khoẻ.');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,50000.00,'2024-11-23','Completed',1,1),(2,50000.00,'2024-11-25','Completed',1,4),(3,50000.00,'2024-11-25','Completed',1,4),(4,50000.00,'2024-11-25','Completed',1,4),(5,50000.00,'2024-11-25','Completed',1,4),(6,50000.00,'2024-11-25','Completed',1,4),(7,50000.00,'2024-11-25','Completed',1,4),(8,50000.00,'2024-11-25','Completed',1,4),(9,50000.00,'2024-11-25','Completed',1,1),(10,50000.00,'2024-11-25','Completed',1,1),(11,500000.00,'2024-11-25','Completed',10,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ponds`
--

LOCK TABLES `ponds` WRITE;
/*!40000 ALTER TABLE `ponds` DISABLE KEYS */;
INSERT INTO `ponds` VALUES (5,'Thổ','Tròn','Đông Bắc','Nam'),(17,'Mộc','Vuông','Nam','Đông Bắc'),(18,'Hỏa','Vô định','Phía Nam','Đông Nam'),(19,'Kim','Chữ nhật','Tây','Đông Bắc'),(20,'Thủy','Elip','Tây Bắc','Đông Nam');
/*!40000 ALTER TABLE `ponds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (58,'Cá Koi không chỉ là loài cá cảnh đẹp mà còn mang ý nghĩa phong thủy sâu sắc. Việc nuôi cá Koi giúp cân bằng năng lượng, mang lại tài lộc và sự thịnh vượng cho gia chủ.','2024-11-20 01:00:00','2024-11-20','post1.jpg','ACTIVE','Cá Koi và ý nghĩa phong thủy',NULL),(59,'Hệ thống lọc hồ cá Koi đóng vai trò quan trọng trong việc duy trì sức khỏe của cá. Bạn cần chọn loại lọc phù hợp với kích thước hồ và lượng cá nuôi.','2024-11-20 02:00:00','2024-11-20','post2.jpg','ACTIVE','Lọc hồ cá Koi hiệu quả',NULL),(60,'Nuôi cá Koi là nghệ thuật kết hợp giữa thẩm mỹ và kỹ thuật. Để cá phát triển khỏe mạnh, bạn cần cung cấp chế độ ăn uống hợp lý.','2024-11-20 03:00:00','2024-11-20','post3.jpg','ACTIVE','Mẹo nuôi cá Koi khỏe mạnh',NULL),(61,'Cá Koi màu đỏ thường được ưa chuộng vì mang lại sự may mắn và hạnh phúc. Bạn có biết rằng mỗi màu sắc của cá Koi đều có ý nghĩa riêng?','2024-11-20 04:00:00','2024-11-20','post4.jpg','ACTIVE','Ý nghĩa màu sắc cá Koi',NULL),(62,'Thiết kế hồ cá Koi là một quá trình đòi hỏi sự tỉ mỉ và sáng tạo. Một hồ cá được thiết kế đúng chuẩn không chỉ đẹp mà còn mang lại phong thủy tốt.','2024-11-20 05:00:00','2024-11-20','post5.jpg','ACTIVE','Thiết kế hồ cá Koi đẹp',NULL),(63,'Bạn đang tìm kiếm giống cá Koi phù hợp? Kohaku, Sanke và Showa là những giống phổ biến và dễ nuôi.','2024-11-20 06:00:00','2024-11-20','post6.jpg','ACTIVE','Các giống cá Koi phổ biến',NULL),(64,'Chất lượng nước là yếu tố quyết định sự phát triển của cá Koi. Nước phải trong, không có tạp chất và duy trì độ pH ổn định.','2024-11-20 07:00:00','2024-11-20','post7.jpg','ACTIVE','Tầm quan trọng của chất lượng nước',NULL),(65,'Trong phong thủy, hướng đặt hồ cá Koi rất quan trọng. Đặt hồ ở hướng Đông Nam giúp thu hút tài lộc và cân bằng năng lượng.','2024-11-20 08:00:00','2024-11-20','post8.jpg','ACTIVE','Phong thủy hồ cá Koi',NULL),(66,'Thức ăn cho cá Koi cần đảm bảo đủ dinh dưỡng và phù hợp với từng giai đoạn phát triển. Hãy chọn thức ăn giàu protein và vitamin.','2024-11-20 09:00:00','2024-11-20','post9.jpg','ACTIVE','Thức ăn phù hợp cho cá Koi',NULL),(67,'Cá Koi không chỉ là thú vui tao nhã mà còn là biểu tượng của sự kiên nhẫn và đam mê.','2024-11-20 10:00:00','2024-11-20','post10.jpg','ACTIVE','Cá Koi - Thú vui tao nhã',NULL),(68,'Việc bảo dưỡng hồ cá Koi đúng cách sẽ giúp bạn tiết kiệm chi phí và thời gian. Hãy kiểm tra hệ thống lọc nước định kỳ.','2024-11-21 01:00:00','2024-11-21','post11.jpg','ACTIVE','Bí quyết bảo dưỡng hồ cá',NULL),(69,'Bạn có biết cá Koi có thể sống hơn 20 năm nếu được chăm sóc đúng cách? Việc nuôi cá Koi là hành trình dài hạn.','2024-11-21 02:00:00','2024-11-21','post12.jpg','ACTIVE','Tuổi thọ của cá Koi',NULL),(70,'Cách bài trí hồ cá Koi có thể thay đổi toàn bộ không gian sống của bạn. Một hồ cá đẹp không chỉ tăng tính thẩm mỹ mà còn mang lại cảm giác thư giãn.','2024-11-21 03:00:00','2024-11-21','post13.jpg','ACTIVE','Bài trí hồ cá Koi đẹp',NULL),(71,'Hãy cùng khám phá 5 lỗi phổ biến mà người mới nuôi cá Koi thường gặp, từ việc chọn giống cá không phù hợp đến hệ thống lọc không đảm bảo.','2024-11-21 04:00:00','2024-11-21','post14.jpg','ACTIVE','Sai lầm khi nuôi cá Koi',NULL),(72,'Nếu bạn đang có ý định thiết kế hồ cá Koi trong sân vườn, hãy tham khảo ngay các ý tưởng từ chuyên gia.','2024-11-21 05:00:00','2024-11-21','post15.jpg','ACTIVE','Ý tưởng hồ cá sân vườn',NULL),(73,'Bạn muốn tìm hiểu cách nuôi cá Koi trong không gian nhỏ? Hồ mini là giải pháp hoàn hảo để bạn có thể nuôi cá dù diện tích hạn chế.','2024-11-21 06:00:00','2024-11-21','post1.jpg','ACTIVE','Hồ cá Koi mini',NULL),(74,'Cá Koi không chỉ làm đẹp cho ngôi nhà mà còn là biểu tượng của sự thành công. Việc chăm sóc cá cũng giúp bạn thư giãn sau những giờ làm việc căng thẳng.','2024-11-21 07:00:00','2024-11-21','post2.jpg','ACTIVE','Cá Koi và cuộc sống',NULL),(75,'Tìm hiểu các công cụ và thiết bị hỗ trợ nuôi cá Koi hiện đại như máy lọc nước, hệ thống oxy hóa và các loại đèn LED trang trí cho hồ cá.','2024-11-21 08:00:00','2024-11-21','post3.jpg','ACTIVE','Công cụ hỗ trợ nuôi cá Koi',NULL),(76,'Lựa chọn hình dáng hồ cá Koi ảnh hưởng rất lớn đến thẩm mỹ và phong thủy. Hình dáng phổ biến gồm hình chữ nhật, oval hoặc tự nhiên.','2024-11-21 09:00:00','2024-11-21','post4.jpg','ACTIVE','Hình dáng hồ cá Koi',NULL),(77,'Bạn có biết cách nhận biết cá Koi khỏe mạnh? Một con cá Koi khỏe thường có màu sắc tươi sáng, bơi lội linh hoạt và không có dấu hiệu bệnh tật.','2024-11-21 10:00:00','2024-11-21','post5.jpg','ACTIVE','Nhận biết cá Koi khỏe mạnh',NULL),(78,'Hồ cá Koi bị rêu tảo là vấn đề thường gặp khi nuôi cá. Việc làm sạch hồ định kỳ và sử dụng các thiết bị lọc chất lượng sẽ giúp khắc phục tình trạng này.','2024-11-22 01:00:00','2024-11-22','post6.jpg','INACTIVE','Cách xử lý rêu tảo hồ cá Koi',NULL),(79,'Các bước đơn giản để thiết kế hồ cá Koi tiết kiệm chi phí bao gồm: chọn kích thước phù hợp, sử dụng vật liệu sẵn có và tự thiết kế hệ thống lọc.','2024-11-22 02:00:00','2024-11-22','post7.jpg','INACTIVE','Thiết kế hồ cá tiết kiệm',NULL),(80,'Bạn có biết cá Koi cũng có thể mắc các bệnh như nấm, ký sinh trùng? Hãy thường xuyên kiểm tra sức khỏe và tham khảo ý kiến chuyên gia nếu cần.','2024-11-22 03:00:00','2024-11-22','post8.jpg','INACTIVE','Bệnh thường gặp ở cá Koi',NULL),(81,'Hãy sử dụng các loại thực vật thủy sinh để trang trí hồ cá Koi. Các loại cây như sen, súng không chỉ làm đẹp mà còn giúp cải thiện chất lượng nước.','2024-11-22 04:00:00','2024-11-22','post9.jpg','INACTIVE','Cây thủy sinh cho hồ cá',NULL),(82,'Bạn có thể xây dựng hồ cá Koi trong nhà với các thiết kế hiện đại. Hồ trong nhà không chỉ giúp tiết kiệm không gian mà còn tăng tính sang trọng.','2024-11-22 05:00:00','2024-11-22','post10.jpg','INACTIVE','Hồ cá Koi trong nhà',NULL),(83,'Hãy chọn giống cá Koi có nguồn gốc rõ ràng để đảm bảo sức khỏe và độ bền. Giống cá từ Nhật Bản thường được ưa chuộng hơn cả.','2024-11-22 06:00:00','2024-11-22','post1.jpg','INACTIVE','Lựa chọn giống cá Koi',NULL),(84,'Cá Koi cần được cung cấp một môi trường sống an toàn và ổn định. Đừng quên kiểm tra các yếu tố như nhiệt độ, độ pH và oxy trong nước.','2024-11-22 07:00:00','2024-11-22','post2.jpg','INACTIVE','Môi trường sống của cá Koi',NULL),(85,'Việc nuôi cá Koi không chỉ giúp bạn thư giãn mà còn mang lại cảm giác bình yên và hạnh phúc cho ngôi nhà.','2024-11-22 08:00:00','2024-11-22','post3.jpg','INACTIVE','Cá Koi - Niềm vui cuộc sống',NULL),(86,'Đừng quên vệ sinh hệ thống lọc hồ cá Koi mỗi tuần để đảm bảo nước luôn trong sạch và an toàn cho cá.','2024-11-22 09:00:00','2024-11-22','post4.jpg','INACTIVE','Vệ sinh hệ thống lọc',NULL),(87,'Cách nuôi cá Koi trong bể kính là một lựa chọn thú vị cho những ai yêu thích sự độc đáo và sáng tạo trong thiết kế hồ cá.','2024-11-22 10:00:00','2024-11-22','post5.jpg','INACTIVE','Nuôi cá Koi trong bể kính',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (33,'Cá Koi Đỏ','fish','Koi',250000.00,'ca1.jpg','Cá Koi màu đỏ tươi, biểu tượng của sự may mắn và tài lộc.','Đỏ','0.8kg','Nhật Bản'),(34,'Cá Koi Vàng','fish','Koi',220000.00,'ca2.jpg','Cá Koi màu vàng óng ánh, mang lại sự thịnh vượng và giàu có.','Vàng','1.0kg','Nhật Bản'),(35,'Cá Koi Trắng','fish','Koi',230000.00,'ca3.jpg','Cá Koi màu trắng tinh khiết, là biểu tượng của sự thanh khiết và tinh tế.','Trắng','0.9kg','Nhật Bản'),(36,'Cá Koi Cam','fish','Koi',240000.00,'ca4.jpg','Cá Koi màu cam tươi sáng, tạo cảm giác ấm áp và hạnh phúc.','Cam','1.2kg','Nhật Bản'),(37,'Cá Koi Đen','fish','Koi',250000.00,'ca5.jpg','Cá Koi màu đen, đại diện cho sự mạnh mẽ và quyền lực.','Đen','1.1kg','Nhật Bản'),(38,'Cá Koi Hồng','fish','Koi',210000.00,'ca6.jpg','Cá Koi màu hồng nhẹ nhàng, mang đến sự bình an và hạnh phúc.','Hồng','0.7kg','Nhật Bản'),(39,'Cá Koi Bạch Kim','fish','Koi',300000.00,'ca7.jpg','Cá Koi màu bạch kim, tượng trưng cho sự quý phái và sang trọng.','Bạch Kim','1.3kg','Nhật Bản'),(40,'Cá Koi Xanh','fish','Koi',260000.00,'ca8.jpg','Cá Koi màu xanh, mang lại sự tươi mới và bình an cho gia chủ.','Xanh','0.8kg','Nhật Bản'),(41,'Cá Koi Kim Long','fish','Koi',280000.00,'ca9.jpg','Cá Koi kim long vàng, mang lại tài lộc và may mắn.','Vàng','1.4kg','Nhật Bản'),(42,'Cá Koi Đỏ Cam','fish','Koi',220000.00,'ca10.jpg','Cá Koi màu đỏ cam, tạo nên một không gian sinh động và đầy năng lượng.','Đỏ Cam','0.9kg','Nhật Bản'),(43,'Cá Koi Bướm','fish','Koi',210000.00,'ca1.jpg','Cá Koi màu trắng pha cam, giống cá có hình dáng thanh thoát như cánh bướm.','Trắng, Cam','1.0kg','Nhật Bản'),(44,'Cá Koi Trắng Vàng','fish','Koi',230000.00,'ca2.jpg','Cá Koi màu trắng và vàng, đại diện cho sự thịnh vượng và tài lộc.','Trắng, Vàng','1.2kg','Nhật Bản'),(45,'Cá Koi Hổ Phách','fish','Koi',250000.00,'ca3.jpg','Cá Koi màu hổ phách, mang đến sự may mắn và thành công trong công việc.','Hổ Phách','1.1kg','Nhật Bản'),(46,'Cá Koi Rồng','fish','Koi',270000.00,'ca4.jpg','Cá Koi màu cam pha vàng, biểu tượng của sự mạnh mẽ và tài lộc.','Cam Vàng','1.5kg','Nhật Bản'),(47,'Cá Koi Thần Tài','fish','Koi',230000.00,'ca5.jpg','Cá Koi mang màu vàng sáng, là biểu tượng của thần tài và may mắn.','Vàng','0.9kg','Nhật Bản'),(48,'Cá Koi Xanh Đen','fish','Koi',240000.00,'ca6.jpg','Cá Koi màu xanh đen, đại diện cho sự bí ẩn và sang trọng.','Xanh Đen','1.3kg','Nhật Bản'),(49,'Cá Koi Xanh Lá','fish','Koi',220000.00,'ca7.jpg','Cá Koi màu xanh lá cây, mang lại sự bình an và thư giãn.','Xanh Lá','1.0kg','Nhật Bản'),(50,'Cá Koi Trắng Hồng','fish','Koi',210000.00,'ca8.jpg','Cá Koi màu trắng hồng, biểu tượng của tình yêu và sự lãng mạn.','Trắng Hồng','0.8kg','Nhật Bản'),(51,'Cá Koi Đỏ Vàng','fish','Koi',260000.00,'ca9.jpg','Cá Koi màu đỏ vàng, mang đến sự phú quý và tài lộc cho gia chủ.','Đỏ Vàng','1.2kg','Nhật Bản'),(52,'Cá Koi Hoa Sen','fish','Koi',250000.00,'ca10.jpg','Cá Koi với những sắc màu nhẹ nhàng của hoa sen, mang lại sự bình yên và hạnh phúc.','Hồng Sen','0.9kg','Nhật Bản'),(83,'Hồ Cá Hình Tròn','aquarium','Tròn',350000.00,'h1.jpg','Hồ cá hình tròn, thích hợp cho không gian nhỏ.','D10 x R10 x C10 cm','Kính cường lực','Nhật Bản'),(84,'Hồ Cá Hình Vuông','aquarium','Vuông',380000.00,'h2.jpg','Hồ cá hình vuông, thiết kế hiện đại, dễ dàng bố trí.','D20 x R20 x C20 cm','Kính cường lực','Nhật Bản'),(85,'Hồ Cá Hình Chữ Nhật','aquarium','Chữ Nhật',420000.00,'h3.jpg','Hồ cá hình chữ nhật, thích hợp cho không gian lớn.','D30 x R15 x C20 cm','Kính cường lực','Nhật Bản'),(86,'Hồ Cá Hình Trụ','aquarium','Trụ',450000.00,'h4.jpg','Hồ cá hình trụ, phong cách mới lạ cho không gian sang trọng.','D15 x R15 x C30 cm','Kính cường lực','Nhật Bản'),(87,'Hồ Cá Hình Lục Giác','aquarium','Lục Giác',470000.00,'h5.jpg','Hồ cá hình lục giác, độc đáo và tinh tế.','D25 x R25 x C25 cm','Kính cường lực','Nhật Bản'),(88,'Hồ Cá Hình Trái Tim','aquarium','Trái Tim',500000.00,'h6.jpg','Hồ cá hình trái tim, biểu tượng của tình yêu và sự hòa hợp.','D20 x R20 x C20 cm','Kính cường lực','Nhật Bản'),(89,'Hồ Cá Hình Oval','aquarium','Oval',380000.00,'h7.jpg','Hồ cá hình oval, thiết kế uốn lượn tạo không gian mềm mại.','D30 x R15 x C20 cm','Kính cường lực','Nhật Bản'),(90,'Hồ Cá Hình Vương Miện','aquarium','Vương Miện',550000.00,'h8.jpg','Hồ cá hình vương miện, sang trọng và quý phái.','D40 x R30 x C25 cm','Kính cường lực','Nhật Bản'),(91,'Hồ Cá Hình Tâm','aquarium','Tâm',380000.00,'h9.jpg','Hồ cá hình tâm, biểu tượng của sự cân bằng và bình an.','D20 x R20 x C20 cm','Kính cường lực','Nhật Bản'),(92,'Hồ Cá Hình Ngôi Sao','aquarium','Ngôi Sao',500000.00,'h10.jpg','Hồ cá hình ngôi sao, thiết kế độc đáo và lôi cuốn.','D30 x R30 x C25 cm','Kính cường lực','Nhật Bản'),(93,'Hồ Cá Hình Chóp','aquarium','Chóp',430000.00,'h1.jpg','Hồ cá hình chóp, phù hợp cho không gian hiện đại.','D20 x R20 x C30 cm','Kính cường lực','Nhật Bản'),(94,'Hồ Cá Hình Bầu Dục','aquarium','Bầu Dục',460000.00,'h2.jpg','Hồ cá hình bầu dục, thiết kế mềm mại và thanh thoát.','D25 x R15 x C20 cm','Kính cường lực','Nhật Bản'),(95,'Hồ Cá Hình Tám Cạnh','aquarium','Tám Cạnh',480000.00,'h3.jpg','Hồ cá hình tám cạnh, tạo điểm nhấn cho không gian.','D30 x R30 x C30 cm','Kính cường lực','Nhật Bản'),(96,'Hồ Cá Hình Mái Vòm','aquarium','Mái Vòm',510000.00,'h4.jpg','Hồ cá hình mái vòm, thiết kế tinh tế và độc đáo.','D25 x R25 x C30 cm','Kính cường lực','Nhật Bản'),(97,'Hồ Cá Hình Kim Cương','aquarium','Kim Cương',550000.00,'h5.jpg','Hồ cá hình kim cương, sang trọng và nổi bật.','D40 x R30 x C35 cm','Kính cường lực','Nhật Bản'),(98,'Hồ Cá Hình Lều','aquarium','Lều',470000.00,'h6.jpg','Hồ cá hình lều, kiểu dáng sáng tạo và đẹp mắt.','D20 x R20 x C25 cm','Kính cường lực','Nhật Bản'),(99,'Hồ Cá Hình Trái Cầu','aquarium','Trái Cầu',490000.00,'h7.jpg','Hồ cá hình trái cầu, tượng trưng cho sự viên mãn và hoàn hảo.','D30 x R30 x C30 cm','Kính cường lực','Nhật Bản'),(100,'Hồ Cá Hình Vạn Lý Trường Thành','aquarium','Vạn Lý Trường Thành',520000.00,'h8.jpg','Hồ cá hình vạn lý trường thành, độc đáo và hấp dẫn.','D35 x R35 x C40 cm','Kính cường lực','Nhật Bản'),(101,'Hồ Cá Hình Hình Trụ Cột','aquarium','Hình Trụ Cột',540000.00,'h9.jpg','Hồ cá hình trụ cột, mang lại cảm giác vững chãi và mạnh mẽ.','D25 x R25 x C40 cm','Kính cường lực','Nhật Bản'),(102,'Hồ Cá Hình Tháp','aquarium','Tháp',580000.00,'h10.jpg','Hồ cá hình tháp, tạo điểm nhấn cho không gian sống.','D40 x R30 x C45 cm','Kính cường lực','Nhật Bản'),(103,'Hồ Cá Hình Vòm','aquarium','Vòm',430000.00,'h1.jpg','Hồ cá hình vòm, thiết kế nhẹ nhàng và thanh thoát.','D30 x R20 x C30 cm','Kính cường lực','Nhật Bản'),(104,'Hồ Cá Hình Cánh Buồm','aquarium','Cánh Buồm',450000.00,'h2.jpg','Hồ cá hình cánh buồm, tạo cảm giác bay bổng và tự do.','D20 x R25 x C25 cm','Kính cường lực','Nhật Bản'),(105,'Hồ Cá Hình Dải Ngân Hà','aquarium','Dải Ngân Hà',470000.00,'h3.jpg','Hồ cá hình dải ngân hà, vẻ đẹp độc đáo và huyền bí.','D35 x R25 x C30 cm','Kính cường lực','Nhật Bản'),(106,'Hồ Cá Hình Thác Nước','aquarium','Thác Nước',490000.00,'h4.jpg','Hồ cá hình thác nước, thích hợp cho không gian thư giãn.','D30 x R30 x C35 cm','Kính cường lực','Nhật Bản'),(107,'Hồ Cá Hình Xoắn Ốc','aquarium','Xoắn Ốc',520000.00,'h5.jpg','Hồ cá hình xoắn ốc, thiết kế phá cách và lạ mắt.','D25 x R25 x C30 cm','Kính cường lực','Nhật Bản'),(108,'Hồ Cá Hình Sóng','aquarium','Sóng',540000.00,'h6.jpg','Hồ cá hình sóng, thiết kế mềm mại và hiện đại.','D20 x R30 x C40 cm','Kính cường lực','Nhật Bản'),(109,'Hồ Cá Hình Lưới','aquarium','Lưới',550000.00,'h7.jpg','Hồ cá hình lưới, phù hợp với không gian mở và thoáng.','D35 x R20 x C35 cm','Kính cường lực','Nhật Bản'),(110,'Hồ Cá Hình Gai','aquarium','Gai',570000.00,'h8.jpg','Hồ cá hình gai, sang trọng và khác biệt.','D25 x R25 x C40 cm','Kính cường lực','Nhật Bản'),(111,'Hồ Cá Hình Bọt Biển','aquarium','Bọt Biển',590000.00,'h9.jpg','Hồ cá hình bọt biển, cho cảm giác tựa như một vùng biển bao la.','D40 x R40 x C45 cm','Kính cường lực','Nhật Bản'),(112,'Cá Koi Đỏ','fish','Showa',250000.00,'ca1.jpg','Cá Koi màu đỏ tươi, biểu tượng của sự may mắn và tài lộc.','Đỏ','0.8kg','Nhật Bản'),(113,'Cá Koi Vàng','fish','Showa',220000.00,'ca2.jpg','Cá Koi màu vàng óng ánh, mang lại sự thịnh vượng và giàu có.','Vàng','1.0kg','Nhật Bản'),(114,'Cá Koi Trắng','fish','Showa',230000.00,'ca3.jpg','Cá Koi màu trắng tinh khiết, là biểu tượng của sự thanh khiết và tinh tế.','Trắng','0.9kg','Nhật Bản'),(115,'Cá Koi Cam','fish','Aragi',240000.00,'ca4.jpg','Cá Koi màu cam tươi sáng, tạo cảm giác ấm áp và hạnh phúc.','Cam','1.2kg','Nhật Bản'),(116,'Cá Koi Đen','fish','Sanke',250000.00,'ca5.jpg','Cá Koi màu đen, đại diện cho sự mạnh mẽ và quyền lực.','Đen','1.1kg','Nhật Bản'),(117,'Cá Koi Hồng','fish','Kohaku',210000.00,'ca6.jpg','Cá Koi màu hồng nhẹ nhàng, mang đến sự bình an và hạnh phúc.','Hồng','0.7kg','Nhật Bản'),(118,'Cá Koi Bạch Kim','fish','Shiro Utsuri',300000.00,'ca7.jpg','Cá Koi màu bạch kim, tượng trưng cho sự quý phái và sang trọng.','Bạch Kim','1.3kg','Nhật Bản'),(119,'Cá Koi Xanh','fish','Asagi',260000.00,'ca8.jpg','Cá Koi màu xanh, mang lại sự tươi mới và bình an cho gia chủ.','Xanh','0.8kg','Nhật Bản'),(120,'Cá Koi Kim Long','fish','Kin Gin Rin',280000.00,'ca9.jpg','Cá Koi kim long vàng, mang lại tài lộc và may mắn.','Vàng','1.4kg','Nhật Bản'),(121,'Cá Koi Đỏ Cam','fish','Tancho',220000.00,'ca10.jpg','Cá Koi màu đỏ cam, tạo nên một không gian sinh động và đầy năng lượng.','Đỏ Cam','0.9kg','Nhật Bản'),(122,'Cá Koi Bướm','fish','Showa',210000.00,'ca1.jpg','Cá Koi màu trắng pha cam, giống cá có hình dáng thanh thoát như cánh bướm.','Trắng, Cam','1.0kg','Nhật Bản'),(123,'Cá Koi Trắng Vàng','fish','Kohaku',230000.00,'ca2.jpg','Cá Koi màu trắng và vàng, đại diện cho sự thịnh vượng và tài lộc.','Trắng, Vàng','1.2kg','Nhật Bản'),(124,'Cá Koi Hổ Phách','fish','Sanke',250000.00,'ca3.jpg','Cá Koi màu hổ phách, mang đến sự may mắn và thành công trong công việc.','Hổ Phách','1.1kg','Nhật Bản'),(125,'Cá Koi Rồng','fish','Showa',270000.00,'ca4.jpg','Cá Koi màu cam pha vàng, biểu tượng của sự mạnh mẽ và tài lộc.','Cam Vàng','1.5kg','Nhật Bản'),(126,'Cá Koi Thần Tài','fish','Tancho',230000.00,'ca5.jpg','Cá Koi mang màu vàng sáng, là biểu tượng của thần tài và may mắn.','Vàng','0.9kg','Nhật Bản'),(127,'Cá Koi Xanh Đen','fish','Asagi',240000.00,'ca6.jpg','Cá Koi màu xanh đen, đại diện cho sự bí ẩn và sang trọng.','Xanh Đen','1.3kg','Nhật Bản'),(128,'Cá Koi Xanh Lá','fish','Kohaku',220000.00,'ca7.jpg','Cá Koi màu xanh lá cây, mang lại sự bình an và thư giãn.','Xanh Lá','1.0kg','Nhật Bản'),(129,'Cá Koi Trắng Hồng','fish','Shiro Utsuri',210000.00,'ca8.jpg','Cá Koi màu trắng hồng, biểu tượng của tình yêu và sự lãng mạn.','Trắng Hồng','0.8kg','Nhật Bản'),(130,'Cá Koi Đỏ Vàng','fish','Sanke',260000.00,'ca9.jpg','Cá Koi màu đỏ vàng, mang đến sự phú quý và tài lộc cho gia chủ.','Đỏ Vàng','1.2kg','Nhật Bản'),(131,'Cá Koi Hoa Sen','fish','Kohaku',250000.00,'ca10.jpg','Cá Koi với những sắc màu nhẹ nhàng của hoa sen, mang lại sự bình yên và hạnh phúc.','Hồng Sen','0.9kg','Nhật Bản');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription`
--

LOCK TABLES `subscription` WRITE;
/*!40000 ALTER TABLE `subscription` DISABLE KEYS */;
INSERT INTO `subscription` VALUES (1,'3 ngày đăng bài.',3,50000,'Gói học sinh','Active'),(6,'2 tuần đăng bài.',14,120000,'Gói trung cấp',NULL),(10,'1 tháng đăng bài.',30,500000,'Gói VIP','Active');
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Nguyễn Văn Thắng','$2a$10$LbDSxcqtJyB38hH0yKjnguKsDXBKlaM3AitLZ7tVbnZ57IzOkj6wa','1970-01-02','6124b0d3-968c-4c70-952f-cf682e7c837e_1590394186812_image001_amkj.jpg','admin@admin','111','ROLE_ADMIN',NULL,'2024-11-25 09:12:08',_binary '','33332283333'),(2,'dwed','$2a$10$1DFd9ssghwxyiFXSRJY1sObWpRlCgQ2wkSAYQWa9ncRAFy1owglsC','1970-01-02',NULL,'111115@gmail.com','11','ROLE_USER',NULL,'2024-11-25 04:32:50',_binary '','22222222222222'),(3,'Nguyễn Văn Thắng22','$2a$10$3h4cQjZSCNFGVHzS.J0BsO4ZzLNd1mnSWuSf3hF4ZeOjRgA5WNctq',NULL,NULL,'1@gmail.com',NULL,'ROLE_USER',NULL,NULL,_binary '',NULL),(4,'dwed','$2a$10$xr3QeTe8s97qmbETnomGEu0nC1b4eDgRvF9835yTKHw8LUTvrTV3m',NULL,NULL,'2251120113@ut.edu.vn',NULL,'ROLE_USER',NULL,'2024-11-25 04:35:24',_binary '','222221872222'),(5,'user1','password1','1990-01-01','avatar1.jpg','user1@example.com','1234567890','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet1'),(6,'user2','password2','1992-02-02','avatar2.jpg','user2@example.com','1234567891','ROLE_ADMIN','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet2'),(7,'user3','password3','1993-03-03','avatar3.jpg','user3@example.com','1234567892','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet3'),(8,'user4','password4','1994-04-04','avatar4.jpg','user4@example.com','1234567893','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet4'),(9,'user5','password5','1995-05-05','avatar5.jpg','user5@example.com','1234567894','ROLE_ADMIN','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet5'),(10,'user6','password6','1996-06-06','avatar6.jpg','user6@example.com','1234567895','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet6'),(11,'user7','password7','1997-07-07','avatar7.jpg','user7@example.com','1234567896','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet7'),(12,'user8','password8','1998-08-08','avatar8.jpg','user8@example.com','1234567897','ROLE_ADMIN','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet8'),(13,'user9','password9','1999-09-09','avatar9.jpg','user9@example.com','1234567898','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet9'),(14,'user10','password10','2000-10-10','avatar10.jpg','user10@example.com','1234567899','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet10'),(15,'user11','password11','1991-11-11','avatar11.jpg','user11@example.com','1234567800','ROLE_ADMIN','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet11'),(16,'user12','password12','1992-12-12','avatar12.jpg','user12@example.com','1234567801','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet12'),(17,'user13','password13','1993-01-13','avatar13.jpg','user13@example.com','1234567802','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet13'),(18,'user14','password14','1994-02-14','avatar14.jpg','user14@example.com','1234567803','ROLE_ADMIN','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet14'),(19,'user15','password15','1995-03-15','avatar15.jpg','user15@example.com','1234567804','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet15'),(20,'user16','password16','1996-04-16','avatar16.jpg','user16@example.com','1234567805','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet16'),(21,'user17','password17','1997-05-17','avatar17.jpg','user17@example.com','1234567806','ROLE_ADMIN','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet17'),(22,'user18','password18','1998-06-18','avatar18.jpg','user18@example.com','1234567807','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet18'),(23,'user19','password19','1999-07-19','avatar19.jpg','user19@example.com','1234567808','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet19'),(24,'user20','password20','2000-08-20','avatar20.jpg','user20@example.com','1234567809','ROLE_ADMIN','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet20'),(25,'user21','password21','1991-09-21','avatar21.jpg','user21@example.com','1234567810','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet21'),(26,'user22','password22','1992-10-22','avatar22.jpg','user22@example.com','1234567811','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet22'),(27,'user23','password23','1993-11-23','avatar23.jpg','user23@example.com','1234567812','ROLE_ADMIN','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet23'),(28,'user24','password24','1994-12-24','avatar24.jpg','user24@example.com','1234567813','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet24'),(29,'user25','password25','1995-01-25','avatar25.jpg','user25@example.com','1234567814','ROLE_USER','2024-11-25 09:11:23','2024-11-25 09:11:23',_binary '','wallet25');
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

-- Dump completed on 2024-11-25 17:36:32
