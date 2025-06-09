package pers.fulsun.hexoadmin.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import pers.fulsun.hexoadmin.exception.BusinessException;
import pers.fulsun.hexoadmin.utils.JsonUtils;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class ExceptionAdvice {
    /*
     * 捕获异常，并且返回500状态码
     */
    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public String exceptionHandler(Exception e) {
        Map<String, Object> json = new HashMap<>();
        if (e instanceof HttpMessageNotReadableException) {
            // 处理HTTP请求数据解析异常
            HttpMessageNotReadableException exception = (HttpMessageNotReadableException) e;
            log.error("error", exception);
            json.put("error", "请求未提交数据或者数据有误");
        } else if (e instanceof MissingServletRequestPartException) {
            // 处理文件上传异常
            MissingServletRequestPartException exception = (MissingServletRequestPartException) e;
            log.error("error", exception);
            json.put("error", "请求提交数据错误");
        } else if (e instanceof HttpRequestMethodNotSupportedException) {
            // 处理HTTP请求方法类型异常
            HttpRequestMethodNotSupportedException exception = (HttpRequestMethodNotSupportedException) e;
            log.error("error", exception);
            json.put("error", "HTTP请求方法类型错误");
        }
        //Web方法参数数据类型转换异常，比如String[]数组类型的参数，你上传的数据却是String类型
        else if (e instanceof BindException) {
            BindException exception = (BindException) e;
            String defaultMessage = exception.getFieldError().getDefaultMessage();
            log.error(defaultMessage, exception);
            json.put("error", defaultMessage);
        }
        //没有通过后端验证产生的异常
        else if (e instanceof MethodArgumentNotValidException) {
            MethodArgumentNotValidException exception = (MethodArgumentNotValidException) e;
            json.put("error", exception.getBindingResult().getFieldError().getDefaultMessage());
        }
        //处理业务异常
        else if (e instanceof BusinessException) {
            log.error("执行异常", e);
            BusinessException exception = (BusinessException) e;
            json.put("error", exception.getMsg());
        }
        //处理其余的异常
        else {
            log.error("执行异常", e);
            json.put("error", "执行异常");
        }
        return JsonUtils.objectToJsonString(json);
    }
}
