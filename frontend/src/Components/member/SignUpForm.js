import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
    const [loginIdChecked, setLoginIdChecked] = useState(false);

    const idRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);

    const history = useNavigate();
    

    function checkLoginId(e) {
        const loginId = idRef.current.value;
        console.log(loginId);
        if(!loginId) {
            alert('아이디를 입력해주세요');
            return;
        }
        fetch(`http://localhost:8080/member/check-exist"?loginId=${loginId}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if(res === 0){
                    if (window.confirm('사용 가능한 아이디입니다.\n입력하신 아이디로 결정하시겠어요?')) {
                        idRef.current.readOnly = true;
                        setLoginIdChecked(true);
                    }
                } else {
                    alert('이미 가입된 아이디가 있습니다.');
                    idRef.current.focus();
                }
            });
    }

    function checkForm() {
        const loginId = idRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        const name = nameRef.current.value;
        const email = emailRef.current.value;

        if (!loginId || !password || !confirmPassword || !name || !email) {
            alert('모든 필드를 입력해주세요.');
            return;
          }
          console.log(loginId);

        // 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            confirmPasswordRef.current.focus();
            return;
        }

        fetch(`http://localhost:8080/member/join`, {
            method:"POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                loginId: loginId,
                password: password,
                name: name,
                email: email,
            }),
        }).then(res => {
            if(res.ok) {
                alert('회원가입이 완료되었습니다.');
                history('/board');
            }
        })
    }

        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card border-0 shadow">
                            <div className="card-body p-4">
                                <h2 className="card-title text-center mb-4">회원 가입</h2>

                                <form id="signupForm" onSubmit={checkForm}>
                                    {/* Login ID */}
                                    <div className="mb-3">
                                        <label htmlFor="loginId" className="form-label">
                                            아이디
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="loginId"
                                                className="form-control"
                                                ref={idRef}
                                                //   onChange={handleLoginIdInput}
                                                //   placeholder="영어만 입력가능합니다."
                                                placeholder="필수 입력값입니다.."
                                            />
                                            <button
                                                type="button"
                                                id="idCheckBtn"
                                                className="btn btn-outline-primary"
                                                disabled={loginIdChecked}
                                                onClick={checkLoginId}
                                            >
                                                {loginIdChecked ? "중복 확인 완료" : "중복 확인"}
                                            </button>
                                        </div>
                                        <div className="field-error"></div>
                                    </div>

                                    {/* Password */}
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            비밀번호
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            placeholder="필수 입력값입니다.."
                                            ref={passwordRef}
                                        />
                                        <div className="field-error"></div>
                                    </div>

                                    {/* Password check */}
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">
                                            비밀번호 확인
                                        </label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            className="form-control"
                                            placeholder="필수 입력값입니다.."
                                            ref={confirmPasswordRef}
                                        />
                                        <div className="field-error"></div>
                                    </div>

                                    {/* Name */}
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            이름
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            placeholder="필수 입력값입니다.."
                                            ref={nameRef}
                                        />
                                        <div className="field-error"></div>
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            이메일
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            placeholder="example@example.com 형태로 입력해주세요.."
                                            ref={emailRef}
                                        />
                                        <div className="field-error"></div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="row mt-4">
                                        <div className="col">
                                            <button
                                                className="w-100 btn btn-primary btn-lg"
                                                type="button"
                                                onClick={checkForm}
                                            >
                                                회원 가입
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
