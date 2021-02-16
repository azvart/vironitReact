import useHandleResponse from '../utils/useHandleResponse';

const LoginGoogle = async (code:any) =>{
    const handleResponse = useHandleResponse();
    return fetch('http://localhost:5000/google',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({code})
    })
    .then(handleResponse)
    .then((res)=>{
        if(res.ok){
            return res.json();
        }else{
            return Promise.reject(res);
        }
    })
}


export default LoginGoogle;