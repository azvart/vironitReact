import useHandleResponse from '../utils/useHandleResponse';
import authHeader from '../utils/authHeader';

export function useGetUser(){
    const handleResponse = useHandleResponse();
    const requestOptions:any ={
        method:"GET",
        headers: authHeader(),
    };

    const GetUsers =()=>{
        return fetch(
            'http://localhost:5000/',
            requestOptions,
        ).then(handleResponse)
        .catch(()=>{
            console.log('Error')
        })
    }
    return GetUsers;
}


// export function useGetCurrentUser(){
//     const handleResponse = useHandleResponse();
//     const requestOptions:any={
//         method:"GET",
//         headers:authHeader(),

//     };

//     const CurrentUser = () => {
//         return fetch(
//             'http://localhost:5000/user',
//             requestOptions,
//         ).then(handleResponse)
//         .catch(()=>{
//             console.log('Error');
//         })
//     }
//     return CurrentUser;
// }