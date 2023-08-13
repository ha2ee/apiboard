package hello.board.domain.member;

import hello.board.domain.member.dao.MemberMapper;
import hello.board.domain.member.dto.LoginRequest;
import hello.board.domain.member.dto.LoginResponse;
import hello.board.domain.member.dto.MemberRequest;
import hello.board.domain.member.dto.MemberResponse;
import hello.board.domain.member.exception.MemberException;
import hello.board.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;

    /**
     * 회원 정보 저장(회원 가입)
     * @param params - 회원 정보
     * @return PK
     */
    @Transactional
    public Long saveMember(final MemberRequest params) {
        params.encodingPassword(passwordEncoder);
        memberMapper.save(params);
        return params.getId();
    }

    /**
     * 회원 상세정보 조회
     * @param loginId - UK
     * @return 회원 상세정보
     */
    public MemberResponse findMemberByLoginId(final String loginId) {
        return memberMapper.findByLoginId(loginId);
    }

    /**
     * 회원 수 카운팅 (ID 중복 체크)
     * @param loginId - UK
     */
    public Integer countMemberByLoginId(final String loginId){
        return memberMapper.countByLoginId(loginId);
    }

    /**
     *
     * @param req
     * @return
     */
    public LoginResponse login(final LoginRequest req) {
        authenticate(req.getLoginId(), req.getPassword());

        UserDetails userDetails = userDetailsService.loadUserByUsername(req.getLoginId());
        String token = jwtTokenUtil.generateToken(userDetails);

        return new LoginResponse(token, req.getLoginId());
    }

    private void authenticate(String id, String pwd) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(id, pwd));
        } catch (DisabledException e) {
            throw new MemberException("인증되지 않은 아이디입니다.", HttpStatus.BAD_REQUEST);
        } catch (BadCredentialsException e) {
            throw new MemberException("비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
