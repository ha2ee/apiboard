package hello.board.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Setter
@Getter
public class LoginRequest {

    @NotEmpty
    private String loginId;

    @NotEmpty
    private String password;
}
