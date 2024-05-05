import React from 'react'
import TopNews from './TopNews'
import LeadLatestNews from './LeadLatestNews'
import LeadOpinionSec from './LeadOpinionSec'
import Ads from './Ads'

export default function LeadNews() {

    return (
        <>
            <div className="TopLeadSection">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-8 col-12">
                            <TopNews />
                            </div>
                            <div className="col-lg-4 col-12">
                            <LeadLatestNews />
                            </div>
                            <Ads />
                        </div>
                    </div>
                    <div className="col-lg-3 col-12">
                        <LeadOpinionSec />

                    </div>
                 
                    
                </div>
            </div>
            
        </>

    )
}
