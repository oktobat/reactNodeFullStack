-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        11.3.2-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- starship 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `starship` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `starship`;

-- 테이블 starship.cart 구조 내보내기
CREATE TABLE IF NOT EXISTS `cart` (
  `cartNo` int(10) NOT NULL AUTO_INCREMENT,
  `userNo` int(10) NOT NULL DEFAULT 0,
  `prNo` int(10) NOT NULL DEFAULT 0,
  `qty` int(10) NOT NULL DEFAULT 1,
  PRIMARY KEY (`cartNo`),
  UNIQUE KEY `userNo_prNo` (`userNo`,`prNo`),
  KEY `FK_cart_producttbl` (`prNo`),
  CONSTRAINT `FK_cart_membertbl` FOREIGN KEY (`userNo`) REFERENCES `membertbl` (`userNo`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_cart_producttbl` FOREIGN KEY (`prNo`) REFERENCES `producttbl` (`prNo`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=287 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='장바구니 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 starship.membertbl 구조 내보내기
CREATE TABLE IF NOT EXISTS `membertbl` (
  `userNo` int(10) NOT NULL AUTO_INCREMENT,
  `userId` varchar(30) NOT NULL DEFAULT '0',
  `userPw` varchar(20) DEFAULT '0',
  `userIrum` char(10) DEFAULT NULL,
  `handphone` varchar(20) DEFAULT NULL,
  `zipCode` char(10) DEFAULT NULL,
  `addr1` varchar(50) DEFAULT NULL,
  `addr2` varchar(50) DEFAULT NULL,
  `registerDate` date DEFAULT NULL,
  `googleId` varchar(255) DEFAULT NULL,
  `kakaoId` varchar(255) DEFAULT NULL,
  `naverId` varchar(255) DEFAULT NULL,
  `loginType` enum('local','google','kakao','naver') NOT NULL,
  PRIMARY KEY (`userNo`),
  UNIQUE KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 starship.movielike 구조 내보내기
CREATE TABLE IF NOT EXISTS `movielike` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `userNo` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `movieTitle` varchar(100) DEFAULT NULL,
  `moviePhoto` varchar(100) DEFAULT NULL,
  `isLiked` tinyint(1) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL,
  PRIMARY KEY (`no`),
  UNIQUE KEY `userNo_movieId` (`userNo`,`movieId`),
  CONSTRAINT `FK__membertbl` FOREIGN KEY (`userNo`) REFERENCES `membertbl` (`userNo`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='내가 좋아하는 영화목록';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 starship.noticetbl 구조 내보내기
CREATE TABLE IF NOT EXISTS `noticetbl` (
  `noNo` int(10) NOT NULL AUTO_INCREMENT,
  `subject` char(20) NOT NULL,
  `writer` char(30) NOT NULL,
  `date` date NOT NULL,
  `hit` int(10) DEFAULT 0,
  `content` varchar(50) NOT NULL,
  PRIMARY KEY (`noNo`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 starship.order 구조 내보내기
CREATE TABLE IF NOT EXISTS `order` (
  `orderNo` int(11) NOT NULL AUTO_INCREMENT,
  `userNo` int(11) NOT NULL DEFAULT 0,
  `orderDate` datetime NOT NULL,
  `prNo` int(11) NOT NULL DEFAULT 0,
  `qty` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`orderNo`),
  UNIQUE KEY `orderDate_prNo` (`orderDate`,`prNo`),
  KEY `FK_order_producttbl` (`prNo`),
  KEY `FK_order_membertbl` (`userNo`),
  CONSTRAINT `FK_order_membertbl` FOREIGN KEY (`userNo`) REFERENCES `membertbl` (`userNo`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_order_producttbl` FOREIGN KEY (`prNo`) REFERENCES `producttbl` (`prNo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='주문페이지';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 starship.producttbl 구조 내보내기
CREATE TABLE IF NOT EXISTS `producttbl` (
  `prNo` int(10) NOT NULL AUTO_INCREMENT,
  `category` char(10) NOT NULL,
  `name` char(20) NOT NULL,
  `price` int(10) DEFAULT 0,
  `description` varchar(100) DEFAULT NULL,
  `inventory` int(10) DEFAULT 0,
  `photo` varchar(50) DEFAULT NULL,
  `reviewCount` int(11) DEFAULT 0,
  `averageRating` float DEFAULT 0,
  PRIMARY KEY (`prNo`)
) ENGINE=InnoDB AUTO_INCREMENT=536 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 starship.reviewtbl 구조 내보내기
CREATE TABLE IF NOT EXISTS `reviewtbl` (
  `reNo` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(50) NOT NULL DEFAULT '0',
  `content` varchar(100) NOT NULL DEFAULT '0',
  `rating` int(10) NOT NULL DEFAULT 5,
  `prNo` int(10) NOT NULL DEFAULT 0,
  `writer` varchar(50) NOT NULL DEFAULT '0',
  `date` date NOT NULL,
  `hit` int(10) NOT NULL DEFAULT 0,
  `orderNo` int(11) NOT NULL,
  PRIMARY KEY (`reNo`),
  KEY `FK_reviewtbl_order` (`orderNo`),
  KEY `FK_reviewtbl_producttbl` (`prNo`),
  CONSTRAINT `FK_reviewtbl_order` FOREIGN KEY (`orderNo`) REFERENCES `order` (`orderNo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_reviewtbl_producttbl` FOREIGN KEY (`prNo`) REFERENCES `producttbl` (`prNo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='리뷰게시판';

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
