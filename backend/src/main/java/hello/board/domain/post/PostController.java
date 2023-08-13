package hello.board.domain.post;

import hello.board.common.paging.PagingResponse;
import hello.board.domain.comment.dto.CommentSearchDto;
import hello.board.domain.post.dto.PostRequest;
import hello.board.domain.post.dto.PostResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    //게시글 리스트 페이지
    @GetMapping
    public ResponseEntity<PagingResponse<PostResponse>> list(@ModelAttribute final CommentSearchDto searchDto) {
        PagingResponse<PostResponse> allPost = postService.findAllPost(searchDto);
        return ResponseEntity.ok(allPost);
    }

    @PostMapping
    public ResponseEntity<?> write(@Validated @RequestBody PostRequest params, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            log.info("/write error ={}", bindingResult);
            return ResponseEntity.badRequest().body("제목, 내용은 필수 입력값입니다.");
        }
        Long savedId = postService.savePost(params);//게시글 INSERT

        return ResponseEntity.ok(savedId);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostResponse> read(@PathVariable long postId) {
        PostResponse postById = postService.findPostById(postId);
        return ResponseEntity.ok(postById);
    }

    @PatchMapping("/{postId}")
    public ResponseEntity<?> update(@RequestBody PostRequest postUpdateForm) {
        //게시글 수정
        postService.updatePost(postUpdateForm);
        return ResponseEntity.ok(postUpdateForm.getId());
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> delete(@PathVariable long postId){
        postService.deletePost(postId);
        return ResponseEntity.ok(postId);
    }

}
