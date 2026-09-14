-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: pokemon_trainer_hub
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `builds`
--

DROP TABLE IF EXISTS `builds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `builds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pokemon_id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `movimiento_1` varchar(100) NOT NULL,
  `movimiento_2` varchar(100) NOT NULL,
  `movimiento_3` varchar(100) NOT NULL,
  `movimiento_4` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `item_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_builds_item` (`item_id`),
  KEY `fk_builds_role` (`role_id`),
  CONSTRAINT `fk_builds_item` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  CONSTRAINT `fk_builds_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `builds`
--

LOCK TABLES `builds` WRITE;
/*!40000 ALTER TABLE `builds` DISABLE KEYS */;
INSERT INTO `builds` VALUES (1,25,'Special Attacker','Thunderbolt','Volt Switch','Grass Knot','Nasty Plot','Build ofensiva centrada en aprovechar el ataque especial de Pikachu.',1,1),(2,6,'Physical Sweeper','Dragon Dance','Flare Blitz','Earthquake','Roost','Build ofensiva para Charizard.',2,2),(6,94,'Special Sweeper','Shadow Ball','Sludge Bomb','Focus Blast','Destiny Bond','Build ofensiva especial para Gengar, centrada en ejercer presión y aprovechar su velocidad.',3,1),(7,445,'Swords Dance Sweeper','Swords Dance','Earthquake','Scale Shot','Fire Fang','Build física para Garchomp, diseñada para aumentar su ataque y barrer equipos tras encontrar una oportunidad de setup.',4,2),(8,149,'Dragon Dance Sweeper','Dragon Dance','Extreme Speed','Earthquake','Roost','Build física para Dragonite, centrada en mejorar ataque y velocidad para ejercer presión en el tramo final del combate.',2,2),(9,658,'Choice Specs Attacker','Hydro Pump','Dark Pulse','Ice Beam','U-turn','Build ofensiva especial para Greninja, orientada a golpear con fuerza inmediata y mantener presión sobre el rival.',5,1),(10,748,'Defensive Wall','Recover','Scald','Haze','Toxic Spikes','Build defensiva para Toxapex, centrada en aguantar golpes, recuperar salud y controlar el ritmo del combate.',6,3),(11,823,'Defensive Pivot','Roost','U-turn','Body Press','Defog','Build defensiva para Corviknight, pensada para absorber daño, recuperar salud y facilitar cambios seguros durante el combate.',6,4),(12,150,'Special Powerhouse','Psystrike','Aura Sphere','Ice Beam','Recover','Build ofensiva especial para Mewtwo, centrada en aprovechar su enorme potencia y cobertura para presionar desde el primer turno.',4,1),(13,151,'Utility Pivot','Will-O-Wisp','Knock Off','U-turn','Roost','Build versátil para Mew, pensada para molestar al rival, retirar objetos y facilitar cambios seguros durante el combate.',6,4),(14,251,'Special Utility','Giga Drain','Psychic','Recover','U-turn','Build versátil para Celebi, centrada en recuperar salud, ejercer presión especial y mantener el ritmo mediante cambios seguros.',6,4),(15,7,'Defensive Starter','Scald','Rapid Spin','Toxic','Protect','Build defensiva para Squirtle, pensada para aprovechar Eviolite, resistir mejor los golpes y aportar utilidad durante el combate.',7,3),(16,131,'Defensive Tank','Freeze-Dry','Surf','Thunderbolt','Rest','Build defensiva para Lapras, centrada en aprovechar su resistencia, buena cobertura y capacidad para mantenerse en combate durante varios turnos.',6,3),(17,4,'Special Starter','Flamethrower','Dragon Pulse','Ancient Power','Will-O-Wisp','Build especial para Charmander, pensada para aprovechar Eviolite mientras mantiene presión ofensiva y utilidad con quemaduras.',7,1);
/*!40000 ALTER TABLE `builds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (5,'Choice Specs'),(7,'Eviolite'),(3,'Focus Sash'),(2,'Heavy-Duty Boots'),(6,'Leftovers'),(4,'Life Orb'),(1,'Light Ball');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Atacante especial'),(2,'Atacante físico'),(3,'Muro defensivo'),(4,'Pivot defensivo');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-14 16:14:18
