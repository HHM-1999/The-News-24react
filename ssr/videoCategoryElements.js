const contentElements = require("./videoCategoryComponents/contentElements");

async function videoCategoryElement(categoryID, categoryName) {
    let contentComponent;
    try { contentComponent = await contentElements.contentElement(categoryID); }
    catch (err) { console.log('contentComponent error'); return ''; }

    let elements = `<main>
        <div class="container">
            <h2 class="DTitle">
                <a href="#">
                    <span class="DTitleInner"><span class="DTitleInnerBar"><span>${categoryName}</span></span></span>
                </a>
            </h2>
            ${contentComponent}
            <div id="btnDiv" class="text-center mt-4 mb-4"><button id="ajax-more-btn" class="btn btn-lg btn-block ButtonBG">আরো পড়ুন</button></div>
        </div>
    </main>`

    return elements
}

module.exports = { videoCategoryElement };