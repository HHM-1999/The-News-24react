import React from 'react'
import TopNews from './TopNews'
import LeadLatestNews from './LeadLatestNews'
import LeadOpinionSec from './LeadOpinionSec'
import Ads from './Ads'
import SpecialCatBanner from './SpecialCatBanner'

export default function LeadNews() {

    return (
        <>
            <div className="TopLeadSection">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-8 col-12">
                                <div className="topNewsSection">
                                    <TopNews />
                                </div>

                            </div>
                            <div className="col-lg-4 col-12 mt-0">

                                <LeadOpinionSec />
                            </div>
                            <SpecialCatBanner />

                        </div>
                    </div>
                    <div className="col-lg-3 col-12">
                        <div className="DRightSideAdd">
                            <a href="#">
                                <img src={"/media/Advertisement/lab-pharmacy.jpeg"} />
                            </a>
                        </div>

                        <LeadLatestNews />

                        <div className="DRightSideAdd">
                            <a href="#">
                                <img src={"/media/Advertisement/5470898439774741663.gif"} />
                            </a>
                        </div>


                    </div>


                </div>
            </div>

        </>

    )
}
