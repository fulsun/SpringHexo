package pers.fulsun.hexoadmin.dto.response;

import lombok.Getter;
import lombok.Setter;
import pers.fulsun.hexoadmin.utils.TreeBuilder;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class MenuInfoResponse extends BaseResponse implements TreeBuilder.TreeNode<MenuInfoResponse> {
    List<MenuInfoResponse> children;
    /**
     * 菜单ID
     */
    private Integer id;
    /**
     * 菜单标题
     */
    private String title;
    /**
     * 菜单路径
     */
    private String path;
    /**
     * 父菜单ID
     */
    private Integer parentId;
    /**
     * 菜单图标
     */
    private String icon;
    /**
     * 菜单排序
     */
    private Integer sort;
    /**
     * 是否固定标签 0:不固定 1:固定
     */
    private Boolean isFixed;
    /**
     * 创建时间
     */
    private Date createdAt;
    /**
     * 更新时间
     */
    private Date updatedAt;
    /**
     * 是否删除 0:未删除 1:已删除
     */
    private Boolean isDelete;

    @Override
    public List<MenuInfoResponse> getChildren() {
        return this.children;
    }

    @Override
    public void setChildren(List<MenuInfoResponse> children) {
        this.children = children;

    }
}
