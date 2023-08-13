import { createContext, useState } from "react";

export const HttpHeadersContext = createContext();

export default function HttpHeadersProvider({children}) {
    
    const [headers, setHeaders] = useState({
        "Content-Type": "application/json",
        "Authorization" :`Bearer ${localStorage.getItem("board_access_token")}` // 새로고침하면 appContext 사라지기 때문에 초기값은 LocalStorage 값으로 세팅
    });

    const value = {headers, setHeaders};

    return (
        <HttpHeadersContext.Provider value={value}>
            {children}
        </HttpHeadersContext.Provider>
    );
}
