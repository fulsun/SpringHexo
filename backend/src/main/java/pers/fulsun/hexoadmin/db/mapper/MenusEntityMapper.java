package pers.fulsun.hexoadmin.db.mapper;

import org.apache.ibatis.annotations.Mapper;
import pers.fulsun.hexoadmin.db.entity.MenusEntity;

import java.util.List;

@Mapper
public interface MenusEntityMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(MenusEntity record);

    int insertSelective(MenusEntity record);

    MenusEntity selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MenusEntity record);

    int updateByPrimaryKey(MenusEntity record);

    List<MenusEntity> queryAllMenus();
}