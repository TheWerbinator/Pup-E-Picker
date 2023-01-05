import { DogCard } from "./DogCard";

export const Dogs = ({ dogs, handleFavorites, trashed }) => {
  return (
    <>
      {dogs.length ? dogs.map((dog) => (
        <DogCard dog={dog} key={dog.id} handleFavorites={handleFavorites} trashed={trashed}/>
      )) : null }
    </>
  );
};
