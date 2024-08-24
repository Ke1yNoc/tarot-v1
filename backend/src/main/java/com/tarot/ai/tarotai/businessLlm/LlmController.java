package com.tarot.ai.tarotai.businessLlm;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tarot.ai.tarotai.businessLlm.dify.DifyRequest;
import com.tarot.ai.tarotai.businessLlm.dify.LLm1Request;
import com.tarot.ai.tarotai.businessLlm.dify.Llm2Request;
import com.tarot.ai.tarotai.result.RestResult;
import com.tarot.ai.tarotai.result.RestResultUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin
@RequestMapping("/llm")
public class LlmController {

    @Value("${llm.url}")
    private String llmUrl;

    @Value("${llm1.auth}")
    private String llm1Auth;

    @Value("${llm2.auth}")
    private String llm2Auth;

    @Value("${llm3.auth}")
    private String llm3Auth;

    @PostMapping("/question")
    public RestResult<?> question(@RequestBody() QuestionRequestBody questionRequestBody) {
        DifyRequest difyRequest = new DifyRequest();
        LLm1Request llm1Request = new LLm1Request();
        llm1Request.setQuestion(questionRequestBody.getQuestion());
        difyRequest.setInputs(llm1Request);
        difyRequest.setUser("test");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", llm1Auth);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = null;
        try {
            jsonBody = objectMapper.writeValueAsString(difyRequest);
        } catch (JsonProcessingException e) {
            return RestResultUtils.failed(e.getMessage());
        }
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> response = restTemplate.postForEntity(llmUrl, requestEntity, Object.class);
        return RestResultUtils.success(response.getBody());
    }

    @PostMapping("/interpretation")
    public RestResult<?> interpretation(@RequestBody() InterpretationRequestBody interpretationRequestBody) {
        DifyRequest difyRequest = new DifyRequest();
        Llm2Request req = new Llm2Request();
        req.setUser_input(interpretationRequestBody.getQuestion());
        req.setSolutionID(interpretationRequestBody.getSolutionID());
        req.setSolutionName(interpretationRequestBody.getSolutionName());
        req.setDrawResult(interpretationRequestBody.getDrawResult());
        difyRequest.setInputs(req);
        difyRequest.setUser("test");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", llm2Auth);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = null;
        try {
            jsonBody = objectMapper.writeValueAsString(difyRequest);
        } catch (JsonProcessingException e) {
            return RestResultUtils.failed(e.getMessage());
        }
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> response = restTemplate.postForEntity(llmUrl, requestEntity, Object.class);
        return RestResultUtils.success(response.getBody());
    }

    @PostMapping("/knowledge")
    public RestResult<?> knowledge(@RequestBody() KnowledgeRequestBody knowledgeRequestBody) {
        DifyRequest difyRequest = new DifyRequest();
        difyRequest.setInputs(knowledgeRequestBody);
        difyRequest.setUser("test");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", llm3Auth);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = null;
        try {
            jsonBody = objectMapper.writeValueAsString(difyRequest);
        } catch (JsonProcessingException e) {
            return RestResultUtils.failed(e.getMessage());
        }
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> response = restTemplate.postForEntity(llmUrl, requestEntity, Object.class);
        return RestResultUtils.success(response.getBody());
    }

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}
