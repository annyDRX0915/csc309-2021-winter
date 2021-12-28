import ENV from './../config.js'
const API_HOST = ENV.api_host

export const getPosts = (postList) => {
    // the URL for the request
    const url = `${API_HOST}/post`;

    const request = new Request(url, {
        method: "GET",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Since this is a GET request, simply call fetch on the URL
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get students");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            // console.log(json)
            postList.setState({ postList: json.posts });
        })
        .catch(error => {
            console.log(error);
        });
};

export const deletePost = (post_id, postList) => {
    // the URL for the request
    const url = `${API_HOST}/admin/post`;

    const request = new Request(url, {
        method: "DELETE",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            post: post_id
        }),
    });

    // Since this is a GET request, simply call fetch on the URL
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get students");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            // console.log(json)
            postList.setState({ postList: json.posts });
        })
        .catch(error => {
            console.log(error);
        });
};

