package hello.board.domain.post.dao;

import hello.board.common.dto.SearchDto;
import hello.board.domain.post.dto.PostRequest;
import hello.board.domain.post.dto.PostResponse;
import hello.board.domain.post.dto.PostUpdateForm;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostMapper {

    /**
     * 게시글 저장
     * @param params - 게시글 정보
     */
    void save(PostRequest params);

    /**
     * 게시글 상세정보 조회
     * @param id-PK
     * @return 게시글 상세 정보
     */
    PostResponse findById(Long id);

    /**
     * 게시글 조회수 증가
     * @param id - PK
     */
    void increaseViewCount(Long id);

    /**
     * 게시글 수정
     * @param params - 게시글 정보
     */
    void update(PostRequest params);

    /**
     * 게시글 삭제
     * @param id - PK
     */
    void deleteById(Long id);

    /**
     * 게시글 리스트 조회
     * @return 게시글 리스트
     */
    List<PostResponse> findAll(SearchDto params);
//    List<PostResponse> findAll();

    /**
     * 게시글 수 카운팅
     * @return 게시글 수
     */
    Integer count(SearchDto params);
}


