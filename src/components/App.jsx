import { Searchbar } from './Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PixabayAPI from '../api/pixabay-api.js';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from 'App.module.css';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

const pixabayAPI = new PixabayAPI();

export const App = () => {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }
    pixabayAPI.resetPage();
    pixabayAPI.query = query;
    setHits([]);
    setShowButton(false);
    setLoading(true);

    pixabayAPI
      .fetchImages()
      .then(({ data: { hits, totalHits } }) => {
        if (hits.length < 1) {
          toast.error('По вашому запиту нічого не знайдено');
          setLoading(false);
          return;
        }
        toast.success(`по вашому запиту знайдено ${totalHits} картинок`);
        if (hits.length >= pixabayAPI.per_page) {
          setShowButton(true);
        }
        pixabayAPI.changePage();
        setHits(hits);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, [query]);

  const onSubmit = query => {
    setQuery(query);
  };

  const loadMore = () => {
    setShowButton(false);
    setLoading(true);
    pixabayAPI
      .fetchImages()
      .then(({ data: { hits } }) => {
        if (hits.length < pixabayAPI.per_page) {
          toast.warn('кінець...');
          setShowButton(false);
        }
        setHits(prev => [...prev, ...hits]);
        setShowButton(true);
        setLoading(false);
        pixabayAPI.changePage();
      })
      .catch(error => console.log(error));
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery data={hits} />
      <></>
      {showButton && <Button loadMore={loadMore} />}
      {loading && <Loader />}
      <ToastContainer autoClose={3000} />
    </div>
  );
};
