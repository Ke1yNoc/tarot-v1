package com.tarot.ai.tarotai.businessLlm;


import lombok.Data;

import java.io.Serializable;

@Data
public class QuestionRequestBody implements Serializable {
    private String userID;
    private String question;
}
