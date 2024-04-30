import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { scrollTop} from '../AllFunctions'
import { Link } from 'react-router-dom';

export default function LeadLatestNews() {
    const [latest, setLatest] = useState([])
    const [popular, setPopular] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateLatest.json`)
            .then(({ data }) => {
                if (data.data.length > 0) {
                    setLatest(data.data.slice(0, 10))
                }
            })
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generatePopular.json`)
            .then(({ data }) => {
                setPopular(data.data)
            })
    }, [])

    return (
        <>
            <section className="DLPSTab2">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-bs-toggle="tab" href="#tabs-1" role="tab" aria-selected="true">সর্বশেষ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-bs-toggle="tab" href="#tabs-2" role="tab" aria-selected="false">জনপ্রিয়</a>
                            </li>
                        </ul>
                    </div>
                    <div className="panel-body PanelHeight">
                        <div className="tab-content">
                            <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                <div className="DLatestNews longEnough mCustomScrollbar" data-mcs-theme="dark">
                                        {latest.map((nc, i) => {
                                            return (
                                                <div className="DLatestNewsList" key={nc.ContentID}>
                                                    <a href={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                                        <div className="d-flex flex-row">
                                                            <p>{nc.ContentHeading}</p>
                                                        </div>
                                                    </a>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                            <div className="tab-pane" id="tabs-2" role="tabpanel">
                                <div className="DLatestNews longEnough mCustomScrollbar" data-mcs-theme="dark">

                                {popular.map((nc, i) => {
                                return (
                                    <div className="DLatestNewsList" key={nc.ContentID}>
                                        <a href={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                            <div className="d-flex flex-row">
                                                <p>{nc.ContentHeading}</p>
                                            </div>
                                        </a>
                                    </div>
                                )}
                            )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="allnews"><Link to="/archives">সব খবর <i className="fa fa-angle-double-right"></i></Link></div>
            </section>

        </>

    )
}
