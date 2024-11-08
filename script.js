const apikey = '2e92685dbf9246ce898d571cc869a334';

const blogcontainer = document.getElementById("blog-container");
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// List of top sources
const topSources = 'bbc-news,cnn,bloomberg,the-verge'; // Add more as desired

// Function to fetch top headlines from specific sources
async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=${topSources}&pageSize=7&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching Random News:", error);
        return [];
    }
}

// Function to fetch search-based news from specific sources
async function fetchSearchNews(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&sources=${topSources}&pageSize=7&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching search news:", error);
        return [];
    }
}

// Event listener for search button
searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (query) {
        try {
            const articles = await fetchSearchNews(query);
            displayBlogs(articles);
        } catch (error) {
            console.error("Error fetching news by query:", error);
        }
    }
});

function displayBlogs(articles) {
    blogcontainer.innerHTML = ""; // Clear previous content

    if (articles.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No articles found from top sources. Try a different query.";
        blogcontainer.appendChild(message);
        return;
    }

    articles.forEach((article) => {
        const blogcard = document.createElement("div");
        blogcard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || 'https://via.placeholder.com/600x400';
        img.alt = article.title || 'News Image';

        const title = document.createElement("h2");
        title.textContent = article.title ? article.title.slice(0, 30) + "..." : "No Title Available";

        const description = document.createElement("p");
        description.textContent = article.description ? article.description.slice(0, 120) + "..." : "No Description Available";

        blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);

        blogcard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });
        
        blogcontainer.appendChild(blogcard);
    });
}

// Initial load of random news
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error displaying blogs:", error);
    }
})();






