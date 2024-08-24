package com.tarot.ai.tarotai.businessLlm.dify;

import lombok.Data;

@Data
public class Llm2Request {
    private String userID;
    private String user_input;
    private String solutionID;
    private String solutionName;
    private String drawResult;
}
