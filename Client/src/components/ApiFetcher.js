import { useEffect, useState } from "react";

function ApiFetcher(props) {
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(props.API,
            {
                method: props.method,
                headers: new Headers({
                    "Content-Type": "application/json; charset=UTF-8",
                    Accept: "application/json; charset=UTF-8",
                }),
                body: props.body,
                signal: signal,
            })
            .then(async response => {
                const data = await response.json();
                console.log(response);

                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                return data;
            })
            .then(
                (result) => {
                    console.log("success");
                    props.onFetchComplete(result);
                    // setUsers(result);
                })
            .catch(error => {
                if (error.name === 'AbortError') { return };
                console.log("err get=", error);
                setError(error.message);
                props.onFetchError(error)
            });

    }, [props.API, props.method, props.body, props.signal, props.onFetchComplete, props.onFetchError]);

    return (error);
}

export default ApiFetcher;