package hello.board.domain.member.dao;

import hello.board.domain.member.dto.MemberRequest;
import hello.board.domain.member.dto.MemberResponse;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface MemberMapper {

    /**
     * 회원 정보 저장(회원 가입)
     * @param params - 회원 정보
     */
    void save(MemberRequest params);

    /**
     * 회원 상세정보 조회
     * @param loginId - UK
     * @return 회원 상세 정보
     */
    MemberResponse findByLoginId(String loginId);

    /**
     * 회원 수 카운팅(ID 중복 체크)
     * @param loginId - UK
     * @return 회원 수
     */
    Integer countByLoginId(String loginId);
}
