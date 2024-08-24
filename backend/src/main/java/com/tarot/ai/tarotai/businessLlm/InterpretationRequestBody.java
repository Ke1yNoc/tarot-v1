package com.tarot.ai.tarotai.businessLlm;

import lombok.Data;

import java.io.Serializable;

@Data
public class InterpretationRequestBody implements Serializable {
    private String userID;
    private String question;
    private String solutionID;
    private String solutionName;
    private String drawResult;
}
