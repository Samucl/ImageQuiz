SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `imagequiz_db`
--

CREATE TABLE `animals_scores` (
  `id` int(11) NOT NULL,
  `score` int(5) NOT NULL,
  `userid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `animals_scores` (`id`, `score`, `userid`) VALUES
(11, 110, 2),
(12, 75, 8),
(15, 85, 7),
(16, 95, 9),
(17, 120, 10),
(18, 100, 11),
(19, 40, 13);

CREATE TABLE `flags_scores` (
  `id` int(11) NOT NULL,
  `score` int(5) NOT NULL,
  `userid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `flags_scores` (`id`, `score`, `userid`) VALUES
(12, 45, 2),
(13, 40, 8),
(16, 60, 7),
(17, 75, 11);

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(16) CHARACTER SET utf8 NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(60) NOT NULL,
  `xp` int(11) DEFAULT 0,
  `games_played` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` (`id`, `username`, `email`, `password`, `xp`, `games_played`) VALUES
(2, 'Kokeilija', 'Kokeilija@email.com', '$2b$05$AexGrBSky/rZI8R310IlaOYY5gUJ.QttarETW1w1hITIe7U7TSqnW', 585, 29),
(7, 'Samuel', 'Samuel@email.com', '$2b$05$ef2bAAgPw0arkewd.SpGiORXh0vPi6RWpuTeKunFtQEhoZZGzfK1W', 340, 8),
(8, 'Testaaja', 'Testaaja@email.com', '$2b$05$sWYEuGbm6MTW7TDZ9fwPX.G2DpCXbWVXaZt.nW0/zTojhLYU8azQa', 40, 2),
(9, 'Pelaaja', 'Pelaaja@email.com', '$2b$05$JKhr6e6R/1Sbx33c1CxArON0L0GJz0P3NKH67Ihk3SKvrAycI87Oa', 20, 2),
(10, 'Batmani', 'Batmani@email.com', '$2b$05$tK6eshGox935QiBv622wtuQGqARwPyrgSqjVG6e4.58fDflIKooDW', 90, 1),
(11, 'Kingi', 'Kingi@email.com', '$2b$05$KktrHn681BhPlZpKcaE6n.t6FuDSx9SyHaHJIJmwTQhQxG8bIrUB.', 20, 2),
(12, 'Juuseri', 'Juuseri@email.com', '$2b$05$7tbhmX9wzq1PwMbfd8WHYO00UruVP7KJcwwnD.p4wSk52GI4/GXo2', 30, 1),
(13, 'Mestari', 'Mestari@email.com', '$2b$05$9IZeIE.dhFHreDIQ8/YOEeMbnVzBQN8LQaNjulOZo4Xg1B0V3F5V.', 100, 1);

ALTER TABLE `animals_scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`);

ALTER TABLE `flags_scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `animals_scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

ALTER TABLE `flags_scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

ALTER TABLE `animals_scores`
  ADD CONSTRAINT `animals_scores_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`);

ALTER TABLE `flags_scores`
  ADD CONSTRAINT `flags_scores_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`);
COMMIT;