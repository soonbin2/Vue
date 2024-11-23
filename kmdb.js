const API_KEY = "6E128X6EKQ4I0PBGWR51"; // KMDB에서 받은 인증키를 입력하세요.
const API_URL = `https://api.kmdb.or.kr/v1/search/new?ServiceKey=${API_KEY}&type=json&collection=kmdb_new`;

// 영화 데이터를 불러오는 함수
async function fetchMovies() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch movies");
        }
        const data = await response.json();

        // KMDB API 데이터 구조에 따라 영화 리스트 가져오기
        const movies = data.Data[0].Result;
        displayMovies(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// 영화 데이터를 화면에 표시하는 함수
function displayMovies(movies) {
    const movieContainer = document.getElementById("movieContainer");
    movies.forEach((movie) => {
        const movieItem = document.createElement("div");
        movieItem.className = "movie-item";

        const movieImage = document.createElement("img");
        movieImage.src = movie.posters.split("|")[0]; // 포스터 이미지 URL
        movieImage.alt = movie.title;

        const movieTitle = document.createElement("div");
        movieTitle.className = "movie-title";
        movieTitle.textContent = movie.title;

        movieItem.appendChild(movieImage);
        movieItem.appendChild(movieTitle);
        movieContainer.appendChild(movieItem);
    });
}

// 페이지 로드 시 영화 데이터를 불러오기
fetchMovies();