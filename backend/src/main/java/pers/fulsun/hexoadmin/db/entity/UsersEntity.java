package pers.fulsun.hexoadmin.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
public class UsersEntity {
    /**
     * 用户ID
     */
    @NotNull(message = "用户ID不能为null")
    private Integer id;

    /**
     * 用户名
     */
    @Size(max = 50, message = "用户名最大长度要小于 50")
    @NotBlank(message = "用户名不能为空")
    private String username;

    /**
     * 密码
     */
    @Size(max = 100, message = "密码最大长度要小于 100")
    @NotBlank(message = "密码不能为空")
    @JsonIgnore
    private String password;

    /**
     * 邮箱地址
     */
    @Size(max = 100, message = "邮箱地址最大长度要小于 100")
    @NotBlank(message = "邮箱地址不能为空")
    private String email;

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
    private Boolean isdelete;
}