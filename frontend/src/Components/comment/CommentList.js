import { useEffect, useState } from "react";
import Comment from "./Comment";
import Pagination from "../post/Pagination";
import CommentWrite from "./CommentWrite";

export default function CommentList(props) {
    const seq = props.seq;

    const [commentList, setCommentList] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchComments();
    }, [currentPage]);

    const handlePageClick = (pageNum) => {
        setCurrentPage(pageNum);
    }

    const fetchComments = () => {
        fetch(`http://localhost:8080/comment?postId=${seq}&page=${currentPage}`)
            .then(res => {
                if (res.ok) return res.json();
            }).then(data => {
                setCommentList(data.list);
                setPagination(data.pagination);
            })
    }

    const commentListRefresh = () => {
        fetchComments();
    };


    return (
        <div className="comment-list mt-4">
            <CommentWrite postId={seq} commentListRefresh={commentListRefresh} />
            {/* <h5 className="text-center"><i className="fas fa-paperclip"></i> 댓글 목록</h5> */}
            {commentList.map(comment => (
                <div className="my-4" key={comment.id}>
                    <Comment obj={comment} commentListRefresh={commentListRefresh}/>
                </div>
            ))}
            {pagination && <Pagination pagination={pagination} onPageClick={handlePageClick} />}
            
        </div>
    );

}