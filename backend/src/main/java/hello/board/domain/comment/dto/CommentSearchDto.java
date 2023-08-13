package hello.board.domain.comment.dto;

import hello.board.common.dto.SearchDto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CommentSearchDto extends SearchDto {

    private Long postId; //게시글 번호(FK)
}
