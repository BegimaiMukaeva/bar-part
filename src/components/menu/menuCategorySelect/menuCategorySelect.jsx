import React from 'react';
import styles from './MenuCategorySelect.module.css';

const MenuCategorySelect = ({ categories, category, setCategory , selectedCategoryId, handleCategoryChange }) => {
  return (
     <div className={styles.main}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategoryChange(cat.id)}
          className={selectedCategoryId === cat.id ? styles.buttonActive : styles.button}
        >
          <img src={selectedCategoryId === cat.id ? cat.activeIcon : cat.icon} alt={cat.name} />
          <p>{cat.name}</p>
        </button>
      ))}
    </div>
  );
};

export default MenuCategorySelect;
