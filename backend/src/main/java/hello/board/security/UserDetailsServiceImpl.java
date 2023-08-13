package hello.board.security;

import hello.board.domain.member.dao.MemberMapper;
import hello.board.domain.member.dto.MemberResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

    private final MemberMapper memberMapper;

    public UserDetailsServiceImpl(MemberMapper memberMapper) {
        this.memberMapper = memberMapper;
    }

    //username = User(id)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("UserDetailsServiceImpl loadUserByUsername =" + LocalDateTime.now());

        MemberResponse member = memberMapper.findByLoginId(username);
        if(member == null) {
            throw new UsernameNotFoundException(String.format("'%s'는 존재하지 않는 사용자입니다.", username));
        }
        return new UserDetailsImpl(member);
    }
}
