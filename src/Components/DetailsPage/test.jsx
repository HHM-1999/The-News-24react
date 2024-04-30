const InnerAds = (id) => {

    //perfect
    window.setTimeout(() => {
        var contentDetails = document.querySelectorAll(`#contentDetails.ContentDetails${id} p`)[0]
        var contentDetailsChildDiv = document.querySelectorAll(`#contentDetails.ContentDetails${id} p`)[0].children[1]
        var contentDetailsChildDiv2 = document.querySelectorAll(`#contentDetails.ContentDetails${id} p`)[0].children[2]


        const relatedNewsDiv = document.createElement('div');
        relatedNewsDiv.className = 'DRelatedNewsSection d-print-none';
        const para = document.createElement("p");
        para.className = 'DRelatedNews Title';
        para.innerHTML = `<i class="fa-solid fa-list"></i> আরও পড়ুন:`
        relatedNewsDiv.appendChild(para);

        const relatedNewsMainDiv = document.createElement('div');
        relatedNewsMainDiv.className = 'row';

        let R_Arr = R_ContentData['id' + id]
        for (let i = 0; i < R_Arr.length; i++) {
            if (contentDetailsChildDiv !== null) {

                const relatedNewsAncor = document.createElement('a');
                relatedNewsAncor.href = `${process.env.REACT_APP_FONT_DOMAIN_URL + R_Arr[i].Slug + "/news/" + R_Arr[i].ContentID}`;
                const relatedNewsRow = document.createElement('div');
                relatedNewsRow.className = 'row';
                const imageDiv = document.createElement('div');
                imageDiv.className = 'DImgZoomBlocktest';
                const relatedNewsImg = document.createElement('div');
                relatedNewsImg.className = "col-lg-12 col-sm-4 col-5";
                const pic = document.createElement('picture');
                const image = document.createElement('IMG');
                image.src = `${process.env.REACT_APP_DOMAIN_URL}media/imgAll/${R_Arr[i].ImageSmPath}`;
                image.alt = `${R_Arr[i].ContentHeading}`;
                image.title = `${R_Arr[i].ContentHeading}`;
                pic.appendChild(image);
                imageDiv.appendChild(pic)
                relatedNewsImg.appendChild(imageDiv)
                relatedNewsRow.appendChild(relatedNewsImg)
                relatedNewsAncor.appendChild(relatedNewsRow);
                const relatedNewsDesc = document.createElement('div');
                relatedNewsDesc.className = "col-lg-12 col-sm-8 col-7";
                relatedNewsDesc.innerHTML = `<div class="Desc">
                                                <h3 class="Title">${R_Arr[i].ContentHeading}</h3>
                                            </div>`;
                relatedNewsRow.appendChild(relatedNewsDesc);
                const relatedNewsList = document.createElement('div');
                relatedNewsList.className = 'DRelatedNewsList align-self-stretch';
                relatedNewsList.appendChild(relatedNewsAncor)
                const relatedNewsClum = document.createElement('div');
                relatedNewsClum.className = 'col-lg-3 col-12 d-flex';
                relatedNewsClum.appendChild(relatedNewsList)

                relatedNewsMainDiv.appendChild(relatedNewsClum)
                relatedNewsDiv.appendChild(relatedNewsMainDiv);

                if (R_Arr.length >= i + 1) {
                    contentDetails.insertBefore(relatedNewsDiv, contentDetailsChildDiv2);
                }
            }
        }
    }, 600);


    //final
    window.setTimeout(() => {
        var contentDetails = document.querySelectorAll(`#contentDetails.ContentDetails${id} p`)[0]
        var contentDetailsChildDiv = document.querySelectorAll(`#contentDetails.ContentDetails${id} p`)[0].children[1]
        var contentDetailsChildDiv2 = document.querySelectorAll(`#contentDetails.ContentDetails${id} p`)[0].children[2]

        const relatedNewsDiv = document.createElement('div');
        relatedNewsDiv.className = 'DRelatedNewsSection d-print-none';
        const para = document.createElement("p");
        para.className = 'DRelatedNews Title';
        para.innerHTML = `<i class="fa-solid fa-list"></i> আরও পড়ুন:`
        relatedNewsDiv.appendChild(para);

        const relatedNewsMainDiv = document.createElement('div');
        relatedNewsMainDiv.className = 'row';

        let R_Arr = R_ContentData['id' + id]
        let R_HTML = ''
        for (let i = 0; i < R_Arr.length; i++) {
            if (contentDetailsChildDiv !== null) {
                R_HTML += `<div class="col-lg-3 col-12 d-flex ss">
                <div class="DRelatedNewsList align-self-stretch">
                    <a href=${process.env.REACT_APP_FONT_DOMAIN_URL + R_Arr[i].Slug + "/news/" + R_Arr[i].ContentID}>
                        <div class="row">
                            <div class="col-lg-12 col-sm-4 col-5">
                                <div class="DImgZoomBlocktest">
                                    <picture><img src=${process.env.REACT_APP_DOMAIN_URL + "media/imgAll/" + R_Arr[i].ImageSmPath} alt='${R_Arr[i].ContentHeading}' title='${R_Arr[i].ContentHeading}' /></picture>
                                    ${R_Arr[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="col-lg-12 col-sm-8 col-7">
                                <div class="Desc">
                                    <h3 class="Title">${R_Arr[i].ContentHeading}</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>`;
                if (R_Arr.length >= i + 1) {
                    relatedNewsDiv.appendChild(relatedNewsMainDiv);
                    relatedNewsMainDiv.innerHTML = R_HTML
                    contentDetails.insertBefore(relatedNewsDiv, contentDetailsChildDiv2);
                }
            }
        }
    }, 600);
}
