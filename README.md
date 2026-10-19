<div align="center">

# 🎬 CineMatch

### A content-based movie recommender system

Pick a movie you love and get 5 similar movies, with posters, ratings and details.

![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-ML-orange?logo=scikitlearn&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Frontend-yellow?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-black?logo=github)

### 🔗 [**Live Demo → nidhiyadavanshii.github.io/cinematch**](https://nidhiyadavanshii.github.io/cinematch/)

<img src="screenshots/home.png" alt="CineMatch home page" width="90%">

</div>

---

## 📸 Screenshots

<table>
  <tr>
    <td align="center">
      <b>Search with suggestions</b><br>
      <img src="Screenshot%202026-10-19%20221749.png" alt="Movie search suggestions" width="100%">
    </td>
    <td align="center">
      <b>Movie details and recommendations</b><br>
      <img src="Screenshot%202026-10-19%20220649.png" alt="Movie details and recommendations" width="100%">
    </td>
  </tr>
</table>

---
## ✨ Features

- 🔍 Live search suggestions (keyboard arrows and Enter supported)
- 🎯 5 similar movie recommendations for any of ~4,800 movies
- 🖼️ Posters, ratings, year, genres and overview
- 🔁 Click any recommended movie to keep exploring
- 📱 Responsive design for mobile and desktop

## 🧠 How it works

The recommendation engine is built in Python on the TMDB 5000 Movies dataset.

1. **Merge** the movies and credits datasets on the movie title
2. **Extract** genres, keywords, top 3 cast members and the director
3. **Build tags** by combining overview, genres, keywords, cast and crew
4. **Clean** the text: lowercase, remove spaces from names (so "Sam Worthington" stays one token) and apply stemming
5. **Vectorize** the tags with `CountVectorizer` (5,000 features, English stop words removed)
6. **Compute similarity** between all movies using cosine similarity
7. **Precompute** the top 5 recommendations for each movie and export them to `movies.json`

The website reads this JSON file, so it needs no backend or server.

## 🛠️ Tech stack

| Part | Tools |
|------|-------|
| Data and ML | Python, pandas, NumPy, scikit-learn, NLTK |
| Frontend | HTML, CSS, JavaScript |
| Posters and metadata | TMDB API |
| Hosting | GitHub Pages |

## 📁 Project structure

```
cinematch/
├── index.html        # page structure
├── style.css         # design and layout
├── script.js         # search, suggestions and rendering
├── movies.json       # movie data and recommendations
└── screenshots/      # images used in this README
```

## 🚀 Run locally

```bash
git clone https://github.com/Nidhiyadavanshii/cinematch.git
cd cinematch
python -m http.server 8000
```

Open `http://localhost:8000` in your browser. Opening `index.html` directly will not work, because the browser blocks loading `movies.json` from a file.

## 📊 Dataset

[TMDB 5000 Movie Dataset](https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata) from Kaggle.

## 🔮 Future improvements

- Genre filters
- Hybrid recommendations using ratings
- Movie trailers
- Light/dark mode

## 🙏 Acknowledgements

This product uses the TMDB API but is not endorsed or certified by [TMDB](https://www.themoviedb.org/).

## 👩‍💻 Author

**Nidhi Yadav**: [GitHub](https://github.com/Nidhiyadavanshii)

⭐ If you liked this project, please give it a star!
