-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2024 at 03:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sp_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `leave_requests`
--

CREATE TABLE `leave_requests` (
  `id` int(11) NOT NULL,
  `employee_name` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `supervisor_name` varchar(100) NOT NULL,
  `leave_type` enum('vacation','leave_of_absence','sick_self','sick_family','dr_appointment','funeral','other') DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_days` int(11) NOT NULL,
  `resuming_work_day` date NOT NULL,
  `emergency_name` varchar(100) NOT NULL,
  `emergency_address` varchar(100) NOT NULL,
  `emergency_phone` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff_members`
--

CREATE TABLE `staff_members` (
  `Id` int(11) NOT NULL,
  `Name` varchar(128) NOT NULL,
  `Surname` varchar(128) NOT NULL,
  `ID_Number` bigint(20) DEFAULT NULL,
  `DOB` date NOT NULL,
  `Nationality` varchar(50) NOT NULL,
  `Home_Language` varchar(50) NOT NULL,
  `Other_Languages` varchar(50) NOT NULL,
  `Position` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff_members`
--

INSERT INTO `staff_members` (`Id`, `Name`, `Surname`, `ID_Number`, `DOB`, `Nationality`, `Home_Language`, `Other_Languages`, `Position`, `Password`) VALUES
(3, 'Owen', 'Chilwaloo', 3456789092, '4094-08-09', 'Zambian', 'IDK', 'English', 'Software development', 'Monkey2002'),
(4, 'Emily', 'Manjara', 12345678901, '2004-07-09', 'Namibian', 'Damara', 'English', 'Software developer', 'Monkey2002'),
(5, 'Hozei', 'Naobab', 909045845484, '2002-01-09', 'Namibian', 'IDK', 'English', 'Human Resource', 'Monkey2002'),
(6, 'Christy', 'Diamonds', 123456789012, '2002-06-05', 'Namibian', 'IDK', 'English', 'Human Resource', 'Monkey2002'),
(7, 'Emily', 'Manjara', 123456789013, '2003-06-18', 'Namibian', 'IDK', 'English', 'Admin', 'Monkey2002'),
(8, 'John', 'Doe', 1234567890123, '1985-11-14', 'Namibian', 'IDK', 'English', 'Admin', 'Monkey2002'),
(9, 'jane', 'doe', 34567890924, '2002-09-12', 'Namibian', 'IDK', 'English', 'Admin', 'Monkey2002'),
(10, 'Taloshili', 'Eden', 1234567890143, '2002-09-12', 'Namibian', 'Oshiwambo', 'English', 'Employee', 'Monkey2002'),
(11, 'Johnny', 'Eden', 12345678901098, '2002-09-12', 'Namibian', 'Oshiwambo', 'English', 'Employee', 'Monkey2002');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `leave_requests`
--
ALTER TABLE `leave_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff_members`
--
ALTER TABLE `staff_members`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `ID_Number` (`ID_Number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `leave_requests`
--
ALTER TABLE `leave_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff_members`
--
ALTER TABLE `staff_members`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
