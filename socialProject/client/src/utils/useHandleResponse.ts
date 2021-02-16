import {authService} from '../service/authService';

const useHandleResponse = ()=>{
    const handleResponse = (response:any) =>{
      
        return response.text().then((text:string)=>{
            const data = text && JSON.parse(text);
            
            if(!response.ok){
                if([401,403].indexOf(response.status)!== -1){
                    authService.logout();

                }
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        })
        
    }
    return handleResponse;
}


export default useHandleResponse;