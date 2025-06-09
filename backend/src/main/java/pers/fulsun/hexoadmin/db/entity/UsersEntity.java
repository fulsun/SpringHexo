package pers.fulsun.hexoadmin.db.entity;

import java.util.Date;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class UsersEntity {
    @NotNull(message = "不能为null")
    private Integer id;

    @Size(max = 50, message = "最大长度要小于 50")
    @NotBlank(message = "不能为空")
    private String username;

    @Size(max = 100, message = "最大长度要小于 100")
    @NotBlank(message = "不能为空")
    private String password;

    @Size(max = 100, message = "最大长度要小于 100")
    @NotBlank(message = "不能为空")
    private String email;

    @NotNull(message = "不能为null")
    private Date createdAt;

    @NotNull(message = "不能为null")
    private Date updatedAt;
}