-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Gostitelj: 127.0.0.1
-- Čas nastanka: 05. jan 2019 ob 13.24
-- Različica strežnika: 10.1.35-MariaDB
-- Različica PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Zbirka podatkov: `dhh`
--

-- --------------------------------------------------------

--
-- Struktura tabele `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT '',
  `season` longtext NOT NULL,
  `price` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Odloži podatke za tabelo `products`
--

INSERT INTO `products` (`id`, `name`, `season`, `price`) VALUES
(1, 'Blue Shirt', 'Spring - Summer', '20.50'),
(2, 'White Shirt', 'Spring - Summer', '17.50'),
(3, 'Pink Shirt', 'Spring - Summer', '17.50'),
(4, 'Navy Shorts', 'Summer', '23.50'),
(5, 'Red Shorts', 'Summer', '23.50'),
(6, 'Trousers', 'Autumn - Winter', '29.50'),
(7, 'Jumper', 'Winter', '25.00'),
(8, 'Light Jacket', 'Spring', '34.00'),
(9, 'Winter Jacket', 'Winter', '4.00'),
(10, 'T-Shirt', 'All', '14.00'),
(11, 'Hoodie', 'Spring - Summer', '30');

--
-- Indeksi zavrženih tabel
--

--
-- Indeksi tabele `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT zavrženih tabel
--

--
-- AUTO_INCREMENT tabele `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
