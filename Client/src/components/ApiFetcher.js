import { useEffect, useState } from "react";

function ApiFetcher(props) {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        fetch(props.api,
            {
                method: props.method,
                headers: new Headers({
                    "Content-Type": "application/json; charset=UTF-8",
                    Accept: "application/json; charset=UTF-8",
                }),
                body: props.body,
                signal: abortController.signal,
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
                    setData(result);
                    props.onFetchComplete(result);
                })
            .catch(error => {
                if (error.name === 'AbortError') { return };
                console.log("err get=", error);
                setError(error.message);
                props.onFetchError(error)
            });

        return () => {
            abortController.abort()
            // stop the query by aborting on the AbortController on unmount
        }
    }, [props.api, props.method, props.body, props.onFetchComplete, props.onFetchError])

    return (
        <div>
            {props.children(data, error)}
        </div>
    );
}

export default ApiFetcher;