const staticElements = require("./staticElements");
const districtNewsElements = require("./districtComponents/districtNewsElements");
const latestPopularElements = require("./categoryComponents/latestPopularElements");

async function districtElement(divisionSlug, districtID, districtSlug, districtTitleBn) {
    let districtTabComponent;
    try { districtTabComponent = await staticElements.districtTab(); }
    catch (err) { console.log('districtTabComponent error'); return ''; }

    let districtNewsComponent;
    try { districtNewsComponent = await districtNewsElements.districtNewsElement(districtID); }
    catch (err) { console.log('districtNewsComponent error'); return ''; }

    let latestPopularSectionComponent;
    try { latestPopularSectionComponent = await latestPopularElements.latestPopularSectionElement(); }
    catch (err) { console.log('latestPopularSectionComponent error'); return ''; }

    let elements = `<main>
        <div class="container">
            <div class="TopHomeSection"></div>
                <h2 class="DTitle">
                    <a href="${'/divisions/' + divisionSlug + '/' + districtSlug}"><span class="DTitleInner"><span class="DTitleInnerBar"><span>${districtTitleBn}</span></span></span></a>
                </h2>
            <div class="row">
                <div class="col-lg-9 col-sm-12 border-right-inner1">
                    ${districtTabComponent}
                    <div class="DivisionAllNews mt-3">
                        <div class="row">${districtNewsComponent}</div>
                    </div>
                    <div id="btnDiv" class="text-center mt-2 mb-4">
                        <button id="ajax-more-btn" class="btn btn-lg btn-block ButtonBG">আরো পড়ুন</button>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-12">
                    <div class="MarginBottom30">${latestPopularSectionComponent}</div>
                </div>
            </div>
        </div>
    </main>`

    return elements
}

module.exports = { districtElement };