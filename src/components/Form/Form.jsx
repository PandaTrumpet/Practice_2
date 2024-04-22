import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import style from './Form.module.css';
export const Form = ({ onSubmit }) => {
  const [query, setQuery] = useState(' ');
  const handleChenge = event => {
    setQuery(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (!query.trim()) {
      return alert('Enter the text');
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>

      <input
        onChange={handleChenge}
        value={query}
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
      />
    </form>
  );
};
