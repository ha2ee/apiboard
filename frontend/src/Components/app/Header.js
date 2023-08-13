import { useContext } from "react";
import { Link } from "react-router-dom";
import "../../css/main.css";
import { AuthContext } from "../context/AuthProvider";

function Header() {
    
    const { auth, setAuth } = useContext(AuthContext);

    return (
        <header>
            <div className="top_wrap">
                {/* <h1>게시판</h1> */}
                {!auth ?
                    <span className="login">
                        <Link to="/login">로그인</Link>
                        <Link to="/join">| 회원가입</Link>
                    </span>
                    :
                    <span className="login">
                        <span>{auth}님 반갑습니다.</span>
                        <Link to="/logout">로그아웃</Link>
                    </span>
                }
                <ul className="menu">
                    <li className="menu_item"><Link to="/" className="menu_link"><span className="top_menu">HOME</span></Link></li>
                    <li className="menu_item"><Link to="/board" className="menu_link"><span className="top_menu">게시판</span></Link></li>
                    <li className="menu_item"><button onClick={()=>alert("감사합니다.")}>?</button>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;