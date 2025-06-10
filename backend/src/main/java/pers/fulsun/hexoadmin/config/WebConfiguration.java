package pers.fulsun.hexoadmin.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import pers.fulsun.hexoadmin.filter.TokenFilter;

@Configuration
@ConditionalOnWebApplication

public class WebConfiguration implements WebMvcConfigurer {

    /**
     * 注册token过滤器
     *
     * @param jwtUtils jwt工具类
     * @return
     */
    @Bean
    public FilterRegistrationBean<TokenFilter> tokenFilter(JwtUtils jwtUtils) {
        FilterRegistrationBean<TokenFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(new TokenFilter(jwtUtils));
        registrationBean.addUrlPatterns("/*");
        // 注册过滤器的顺序
        registrationBean.setOrder(10);

        return registrationBean;
    }

}
