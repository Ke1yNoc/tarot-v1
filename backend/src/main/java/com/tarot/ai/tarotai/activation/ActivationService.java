package com.tarot.ai.tarotai.activation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ActivationService {


    @Autowired
    private ActivationCodeRepository activationCodeRepository;

    public boolean codeExists(String code) {
        return activationCodeRepository.findByCode(code) != null;
    }
}
