import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

export default function Logout() {
    const { auth, setAuth } = useContext(AuthContext);
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const navigate = useNavigate();
	
	const logout = () => {
		
		localStorage.removeItem("board_access_token");
		localStorage.removeItem("id");

		alert(auth + "님, 성공적으로 로그아웃 됐습니다 🔒");
		setAuth(null);
		setHeaders(null);
		navigate("/");
	};

	useEffect(() => {
		logout();
	}, [logout]);
}