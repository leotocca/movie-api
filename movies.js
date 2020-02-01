class Movies {
  constructor() {
    this.movies = [];
  }

  add(movie) {
    if (!this.checkIfExists(movie)) {
      if (this.movies.length === 0) {
        movie.id = 1;
        this.movies.push(movie);
        console.log("Movie succesfully added");
      } else {
        movie.id = this.movies[this.movies.length - 1].id + 1;
        this.movies.push(movie);
        console.log("Movie succesfully added");
      }
      return true;
    } else {
      return false;
    }
  }

  checkIfExists(movie) {
    if (movie !== false) {
      let existingTitles = this.movies.map(x => x.title);
      if (existingTitles.includes(movie.title)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  findByID(id) {
    const existingIDs = this.movies.map(x => x.id);
    if (existingIDs.includes(Number(id))) {
      const indexOfID = existingIDs.indexOf(Number(id));
      return this.movies[indexOfID];
    } else {
      return false;
    }
  }

  update(dataToUpdate, ID) {
    const movieToUpdate = this.findByID(ID);
    movieToUpdate.title = dataToUpdate.title;
    movieToUpdate.year = dataToUpdate.year;
    console.log(`The movie ID ${movieToUpdate.id} got correctly updated`);
    return this.findByID(ID);
  }

  delete(ID) {
    const existingIDs = this.movies.map(x => x.id);
    if (existingIDs.includes(ID)) {
      const indexOfID = existingIDs.indexOf(ID);
      if (indexOfID === existingIDs.length - 1) {
        this.movies.pop();
      } else {
        let firstPartArr = this.movies.slice(0, indexOfID);
        let lastPartArr = this.movies.slice(indexOfID + 1, this.movies.length);
        this.movies = firstPartArr.concat(lastPartArr);
        console.log(this.movies);
      }
    }
  }

  listByYear() {
    const set = new Set();
    const listByYear = [];
    this.movies.forEach(movie => {
      set.add(movie.year);
    });
    set.forEach(year => {
      listByYear.push(year);
    });
    return listByYear.sort();
  }

  listByGenre() {
    const set = new Set();
    const listByGenre = [];
    this.movies.forEach(movie => {
      set.add(movie.genre);
    });
    set.forEach(genre => {
      listByGenre.push(genre);
    });
    return listByGenre.sort();
  }

  sortBy(criteria) {
    return this.movies.sort(function(a, b) {
      if (a.criteria > b.criteria) {
        return 1;
      }
      if (a.criteria < b.criteria) {
        return -1;
      }
      return 0;
    });
  }
}

module.exports = Movies;
