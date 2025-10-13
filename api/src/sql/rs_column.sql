CREATE TABLE `rs_column` (
  `column_id` int NOT NULL AUTO_INCREMENT,
  `name_logical` varchar(255) NOT NULL DEFAULT '?',
  `name_physical` varchar(255) NOT NULL DEFAULT '?',
  `value_type` varchar(66) NOT NULL,
  `value_length` varchar(45) DEFAULT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`column_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
