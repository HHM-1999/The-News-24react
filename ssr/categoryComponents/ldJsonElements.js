require('dotenv').config();

async function ldJsonElement(catSlug, catTitle) {
    return `<script type="application/ld+json">
        {
            {
                "@context": "https://schema.org/",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "${catTitle}",
                        "item": "${process.env.REACT_APP_FONT_DOMAIN_URL + catSlug}"
                    }
                ]
            }
        }
    </script>`
}

module.exports = { ldJsonElement };