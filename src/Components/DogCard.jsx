import { useState } from "react";
import { FavoriteButton } from "./FavoriteButton";
import { TrashButton } from "./TrashButton";
import { UnfavoriteButton } from "./UnfavoriteButton";
export const DogCard = ({
  dog,
  handleFavorites,
  trashed
}) => {

  let { name, image, description, id, isFavorite } = dog;
  const [favClassName, setFavClassName] = useState('favorite-overlay');
  const [unfavClassName, setUnfavClassName] = useState('unfavorite-overlay');

  const handleFavs = (type) => {
    if(type === 'fav') {
      setFavClassName('favorite-overlay active');
      setTimeout(() => {
        setFavClassName('favorite-overlay');
        handleFavorites(type, id)
      }, 2500);
    } else {
      setUnfavClassName('unfavorite-overlay active');
      setTimeout(() => {
        setUnfavClassName('unfavorite-overlay');
        handleFavorites(type, id)
      }, 2500);
    }
  }

  const handleTrash = () => {
    trashed(id)
  }
 
  return (
    <div className="dog-card">
      {isFavorite ? (
        <UnfavoriteButton onClick={() => handleFavs('unfav')} favClassName={favClassName}/>
      ) : (
        <FavoriteButton onClick={() => handleFavs('fav')} favClassName={favClassName}/>
      )}

      <TrashButton onClick={() => handleTrash()} />

      <div className={favClassName}>{"<3"}</div>
      <div className={unfavClassName}>{"</3"}</div>

      <p className="dog-name">{name}</p>
      <img src={image} alt={name} />
      <p className="dog-description">{description}</p>
    </div>
  );
};
