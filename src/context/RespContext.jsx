import { createContext, useState } from "react";

export const RespContext = createContext();

export const RespContextProvider = ({ children }) => {
    const [resp, setResp] = useState(false);
    
    return (
        <RespContext.Provider value={{ resp, setResp }}>
            {children}
        </RespContext.Provider>
    );
}