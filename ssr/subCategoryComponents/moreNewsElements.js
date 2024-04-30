require('dotenv').config();

async function moreNewsSectionElement(catSlug, subCatID, contentIDs, bnConfig) {
    try {
        const moreNewsRes = await bnConfig.query( 'SELECT bn_contents.ContentID, bn_contents.ContentHeading, bn_contents.ContentBrief, bn_contents.ImageThumbPath, bn_contents.ImageSmPath, bn_contents.ImageBgPath, bn_contents.URLAlies, bn_contents.VideoID, bn_contents.ShowVideo, bn_contents.VideoPath, bn_contents.VideoType, bn_contents.VideoSource, bn_contents.created_at as create_date, bn_contents.updated_at as updated_date FROM bn_contents WHERE FIND_IN_SET(?, bn_contents.CategoryIDs) > 0 AND bn_contents.Deletable=1 AND bn_contents.ShowContent=1 AND ContentID NOT IN (?) ORDER BY bn_contents.ContentID DESC LIMIT 8 OFFSET 0', [subCatID, contentIDs] );

        let html = ''

        for (let i = 0; i < moreNewsRes.length; i++) {
            html += `<div class="col-lg-6 col-12 d-flex">
                <div class="DCatNewsList align-self-stretch">
                    <a href="${'/' + catSlug + '/news/' + moreNewsRes[i].ContentID}">
                        <div class="row">
                            <div class="col-lg-5 col-sm-4 col-5">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + moreNewsRes[i].ImageSmPath}" alt="${moreNewsRes[i].ContentHeading}" title="${moreNewsRes[i].ContentHeading}" /></picture>
                                    ${moreNewsRes[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="col-lg-7 col-sm-8 col-7">
                                <div class="Desc">
                                    <h3 class="Title">${moreNewsRes[i].ContentHeading}</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>`
        }
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { moreNewsSectionElement };