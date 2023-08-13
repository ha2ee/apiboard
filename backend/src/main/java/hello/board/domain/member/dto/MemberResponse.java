package hello.board.domain.member.dto;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class MemberResponse {

    private Long id; //회원 번호(PK)
    private String loginId; //로그인 ID
    private String password; //비밀번호
    private String name; //이름
    private String email; //이메일

    public void clearPassword() {
        this.password = "";
    }

}
