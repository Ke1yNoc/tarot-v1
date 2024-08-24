package com.tarot.ai.tarotai.tarot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TarotService {

    @Autowired
    private TarotRepository tarotRepository;

    public Tarot findByTarotId(String tarotId) {
        return tarotRepository.findByTarotId(tarotId);
    }
}
