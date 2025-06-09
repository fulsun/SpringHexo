package pers.fulsun.hexoadmin.service;

import pers.fulsun.hexoadmin.dto.request.UserLoginParam;
import pers.fulsun.hexoadmin.dto.response.UserInfoResponse;

public interface UserService {

    /**
     * 用户登录
     *
     * @param userLoginParam 用户登录参数
     * @return 登录成功返回true，登录失败返回false
     */
    UserInfoResponse login(UserLoginParam userLoginParam);
}
