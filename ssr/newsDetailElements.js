const ldJsonElements = require("./newsDetailComponents/ldJsonElements");
const searchFormElements = require("./newsDetailComponents/searchFormElements");
const detailElements = require("./newsDetailComponents/detailElements");
const catPopularElements = require("./newsDetailComponents/catPopularElements");
const catLatestElements = require("./newsDetailComponents/catLatestElements");

async function newsDetailElement(contentID, contentDetails, catID, catSlug, catTitle) {
    let ldJsonComponent;
    try { ldJsonComponent = await ldJsonElements.ldJsonElement(contentDetails, catSlug, catTitle); }
    catch (err) { console.log('ldJsonComponent error'); return ''; }

    let searchFormComponent;
    try { searchFormComponent = await searchFormElements.searchFormSectionElement(); }
    catch (err) { console.log('searchFormComponent error'); return ''; }

    let catLatestComponent;
    try { catLatestComponent = await catLatestElements.catLatestSectionElement(catID, catSlug, catTitle); }
    catch (err) { console.log('catLatestComponent error'); return ''; }

    let detailComponent;
    try { detailComponent = await detailElements.detailSectionElement(contentDetails, catSlug, catLatestComponent); }
    catch (err) { console.log('detailComponent error'); return ''; }

    let catPopularComponent;
    try { catPopularComponent = await catPopularElements.catPopularSectionElement(catID, catSlug, catTitle); }
    catch (err) { console.log('catPopularComponent error'); return ''; }

    let elements = `${ldJsonComponent}<main>
        <div class="container">
            <div class="LOGOIMG">
                <img src="${process.env.REACT_APP_FONT_DOMAIN_URL + 'media/common/ekhonTVlogo.png'}" width="187" height="68" title="Ekhon TV :: এখন টিভি" alt="Ekhon TV :: এখন টিভি" class="img-fluid img100" />
            </div>
            <section>
                <div class="row d-print-none">
                    <div class="col-lg-2 col-12 my-2">
                        <div class="DSecTitle">
                            <a href="${'/' + catSlug}">
                                <h2>${catTitle}</h2>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-10 col-12 my-2 d-none d-lg-block">
                        ${searchFormComponent}
                    </div>
                </div>
            </section>
            <section id="newsSection">
                ${detailComponent}
            </section>
            <section>
                <div class="row mt-3 d-print-none">
                    <div class="col-lg-9 col-12">
                        <div class="row d-block d-lg-none">
                            <div class="col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-10 offset-1 my-4">
                                ${searchFormComponent}
                            </div>
                        </div>
                        <div class="DRelatedNews">
                            ${catPopularComponent}
                        </div>
                    </div>
                    <div class="col-lg-3 col-12">
                        <div class="mt-4 d-block d-lg-none">
                            ${catLatestComponent}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>`

    return elements
}

module.exports = { newsDetailElement };