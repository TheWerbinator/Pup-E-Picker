import { useState } from "react";
import { dogPictures } from "../assets/dog-pictures";

export const CreateDogForm = ({ addDog }) => {
  const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        addDog(e)
        for(let i = 0; i < 2; i++){
          e.target[i].value = ''
        }
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input type="text" />
      <label htmlFor="description">Dog Description</label>
      <textarea name="" id="" cols="80" rows="10"></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        onChange={(e) => {
          setSelectedImage(e.target.value);
        }}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return <option value={pictureValue} key={label}>{label}</option>;
        })}
      </select>
      <img src={selectedImage} alt="" />
      <input type="submit" value="submit" />
    </form>
  );
};
