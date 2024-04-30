import React from 'react'
import { Helmet } from "react-helmet";

export default function Ldjson({ news, catName, catSlug }) {
    var oldHeader = `${news.ContentHeading}`
    var newHeader = oldHeader.replaceAll('"', ''); //double quotation replaced by blank
    var KeyWord = `${news.ContentHeading}`;
    KeyWord = KeyWord.split(" ");
    KeyWord = KeyWord.toString(); // added "comma" after every word
    var Details = `${news.ContentDetails}`
    Details = Details.replace(/<\/?[^>]+(>|$)/g, "") // removed all HTML-TAGS
    Details = Details.replaceAll("\\", ""); // removed all backslash
    Details = Details.replaceAll('"', '\\"'); // replace all double-quotes to string
    return (
        <Helmet>
            <script type="application/ld+json">
                {`
                    {
                        "headline":"${newHeader}",
                        "image":{
                            "@type":"ImageObject",
                            "url":"${process.env.REACT_APP_IMG_Path + news.ImageBgPath}",
                            "width":"800",
                            "height":"450"
                        },
                        "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlug}/news/${news.ContentID}",
                        "datePublished":"${news.create_date}",
                        "mainEntityOfPage":{
                            "@type":"WebPage",
                            "@id":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlug}/news/${news.ContentID}"
                        },
                        "publisher":{
                            "@type":"Organization",
                            "@context":"http://schema.org",
                            "name":"ekhon.tv",
                            "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}",
                            "logo":{
                                "@context":"http://schema.org",
                                "@type":"ImageObject",
                                "author":"The News 24  :: দ্য নিউজ ২৪",
                                "contentUrl":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png",
                                "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png",
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
                                "givenName":"${news.WriterName}",
                                "name":"${news.WriterName}"
                            }
                        ],
                        "keywords":"${KeyWord}",
                        "thumbnailUrl":"${process.env.REACT_APP_IMG_Path + news.ImageBgPath}",
                        "articleBody":"${Details}",
                        "dateCreated":"${news.create_date}",
                        "dateModified":"${news.updated_date}",
                        "name":"${newHeader}",
                        "isAccessibleForFree":true,
                        "isPartOf":{
                            "@type":"WebPage",
                            "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlug}/news/${news.ContentID}",
                            "primaryImageOfPage":{
                                "@type":"ImageObject",
                                "url":"${process.env.REACT_APP_IMG_Path + news.ImageBgPath}",
                                "width":"800",
                                "height":"450"
                            }
                        },
                        "articleSection":"${catName.CategoryName}",
                        "@type":"Article",
                        "@context":"http://schema.org"
                    }
                `}
            </script>
            <script type="application/ld+json">
                {`
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
                                    "@id":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catName.Slug}",
                                    "name":"${catName.CategoryName}"
                                }
                            },
                            {
                                "@type": "ListItem",
                                "position":3,
                                "item":{
                                    "name" : "${newHeader}",
                                    "@id":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlug}/news/${news.ContentID}"
                                }
                            }
                        ]
                    }
                `}
            </script>
            <script type="application/ld+json">
                {`
                    {
                        "headline":"${newHeader}",
                        "image":{
                            "@type":"ImageObject",
                            "url":"${process.env.REACT_APP_IMG_Path + news.ImageBgPath}",
                            "width":"800",
                            "height":"450"
                        },
                        "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlug}/news/${news.ContentID}",
                        "datePublished":"${news.create_date}",
                        "mainEntityOfPage":{
                            "@type":"WebPage",
                            "@id":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlug}/news/${news.ContentID}"
                        },
                        "publisher":{
                            "@type":"Organization",
                            "@context":"http://schema.org",
                            "name":"The News 24",
                            "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}",
                            "logo":{
                                "@context":"http://schema.org",
                                "@type":"ImageObject",
                                "author":"The News 24  :: দ্য নিউজ ২৪",
                                "contentUrl":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png",
                                "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png",
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
                                "givenName":"${news.WriterName}",
                                "name":"${news.WriterName}"
                            }
                        ],
                        "keywords":"${KeyWord}",
                        "thumbnailUrl":"${process.env.REACT_APP_IMG_Path + news.ImageBgPath}",
                        "articleBody":"${Details}",
                        "dateCreated":"${news.create_date}",
                        "dateModified":"${news.updated_date}",
                        "name":"${newHeader}",
                        "isAccessibleForFree":true,
                        "isPartOf":{
                            "@type":"WebPage",
                            "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlug}/news/${news.ContentID}",
                            "primaryImageOfPage":{
                                "@type":"ImageObject",
                                "url":"${process.env.REACT_APP_IMG_Path + news.ImageBgPath}",
                                "width":"800",
                                "height":"450"
                            }
                        },
                        "articleSection":"${catName.CategoryName}",
                        "alternativeHeadline":"",
                        "description":null,
                        "@type":"NewsArticle",
                        "@context":"http://schema.org"
                    }
                `}
            </script>
        </Helmet>
    )
}
