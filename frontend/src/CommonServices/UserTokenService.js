const UserTokenService = {
    getToken
}

export function getToken(){
    if(localStorage.getItem('token') !== null){
        const token = localStorage.getItem('token');
        // Citanje claims iz tokena
        let tokenString = token;
        let jwtData = tokenString.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);

        return {
            id: decodedJwtData.id,
            name: decodedJwtData.name,
            role: decodedJwtData.role,
            email: decodedJwtData.email
        }
    }
    return null;
}

export default UserTokenService;