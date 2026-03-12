# 🎬 Salesforce Movie Search App (LWC)

A **Salesforce Lightning Web Components (LWC)** project that integrates with an external API to search and display movie information.

This application allows users to search for **Movies or Series**, view results in a responsive grid layout, and see detailed movie information including ratings, plot, actors, and trailers.

---

# 📌 Features

- Search movies and series using **OMDb API**
- Filter results by:
  - Movie
  - Series
- Pagination support
- Responsive movie poster grid
- Detailed movie information view
- Watch trailer button (YouTube search)
- Lightning Message Service communication between components
- Intro animation screen
- Modern responsive UI

---

# 🏗️ Tech Stack

- Salesforce Lightning Web Components (LWC)
- Lightning Message Service
- OMDb Movie API
- HTML
- CSS
- JavaScript

---

# 📂 Project Structure

```
lwc/
│
├── movieSearch
│   ├── movieSearch.html
│   ├── movieSearch.js
│   ├── movieSearch.css
│
├── displayPage
│   ├── displayPage.html
│   ├── displayPage.js
│   ├── displayPage.css
│
├── movieDetail
│   ├── movieDetail.html
│   ├── movieDetail.js
│   ├── movieDetail.css
│
messageChannels/
│
└── movieChannel__c.messageChannel-meta.xml
```

---

# 🎬 Application Flow

1. User enters a movie or series name in the search bar.
2. The application sends a request to the **OMDb API**.
3. Search results are displayed as movie cards with posters.
4. Clicking on a movie card sends the **movie ID** through **Lightning Message Service**.
5. The Movie Detail component receives the message.
6. It fetches full movie details from the API.
7. Movie information is displayed including:
   - Poster
   - Title
   - Year
   - Rating
   - Genre
   - Actors
   - Plot
8. Clicking **Watch Trailer** opens a YouTube search for the movie trailer.

---

# 🔗 API Used

## OMDb API

```
https://www.omdbapi.com/
```

Used for:

- Movie search
- Movie details
- Poster images

---

# ⚙️ Salesforce Features Used

- Lightning Web Components
- Lightning Message Service
- Custom Message Channel
- Static Resources
- Component Communication

---

# 🖥️ UI Features

- Intro animation screen
- Responsive movie grid layout
- Hover animation for movie cards
- Poster zoom effect
- Styled Lightning inputs
- Dark themed interface

---

# 📚 Learning Outcomes

This project demonstrates:

- External API integration in Lightning Web Components
- Component communication using Lightning Message Service
- Building responsive UI in Salesforce
- Real-time API data fetching using JavaScript
- Modern UI animation and styling

---

# 👩‍💻 Author

**Arpita Pati**

Salesforce Developer  
Focused on **LWC, Apex, Integration, and UI Development**

---

# ⭐ If you like this project

Give it a **Star ⭐ on GitHub**
