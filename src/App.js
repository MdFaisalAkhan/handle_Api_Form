import React, { useState } from 'react';
import './App.css';

function App() {
  const [newSelectedFiles, setNewSelectedFiles] = useState();
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    subtitle: "",
    description: "",
  });

  const formSubmit = async (e) => {
    e.preventDefault(); 
    const {title, thumbnail, subtitle, description} = formData;
    const data = new FormData()
    data.append("title", title)
    data.append("thumbnail", thumbnail)
    data.append("subtitle", subtitle)
    data.append("description", description)
    data.append("video", newSelectedFiles)
    data.append("userId", "6213264dca6f61720e4fe376")
    fetch("https://3.19.221.49/api/v1/about-me/achievement/create-new-achievement", {
      method: "POST",
      headers : {
        "Authorization" : "",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)

    }).then(res=>res.json())
    .then(result=>{
      console.log(result);
    })

  }

  const onFileChange = event => {
    setNewSelectedFiles(event.target.files[0]);
  };
  

  const InputEvent = (event) => {
    const { name, value } = event.target;
    setFormData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  return (
    <div className="App">
      <form onSubmit={formSubmit}>
        <label>Title</label>
        <input 
          type="text"
          name="title"
          value={formData.title}
          onChange={InputEvent}
          required
        />
        <label>Thumbnail</label>
        <input 
          type="text"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={InputEvent}
          required
        />
        <label>Subtitle</label>
        <input 
          type="text"
          name="subtitle"
          value={formData.subtitle}
          onChange={InputEvent}
          required
        />
        <label>Description</label>
        <input 
          type="text"
          name="description"
          value={formData.description}
          onChange={InputEvent}
          required
        />
        <label htmlFor="firstimg">
        Video
    </label>
    <input
      type="file"
      name="file"
      onChange={onFileChange}
      accept="video/mp4,video/x-m4v,video/*"
      id="firstimg"
      style={{ display: 'none', visibility: 'none' }}
    />
    <span style={{ marginLeft: '8px' }}>Attach file</span>
      </form>
      <button onClick={formSubmit}>go</button>
    </div>
  );
}

export default App;
