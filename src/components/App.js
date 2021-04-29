import React, { Component } from 'react';
import './App.scss';
import photoApi from '../service/photo-api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  //static propTypes = {};

  state = {
    photos: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchPhotos();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      photos: [],
      error: null,
    });
  };

  fetchPhotos = () => {
    const { searchQuery, currentPage } = this.state;
    photoApi.getPhotos(searchQuery, currentPage).then(photos => {
      const photosToAdd = photos.map(item => ({
        id: item.id,
        webformatURL: item.webformatURL,
        largeImageURL: item.largeImageURL,
      }));
      this.setState(prevState => ({
        photos: [...prevState.photos, ...photosToAdd],
        currentPage: prevState.currentPage + 1,
      }));
    });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery photos={this.state.photos} />
      </div>
    );
  }
}

export default App;
