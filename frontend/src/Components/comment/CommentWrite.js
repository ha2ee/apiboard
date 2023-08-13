import { useContext, useState } from "react";
import "../../css/comment.css";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import { AuthContext } from "../context/AuthProvider";

export default function CommentWrite({ postId, commentListRefresh}) {

    const { auth, setAuth } = useContext(AuthContext);
    const { headers, setHeaders } = useContext(HttpHeadersContext);

    const [content, setContent] = useState("");

    const changeContent = (event) => {
        setContent(event.target.value);
    }

    const createComment = () => {
        if(!auth) {
            alert("로그인 한 사용자만 댓글을 작성 할 수 있습니다.");
            return;
        }

        if(!content){
            alert("댓글을 작성해주세요");
            return;
        }
            fetch(`http://localhost:8080/comment`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    postId: postId,
                    content: content,
                    writer: auth,
                })
            }).then(res => {
                if (res.ok) {
                    alert('댓글을 작성하였습니다.🎉');
                    setContent('');
                    commentListRefresh();
                }
            })
    }

    return (
        <>
            {/* 상단 영역 (프로필 이미지, 댓글 작성자) */}
            <div className="d-flex align-items-center">
                <img src="/images/profile-placeholder.png" alt="프로필 이미지" className="profile-img rounded-circle" width="30" height="30" />
                <div className="ms-2">
                    <span className="comment-id h6 m-0"><strong>{auth}</strong></span>
                </div>
            </div>

            {/* 하단 영역 (댓글 내용 입력창) */}
            <div className="my-3">
                <textarea className="form-control" rows="5" value={content} onChange={changeContent} placeholder="댓글을 작성해주세요..."></textarea>
            </div>

            <div className="d-flex justify-content-end">
                <button className="btn btn-outline-secondary" onClick={createComment}>
                    <i className="fas fa-comment-dots"></i> 댓글 추가
                </button>
            </div>
        </>


    )
}