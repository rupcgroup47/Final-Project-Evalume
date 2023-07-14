
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

        console.log("res", response);

        const data = await response.json();
        if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            console.log("err", error);
            return Promise.reject(error);
        }

        clearTimeout(timeoutId);
        return data;
    }

    catch (error) {
        if (error.name === 'AbortError') { return };
        console.log("err=", error);
        clearTimeout(timeoutId);
        throw error;
    };


}

export default ApiFetcher;