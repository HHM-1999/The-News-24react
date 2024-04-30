import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { scrollTop } from './AllFunctions'
import { toBengaliNumber } from 'bengali-number'
import LeadLatestNews from './HomeContent/LeadLatestNews'

export default function OnlinePollDetails() {
    const [pollResult, setPollResult] = useState([])
    useEffect(() => {
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        axios
            .get(`${process.env.REACT_APP_API_URL}poll-result`)
            .then(({ data }) => {
                if (data.poll_result) {
                    setPollResult(data.poll_result)
                }
            })
        const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        return () => clearTimeout(timer);
    }, [])

    return (
        <main>
            <div className="container">
                <div className="TopHomeSection"></div>
                <DocumentTitle title='দ্য নিউজ ২৪ :: অনলাইন জরিপ' />
                <h2 className="DTitle"><Link to="/pollresult" onClick={scrollTop}><span className="DTitleInner"><span className="DTitleInnerBar"><span>অনলাইন জরিপ</span></span></span></Link></h2>

                <div className="row mt-5">
                    <div className="col-lg-9 col-sm-12 border-right-inner1">
                        <div className="row">
                            <div className="col-sm-12">

                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '70%' }}>প্রশ্ন</th>
                                            <th>হ্যাঁ</th>
                                            <th>না</th>
                                            <th>মন্তব্য নেই</th>
                                        </tr>
                                    </thead>
                                    {pollResult.map((nc, i) => {
                                        return (
                                            <React.Fragment key={nc.PollID}>
                                                <tbody>
                                                    <tr>
                                                        <td>{nc.QuestionBn}</td>
                                                        <td>{toBengaliNumber(nc.Yes)}</td>
                                                        <td>{toBengaliNumber(nc.No)}</td>
                                                        <td>{toBengaliNumber(nc.NoComments)}</td>
                                                    </tr>
                                                </tbody>
                                            </React.Fragment>
                                        )
                                    })}
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-12 mb-5">
                        {/* <LatestPopularNews /> */}
                        <LeadLatestNews />
                    </div>
                </div>
            </div>
        </main >
    )
}
