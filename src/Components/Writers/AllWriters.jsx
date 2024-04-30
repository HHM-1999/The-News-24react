import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { scrollTop } from '../AllFunctions'

export default function AllWriters() {
    let { all_writers } = useParams();
    const [allWriter, setAllWriter] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}writers`)
            .then(({ data }) => {
                setAllWriter(data.writers);
            });
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        return () => clearTimeout(timer);
    }, [all_writers])

    return (
        <main>
            <div className="container">
                <div className="TopHomeSection"></div>
                <DocumentTitle title='দ্য নিউজ ২৪ :: লেখক সমূহ' />
                <h2 className="DTitle">
                    <Link to={+ '/'} onClick={scrollTop}>
                        <span className="DTitleInner"><span className="DTitleInnerBar"><span>লেখক সমূহ</span></span></span>
                    </Link>
                </h2>
                <div className="DTagListArea mb-5">
                    <ul className="row">
                        {allWriter.map((nc) => {
                            return (
                                <li className="col-lg-4 col-sm-6 col-12" key={nc.WriterID}>
                                    <div className="DTagListItem">
                                        <Link to={"/writers/" + nc.Slug}>
                                            <div className="Desc">
                                                <h2 className="Title">{nc.WriterName} || <span>{nc.WriterNameEn}</span></h2>
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </main>
    )
}
