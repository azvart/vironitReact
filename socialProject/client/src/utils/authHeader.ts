import {authService} from '../service/authService';

const authHeader = ()=>{
    const currentUser = authService.currentUserValue;
    
    if(currentUser && currentUser.token){
        return {
            Authorization: `${currentUser.token}`,
            "Content-Type":"application/json" || 'multipart/form-data',
        };
    }else{
        return {}
    }
}



export default authHeader;