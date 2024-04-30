import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ForLazyLoaderImg, scrollTop } from '../AllFunctions'
var lazyloaded = false

export default function LatestPopularNews() {
    const [state, setState] = useState([])
    const [state2, setState2] = useState([])
    useEffect(() => {
        setTimeout(function () {
            lazyloaded = false
            ForLazyLoaderImg(lazyloaded)
        }, 1000);
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateLatest.json`)
            .then(({ data }) => {
                if (data.data.length > 0) {
                    setState(data.data);
                }
            });
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generatePopular.json`)
            .then(({ data }) => {
                if (data.data.length > 0) {
                    setState2(data.data);
                }
            });
    }, [])
    return (
        <section className="DLPSTab2">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-bs-toggle="tab" role="tab"
                                aria-selected="true" href="#tabs-1">সর্বশেষ</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" role="tab" aria-selected="false"
                                href="#tabs-2">পাঠকপ্রিয়</a>
                        </li>
                    </ul>
                </div>
                <div className="panel-body PanelHeight">
                    <div className="tab-content">
                        <div className="tab-pane active" id="tabs-1" role="tabpanel">
                            <div className="DLatestNews">
                                <ul>
                                    {state.map((nc) => {
                                        return (
                                            <li key={nc.ContentID}>
                                                <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                                    <p>
                                                        <span className="OuterBorder">
                                                            <i className="fa-solid fa-angles-right"></i></span>
                                                        {nc.ContentHeading}
                                                    </p>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="tab-pane" id="tabs-2" role="tabpanel">
                            <div className="DLatestNews">
                                <ul>
                                    {state2.map((nc) => {
                                        return (
                                            <li key={nc.ContentID}>
                                                <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                                    <p>
                                                        <span className="OuterBorder">
                                                            <i className="fa-solid fa-angles-right"></i></span>
                                                        {nc.ContentHeading}
                                                    </p>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="allnews"><Link to="/archives" onClick={scrollTop}>সব খবর <i className="fa-solid fa-angles-right"></i></Link>
            </div>
        </section>
    )
}
