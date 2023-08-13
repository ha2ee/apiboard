import React, { useContext, useEffect, useState } from 'react';
import useFetch from "../hooks/useFetch";
import Pagination from './Pagination';
import TableRow from './TableRow';

import PostCreateForm from './PostCreateForm';
import SearchBar from './SearchBar';

import "../../css/modal.css";
import { AuthContext } from '../context/AuthProvider';
export default function PostList() {

  const { auth } = useContext(AuthContext); // 로그인

  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState('');
  const [keyword, setKeyword] = useState('');

  const [showModal, setShowModal] = useState(false);//모달창

  const apiUrl = `http://localhost:8080/board?page=${currentPage}&searchType=${searchType}&keyword=${keyword}`;
  const response = useFetch(apiUrl);

  const [lists, setLists] = useState([]);
  const [pagination, setPagination] = useState(null);

  //콜백(SearchBar.js 에서 데이터를 받아 검색데이터 렌더링을 위함)
  const handlePageSearch = (newSearchType, newKeyword) => {
    setSearchType(newSearchType);
    setKeyword(newKeyword);
    setCurrentPage(1);
  };

  useEffect(() => {
      setLists(response.list);
      setPagination(response.pagination);
  }, [response]);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="container" style={{ maxWidth: "1000px", maxHeight: "800px", marginTop:"20px" }}>
      {/* <h1 className="text-center">게시판</h1> */}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div></div>
        <button className="btn btn-secondary" onClick={!auth ? () => alert('로그인 한 사용자만 글을 작성 할 수 있습니다.') : toggleModal}>글쓰기</button>
      </div>

      {/* 모달 */}
      {showModal && <PostCreateForm closeModal={toggleModal} />}

      <table className="table table-hover table-striped text-center" style={{ border: "1px solid" }}>
      <colgroup>
          <col width="10%" />
          <col width="40%" />
          <col width="20%" />
          <col width="20%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr style={{ height: "50px" }}>
            <th>글번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {lists && lists.map((post) => (
            <TableRow key={post.id} post={post} />
          ))}
        </tbody>
      </table>
      {pagination && <Pagination pagination={pagination} onPageClick={handlePageClick} />}
      <SearchBar onPageSearch={handlePageSearch} />
    </div>
  );
}

