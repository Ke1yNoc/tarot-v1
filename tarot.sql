-- MySQL dump 10.13  Distrib 5.7.42, for Linux (x86_64)
--
-- Host: localhost    Database: tarotai
-- ------------------------------------------------------
-- Server version	5.7.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activation_code`
--

DROP TABLE IF EXISTS `activation_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activation_code` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activation_code`
--

LOCK TABLES `activation_code` WRITE;
/*!40000 ALTER TABLE `activation_code` DISABLE KEYS */;
INSERT INTO `activation_code` VALUES (1,'ABC123'),(2,'XYZ789'),(3,'test');
/*!40000 ALTER TABLE `activation_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarot`
--

DROP TABLE IF EXISTS `tarot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tarot` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position_explanation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tarot_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarot`
--

LOCK TABLES `tarot` WRITE;
/*!40000 ALTER TABLE `tarot` DISABLE KEYS */;
INSERT INTO `tarot` VALUES (1,'恋人金字塔牌阵','1号位：代表你;2号位：代表你的恋人;3号位：你们彼此的关系;4号位：你们未来的发展','10001'),(2,'新爱牌阵','1号位：恋爱准备就绪了吗？;2号位：怎样邂逅新的爱情？;3号位：您面临的挑战有哪些？','10002'),(3,'爱情树牌阵','1号位：自己的想法;2号位：过去的原因;3号位：现在的建议;4号位：未来的指向;5号位：潜在的影响','10003'),(4,'爱情大十字牌阵','1号位：自身当下的心情与想法;2号位：对方现今的心理和态度;3号位：彼此当前的状况;4号位：当下周围的环境情形;5号位：彼此关系的最终结果','10004'),(5,'真命天子牌阵','1号位：我真正伴侣的类型;2号位：我真正的伴侣已走入我的生命中了吗？;3号位：会有困难产生吗？;4号位：需要什么样的改变？;5号位：我将相信什么？','10005'),(6,'寻找对象牌阵','1号位：代表你当下的心情与处境;2号位：代表你期望追求的对象;3号位：代表你不喜欢的对象;4号位：代表应采取的行动;5号位：代表未来发展及最终结果','10006'),(7,'吉普赛牌阵','1号位：对方目前的想法;2号位：自己目前的状况;3号位：与对方相处应采取的方式;4号位：目前的周遭状况;5号位：关系的最终结果','10007'),(8,'人际关系牌阵','1号位：是什么让你们走到一起?;2号位：是什么把你们分开?;3号位：还需要做些什么?','20001'),(9,'成功之星牌阵','1号位：过去;2号位：阻碍你成功的因素;3号位：你应该做什么','30001'),(10,'事业金字塔牌阵','1号位：你的核心竞争力;2号位：代表你的缺点;3号位：代表你的优点;4号位：你的成就','30002'),(11,'X时机牌阵','1号位：代表你自己的心态;2号位：代表眼前的时机;3号位：代表成功的机率;4号位：代表影响的因素;5号位：代表未来发展、最后结果','30003'),(12,'面试求职牌阵','1号位：自己的心态及想法;2号位：面试前需要注意的情况;3号位：面试时将要发生的状况;4号位：对方的要求或者问题;5号位：最后的结果','30004'),(13,'工作问题牌阵','1号位：核心目标;2号位：挑战;3号位：阻碍你前进;4号位：推动你前进;5号位：奖励;6号位：潜在因素','30005'),(14,'金三角牌阵','1号位：现状;2号位：行动;3号位：结果','40001'),(15,'财富之树牌阵','1号位：生长的根基;2号位：依赖的能量;3号位：遇到的阻碍;4号位：潜在的危险;5号位：预期的高度','40002'),(16,'三张塔罗牌阵','1号位：万用牌阵的首张牌;2号位：万用牌阵的第二张牌;3号位：万用牌阵的第三张牌','50001'),(17,'时间之流牌阵','1号位：过往的经历;2号位：当下的状况;3号位：未来的走向','50002'),(18,'圣三角牌阵','1号位：过去形成的原因;2号位：当前问题的态势;3号位：未来可能的结果','50003'),(19,'直指核心牌阵','1号位：问题的核心要点;2号位：面临的障碍或短处;3号位：解决问题的方法;4号位：拥有的资源或长处','50004'),(20,'塔罗大十字牌阵','1号位：过去的经历及形成原因;2号位：你的当前状况;3号位：未来的发展态势;4号位：目前的周遭情形及对问题的了解程度;5号位：预期的结果及应采取的行动','50005'),(21,'问题解决牌阵','1号位：问题产生的根源;2号位：问题当前的态势;3号位：周遭的环境情形;4号位：可能会遭遇的阻碍;5号位：问题的解决办法','50006'),(22,'六芒星牌阵','1号位：问题的过去情形;2号位：问题的当下态势;3号位：问题的未来走向;4号位：解决问题的相应策略;5号位：周遭的环境状况;6号位：本人的心理态度;7号位：事物的最终结局','50007'),(23,'马蹄铁牌阵','1号位：过去的状态详情;2号位：当前的状况描述;3号位：隐藏的影响因素;4号位：可能出现的阻碍;5号位：周遭的环境态势;6号位：应当采取的行动;7号位：最终的结果呈现','50008'),(24,'每日树牌阵','1号位：问题的过往;2号位：当前的具体情况;3号位：建议采取的行动;4号位：预期能够达成的结果','60001'),(25,'周运牌阵','1号位：星期一;2号位：星期二;3号位：星期三;4号位：星期四;5号位：星期五;6号位：星期六;7号位：星期日;8号位：本周主题','60002'),(26,'月运牌阵','1号位：月度的第一周;2号位：月度的第二周;3号位：月度的第三周;4号位：月度的第四周;5号位：整月的概览','60003'),(27,'新年十二月牌阵','1号位：一月;2号位：二月;3号位：三月;4号位：四月;5号位：五月;6号位：六月;7号位：七月;8号位：八月;9号位：九月;10号位：十月;11号位：十一月;12号位：十二月','60004'),(28,'二个选择牌阵','1号位：选择一，此选择会通向何处？;2号位：选择二，此选择会通向何处？;3号位：现状','70001'),(29,'三个选择牌阵','1号位：选择一，此选择的走向如何？;2号位：选择二，此选择的发展方向在哪？;3号位：选择三，此选择最终会通往何处？','70002'),(30,'二选一牌阵','1号位：你的真实内心需求;2号位：你的第一个选择的走向;3号位：你的第二个选择的趋势;4号位：第一个选择的最终结果;5号位：第二个选择的最终结局','70003'),(31,'三选一牌阵','1号位：求问者当前的自身状况;2号位：代表选择 A 的发展态势;3号位：代表选择 B 的发展趋向;4号位：代表选择 C 的发展情形;5号位：代表选择 A 的最终结果;6号位：代表选择 B 的最终结局;7号位：代表选择 C 的最终成果','70004'),(32,'比较选择牌阵','1号位：第一个选择项;2号位：第二个选择项','70005');
/*!40000 ALTER TABLE `tarot` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-13 15:41:09
