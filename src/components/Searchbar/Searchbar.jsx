import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GrSearch } from 'react-icons/gr';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSearch = ({ target }) => {
    this.setState({
      query: target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      return toast.error('Введіть щось нормальне...');
    }
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}></span>
            <GrSearch size={25} />
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleSearch}
          />
        </form>
      </header>
    );
  }
}
