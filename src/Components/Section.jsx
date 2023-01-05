import { useState } from "react";

export const Section = ({ 
  label, 
  children, 
  favoriteDogCount, 
  unfavoriteDogCount, 
  setFavActive, 
  setCreateDogActive }) => {
  const [favClass, setFavClass] = useState('selector');
  const [unfavClass, setUnfavClass] = useState('selector active');
  const [createClass, setCreateClass] = useState('selector');

  const handleSelected = (type) => {
    console.log('handleSelected ran, type', type);
    switch (type) {
      case 'fav':
        setCreateDogActive(false)
        setFavActive(true)
        setFavClass('selector active')
        setUnfavClass('selector')
        setCreateClass('selector')
        break;
    
      case 'unfav':
        setCreateDogActive(false)
        setFavActive(false)
        setFavClass('selector')
        setUnfavClass('selector active')
        setCreateClass('selector')
        break;
    
      case 'create':
        setCreateDogActive(true)
        setFavClass('selector')
        setUnfavClass('selector')
        setCreateClass('selector active')
        break;
    
      default:
        break;
    }
  }

  return (
    <section>
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* Add the class 'active' to any selector in order to make it's color change */}
          {/* This should display the favorited count */}
          <div className={favClass} onClick={() => handleSelected('fav')}>favorited ( {favoriteDogCount} )</div>

          {/* This should display the unfavorited count */}
          <div className={unfavClass} onClick={() => handleSelected('unfav')}>unfavorited ( {unfavoriteDogCount} )</div>
          <div className={createClass} onClick={() => handleSelected('create')}>create dog</div>
        </div>
      </div>
      {children}
    </section>
  );
};
