import React, { Component } from 'react';
import './App.css';

import BookmarkApp from './BookmarkApp/BookmarkApp';
import AddBookmark from './AddBookmark/AddBookmark';
import AddBookmarkError from './AddBookmark/AddBookmarkError';

/* const bookmarks = [
  {
  title:"Google",
  url:"com", 
  rating:1, 
  description:"No evil"
  },
  {
    title:"Google",
    url:"http://www.google.com", 
    rating:3, 
    description:"No evil"
  }
]; */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      showAddForm: false
    };
  }

  componentDidMount() {
    const url = 'https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
    const options = {
      method: 'GET',
      headers: {
        "Authorization": "Bearer $2a$10$Zz0zX1.AOFW5VgAcPZW2Megj3xdarWoMGYOZUfmZcyeimbLRC54ca",
        "Content-Type": "application/json"
      }
    }
  
    fetch(url, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          bookmarks: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  };

  setShowAddForm(show) {
    this.setState({
      showAddForm: show
    });
  }

  addBookmark(bookmark) {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
      showAddForm: false
    })
  }
  
  render() {
    const error = this.state.error
      ? <div className="error">{this.state.error}</div>
      : "";

    const page = this.state.showAddForm 
      ? <AddBookmarkError>
          <AddBookmark showForm={show => this.setShowAddForm(show)} handleAdd={bookmark => this.addBookmark(bookmark)} />
        </AddBookmarkError>
      : <BookmarkApp bookmarks={this.state.bookmarks} showForm={show => this.setShowAddForm(show)} />;

    return (
      <div className="App">
        { error }
        { page }
      </div>
    );
  }
}

export default App;
