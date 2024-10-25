import { jwtDecode } from "jwt-decode";

export const decodedJwt = () =>{
    let accessToken = sessionStorage.getItem('accessToken');
    let decodedToken = null;
    if(accessToken){
        decodedToken = jwtDecode(accessToken);
    }

    return decodedToken;
}