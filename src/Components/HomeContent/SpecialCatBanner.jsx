import React from 'react'
import DTheNews24Special from './DTheNews24Special'
import DWriterNews from './DWriterNews'

export default function SpecialCatBanner() {
    return (
        <div className="DSpeBannerCategory mb-2"  style={{ marginTop: '20px' }}>
            <div className="row">
                <div className="col-lg-6 col-12  border-right-inner ">
                    <div className="DCatBannerList">
                       <DTheNews24Special />
                    </div>
                </div>

                <div className="col-lg-6 col-12">
                    <div className="DCatBannerList">
                       <DWriterNews />
                    </div>
                </div>

            </div>
         
        </div>
    )
}
