import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthProvider"
import "../../css/modal.css";

export default function Comment({obj, commentListRefresh}) {

    const { auth } = useContext(AuthContext);
    const [comment, setComment] = useState(obj);
    const formattedDate = new Date(comment.createdDate).toLocaleString();

    const [showModal, setShowModal] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    const updateToggle = () => {
        setShowModal(!showModal);
    }

    const handleEditInputChange = (event) => {
        setEditedContent(event.target.value);
    };

    const saveEdit = () => {
        fetch(`http://localhost:8080/comment/${comment.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id : comment.id,
                content : editedContent
            })
        }).then(res => {
            if(res.ok) {
                alert('댓글 수정이 완료되었습니다.🎉');
                setShowModal(false);
                return res.json();
            }
            throw new Error("댓글 수정에 실패했습니다.");
        }).then(data => {
            setComment(data);
        }).catch(err => {
            console.error(err);
        })
    };

    const deleteComment = () => {
        if(window.confirm('정말 삭제 하시겠어요?')){
            fetch(`http://localhost:8080/comment/${comment.id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                },
            }).then(res=>{
                if(res.ok){
                    alert("댓글 삭제가 완료되었습니다.")
                    commentListRefresh();
                }
            })
        }
    }

    return (
        <>
            <div key={comment.id}>
                <div className="d-flex align-items-start">
                    <img src="/images/profile-placeholder.png" alt="프로필 이미지" className="profile-img rounded-circle" width="30" height="30" />
                    <div className="ms-2">
                        <span className="comment-writer font-weight-bold">{comment.writer}</span>
                        <br />
                        <small className="comment-date text-muted">{formattedDate}</small>
                    </div>
                    {auth === comment.writer ? <div className="ms-auto">
                        {/* 수정 버튼 */}
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={updateToggle}>수정</button>
                        {/* 삭제 버튼 */}
                        <button className="btn btn-sm btn-outline-danger" onClick={deleteComment}>삭제</button>
                    </div> : ""}
                </div>

                {showModal && (
                <div className="modal-background">
                    <div className="modal-content">
                        <h3>댓글수정</h3>
                        <textarea
                            className="form-control"
                            value={editedContent}
                            onChange={handleEditInputChange}
                        />
                        <button className="btn btn-secondary" onClick={updateToggle}>취소</button>
                        <button className="btn btn-primary" onClick={saveEdit}>저장</button>
                    </div>
                </div>
            )}

                <div className="comment-card mb-3" style={{ minHeight: "100px" }}>
                    <div className="comment-body mt-2">
                        <p className="mb-0" style={{whiteSpace: "pre-line" }}>{comment.content}</p>
                    </div>
                </div>
            </div>
        </>

    );
}