export default featchAPI({ mainState, API, method, body })
{
    const abortController = new AbortController()
    if (mainState.is_Admin) {
        fetch(
            API,
            {
                method: method,
                headers: new Headers({
                    "Content-Type": "application/json; charset=UTF-8",
                    Accept: "application/json; charset=UTF-8",
                }),
                body: body,
                signal: abortController.signal
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
                    setUsers(result);
                },
                (error) => {
                    if (error.name === 'AbortError') return
                    console.log("err get=", error);
                    throw error
                }
            );
        return () => {
            abortController.abort()
            // stop the query by aborting on the AbortController on unmount
        };
    };
}