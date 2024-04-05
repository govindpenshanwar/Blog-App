import axios from 'axios';
import React, {  useState } from 'react'

function ImageUpload() {
    const[file,setFile] = useState(null);
  
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }
    const handleUpload = async() => {
        try {
            const formData = new FormData();
            formData.append('imgUpload' , file);

            const response = await axios.post('http://localhost:4000/uploadImg' , formData);
            console.log(response.data);
            
        } catch (error) {
            console.error("Error at imageUpload:" , error);
        }
    }
  return (
    <>
    
    <div className='flex flex-col'>
      <h1>Upload Image Here</h1>
      {file ? <img src={URL.createObjectURL(file)} alt='image1' /> : 'Image is Loading'}
      <label htmlFor="file">Upload:</label>
      <input type="file" name='imgUpload' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
    </>
  )
}

export default ImageUpload
