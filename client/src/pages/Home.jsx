import React from "react";
import "./Home.css";
import Navbar from "../components/Navbar"

function Page() {
    return (
        <>

            <div>
                {/* <h1 className="heading">FOODSPOT</h1> */}
                <Navbar />
                <div className="container">
                    <div className="box1">
                        <div className="textBox">
                            <h1 style={{ fontWeight: 700, color: 'white' }}>Did you know?</h1>
                            <p>
                                In the 2021 Global Hunger Index,India ranks 101st out of the 116 countries.
                            </p>

                            <p>
                                According to UNEP, Indians waste about 40% of their food.
                                Foodspot aims to provide plaform to reduce food wastage in Hostels by supplying excess food to NGOs.
                                Food enables hostel authorities get in touch  with NGOs and communicate easily
                            </p>
                        </div>

                        <img
                            src="https://images.unsplash.com/photo-1620191809417-deb98871c8b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fGh1bmdyeSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                            className="img-1" alt="" width="500px"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
