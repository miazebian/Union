export function PostData(type, userData){
    let BaseURL = 'http://localhost:8000/server.php';
    return new Promise((resolve, reject) => {
        fetch(BaseURL+type, {
            method: 'POST',
            body: JSON.stringify(userData)
        }).then((response) => response.json())
        .then((response) => {
            return responseJson.movies;
        }).catch((error) => {
            reject(error);
        });
});
}