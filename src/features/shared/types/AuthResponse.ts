import {User} from "./User";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    mfaRequired: boolean;
    authValid: boolean;
    tokenValid: boolean;
    message: string;
    user: User;
    roles: string[];
}