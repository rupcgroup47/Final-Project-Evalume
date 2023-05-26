// import { useEffect, useState } from "react";

const ApiFetcher = async (api, method, body) => {
    const abortController = new AbortController();

    //set up the timeout for aborting the fetch request
    const timeoutId = setTimeout(() => {
        abortController.abort();
    }, 5000); //adjust the timeout duration as needed

    try {
        const response = await fetch(api,
            {
                method: method,
                headers: new Headers({
                    "Content-Type": "application/json; charset=UTF-8",
                    Accept: "application/json; charset=UTF-8",
                }),
                body: body,
                signal: abortController.signal,
            });
        const data = await response.json();
        console.log(response);
        if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        clearTimeout(timeoutId);
        return data;
    }
   
    // .then((result) => {
    //     console.log("success");
    //     return result;
    // })
    catch (error) {
    if (error.name === 'AbortError') { return };
    console.log("err get=", error);
    clearTimeout(timeoutId);
    throw error;
};

    // return () => {
    //     abortController.abort()
    //     // stop the query by aborting on the AbortController on unmount
    // }

}

export default ApiFetcher;