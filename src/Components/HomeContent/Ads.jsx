import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
import LeadTopSlider from './LeadTopSlider'
var lazyloaded = false
export default function Ads() {
    // const [state, setState] = useState([])
    // const [state2, setState2] = useState([])
    // const [state3, setState3] = useState([])
    // useEffect(() => {
    //     axios
    //         .get(`${process.env.REACT_APP_API_URL}json/file/generateSpecial1.json`)
    //         .then(({ data }) => {
    //             if (data.data.length > 0) {
    //                 setState(data.data[0]);
    //                 setState2(data.data.slice(1, 3));
    //                 // setState2(data.data[1]);
    //                 setState3(data.data.slice(3, 10));
    //                 setTimeout(function () {
    //                     lazyloaded = false
    //                     ForLazyLoaderImg(lazyloaded)
    //                 }, 1000);
    //             }
    //         });
    // }, [])

    return (
        <>
            <section className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="DAdd2 d-flex  justify-content-center">
                            <a href="">
                                <img src={"media/Advertisement/14165229894826068925.jpg"} alt="Header Advertisement" title="Header Advertisement" className="img-fluid img100" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}
