CREATE TABLE `rs_entity` (
  `entity_id` int NOT NULL AUTO_INCREMENT,
  `name_logical` varchar(255) NOT NULL,
  `name_physical` varchar(255) NOT NULL DEFAULT '?',
  `description` text NOT NULL,
  `position_x` double NOT NULL DEFAULT '0',
  `position_y` double NOT NULL DEFAULT '0',
  `position_z` double NOT NULL DEFAULT '0',
  `size_w` double NOT NULL DEFAULT '0',
  `size_h` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`entity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
