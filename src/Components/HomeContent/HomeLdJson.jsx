import React from 'react'
import { Helmet } from "react-helmet";

export default function HomeLdJson() {
    return (
        <Helmet>
            <script type="application/ld+json">
                {`
                    {
                        "name":"TheNews24",
                        "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}",
                        "logo":{
                            "@context":"http://schema.org",
                            "@type":"ImageObject",
                            "author":"TheNews24 || দ্য নিউজ ২৪",
                            "contentUrl":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png",
                            "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png",
                            "name":"logo",
                            "width":"300",
                            "height":"109"
                        },
                        "sameAs":[
                            "https://www.facebook.com/thenews24digital/",
                            // "https://www.youtube.com/c/",
                            // "https://twitter.com/",
                            // "https://www.instagram.com/?hl=bn",
                            // "https://bd.linkedin.com/company/"
                        ],
                        "@type":"Organization",
                        "@context":"http://schema.org"
                    }  
                `}
            </script>
            <script type="application/ld+json">
                {`
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}"
                            }
                        ]
                    }
                       
                `}
            </script>
            <script type="application/ld+json">
                {`
                    {
                        "@context":"http://schema.org",
                        "@type":"Website",
                        "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}",
                        "interactivityType":"mixed",
                        "name":"TheNews24",
                        "headline":"TheNews24 is an online news portal of Bangladesh. It was established in 2017 with the commitment to publish objective and information-based news.",
                        "keywords":"দ্য নিউজ ২৪,অনলাইন পত্রিকা, পত্রিকা, বাংলাদেশ পত্রিকা, আজকের পত্রিকা, দেশে এখন, বাজার, কাচা বাজার, মুদ্রা বাজার, শেয়ার বাজার, আন্তর্জাতিক বাজার, ক্রিপ্টো, বিদেশে এখন, ক্রিকেট, ফুটবল, এখন মাঠে, এখন আনন্দ, সিনেমা, নাটক, তথ্য প্রযুক্তি, নাগরিক সাংবাদিকতা, পাঠকের কথা, চলতি হাওয়া, পরিবেশ, আবহাওয়া, উদ্যোক্তা",
                        "copyrightHolder":{
                            "@type":"Organization",
                            "name":"TheNews24"
                        },
                        "potentialAction":{
                            "@type":"SearchAction",
                            "target":"${process.env.REACT_APP_FONT_DOMAIN_URL}search/{query}",
                            "query-input":"required name=query"
                        },
                        "mainEntityOfPage":{
                            "@type":"WebPage",
                            "@id":"${process.env.REACT_APP_FONT_DOMAIN_URL}"
                        }
                    }
                       
                `}
            </script>
        </Helmet>
    )
}
