package hello.board.domain.member;

import hello.board.domain.member.dto.LoginResponse;
import hello.board.domain.member.dto.MemberRequest;
import hello.board.domain.member.dto.MemberResponse;
import hello.board.domain.member.dto.LoginRequest;
import hello.board.domain.member.exception.MemberException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;

@Slf4j
@RestController
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    //회원 가입
    @PostMapping("/join")
    public ResponseEntity<?> addMember(@Validated @RequestBody MemberRequest member, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            log.info("errors={}", bindingResult);
//            return ResponseEntity.badRequest().body("아이디 비밀번호를 확인해주세요..");
//            return null;
            throw new MemberException("모든 필드는 필수 입력값입니다.", HttpStatus.BAD_REQUEST);
        }
        Long saveId = memberService.saveMember(member);
        System.out.println(saveId);
        return ResponseEntity.ok(saveId);
    }

    //로그인
    @PostMapping
    public ResponseEntity<?> login(@Validated @RequestBody LoginRequest form, BindingResult bindingResult,
                                   HttpServletRequest request) {
        if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("아이디와 비밀번호는 필수입력입니다.");
        }
        LoginResponse loginMember = memberService.login(form);
        log.info("loginMember={}", loginMember);
        return ResponseEntity.ok(loginMember);
    }

    //회원 수 카운팅(ID 중복체크)
    @GetMapping
    public Integer checkIdDuplicate(@RequestParam final String loginId) {
        return memberService.countMemberByLoginId(loginId);
    }

    /**
     * Exception Handler
     * @param e
     * @return status
     */
    @ExceptionHandler(MemberException.class)
    public ResponseEntity<?> handleUserException(MemberException e) {
        System.out.println("MemberController handlerUserException " + new Date());

        return new ResponseEntity<>(e.getMessage(), e.getStatus());
    }

}
