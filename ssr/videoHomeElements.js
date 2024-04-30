const leadElements = require("./videoHomeComponents/leadElements");
const popularElements = require("./videoHomeComponents/popularElements");
const categorySectionElements = require("./videoHomeComponents/categorySectionElements");

async function videoHomeElement() {
    let leadComponent;
    try { leadComponent = await leadElements.leadElement(); }
    catch (err) { console.log('leadComponent error'); return ''; }

    let popularComponent;
    try { popularComponent = await popularElements.popularElement(); }
    catch (err) { console.log('popularComponent error'); return ''; }

    let categorySectionComponent;
    try { categorySectionComponent = await categorySectionElements.categorySectionElement(); }
    catch (err) { console.log('categorySectionComponent error'); return ''; }

    let elements = `<main>
        <div class="container">
            <h2 class="DTitle">
                <a href="#">
                    <span class="DTitleInner"><span class="DTitleInnerBar"><span>ভিডিও গ্যালারি</span></span></span>
                </a>
            </h2>
            <div class="DVideoTopArea">
                <div class="row">
                    ${leadComponent}
                    <div class="col-lg-4 col-12">${popularComponent}</div>
                </div>
            </div>
            ${categorySectionComponent}
        </div>
    </main>`

    return elements
}

module.exports = { videoHomeElement };