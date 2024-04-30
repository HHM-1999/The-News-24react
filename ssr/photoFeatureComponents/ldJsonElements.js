require('dotenv').config();

async function ldJsonElement() {
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
                        "name": "ছবিঘর",
                        "item": "${process.env.REACT_APP_FONT_DOMAIN_URL + 'photo-feature'}"
                    }
                ]
            }
        }
    </script>`
}

module.exports = { ldJsonElement };