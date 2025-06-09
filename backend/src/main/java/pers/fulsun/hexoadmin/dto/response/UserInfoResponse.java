package pers.fulsun.hexoadmin.dto.response;

import lombok.Getter;
import lombok.Setter;
import pers.fulsun.hexoadmin.db.entity.UsersEntity;

@Getter
@Setter
public class UserInfoResponse extends BaseResponse {

    private UsersEntity userInfo;
    private String token;

}
