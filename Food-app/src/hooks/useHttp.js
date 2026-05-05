import { useEffect, useState, useCallback } from "react";

async function sendHttprequest(url, config){

    const response = await fetch(url, config);

    const resData = await response.json();

    if(!response.ok){
        throw new Error(resData.message || 'Something Went Wrong, failed to send request');
    }
    return resData;
}

export default function useHttp(url, config, initalData){
    const [data, setData ] = useState(initalData);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    function clearData() {
        setData(initalData);
    }

    const sendRequest = useCallback(
        async function sendRequest(data) {
            setIsLoading(true);
            try{
                const resData = await sendHttprequest(url, {...config, body: data});
                setData(resData);
            }catch(error){
                setError(error.message || 'someting went wrong');
            }
            setIsLoading(false);
        }, [url, config]);

    useEffect(() => { 
        if((config && (config.method === 'GET' || !config.method)) || !config){
            sendRequest();
        }
    }, [sendRequest, config]);

    return{
        data, 
        isLoading, 
        error,
        sendRequest,
        clearData
    }
}