package hello.board.domain.comment.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
@Setter
public class CommentResponse {

    private Long id;                       // 댓글 번호 (PK)
    private Long postId;                   // 게시글 번호 (FK)
    private String content;                // 내용
    private String writer;                 // 작성자
    private Boolean deleteYn;              // 삭제 여부
    private LocalDateTime createdDate;     // 생성일시
    private LocalDateTime modifiedDate;    // 최종 수정일시
}
