// Sayfa yüklendiğinde varsayılan olarak "Post Oluştur" sayfasını açın
// "Post Oluştur" bağlantısına tıklanınca "create-post.html" sayfasını açın
/*
document.querySelector('a[href="create-post.html"]').addEventListener('click', function (event) {
    event.preventDefault();
    //window.location.href = 'create-post.html';

    const content = document.getElementById('content');
    content.innerHTML = ''; //içeriği temizle
    fetch('create-post.html')
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
        }).catch(error => {
            console.error("Error:", error);
        }
})*/