package hello.board.domain.post.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PostRequest {

    /**
     * Using to create, update
     */

    private Long id; //PK
    @NotBlank
    private String title; //제목
    @NotBlank
    private String content; //내용
    @NotBlank
    private String writer; //작성자
    private List<MultipartFile> files = new ArrayList<>(); // 첨부파일 List
    private List<Long> removeFileIds = new ArrayList<>(); //삭제할 첨부파일 id List
}
