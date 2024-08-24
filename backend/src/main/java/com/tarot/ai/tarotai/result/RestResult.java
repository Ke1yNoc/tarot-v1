package com.tarot.ai.tarotai.result;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * Rest result
 * @author dup
 * @param <T>
 */
public class RestResult<T> implements Serializable {
    private static final long serialVersionUID = 6095433538316185017L;

    private int code;

    private String message;

    private T data;

    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();


    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

    public RestResult() {
    }

    public RestResult(int code, String message, T data) {
        this.code = code;
        this.setMessage(message);
        this.data = data;
    }

    public RestResult(int code, T data) {
        this.code = code;
        this.data = data;
    }

    public RestResult(int code, String message) {
        this.code = code;
        this.setMessage(message);
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public boolean ok() {
        return this.code == 0 || this.code == 200;
    }

    @Override
    public String toString() {
        return "RestResult{" + "code=" + code + ", message='" + message + '\'' + ", data=" + data + '}';
    }

    public static <T> ResResultBuilder<T> builder() {
        return new ResResultBuilder<>();
    }

    public static final class ResResultBuilder<T> {

        private int code;

        private String errMsg;

        private T data;

        private ResResultBuilder() {
        }

        public ResResultBuilder<T> withCode(int code) {
            this.code = code;
            return this;
        }

        public ResResultBuilder<T> withMsg(String errMsg) {
            this.errMsg = errMsg;
            return this;
        }

        public ResResultBuilder<T> withData(T data) {
            this.data = data;
            return this;
        }

        /**
         * Build result.
         *
         * @return result
         */
        public RestResult<T> build() {
            RestResult<T> restResult = new RestResult<>();
            restResult.setCode(code);
            restResult.setMessage(errMsg);
            restResult.setData(data);
            return restResult;
        }
    }
}
