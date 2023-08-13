import { useState } from "react";

export default function SearchBar({onPageSearch }) {

  const [searchType, setSearchType] = useState("");
  const [keyword, setKeyword] = useState("");

  const changeKeyword = (event) => {
    setKeyword(event.target.value);
  }

  const changeSearchType = (event) => {
    setSearchType(event.target.value);
  }

  //콜백(PostList.js로 searchType과 keyword를 넘겨줌)
  const handleSearch = () => {
    onPageSearch(searchType, keyword);
  };

    return (
      <div className="container my-4">
        <div className="row justify-content-between">
          <div className="col-md-10">
              <div className="input-group">
                <select className="form-control form-control-sm" 
                  value={searchType} 
                  onChange={changeSearchType} 
                >
                  <option value="">전체 검색</option>
                  <option value="title">제목</option>
                  <option value="content">내용</option>
                  <option value="writer">작성자</option>
                </select>
                <input type="text" 
                  className="form-control" 
                  placeholder="키워드를 입력해주세요." 
                  value={keyword} onChange={changeKeyword}
                onKeyDown={(e) => {
                  if(e.key === 'Enter'){
                  handleSearch();
                  }
                }} />
                <div className="input-group-append">
                  <button onClick={handleSearch} type="button" className="btn btn-primary">
                    <i className="fas fa-search"></i>
                    <span className="skip_info">검색</span>
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }