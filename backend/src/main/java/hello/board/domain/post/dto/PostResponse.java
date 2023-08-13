package hello.board.domain.post.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostResponse {

    private Long id; //PK
    private String title; //제목
    private String content; //내용
    private String writer; //작성자
    private Integer viewCnt; //조회수
    private Boolean deleteYn; //삭제 여부
    private LocalDateTime createdDate; //생성일시
    private LocalDateTime modifiedDate; //최종 수정일시
}
