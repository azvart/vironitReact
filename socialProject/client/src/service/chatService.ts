import useHandleResponse from '../utils/useHandleResponse';
import authHeader from '../utils/authHeader';

export function useGetGlobalMessages(){
    const handleResponse = useHandleResponse();
    const requestOptions:any = {
        method:"GET",
        headers: authHeader()
    }
    const getGlobalMessages = () =>{
        return fetch(
            'http://localhost:5000/global',
            requestOptions,
        ).then(handleResponse)
        .catch(()=>{
            console.log("Error");
        })
    }
    return getGlobalMessages;
}


export function useSendGlobalMessages(){
    const handleResponse = useHandleResponse();
    const sendGlobalMessages = (body:any) =>{
        console.log(body);
        const requestOptions:any={
            method:'POST',
            headers:authHeader(),
            body:JSON.stringify({body:body,global:true}),

        };
        return fetch(
            'http://localhost:5000/global',
            requestOptions,
        ).then(handleResponse)
        .catch((err)=>{
            console.log(err);
        })
    }
    return sendGlobalMessages;
}


export function useGetConversations(){
    const handleResponse = useHandleResponse();
    const requestOptions:any = {
        method:'GET',
        headers:authHeader(),
    }

    const getConversations = () =>{
        return fetch(
            'http://localhost:5000/conversations',
            requestOptions,
        ).then(handleResponse)
        .catch(()=>{
            console.log("Error");
        })
    }
    return getConversations;
}


export function useGetConversationsMessages(){
    const handleResponse = useHandleResponse();
    const requestOptions:any={
        method:'GET',
        headers:authHeader(),
    };

    const getConversationsMessages = (id:any) =>{
        return fetch(
            `http://localhost:5000/conversations/query?userId=${id}`,
            requestOptions,
        ).then(handleResponse)
        .catch(()=>{
            console.log("Error");
        })
    }
    return getConversationsMessages;
}

export function useSendConversationMessages(){
    const handleResponse = useHandleResponse();
    const sendConversationMessages = (id:any,body:any)=>{
        const requestOptions:any={
            method:'POST',
            headers:authHeader(),
            body:JSON.stringify({to:id,body:body}),
        };
        
        return fetch(
            'http://localhost:5000/private',
            requestOptions,
        ).then(handleResponse)
        .catch((err)=>{
            console.log(err);
        })
    }
    return sendConversationMessages;
}