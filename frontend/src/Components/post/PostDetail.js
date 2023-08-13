import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentList from "../comment/CommentList";
import { AuthContext } from "../context/AuthProvider";
import useFetch from "../hooks/useFetch";
import PostUpdateForm from "./PostUpdateForm";

export default function PostDetail() {
  const { postId } = useParams();
  const postDetail = useFetch(`http://localhost:8080/board/${postId}`);

  const { auth } = useContext(AuthContext)

  const formattedDate = new Date(postDetail.createdDate).toLocaleString();

  const [showModal, setShowModal] = useState(false);//모달창

  const nav = useNavigate();

  function goListPage() {
    nav('/board');
  }

  const deletePost = () => {
    if(window.confirm("정말 삭제하시겠습니까?")){
    fetch(`http://localhost:8080/board/${postId}`, {
      method:"DELETE"
    }).then(res => {
      if(res.ok){
        alert('삭제되었습니다.');
        nav('/board');
      }
    }).catch(e =>{
      throw new Error("삭제실패");
    })
  }
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
    {/* <h1 className="text-center">게시글 상세</h1> */}
    <div className="container mt-5">
      <div style={{ maxWidth: "1000px", overflowX: "auto", margin: "0 auto" }}>
        <table className="table table-bordered table-striped">
          <tbody>
            <tr>
              <th className="table-secondary" style={{ width: "20%" }}>작성자</th>
              <td>{postDetail.writer}</td>
            </tr>
            <tr>
              <th className="table-secondary" style={{ width: "20%" }}>제목</th>
              <td>{postDetail.title}</td>
            </tr>
            <tr>
              <th className="table-secondary" style={{ width: "20%" }}>작성일</th>
              <td>{formattedDate}</td>
            </tr>
            <tr>
              <th className="table-secondary" style={{ width: "20%" }}>조회수</th>
              <td>{postDetail.viewCnt}</td>
            </tr>
            <tr>
              <th className="table-secondary" style={{ width: "20%" }}>내용</th>
              <td style={{ height: "300px", overflowY: "auto",whiteSpace: "pre-line" }}>{postDetail.content}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
      {!(auth === postDetail.writer) ? <><button className="btn btn-secondary me-2" onClick={goListPage}>목록으로</button></>:<div>
        <button className="btn btn-secondary me-2" onClick={goListPage}>목록으로</button>
        <button className="btn btn-primary me-2" onClick={toggleModal}>수정하기</button>
        <button className="btn btn-danger" onClick={deletePost}>삭제하기</button>
      </div>}
               {/* 모달 (나중에 확인 2023.08.12)*/}
      {showModal && <PostUpdateForm closeUpdateModal={toggleModal} post={postDetail} />}
      </div>
      <br /><br />

      <div style={{width:800, margin:'0 auto'}}>
      <CommentList seq={postId}/>
      </div>
    </div>
    </>
  );
}
