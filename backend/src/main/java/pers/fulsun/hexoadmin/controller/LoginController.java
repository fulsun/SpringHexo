package pers.fulsun.hexoadmin.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pers.fulsun.hexoadmin.common.R;
import pers.fulsun.hexoadmin.dto.request.UserLoginParam;
import pers.fulsun.hexoadmin.dto.response.UserInfoResponse;
import pers.fulsun.hexoadmin.service.UserService;

import javax.annotation.Resource;
import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class LoginController {
    @Resource
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public R login(@Valid @RequestBody UserLoginParam param) {
        UserInfoResponse response = userService.login(param);
        return R.ok().put("data", response);
    }
}
