import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/loginForm.css";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

export default function LoginForm() {

  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);

  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useNavigate();

  function login(event) {
    event.preventDefault(); 
    const loginId = idRef.current.value;
    const password = passwordRef.current.value;

    if(!loginId || !password) {
      alert('아이디, 패스워드를 입력해주세요');
      return null;
    }
    fetch(`http://localhost:8080/member/`, {
      method: "POST",
      headers : {
        'Content-Type' : 'application/json',
    },
      body: JSON.stringify({
          loginId: loginId,
          password: password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('로그인 실패');
      }
    }).then((data) => {
      alert('로그인 완료');
      console.log(data);
      localStorage.setItem("board_access_token", data.jwt)
      localStorage.setItem("id", data.id)
      setAuth(data.id);
      setHeaders({"Authorization": `Bearer ${data.jwt}`});

      history('/board');
    }).catch((error) => {
      console.log("error??");
      alert('아이디 비밀번호를 확인해주세요');
    });
  }

    return (
        <>
        <form className="login-form" onSubmit={login}>
        <h2 className="card-title text-center mb-4">로그인</h2>
          <div className="form-group">
            <label htmlFor="loginId">로그인 ID</label>
            <input
              type="text"
              className="form-control"
              ref={idRef}
              placeholder="아이디를 입력하세요"
            />
            <div className="field-error"></div>
          </div>
    
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              className="form-control"
              ref={passwordRef}
              placeholder="비밀번호를 입력하세요"
            />
            <div className="field-error"></div>
          </div>
    
          <hr className="my-4" />
    
          <div className="row">
            <div className="col">
              <button className="w-100 btn btn-primary btn-lg" type="submit">
                로그인
              </button>
            </div>
            <div className="col">
              <button
                className="w-100 btn btn-secondary btn-lg"
                onClick={() => {
                  // Handle cancel
                }}
                type="button"
              >
                취소
              </button>
            </div>
          </div>
        </form>
        </>
      );
}
