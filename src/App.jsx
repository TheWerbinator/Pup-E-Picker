import { useState, useEffect } from "react";
import "./App.css";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import "./fonts/RubikBubbles-Regular.ttf";

function App() {
  const [dogs, setDogs] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [favActive, setFavActive] = useState(false);
  
  const [favoriteDogCount, setFavoriteDogCount] = useState(0);
  const [unfavoriteDogCount, setUnfavoriteDogCount] = useState(0);

  const [createDogActive, setCreateDogActive] = useState(false);

  const activeDogs = dogs.filter((dog) => {
    if(favActive === true && isActive === true){
      return dog.isFavorite
    } else if (favActive === false && isActive === true) {
      return !dog.isFavorite
    } else return dog
  })

  const fetchDogs = async (url) => {
    try {
      const response = await fetch(url)
      const jsonResponse = await response.json()
      return jsonResponse;
    } catch (error) {
      console.error(error);
    }
  }

  const initDogFavCount = (doges) => {
    const favoritesCount = doges.filter((dog) => {
      return dog.isFavorite
    });
    setFavoriteDogCount(favoritesCount.length)
    setUnfavoriteDogCount(doges.length - favoritesCount.length)
  }
  
  useEffect(() => {
    fetchDogs('http://localhost:3000/dogs').then(result => {
      setDogs(result);
      initDogFavCount(result);
    });
  }, []);

  const handleFavorites = (type, index) => {
    if(type === 'fav') {
      dogs[index].isFavorite = true
      setFavoriteDogCount(favoriteDogCount + 1)
      setUnfavoriteDogCount(unfavoriteDogCount - 1)
    } else {
      dogs[index].isFavorite = false
      setFavoriteDogCount(favoriteDogCount - 1)
      setUnfavoriteDogCount(unfavoriteDogCount + 1)
    }
    uploadFavorites(dogs[index].isFavorite, index);
  }

  const uploadFavorites = async (type, index) => {
    try {
      await fetch(`http://localhost:3000/dogs/${index}`, { 
        method: 'PATCH', 
        body: JSON.stringify({
          isFavorite: type
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    } catch (error) {
      console.error(error);
    }
  }

  const addDog = async (newDog) => {
    const newestAddition = {
      name: newDog.target[0].value,
      image: newDog.target[2].value,
      description: newDog.target[1].value,
      isFavorite: false,
      id: (dogs.length)
    }
    try {
      await fetch(`http://localhost:3000/dogs`, { 
        method: 'POST', 
        body: JSON.stringify(newestAddition),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    } catch (error) {
      console.error(error);
    }
  }

  const removeDog = async (id) => {
    try {
      await fetch(`http://localhost:3000/dogs/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    } catch (error) {
      console.error(error);
    }
    fetchDogs('http://localhost:3000/dogs').then(result => {
      setDogs(result);
      initDogFavCount(result);
    });
  }

  return (
    <div className="App">
      <header>
        <h1>pup-e-picker</h1>
      </header>
      <Section 
        isActive={isActive}
        setIsActive={(type) => setIsActive(type)}
        createDogActive={createDogActive}
        setCreateDogActive={(type) => setCreateDogActive(type)} 
        favActive={favActive}
        setFavActive={(type) => setFavActive(type)} 
        label={"Dogs: "} 
        favoriteDogCount={favoriteDogCount} 
        unfavoriteDogCount={unfavoriteDogCount}>
      {!createDogActive ? 
      <Dogs 
        handleFavorites={handleFavorites} 
        dogs={activeDogs} 
        trashed={removeDog} />
      : <CreateDogForm addDog={addDog}/>}
      </Section>
    </div>
  );
}

export default App;
