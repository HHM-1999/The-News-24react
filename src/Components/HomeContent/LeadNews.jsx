import React from 'react'
import TopNews from './TopNews'
import LeadLatestNews from './LeadLatestNews'
import LeadOpinionSec from './LeadOpinionSec'

export default function LeadNews() {

    return (
        <>
            <div className="TopLeadSection">
                <div className="row">
                    <div className="col-lg-6  col-12 ">
                       <TopNews />
                    </div>
                    <div className="col-lg-3 col-12">
                        <LeadLatestNews />

                    </div>
                    <div className="col-lg-3 col-12">
                        <LeadOpinionSec />

                    </div>
                </div>
            </div>
            
        </>

    )
}
