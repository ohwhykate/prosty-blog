document.addEventListener('DOMContentLoaded', function () {
    const articleList = document.getElementById('article-list');
    const articleForm = document.getElementById('new-article-form');

    // Pobierz artykuły po załadowaniu strony
    fetchArticles();

    // Nasłuchuj formularza dodawania artykułu
    articleForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        // Dodaj nowy artykuł
        addArticle(title, content);
    });

    // Funkcja do pobierania artykułów
    function fetchArticles() {
        fetch('/api/articles')
            .then(response => response.json())
            .then(data => {
                displayArticles(data.articles);
            })
            .catch(error => console.error('Error:', error));
    }

    // Funkcja do wyświetlania artykułów
    function displayArticles(articles) {
        articleList.innerHTML = '';
        articles.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.content}</p>
            `;
            articleList.appendChild(articleElement);
        });
    }

    // Funkcja do dodawania artykułu
    function addArticle(title, content) {
        fetch('/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })
            .then(response => response.json())
            .then(data => {
                // Pobierz artykuły po dodaniu nowego artykułu
                fetchArticles();
                // Wyczyść formularz
                document.getElementById('title').value = '';
                document.getElementById('content').value = '';
            })
            .catch(error => console.error('Error:', error));
    }
});
