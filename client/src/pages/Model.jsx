import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Model() {

    const [imageSelected, setImageSelected] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [fruit_dict, setFruit_dict] = useState({});
    const [result, setResult] = useState('');

    useEffect(() => {
        setResult('')
    }, [imageSelected])



    const uploadImage = () => {
        const formData = new FormData()
        formData.append("file", imageSelected)
        axios.post('http://127.0.0.1:5000/Prediction', formData).then((response) => {
            setImgUrl(response.data.plot_url)
            console.log(response.data.fruit_dict)
            setFruit_dict(response.data.fruit_dict)
            setResult((response.data.rotten[0] < response.data.rotten[1]) ? "Rotten" : "Fresh");
        }
        ).catch((e) => console.log(e))

    }

    return (
        <div style={{ overflow: 'hidden', height: "100vh" }}>
            <Navbar />
            <div className='pred_wrapper'>
                <div className='bg-white p-4' style={{ height: "70vh", width: "60%" }}>
                    <input type="file"
                        onChange={(event) => {
                            // this.onImageChange;
                            setImageSelected(event.target.files[0])
                        }} />
                    <button onClick={uploadImage} style={{
                        background: "black",
                        color: "white",
                        padding: "2px 8px",
                        borderRadius: "5px"
                    }}>Submit</button>
                    {/* <Image cloudName="fidal123" publicId="" /> */}
                    <div>
                        {imageSelected && <img src={URL.createObjectURL(imageSelected)} alt="" width="200px" />
                        }</div>
                    {result && <div>
                        <b> Predicted Result: </b><br />
                        Apple: {fruit_dict.apple} <br />
                        Banana: {fruit_dict.banana}<br />
                        Orange: {fruit_dict.orange}<br /><br />

                        <h3> {result} </h3>  </div>}
                </div>
            </div>
        </div>
    )
}

export default Model;