package pers.fulsun.hexoadmin.service.impl;

import org.springframework.stereotype.Service;
import pers.fulsun.hexoadmin.config.JwtUtils;
import pers.fulsun.hexoadmin.db.entity.UsersEntity;
import pers.fulsun.hexoadmin.db.mapper.UsersEntityMapper;
import pers.fulsun.hexoadmin.dto.request.UserLoginParam;
import pers.fulsun.hexoadmin.dto.response.UserInfoResponse;
import pers.fulsun.hexoadmin.exception.BusinessException;
import pers.fulsun.hexoadmin.service.UserService;
import pers.fulsun.hexoadmin.utils.MD5Utils;

import javax.annotation.Resource;

@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UsersEntityMapper usermapper;

    @Resource
    private JwtUtils jwtUtils;

    /**
     * 获取加密后的密码
     *
     * @param password 密码
     * @return 加密后的密码
     */

    private static String getEncryptPassword(String password) {
        String md5Password = MD5Utils.digestHex16(password);
        // 混淆密码：  前6位 + 密码 + 后3位
        password = MD5Utils.digestHex16(md5Password.substring(0, 6) + password + md5Password.substring(md5Password.length() - 3));
        return password;
    }

    @Override
    public UserInfoResponse login(UserLoginParam userLoginParam) {
        // 通过用户名查询用户信息
        UsersEntity userInfo = usermapper.selectByUsername(userLoginParam.getUsername());
        if (userInfo == null) {
            throw new BusinessException("用户不存在");
        }
        String encryptPassword = getEncryptPassword(userLoginParam.getPassword());
        if (!encryptPassword.equals(userInfo.getPassword())) {
            throw new BusinessException("用户名/密码错误");
        }
        UserInfoResponse userInfoResponse = new UserInfoResponse();
        String token = jwtUtils.generateToken(userInfo.getId().toString());
        userInfoResponse.setToken(token);
        userInfoResponse.setUserInfo(userInfo);
        return userInfoResponse;
    }
}
