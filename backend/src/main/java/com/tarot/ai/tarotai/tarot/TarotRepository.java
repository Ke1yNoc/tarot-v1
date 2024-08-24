package com.tarot.ai.tarotai.tarot;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TarotRepository extends JpaRepository<Tarot, Long> {
  Tarot findByTarotId(String tarotId);
}
