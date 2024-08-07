const apiKey = 'YOUR_API_KEY';
const channelId = 'UCf7RzvqX6GUnTz9PRgygH2g'; // Replace with Alick Macheso's channel ID
const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`;

// Function to fetch songs
async function fetchSongs() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const songsContainer = document.getElementById('songs-container');

        songsContainer.innerHTML = ''; // Clear previous songs

        data.items.forEach(item => {
            const videoId = item.id.videoId;
            const title = item.snippet.title;
            const thumbnail = item.snippet.thumbnails.medium.url;

            const songElement = document.createElement('div');
            songElement.classList.add('song');
            songElement.innerHTML = `
                <h3>${title}</h3>
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                    <img src="${thumbnail}" alt="${title}" />
                </a>
            `;

            songsContainer.appendChild(songElement);
        });
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}

// Function to handle login
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('login-message');

    // Simple login validation (replace with real authentication logic)
    if (username === 'user' && password === 'pass') {
        messageDiv.textContent = 'Login successful!';
        messageDiv.style.color = 'green';
    } else {
        messageDiv.textContent = 'Invalid username or password';
        messageDiv.style.color = 'red';
    }
}

// Event listener for login form
document.getElementById('login').addEventListener('submit', handleLogin);

// Initial fetch
fetchSongs();

// Optional: Set an interval to periodically fetch new songs
// setInterval(fetchSongs, 60000); // Check every 60 seconds
