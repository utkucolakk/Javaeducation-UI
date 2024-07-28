// URL'den post ID'sini al
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// JSON verisini almak için API URL'si
const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;

// JSON verisini API'den al
fetch(apiUrl, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then((response) => response.json())
    .then((data) => {
        showPostDetails(data);
    })
    .catch((error) => {
        console.error('Veri alınırken bir hata oluştu: ', error);
    });


function showPostDetails(data) {
    const postDetails = document.getElementById('post-details');

    postDetails.innerHTML = `
   <h2>${data.title}</h2>
   <p>${data.body}</p>
   `;
}