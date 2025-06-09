package pers.fulsun.hexoadmin.db.mapper;

import org.apache.ibatis.annotations.Mapper;
import pers.fulsun.hexoadmin.db.entity.UsersEntity;

@Mapper
public interface UsersEntityMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(UsersEntity record);

    int insertSelective(UsersEntity record);

    UsersEntity selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UsersEntity record);

    int updateByPrimaryKey(UsersEntity record);
}