export const Section = ({ 
  label, 
  children, 
  favoriteDogCount, 
  unfavoriteDogCount,
  favActive, 
  setFavActive, 
  createDogActive,
  setCreateDogActive,
  isActive,
  setIsActive
}) => {
  const favClass = favActive === true && isActive === true ? 'selector active' : 'selector';
  const unfavClass = favActive === false && isActive === true ? 'selector active' : 'selector';
  const createClass = createDogActive === true && isActive === false ? 'selector active' : 'selector';

  const handleSelected = (type) => {
    switch (type) {
      case 'fav':
        setCreateDogActive(false)
        if(favActive === false) {
          setFavActive(true)
          setIsActive(true);
        } else {
          setIsActive(false);
        }
        break;
    
      case 'unfav':
        setCreateDogActive(false)
        if(favActive === false) {
          setIsActive(false);
        } else {
          setIsActive(true);
          setFavActive(false);
        }
        break;

      case 'create':
        setIsActive(false);
        if(createDogActive === false) {
          setCreateDogActive(true);
        } else {
          setCreateDogActive(false);
        }
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
          <div className={favClass} onClick={() => handleSelected('fav')}>favorited ( {favoriteDogCount} )</div>
          <div className={unfavClass} onClick={() => handleSelected('unfav')}>unfavorited ( {unfavoriteDogCount} )</div>
          <div className={createClass} onClick={() => handleSelected('create')}>create dog</div>
        </div>
      </div>
      {children}
    </section>
  );
};
