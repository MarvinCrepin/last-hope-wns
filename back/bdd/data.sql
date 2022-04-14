CREATE TABLE `ticket` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `ticket_user_id` int NOT NULL,
  `project_id` int NOT NULL,
  `estimated_time` int NOT NULL,
  `passed_time` int NOT NULL,
  `state` int NOT NULL
);

CREATE TABLE `ticket_user` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `ticket_id` int NOT NULL
);

CREATE TABLE `project` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `start_at` date NOT NULL,
  `end_at` date NOT NULL,
  `due_at` date NOT NULL
);

CREATE TABLE `project_user` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `project_id` int NOT NULL
);

CREATE TABLE `user` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `lastname` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `roles` text NOT NULL,
  `password` varchar(255) NOT NULL
);

CREATE TABLE `comment` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `content` text NOT NULL,
  `ticket_id` int NOT NULL,
  `user_id` int NOT NULL
);

CREATE TABLE `notification` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `user_id` int NOT NULL,
  `is_read` boolean NOT NULL,
  `data` text
);

CREATE TABLE `file` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `path` varchar(250) NOT NULL,
  `ticket_id` int NOT NULL
);

ALTER TABLE `ticket_user` ADD FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`);

ALTER TABLE `ticket_user` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `user` ADD FOREIGN KEY (`id`) REFERENCES `project_user` (`user_id`);

ALTER TABLE `project_user` ADD FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `notification` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `file` ADD FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`);