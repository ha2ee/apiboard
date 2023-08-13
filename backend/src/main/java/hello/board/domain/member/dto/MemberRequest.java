package hello.board.domain.member.dto;

import hello.board.domain.member.Gender;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberRequest {

    private Long id; //회원 번호 (PK)
    @NotBlank
    private String loginId; //로그인 ID
    @NotBlank
    private String password; //비밀번호
    @NotBlank
    private String name; //이름
    @NotBlank
    @Email
    private String email; //이메일

    public void encodingPassword(PasswordEncoder passwordEncoder) {
        if(StringUtils.isEmpty(password)){
            return;
        }
        password = passwordEncoder.encode(password);
    }

}
