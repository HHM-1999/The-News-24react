import React from 'react'
import LeadNews from './LeadNews'
import LeadLatestNews from './LeadLatestNews'
import SpecialTop1 from './SpecialTop1'
// import SpecialCatBanner from './SpecialCatBanner'
import SpecialTop2 from './SpecialTop2';

export default function LeadNewsSection() {

    return (
        <>
            <div className="TopLeadSection">
                <div className="row">
                    <div className="col-lg-9  ">
                        <div className="row border-bottom-inner">
                            <div className="col-lg-8 col-12">
                                <div className="topNewsSection">
                                    <LeadNews />
                                </div>
                            </div>
                            <div className="col-lg-4 col-12 mt-0">
                                <SpecialTop1 />
                            </div>
                        </div>
                        <div className="row">
                        <div className="col-md-12">
                                <SpecialTop2 />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-12">
                    <LeadLatestNews />
                        <div className="DRightSideAdd">
                            <a href="#">
                                <img src={"/media/Advertisement/lab-pharmacy.jpeg"} alt='ads' title='ads' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
