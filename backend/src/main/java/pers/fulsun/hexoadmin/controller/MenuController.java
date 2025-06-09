package pers.fulsun.hexoadmin.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pers.fulsun.hexoadmin.common.R;
import pers.fulsun.hexoadmin.dto.response.MenuInfoResponse;
import pers.fulsun.hexoadmin.service.MenuService;

import javax.annotation.Resource;
import java.util.List;

/**
 * 菜单管理
 *
 * @author fulsun
 */
@RestController
@RequestMapping("/api")
public class MenuController {
    @Resource
    private MenuService menuService;

    /**
     * 获取菜单列表
     *
     * @return
     * @throws Exception
     */
    @GetMapping("/menus")
    public R getMenus() throws Exception {
        List<MenuInfoResponse> menus = menuService.getMenus();
        return R.ok().put("data", menus);
    }
}
