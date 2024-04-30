const dbConfig = require("./dbCon/dbConfig");
const bnConfig = dbConfig.bnConfig();
require('dotenv').config();

const staticElements = require("./staticElements");

async function searchElement(searchSlug) {

    try { const contentRes = await bnConfig.query( `SELECT bn_contents.ContentID, bn_bas_categories.CategoryID, bn_bas_categories.CategoryName, bn_bas_categories.Slug, bn_contents.ContentHeading, bn_contents.ContentBrief, bn_contents.ImageThumbPath, bn_contents.ImageSmPath, bn_contents.ImageBgPath, bn_contents.URLAlies, bn_contents.VideoID, bn_contents.VideoPath, bn_contents.ShowVideo, bn_contents.VideoType, bn_contents.VideoSource, DATE_FORMAT(bn_contents.created_at, "%W, %e %M %Y, %H:%i") create_date, DATE_FORMAT(bn_contents.updated_at, "%W, %e %M %Y, %H:%i") updated_date FROM bn_contents JOIN bn_bas_categories ON bn_contents.CategoryIDs=bn_bas_categories.CategoryID WHERE bn_contents.Deletable=1 AND bn_contents.ShowContent=1 AND (bn_contents.ContentHeading LIKE "%${searchSlug}%" OR bn_contents.ContentBrief LIKE "%${searchSlug}%" OR bn_contents.ContentDetails LIKE "%${searchSlug}%") ORDER BY bn_contents.ContentID DESC LIMIT 12 OFFSET 0`, [searchSlug, searchSlug, searchSlug] );

        let html = ''
        let cathtml1 = ''

        if(!searchSlug){
            cathtml1 += `<h1 class='warningHeaderForSearch'> <span>দুঃখিত,</span> কোন খবর খুঁজে পাওয়া যায়নি।</h1>
            <div class="row searchResult">
                <div class="col-sm-12 d-flex justify-content-center my-5">
                    <form class="row g-3">
                        <div class="col-auto">
                            <input type="text" name="q" placeholder="এখানে লিখুন..." class="form-control" required />
                        </div>
                        <div class="col-auto">
                            <div id="btnDiv2" class="text-center">
                                <button type="submit" class="btn btn-lg btn-block ButtonBG mb-3">খুঁজুন</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>`
        }else{
            cathtml1 += `<div class="row searchResult">
                <div class="col-sm-12 d-flex justify-content-center my-5">
                    <form class="row g-3">
                        <div class="col-auto">
                            <input type="text" name="q" placeholder="এখানে লিখুন..." class="form-control" required />
                        </div>
                        <div class="col-auto">
                            <div id="btnDiv2" class="text-center">
                                <button type="submit" class="btn btn-lg btn-block ButtonBG mb-3">খুঁজুন</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>`
            if(contentRes.length>0){
                cathtml1 += `<div class="row">`
                for (let i = 0; i < contentRes.length; i++) {
                    let fulldate = ''
                    let d = new Date(contentRes[i].create_date);
                    let daynum = d.getDay();
                    let dayname = ''
                    if(daynum==0){dayname='রোববার'}else if(daynum==1){dayname='সোমবার'}else if(daynum==2){dayname='মঙ্গলবার'}else if(daynum==3){dayname='বুধবার'}else if(daynum==4){dayname='বৃহস্পতিবার'}else if(daynum==5){dayname='শুক্রবার'}else if(daynum==6){dayname='শনিবার'}
                    let day = d.getDate();
                    if(day <= 9){ day = '0'+day}
                    let month = d.getMonth()+1;
                    let monthname = ''
                    if(month == 0){ monthname = 'জানুয়ারি'}else if(month == 1){ monthname = 'ফেব্রুয়ারি'}else if(month == 2){ monthname = 'মার্চ'}else if(month == 3){ monthname = 'এপ্রিল'}else if(month == 4){ monthname = 'মে'}else if(month == 5){ monthname = 'জুন'}else if(month == 6){ monthname = 'জুলাই'}else if(month == 7){ monthname = 'আগস্ট'}else if(month == 8){ monthname = 'সেপ্টেম্বর'}else if(month == 9){ monthname = 'অক্টোবর'}else if(month == 10){ monthname = 'নভেম্বর'}else if(month == 11){ monthname = 'ডিসেম্বর'}
                    if(month <= 9){ month = '0'+month}
                    let year = d.getFullYear();
                    let hour = d.getHours();
                    if(hour <= 9){ hour = '0'+hour}
                    let minute = d.getMinutes();
                    if(minute <= 9){ minute = '0'+minute}
                    fulldate = dayname+', '+day+' '+monthname+' '+year+', '+hour+':'+minute
                    cathtml1 += `<div class="col-lg-6 col-sm-12">
                        <div class="archiveListNews" >
                            <a href="${'/' + contentRes[i].Slug + '/news/' + contentRes[i].ContentID}">
                                <div class="row">
                                    <div class="col-sm-4 col-5 card-video-part">
                                        <div class="DImgZoomBlock">
                                            <picture><img src="${process.env.REACT_APP_IMG_Path + contentRes[i].ImageSmPath}" alt="${contentRes[i].ContentHeading}" title="${contentRes[i].ContentHeading}" /></picture>
                                            ${contentRes[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                        </div>
                                    </div>
                                    <div class="col-sm-8 col-7">
                                        <div class="Desc">
                                            <h3 class="Title BGTitle">${contentRes[i].ContentHeading}</h3>
                                            <div class="Brief">
                                                <p>${contentRes[i].ContentBrief}</p>
                                            </div>
                                        </div>
                                        <p class="pDate">${staticElements.toBengaliNumber(fulldate)}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>`
                }
                cathtml1 += `</div>`
            }else{
                cathtml1 += `<h1 class='warningHeader'> <span>দুঃখিত,</span> কোন খবর খুঁজে পাওয়া যায়নি।</h1>`
            }
        }

        html += `<main>
            <div class="container">
                <div class="TopHomeSection"></div>
                <h2 class="DTitle">
                    <a href="#">
                        <span class="DTitleInner"><span class="DTitleInnerBar"><span>খুঁজুন</span></span></span>
                    </a>
                </h2>
                ${cathtml1}
                <div id="btnDiv2" class="text-center mt-3 mb-4">
                    <button class="btn btn-lg btn-block ButtonBG">আরো খবর...</button>
                </div>
            </div>
        </main >`

        return html
    }
    catch (err) { console.log('contentRes error'); return ''; }
}

module.exports = { searchElement };