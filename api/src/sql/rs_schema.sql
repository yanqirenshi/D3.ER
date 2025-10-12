CREATE TABLE `rs_schema` (
  `schema_id` int NOT NULL AUTO_INCREMENT,
  `name_logical` varchar(255) NOT NULL,
  `name_physical` varchar(255) NOT NULL DEFAULT '?',
  `description` text NOT NULL,
  PRIMARY KEY (`schema_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
