import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {User} from "./types/User";

type AuthContext = {
    authToken?: string | null;
    currentUser?: User | null;
    handleLogin: (token: string, user: User) => void;
    handleLogout: () => void;
};
const AuthContext = createContext<AuthContext | undefined>(undefined);
type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
    const [authToken, setAuthToken] = useState<string | null>();
    const [currentUser, setCurrentUser] = useState<User | null>();

    const handleLogin = (token: string, user: User) => {
        setAuthToken(token);
        setCurrentUser(user);
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
    };

     function handleLogout() {
        setAuthToken(null);
        setCurrentUser(null);
        localStorage.removeItem("authToken");
    }

    return (
        <AuthContext.Provider
            value={{
                authToken,
                currentUser,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used inside of a AuthProvider');
    }
    return context;
}