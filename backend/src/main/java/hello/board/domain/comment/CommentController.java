package hello.board.domain.comment;

import hello.board.common.paging.PagingResponse;
import hello.board.domain.comment.dto.CommentRequest;
import hello.board.domain.comment.dto.CommentResponse;
import hello.board.domain.comment.dto.CommentSearchDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/comment")
@RestController
@Slf4j
public class CommentController {

    private final CommentService commentService;

    //댓글 리스트 조회
    @GetMapping
    public ResponseEntity<PagingResponse<CommentResponse>> findAllComment(@ModelAttribute final CommentSearchDto params) {
        log.info("commentSearchDto = {}",params);
        PagingResponse<CommentResponse> allComment = commentService.findAllComment(params);
        log.info("리스트조회 allComment = {}", allComment);
        return ResponseEntity.ok(allComment);
    }

    // 신규 댓글 생성
    @PostMapping
    public ResponseEntity<CommentResponse> saveComment(@Validated @RequestBody final CommentRequest params,
                                                      BindingResult bindingResult) {
        System.out.println(params.toString());
        if(bindingResult.hasErrors()) {
            log.info("댓글작성에러 ={}",bindingResult);
            return null;
        }
        Long id = commentService.saveComment(params);
        return ResponseEntity.ok(commentService.findCommentById(id));
    }

    //기존 댓글 수정
    @PatchMapping("/{id}")
    public ResponseEntity<CommentResponse> updateComment(@Validated @RequestBody final CommentRequest params,
                                         BindingResult bindingResult) {
        if(bindingResult.hasErrors()){
            log.info("update Error!",bindingResult);
            return null;
        }
        commentService.updateComment(params);
        return ResponseEntity.ok(commentService.findCommentById(params.getId()));
    }

    //댓글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteComment(@PathVariable final Long id) {
        return ResponseEntity.ok(commentService.deleteComment(id));
    }
}
