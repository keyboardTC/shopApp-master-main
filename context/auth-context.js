import { createContext, useState } from "react";

export const AuthContext = createContext({
    token:'',
    uid: '',
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {},
    toggleChange: () => {},
    isChanged: false
})

const AuthContextProvider = ({children}) => {
    const [authToken, setAuthToken] = useState();
    const [authUid, setAuthUid] = useState();
    const [ishanged, setIsChanged] = useState(false);

    function authenticate(token, id) {
        setAuthToken(token);
        setAuthUid(id)
    }

    function logout() {
        setAuthToken(null);
        setAuthUid(null);
    }
    function toggleChange() {
        setIsChanged(!ishanged);
    }

    const value = {
        token: authToken,
        uid: authUid,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
        toggleChange: toggleChange,
        isChanged: ishanged
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;