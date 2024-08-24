package com.tarot.ai.tarotai.activation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivationCodeRepository extends JpaRepository<ActivationCode, Long> {
  ActivationCode findByCode(String code);
}
