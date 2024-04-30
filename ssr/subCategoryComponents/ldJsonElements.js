require('dotenv').config();

async function ldJsonElement(catSlug, catTitle, subCatSlug, subCatTitle) {
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
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "${subCatTitle}",
                        "item": "${process.env.REACT_APP_FONT_DOMAIN_URL + catSlug + "/sub/" + subCatSlug}"
                    }
                ]
            }
        }
    </script>`
}

module.exports = { ldJsonElement };