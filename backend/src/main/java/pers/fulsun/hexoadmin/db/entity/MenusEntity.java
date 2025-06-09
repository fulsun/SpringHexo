package pers.fulsun.hexoadmin.db.entity;

import java.util.Date;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

/**
 * 菜单表
 */
@Data
public class MenusEntity {
    /**
    * 菜单ID
    */
    @NotNull(message = "菜单ID不能为null")
    private Integer id;

    /**
    * 菜单标题
    */
    @Size(max = 50,message = "菜单标题最大长度要小于 50")
    @NotBlank(message = "菜单标题不能为空")
    private String title;

    /**
    * 菜单路径
    */
    @Size(max = 100,message = "菜单路径最大长度要小于 100")
    @NotBlank(message = "菜单路径不能为空")
    private String path;

    /**
    * 父菜单ID
    */
    @NotNull(message = "父菜单ID不能为null")
    private Integer parentId;

    /**
    * 菜单图标
    */
    @Size(max = 100,message = "菜单图标最大长度要小于 100")
    @NotBlank(message = "菜单图标不能为空")
    private String icon;

    /**
    * 菜单排序
    */
    @NotNull(message = "菜单排序不能为null")
    private Integer sort;

    /**
    * 是否固定标签 0:不固定 1:固定
    */
    @NotNull(message = "是否固定标签 0:不固定 1:固定不能为null")
    private Boolean isFixed;

    /**
    * 创建时间
    */
    @NotNull(message = "创建时间不能为null")
    private Date createdAt;

    /**
    * 更新时间
    */
    @NotNull(message = "更新时间不能为null")
    private Date updatedAt;

    /**
    * 是否删除 0:未删除 1:已删除
    */
    @NotNull(message = "是否删除 0:未删除 1:已删除不能为null")
    private Boolean isDelete;
}