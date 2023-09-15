import Searchbar from './Searchbar/Searchbar';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PixabayAPI from '../api/pixabay-api.js';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from 'App.module.css';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

const pixabayAPI = new PixabayAPI();

export class App extends Component {
  state = {
    query: '',
    hits: [],
    loading: false,
    showButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      pixabayAPI.resetPage();
      pixabayAPI.query = this.state.query;
      this.setState({ hits: [], showButton: false, loading: true });

      pixabayAPI
        .fetchImages()
        .then(({ data: { hits, totalHits } }) => {
          if (hits.length < 1) {
            toast.error('По вашому запиту нічого не знайдено');
            this.setState({ loading: false });
            return;
          }
          toast.success(`по вашому запиту знайдено ${totalHits} картинок`);
          if (hits.length >= pixabayAPI.per_page) {
            this.setState({ showButton: true });
          }
          pixabayAPI.changePage();
          return this.setState({ hits, loading: false });
        })
        .catch(error => console.log(error));
    }
  }

  onSubmit = query => {
    this.setState({
      query,
    });
  };

  loadMore = () => {
    this.setState({ showButton: false, loading: true });
    pixabayAPI
      .fetchImages()
      .then(({ data: { hits } }) => {
        if (hits.length < pixabayAPI.per_page) {
          toast.warn('кінець...');
          this.setState({ showButton: false });
        }
        this.setState(
          prevState => ({
            hits: [...prevState.hits, ...hits],
            showButton: true,
            loading: false,
          }),
          pixabayAPI.changePage()
        );
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery data={this.state.hits} toggleModal={this.toggleModal} />
        <></>
        {this.state.showButton && <Button loadMore={this.loadMore} />}
        {this.state.loading && <Loader />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
