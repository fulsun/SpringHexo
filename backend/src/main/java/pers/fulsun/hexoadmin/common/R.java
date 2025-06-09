package pers.fulsun.hexoadmin.common;

import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

/**
 * http 通用返回对象
 *
 * @author fsun
 */
public class R extends HashMap<String, Object> {

    public R() {
        // 默认创建的对象包含公共的属性
        put("code", HttpStatus.OK.value());
        put("msg", HttpStatus.OK.getReasonPhrase());
    }

    public static R ok() {
        return new R();
    }

    public static R ok(String msg) {
        R r = new R();
        r.put("msg", msg);
        return r;
    }

    public static R ok(Map<String, Object> map) {
        R r = new R();
        r.putAll(map);
        return r;
    }

    public static R error(int code, String msg) {
        R r = new R();
        r.put("code", code);
        r.put("msg", msg);
        return r;
    }

    public static R error(String msg) {
        return error(HttpStatus.INTERNAL_SERVER_ERROR.value(), msg);
    }

    public static R error() {
        return error(HttpStatus.INTERNAL_SERVER_ERROR.value(), "未知异常，请联系管理员");
    }

    /**
     * 覆盖继承的put函数，添加Key-Value数据
     */
    public R put(String key, Object value) {
        super.put(key, value);
        //把自己返回，用于链式调用
        return this;
    }


}
