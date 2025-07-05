import { jwtDecode } from 'jwt-decode';

export const getUserRoleFromToken = (token:string):string | null => {
    try{
        const decoded: any = jwtDecode(token);
        return decoded?.role || null;
    }catch(err){
        return null;
    }
};