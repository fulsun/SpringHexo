package pers.fulsun.hexoadmin.exception;


import lombok.Data;

/**
 * 业务异常类
 *
 * @author fulsun
 */
@Data
public class BusinessException extends RuntimeException {
    private final int code = 500;
    private String msg;

    public BusinessException(Exception e) {
        super(e);
        this.msg = "执行异常";
    }

    public BusinessException(String msg) {
        super(msg);
        this.msg = msg;
    }

    public BusinessException(String msg, Throwable e) {
        super(msg, e);
        this.msg = msg;
    }

    
}