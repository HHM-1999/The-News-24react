require('dotenv').config();

async function ldJsonElement(contentDetails, catSlug, catTitle) {
    var oldHeader = `${contentDetails.ContentHeading}`
    let replaceStr = /"/gi
    let replaceStr1 = /\\/gi
    var newHeader = oldHeader.replace(replaceStr, ''); //double quotation replaced by blank
    // var newHeader = oldHeader; //double quotation replaced by blank
    var KeyWord = `${contentDetails.ContentHeading}`;
    KeyWord = KeyWord.split(" ");
    KeyWord = KeyWord.toString(); // added "comma" after every word
    var Details = `${contentDetails.ContentDetails}`
    Details = Details.replace(/<\/?[^>]+(>|$)/g, "") // removed all HTML-TAGS
    Details = Details.replace(replaceStr1, ""); // removed all backslash
    Details = Details.replace(replaceStr, '\\"'); // replace all double-quotes to string
    // Details = Details.replaceAll("\\", ""); // removed all backslash
    // Details = Details.replaceAll('"', '\\"'); // replace all double-quotes to string

    return `<script type="application/ld+json">
        {
            {
                "headline":"${newHeader}",
                "image":{
                    "@type":"ImageObject",
                    "url":"${process.env.REACT_APP_IMG_Path + contentDetails.ImageBgPath}",
                    "width":"800",
                    "height":"450"
                },
                "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlug}/news/${contentDetails.ContentID}",
                "datePublished":"${contentDetails.create_date}",
                "mainEntityOfPage":{
                    "@type":"WebPage",
                    "@id":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlug}/news/${contentDetails.ContentID}"
                },
                "publisher":{
                    "@type":"Organization",
                    "@context":"http://schema.org",
                    "name":"ekhon.tv",
                    "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}",
                    "logo":{
                        "@context":"http://schema.org",
                        "@type":"ImageObject",
                        "author":"Ekhon TV :: এখন টিভি",
                        "contentUrl":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/ekhonTVlogo.png",
                        "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/ekhonTVlogo.png",
                        "name":"logo",
                        "width":"300",
                        "height":"109"
                    },
                    "sameAs":[
                        "https://www.facebook.com/tv.ekhon/",
                        "https://www.youtube.com/c/EKHONTV",
                        "https://twitter.com/ekhon_tv",
                        "https://www.instagram.com/ekhon_tv/?hl=bn",
                        "https://bd.linkedin.com/company/ekhontv"
                    ],
                    "id":"${process.env.REACT_APP_FONT_DOMAIN_URL}"
                },
                "author":[
                    {
                        "@type":"Person",
                        "givenName":"${contentDetails.WriterName}",
                        "name":"${contentDetails.WriterName}"
                    }
                ],
                "keywords":"${KeyWord}",
                "thumbnailUrl":"${process.env.REACT_APP_IMG_Path + contentDetails.ImageBgPath}",
                "articleBody":"${Details}",
                "dateCreated":"${contentDetails.create_date}",
                "dateModified":"${contentDetails.updated_date}",
                "name":"${newHeader}",
                "isAccessibleForFree":true,
                "isPartOf":{
                    "@type":"WebPage",
                    "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlug}/news/${contentDetails.ContentID}",
                    "primaryImageOfPage":{
                        "@type":"ImageObject",
                        "url":"${process.env.REACT_APP_IMG_Path + contentDetails.ImageBgPath}",
                        "width":"800",
                        "height":"450"
                    }
                },
                "articleSection":"${catTitle}",
                "@type":"Article",
                "@context":"http://schema.org"
            }
        }
    </script>
    <script type="application/ld+json">
        {
            {
                "@context": "http://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement":[
                    {
                        "@type": "ListItem",
                        "position":1,
                        "item":{
                            "@id":"${process.env.REACT_APP_FONT_DOMAIN_URL}",
                            "name":"Home"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position":2,
                        "item":{
                            "@id":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlug}",
                            "name":"${catTitle}"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position":3,
                        "item":{
                            "name" : "${newHeader}",
                            "@id":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlug}/news/${contentDetails.ContentID}"
                        }
                    }
                ]
            }
        }
    </script>
    <script type="application/ld+json">
        {
            {
                "headline":"${newHeader}",
                "image":{
                    "@type":"ImageObject",
                    "url":"${process.env.REACT_APP_IMG_Path + contentDetails.ImageBgPath}",
                    "width":"800",
                    "height":"450"
                },
                "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlug}/news/${contentDetails.ContentID}",
                "datePublished":"${contentDetails.create_date}",
                "mainEntityOfPage":{
                    "@type":"WebPage",
                    "@id":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlug}/news/${contentDetails.ContentID}"
                },
                "publisher":{
                    "@type":"Organization",
                    "@context":"http://schema.org",
                    "name":"ekhon.tv",
                    "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}",
                    "logo":{
                        "@context":"http://schema.org",
                        "@type":"ImageObject",
                        "author":"Ekhon TV :: এখন টিভি",
                        "contentUrl":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/ekhonTVlogo.png",
                        "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/ekhonTVlogo.png",
                        "name":"logo",
                        "width":"300",
                        "height":"109"
                    },
                    "sameAs":[
                        "https://www.facebook.com/tv.ekhon/",
                        "https://www.youtube.com/c/EKHONTV",
                        "https://twitter.com/ekhon_tv",
                        "https://www.instagram.com/ekhon_tv/?hl=bn",
                        "https://bd.linkedin.com/company/ekhontv"
                    ],
                    "id":"${process.env.REACT_APP_FONT_DOMAIN_URL}"
                },
                "author":[
                    {
                        "@type":"Person",
                        "givenName":"${contentDetails.WriterName}",
                        "name":"${contentDetails.WriterName}"
                    }
                ],
                "keywords":"${KeyWord}",
                "thumbnailUrl":"${process.env.REACT_APP_IMG_Path + contentDetails.ImageBgPath}",
                "articleBody":"${Details}",
                "dateCreated":"${contentDetails.create_date}",
                "dateModified":"${contentDetails.updated_date}",
                "name":"${newHeader}",
                "isAccessibleForFree":true,
                "isPartOf":{
                    "@type":"WebPage",
                    "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlug}/news/${contentDetails.ContentID}",
                    "primaryImageOfPage":{
                        "@type":"ImageObject",
                        "url":"${process.env.REACT_APP_IMG_Path + contentDetails.ImageBgPath}",
                        "width":"800",
                        "height":"450"
                    }
                },
                "articleSection":"${catTitle}",
                "alternativeHeadline":"",
                "description":null,
                "@type":"NewsArticle",
                "@context":"http://schema.org"
            }
        }
    </script>`
}

module.exports = { ldJsonElement };