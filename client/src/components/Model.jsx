import React, { useState } from 'react';
import axios from 'axios';

function Model() {

    const [imageSelected, setImageSelected] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [fruit_dict, setFruit_dict] = useState({});
    const [result, setResult] = useState('');
    const uploadImage = () => {
        const formData = new FormData()
        formData.append("file", imageSelected)
        axios.post('http://127.0.0.1:5000/Prediction', formData).then((response) => {
            setImgUrl(response.data.plot_url)
            // console.log(response.data.plot_url)
            setFruit_dict(response.data.fruit_dict)
            setResult((response.data.rotten[0] < response.data.rotten[1]) ? "Rotten" : "Fresh");
        }
        ).catch((e) => console.log(e))

    }


    return (
        <div>
            <input type="file"
                onChange={(event) => {
                    setImageSelected(event.target.files[0])
                }} />
            <button onClick={uploadImage}>Submit</button>
            {/* <Image cloudName="fidal123" publicId="" /> */}
            <div>
                {/* <img src={URL.createObjectURL(imageSelected)} alt="" width="200px" /> */}
            </div>
            <div>{result}</div>
        </div>
    )
}

export default Model;