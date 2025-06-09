package pers.fulsun.hexoadmin.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import pers.fulsun.hexoadmin.db.entity.MenusEntity;
import pers.fulsun.hexoadmin.db.mapper.MenusEntityMapper;
import pers.fulsun.hexoadmin.dto.response.MenuInfoResponse;
import pers.fulsun.hexoadmin.service.MenuService;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuServiceImpl implements MenuService {
    @Resource
    private MenusEntityMapper menuMapper;

    @Override
    public List<MenuInfoResponse> getMenus() {
        List<MenusEntity> menus = menuMapper.queryAllMenus();
        // DTO转换
        return menus.stream().map(menu -> {
            MenuInfoResponse response = new MenuInfoResponse();
            BeanUtils.copyProperties(menu, response);
            return response;
        }).collect(Collectors.toList());

    }
}
