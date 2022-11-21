import React from 'react'
import Navbar from '../components/Navbar'
import bgvideo from '../components/bgvideo.mp4'

function Story() {
    return (

        <div>
            <Navbar />
            <div>

                <video autoPlay loop

                    style={{
                        position: "absolute",
                        width: "100%",
                        left: "50%",
                        top: "50%",
                        height: "100%",
                        objectFit: "cover",
                        transform: "translate(-50%, -50%)",
                        zIndex: "-1"

                    }}


                    src={bgvideo} type="video/mp4">

                </video>
            </div>
            <div className="content"

                style={{
                    position: "absolute",
                    width: "100%",
                    height: "50%",
                    top: "30%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white"


                }}
            >
                <h1>WELCOME TO FOODSPOT</h1>
            </div>

        </div>

    )
}

export default Story