import { createContext, useState } from "react";

export const AuthContext = createContext({
    token:'',
    uid: '',
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {}
})

const AuthContextProvider = ({children}) => {
    const [authToken, setAuthToken] = useState();
    const [authUid, setAuthUid] = useState();

    function authenticate(token, id) {
        setAuthToken(token);
        setAuthUid(id)
    }

    function logout() {
        setAuthToken(null);
        setAuthUid(null);
    }

    const value = {
        token: authToken,
        uid: authUid,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;