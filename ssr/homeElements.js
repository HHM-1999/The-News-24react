const ldJsonElements = require("./homeComponents/ldJsonElements");
const eventElements = require("./homeComponents/eventElements");
const leadSectionElements = require("./homeComponents/leadSectionElements");
const latestSectionElements = require("./homeComponents/latestElements");
const specialContentElements = require("./homeComponents/specialContentElements");
const mostPopularSectionElements = require("./homeComponents/mostPopularElements");
const countrySectionElements = require("./homeComponents/countryElements");
const internationalSectionElements = require("./homeComponents/internationalElements");
const marketSectionElements = require("./homeComponents/marketElements");
const namazSectionElements = require("./homeComponents/namazElements");
const pollSectionElements = require("./homeComponents/pollElements");
const sportSectionElements = require("./homeComponents/sportElements");
const infoTechSectionElements = require("./homeComponents/infoTechElements");
const fasionSectionElements = require("./homeComponents/fasionElements");
const entertainmentSectionElements = require("./homeComponents/entertainmentElements");
const videoSectionElements = require("./homeComponents/videoElements");
const photoSectionElements = require("./homeComponents/photoElements");

async function homeElement() {
    let eventComponent;
    try { eventComponent = await eventElements.eventElement(); }
    catch (err) { console.log('eventComponent error'); return ''; }
    
    let ldJsonComponent;
    try { ldJsonComponent = await ldJsonElements.ldJsonElement(); }
    catch (err) { console.log('ldJsonComponent error'); return ''; }
    
    let leadComponent;
    try { leadComponent = await leadSectionElements.leadSectionElement(); }
    catch (err) { console.log('leadComponent error'); return ''; }
    
    let latestComponent;
    try { latestComponent = await latestSectionElements.latestSectionElement(); }
    catch (err) { console.log('latestComponent error'); return ''; }
    
    let specialContentComponent;
    try { specialContentComponent = await specialContentElements.specialContentSectionElement(); }
    catch (err) { console.log('specialContentComponent error'); return ''; }
    
    let mostPopularComponent;
    try { mostPopularComponent = await mostPopularSectionElements.mostPopularSectionElement(); }
    catch (err) { console.log('mostPopularComponent error'); return ''; }
    
    let countryComponent;
    try { countryComponent = await countrySectionElements.countrySectionElement(); }
    catch (err) { console.log('countryComponent error'); return ''; }
    
    let internationalComponent;
    try { internationalComponent = await internationalSectionElements.internationalSectionElement(); }
    catch (err) { console.log('internationalComponent error'); return ''; }
    
    let marketComponent;
    try { marketComponent = await marketSectionElements.marketSectionElement(); }
    catch (err) { console.log('marketComponent error'); return ''; }
    
    let namazComponent;
    try { namazComponent = await namazSectionElements.namazSectionElement(); }
    catch (err) { console.log('namazComponent error'); return ''; }
    
    let pollComponent;
    try { pollComponent = await pollSectionElements.pollElement(); }
    catch (err) { console.log('pollComponent error'); return ''; }
    
    let sportComponent;
    try { sportComponent = await sportSectionElements.sportSectionElement(); }
    catch (err) { console.log('sportComponent error'); return ''; }
    
    let infoTechComponent;
    try { infoTechComponent = await infoTechSectionElements.infoTechSectionElement(); }
    catch (err) { console.log('infoTechComponent error'); return ''; }
    
    let fasionComponent;
    try { fasionComponent = await fasionSectionElements.fasionSectionElement(); }
    catch (err) { console.log('fasionComponent error'); return ''; }
    
    let entertainmentComponent;
    try { entertainmentComponent = await entertainmentSectionElements.entertainmentSectionElement(); }
    catch (err) { console.log('entertainmentComponent error'); return ''; }
    
    let videoComponent;
    try { videoComponent = await videoSectionElements.videoSectionElement(); }
    catch (err) { console.log('videoComponent error'); return ''; }
    
    let photoComponent;
    try { photoComponent = await photoSectionElements.photoSectionElement(); }
    catch (err) { console.log('photoComponent error'); return ''; }

    // console.log(eventComponent);
    let elements = `${ldJsonComponent}<main>
        ${eventComponent}
        <div class="container">
            <section>${leadComponent}</section>
            <section>
                <div class="LatestNewsSection SectionSBorder">
                    <div class="row">
                        ${latestComponent}
                        <div class="col-lg-3 col-12">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="DAdd1 pt-0 d-flex  justify-content-center">
                                        <a href="/"><img src="/media/Advertisement/Advertisement (300X250).png" width="299" height="250" alt="Advertisement" title="Advertisement" class="img-fluid img100" /></a>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="DAdd1 d-flex  justify-content-center">
                                        <a href="/"><img src="/media/Advertisement/Advertisement(300X90).png" width="299" height="90" alt="Advertisement" title="Advertisement" class="img-fluid img100" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="extraBtn SectionSBorder MHide">
                        <a href="/archives">
                            <p class="readMore">আরও পড়ুন</p>
                            <i class="fa-solid fa-sort-down"></i>
                        </a>
                    </div>
                </div>
            </section>
            ${specialContentComponent}
            <div class="row">
                <div class="col-md-12">
                    <div class="DAdd2 d-flex  justify-content-center">
                        <a href="/"><img src="/media/Advertisement/Advertisement(970X90).png" width="970" height="90" alt="Advertisement" title="Advertisement" class="img-fluid img100" /></a>
                    </div>
                </div>
            </div>
            ${mostPopularComponent}
            ${countryComponent}
            <div class="row">
                <div class="col-md-12">
                    <div class="DAdd2 d-flex  justify-content-center">
                        <a href="/"><img src="/media/Advertisement/Advertisement(970X90).png" width="970" height="90" alt="Advertisement" title="Advertisement" class="img-fluid img100" /></a>
                    </div>
                </div>
            </div>
            ${internationalComponent}
            <section>
                <div class="row mt-5">
                    ${marketComponent}
                    <div class="col-lg-3 col-12">
                        ${namazComponent}
                        ${pollComponent}
                    </div>
                </div>
            </section>
            <section>
                <div class="row mt-5">
                    ${sportComponent}
                    ${infoTechComponent}
                </div>
            </section>
            <div class="row">
                <div class="col-md-12">
                    <div class="DAdd2 d-flex  justify-content-center">
                        <a href="/"><img src="/media/Advertisement/Advertisement(970X90).png" width="970" height="90" alt="Advertisement" title="Advertisement" class="img-fluid img100" /></a>
                    </div>
                </div>
            </div>
            ${fasionComponent}
            <section>
                <div class="row mt-5">
                    ${entertainmentComponent}
                    <div class="col-lg-3 col-12">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="DAdd2 d-flex justify-content-center">
                                    <a href="/"><img src="/media/Advertisement/Advertisement (300X250).png" width="299" height="250" alt="Advertisement" title="Advertisement" class="img-fluid img100" /></a>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="DAdd2 d-flex justify-content-center">
                                    <a href="/"><img src="/media/Advertisement/Advertisement (300X250).png" width="299" height="250" alt="Advertisement" title="Advertisement" class="img-fluid img100" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            ${videoComponent}
            ${photoComponent}
        </div>
    </main>`

    return elements
}

module.exports = { homeElement };