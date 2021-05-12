import React, { Component } from 'react';
import './App.scss';
import photoApi from '../../services/photo-api';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Modal from '../Modal/Modal';

class App extends Component {
  state = {
    photos: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    largeUrl: '',
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

  toggleModal = url => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeUrl: url,
    }));
  };

  fetchPhotos = () => {
    const { searchQuery, currentPage } = this.state;
    this.setState({ isLoading: true });
    photoApi
      .getPhotos(searchQuery, currentPage)
      .then(photos => {
        const photosToAdd = photos.map(
          ({ id, webformatURL, largeImageURL }) => ({
            id,
            webformatURL,
            largeImageURL,
          }),
        );
        this.setState(prevState => ({
          photos: [...prevState.photos, ...photosToAdd],
          currentPage: prevState.currentPage + 1,
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { showModal, isLoading, error, largeUrl, photos } = this.state;
    const shouldRenderLoadMoreButton =
      this.state.photos.length > 0 && !this.state.isLoading;
    return (
      <>
        {showModal && <Modal largeUrl={largeUrl} onClose={this.toggleModal} />}
        <div className="App">
          <Searchbar onSubmit={this.onChangeQuery} />
          {error && <p>Whoops, something went wrong: {error.message}</p>}
          <ImageGallery photos={photos} modalHandle={this.toggleModal} />
        </div>
        {isLoading && (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
        {shouldRenderLoadMoreButton && (
          <Button onClickFunc={this.fetchPhotos} />
        )}
      </>
    );
  }
}

export default App;
