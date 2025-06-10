package pers.fulsun.hexoadmin.filter;

import pers.fulsun.hexoadmin.config.JwtUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class TokenFilter implements Filter {
    private final JwtUtils jwtUtils;

    public TokenFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // 过滤器初始化，可选实现
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        // 自定义token验证逻辑
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // 获得请求路径
        String path = httpRequest.getRequestURI();

        // 排除 /login 接口
        if ("/api/login".equals(path)) {
            filterChain.doFilter(request, response);
            return;
        }
        // 获得请求头中的token
        String token = httpRequest.getHeader("x-access-token");
        if (token == null || "null".equals(token) || "undefined".equals(token)) {
            httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            httpResponse.getWriter().write("No Token Found ...");
            return;
        }
        // 验证token是否合法
        boolean isValid = checkTokenValidity(token);
        if (!isValid) {
            httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            httpResponse.getWriter().write("Invalid or expired token");
            return;
        }
        // Token有效，继续执行其他过滤器链
        filterChain.doFilter(request, response);

    }

    private boolean checkTokenValidity(String token) {
        return jwtUtils.validateToken(token);
    }

    @Override
    public void destroy() {

    }
}
