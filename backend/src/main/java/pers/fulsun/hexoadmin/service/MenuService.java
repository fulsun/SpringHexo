package pers.fulsun.hexoadmin.service;

import pers.fulsun.hexoadmin.dto.response.MenuInfoResponse;

import java.util.List;

public interface MenuService {
    List<MenuInfoResponse> getMenus();
}
