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
  const [isLoading, setIsLoading] = useState(false);
  
  const handleFavs = (type) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      handleFavorites(type, id)
    }, 500);
  }

  const handleTrash = () => {
    trashed(id)
  }
 
  return (
    <div className="dog-card">
      {isFavorite ? (
        <UnfavoriteButton onClick={() => handleFavs('unfav')} />
      ) : (
        <FavoriteButton onClick={() => handleFavs('fav')} />
      )}

      <TrashButton onClick={() => handleTrash()} />

      <div className={`favorite-overlay ${isLoading && !isFavorite ? 'active' : ''}`}>{"<3"}</div>
      <div className={`unfavorite-overlay ${isLoading && isFavorite ? 'active' : ''}`}>{"</3"}</div>

      <p className="dog-name">{name}</p>
      <img src={image} alt={name} />
      <p className="dog-description">{description}</p>
    </div>
  );
};
