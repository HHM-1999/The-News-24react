const ldJsonElements = require("./photoFeatureDetailComponents/ldJsonElements");
const staticElements = require("./staticElements");
const detailElements = require("./photoFeatureDetailComponents/detailElements");
const latestPopularSectionElements = require("./photoFeatureComponents/latestPopularElements");
const catPopularElements = require("./photoFeatureDetailComponents/catPopularElements");

async function photoFeatureDetailElement(contentID, contentDetails) {
    const d = new Date(contentDetails.create_date);
    let day = d.getDate();
    if(day <= 9){ day = '0'+day}
    let month = d.getMonth()+1;
    let monthname = ''
    if(month == 0){ monthname = 'জানুয়ারি'}else if(month == 1){ monthname = 'ফেব্রুয়ারি'}else if(month == 2){ monthname = 'মার্চ'}else if(month == 3){ monthname = 'এপ্রিল'}else if(month == 4){ monthname = 'মে'}else if(month == 5){ monthname = 'জুন'}else if(month == 6){ monthname = 'জুলাই'}else if(month == 7){ monthname = 'আগস্ট'}else if(month == 8){ monthname = 'সেপ্টেম্বর'}else if(month == 9){ monthname = 'অক্টোবর'}else if(month == 10){ monthname = 'নভেম্বর'}else if(month == 11){ monthname = 'ডিসেম্বর'}
    if(month <= 9){ month = '0'+month}
    let year = d.getFullYear();

    let moddate = ''
    if(contentDetails.updated_date){
        const dmod = new Date(contentDetails.updated_date);
        let daymod = dmod.getDate();
        if(daymod <= 9){ daymod = '0'+daymod}
        let monthmod = dmod.getMonth()+1;
        let monthnamemod = ''
        if(monthmod == 0){ monthnamemod = 'জানুয়ারি'}else if(monthmod == 1){ monthnamemod = 'ফেব্রুয়ারি'}else if(monthmod == 2){ monthnamemod = 'মার্চ'}else if(monthmod == 3){ monthnamemod = 'এপ্রিল'}else if(monthmod == 4){ monthnamemod = 'মে'}else if(monthmod == 5){ monthnamemod = 'জুন'}else if(monthmod == 6){ monthnamemod = 'জুলাই'}else if(monthmod == 7){ monthnamemod = 'আগস্ট'}else if(monthmod == 8){ monthnamemod = 'সেপ্টেম্বর'}else if(monthmod == 9){ monthnamemod = 'অক্টোবর'}else if(monthmod == 10){ monthnamemod = 'নভেম্বর'}else if(monthmod == 11){ monthnamemod = 'ডিসেম্বর'}
        if(monthmod <= 9){ monthmod = '0'+monthmod}
        let yearmod = dmod.getFullYear();
        moddate=daymod+' '+monthnamemod+' '+yearmod
    }
    
    let ldJsonComponent;
    try { ldJsonComponent = await ldJsonElements.ldJsonElement(contentDetails); }
    catch (err) { console.log('ldJsonComponent error'); return ''; }

    let latestPopularComponent;
    try { latestPopularComponent = await latestPopularSectionElements.latestPopularSectionElement(); }
    catch (err) { console.log('latestPopularComponent error'); return ''; }

    let detailComponent;
    try { detailComponent = await detailElements.detailSectionElement(contentID); }
    catch (err) { console.log('detailComponent error'); return ''; }

    let catPopularComponent;
    try { catPopularComponent = await catPopularElements.catPopularSectionElement(contentID); }
    catch (err) { console.log('catPopularComponent error'); return ''; }

    let elements = `${ldJsonComponent}<main>
        <div class="container">
            <div class="LOGOIMG">
                <img src="${process.env.REACT_APP_FONT_DOMAIN_URL + 'media/common/ekhonTVlogo.png'}" width="187" height="68" title="Ekhon TV :: এখন টিভি" alt="Ekhon TV :: এখন টিভি" class="img-fluid img100" />
            </div>
            <section>
                <div class="row mt-5 Photo_feature">
                    <div class="col-lg-2 col-12 d-print-none">
                        <div class="WritterName my-2">
                            <p><i class="fa-solid fa-pen"></i> ${contentDetails.Writer}<span class='DInitial'>, এখন টিভি</span></p>
                        </div>
                        <div class="DPublishTime">
                            <p><i class="fas fa-clock"></i>  প্রকাশিত: ${staticElements.banglaDateConvetar(day+' '+monthname+' '+year)}</p>
                            <p><i class="fas fa-clock"></i>  আপডেট: ${staticElements.banglaDateConvetar(moddate)}</p>
                        </div>
                        <div class='shareBtn mb-5'>
                            <button type="button" title='Print' aria-label='Print' class="printMe"><i class="fa-solid fa-print"></i></button>
                        </div>
                    </div>
                    <div class="col-lg-7 col-12">
                        <div class="HeadingArea">
                            <a href="/photo-feature"><h4 class="DCatNameInner">ছবিঘর</h4></a>
                            <h1 class="DHeadingInner">${contentDetails.PhotoFeatureTitle}</h1>
                        </div>
                        <div class="DFeatureImg page-break">
                            <div class="DImgZoomBlock DetailsPF" style="display: flex; align-items: center; justify-content: center; cursor: pointer;">
                                ${contentDetails.ImageBgPath ? '<img src="'+process.env.REACT_APP_IMG_Path + contentDetails.ImageBgPath+'" alt="'+contentDetails.PhotoFeatureTitle+'" title='+contentDetails.PhotoFeatureTitle+' /><span class="DFeatureIcon"><i class="fa-solid fa-expand"></i></span>' : ''}
                            </div>
                            <div class="DetailsTopBrief">
                                <p class="DTopImgCaption">${contentDetails.Caption} ${contentDetails.ImageSource ? '<span class="DImgSource"><i class="fa-sharp fa-solid fa-grip-lines-vertical"></i> ছবি: '+contentDetails.ImageSource+'</span>' : ''}</p>
                            </div>
                        </div>
                        ${detailComponent}
                    </div>
                    <div class="col-lg-3 col-12 d-print-none">
                        ${latestPopularComponent}
                        <div class="fb-page-banner my-4">
                            <div class="fb-page fb_iframe_widget" data-href="https://www.facebook.com/tv.ekhon/" data-tabs="" data-width="280px" data-height="180px" data-small-header="false" data-adapt-container-width="false" data-hide-cover="false" data-show-facepile="false" fb-xfbml-state="rendered" fb-iframe-plugin-query="adapt_container_width=false&app_id=416387992241868&container_width=280&height=180&hide_cover=false&href=https%3A%2F%2Fwww.facebook.com%2Ftv.ekhon%2F&locale=en_GB&sdk=joey&show_facepile=false&small_header=false&tabs=&width=280px" >
                                <span style="vertical-align: bottom; width: 280px; height: 130px;">
                                    <iframe name="f386511606478b4" height="180px" data-testid="fb:page Facebook Social Plugin" title="fb:page Facebook Social Plugin" frameBorder="0" allowtransparency="true" allowFullScreen="true" scrolling="no" allow="encrypted-media" src="https://www.facebook.com/v12.0/plugins/page.php?adapt_container_width=false&app_id=416387992241868&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df12c72dc280c6a%26domain%3Ddaily-bangladesh.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fdaily-bangladesh.com%252Ff350b4a0da4fe38%26relation%3Dparent.parent&container_width=280&height=180&hide_cover=false&href=https%3A%2F%2Fwww.facebook.com%2Ftv.ekhon%2F&locale=en_GB&sdk=joey&show_facepile=false&small_header=false&tabs=&width=280px" style="border: none; visibility: visible; width: 280px; height: 130px;" class=""></iframe>
                                </span>
                            </div>
                        </div>
                        <section class="MostPopularTab mt-4">${catPopularComponent}</section>
                    </div>
                </div>
            </section>
        </div>
    </main >`

    return elements
}

module.exports = { photoFeatureDetailElement };