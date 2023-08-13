package hello.board.domain.comment.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentRequest {

    private Long id;           // 댓글 번호 (PK)
    private Long postId;       // 게시글 번호 (FK)
    @NotBlank
    private String content;    // 내용
    private String writer;     // 작성자

    @Override
    public String toString() {
        return "CommentRequest{" +
                "id=" + id +
                ", postId=" + postId +
                ", content='" + content + '\'' +
                ", writer='" + writer + '\'' +
                '}';
    }
}
