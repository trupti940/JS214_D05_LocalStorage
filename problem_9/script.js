document.addEventListener("DOMContentLoaded", function() {
    const songForm = document.getElementById("songForm");
    const playlist = document.getElementById("playlist");
    const search = document.getElementById("search");
    const filterGenre = document.getElementById("filterGenre");
  
    let songs = JSON.parse(localStorage.getItem("songs")) || [];
    let currentEditIndex = null;
  
    function saveToLocalStorage() {
      localStorage.setItem("songs", JSON.stringify(songs));
    }
  
    function renderPlaylist() {
      playlist.innerHTML = "";
      const filteredSongs = songs.filter(song => {
        const searchText = search.value.toLowerCase();
        const genreFilter = filterGenre.value;
        return (
          (song.title.toLowerCase().includes(searchText) || song.artist.toLowerCase().includes(searchText)) &&
          (!genreFilter || song.genre === genreFilter)
        );
      });
      filteredSongs.forEach((song, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${song.title} - ${song.artist} (${song.duration}) [${song.genre}]</span>
          <span>
            <button onclick="editSong(${index})">Edit</button>
            <button onclick="deleteSong(${index})">Delete</button>
          </span>
        `;
        playlist.appendChild(li);
      });
      updateGenreFilter();
    }
  
    function updateGenreFilter() {
      const genres = Array.from(new Set(songs.map(song => song.genre)));
      filterGenre.innerHTML = `<option value="">Filter by Genre</option>`;
      genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        filterGenre.appendChild(option);
      });
    }
  
    songForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const title = document.getElementById("title").value;
      const artist = document.getElementById("artist").value;
      const duration = document.getElementById("duration").value;
      const genre = document.getElementById("genre").value;
      
      if (currentEditIndex !== null) {
        songs[currentEditIndex] = { title, artist, duration, genre };
        currentEditIndex = null;
        document.getElementById("addSongBtn").style.display = "block";
        document.getElementById("editSongBtn").style.display = "none";
      } else {
        songs.push({ title, artist, duration, genre });
      }
      
      saveToLocalStorage();
      renderPlaylist();
      songForm.reset();
    });
  
    document.getElementById("sortTitle").addEventListener("click", function() {
      songs.sort((a, b) => a.title.localeCompare(b.title));
      renderPlaylist();
    });
  
    document.getElementById("sortArtist").addEventListener("click", function() {
      songs.sort((a, b) => a.artist.localeCompare(b.artist));
      renderPlaylist();
    });
  
    document.getElementById("sortDuration").addEventListener("click", function() {
      songs.sort((a, b) => a.duration.localeCompare(b.duration));
      renderPlaylist();
    });
  
    document.getElementById("sortGenre").addEventListener("click", function() {
      songs.sort((a, b) => a.genre.localeCompare(b.genre));
      renderPlaylist();
    });
  
    search.addEventListener("input", renderPlaylist);
    filterGenre.addEventListener("change", renderPlaylist);
  
    window.editSong = function(index) {
      const song = songs[index];
      document.getElementById("title").value = song.title;
      document.getElementById("artist").value = song.artist;
      document.getElementById("duration").value = song.duration;
      document.getElementById("genre").value = song.genre;
      currentEditIndex = index;
      document.getElementById("addSongBtn").style.display = "none";
      document.getElementById("editSongBtn").style.display = "block";
    };
  
    window.deleteSong = function(index) {
      songs.splice(index, 1);
      saveToLocalStorage();
      renderPlaylist();
    };
  
    renderPlaylist();
  });
  