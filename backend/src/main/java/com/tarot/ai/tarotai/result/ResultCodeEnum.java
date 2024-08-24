package com.tarot.ai.tarotai.result;

/**
 * 返回状态码及信息
 * @author Mr_J
 */
public enum ResultCodeEnum {

    /**
     * 成功
     */
    SUCCESS(200, "成功"),

    /**
     * 系统错误
     */
    ERROR(500, "系统错误"),

    /**
     * 操作失败
     */
    FAILED(101, "失败"),

    /**
     * 参数错误
     */
    PARAM_ERROR(103, "参数错误"),

    /**
     * 请求参数为空
     */
    INVALID_PARAM_EMPTY(105, "请求参数为空"),

    /**
     * 参数类型不匹配
     */
    PARAM_TYPE_MISMATCH(106, "参数类型不匹配"),

    /**
     * 参数校验失败
     */
    PARAM_VALID_ERROR(107, "参数校验失败"),

    /**
     * 非法请求
     */
    ILLEGAL_REQUEST(108, "非法请求"),

    /**
     * 登录失效
     */
    NOT_LOGGED(214,"登陆失效或未登陆"),
    /**
     * 登录失效
     */
    NAME_OR_PASSWORD_INCORRECT(215,"用户名或密码错误"),
    /**
     * 权限不足
     */
    INSUFFICIENT_PERMISSIONS(215,"权限不足");
    public int code;

    public String msg;

    ResultCodeEnum(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}