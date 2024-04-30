const staticElements = require("./staticElements");
const districtNewsElements = require("./divisionComponents/districtNewsElements");
const latestPopularElements = require("./categoryComponents/latestPopularElements");

async function divisionElement(divisionID, divisionSlug, divisionTitleBn) {
    let districtTabComponent;
    try { districtTabComponent = await staticElements.districtTab(); }
    catch (err) { console.log('districtTabComponent error'); return ''; }

    let districtNewsComponent;
    try { districtNewsComponent = await districtNewsElements.districtNewsElement(divisionID, divisionSlug); }
    catch (err) { console.log('districtNewsComponent error'); return ''; }

    let latestPopularSectionComponent;
    try { latestPopularSectionComponent = await latestPopularElements.latestPopularSectionElement(); }
    catch (err) { console.log('latestPopularSectionComponent error'); return ''; }

    let elements = `<main>
        <div class="container">
            <div class="TopHomeSection"></div>
                <h2 class="DTitle">
                <a href="#"><span class="DTitleInner"><span class="DTitleInnerBar"><span>${divisionTitleBn}</span></span></span></a>
            </h2>
            <div class="row">
                <div class="col-lg-9 col-sm-12 border-right-inner1">
                    ${districtTabComponent}
                    <div class="DivisionAllNews">
                        <div class="row">${districtNewsComponent}</div>
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

module.exports = { divisionElement };