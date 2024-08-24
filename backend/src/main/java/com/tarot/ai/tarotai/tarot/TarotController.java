package com.tarot.ai.tarotai.tarot;

import com.tarot.ai.tarotai.result.RestResult;
import com.tarot.ai.tarotai.result.RestResultUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/tarot")
public class TarotController {

    @Autowired
    private TarotService tarotService;

    @GetMapping("")
    public RestResult<?> question(@Param("tarotId") String tarotId) {
        Tarot tarot = tarotService.findByTarotId(tarotId);
        return RestResultUtils.success(tarot);
    }
}
