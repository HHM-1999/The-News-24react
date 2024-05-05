import React from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router-dom'
import { scrollTop } from '../Components/AllFunctions'
import FBpagePlugin from './FBpagePlugin'
import LeadLatestNews from './HomeContent/LeadLatestNews'


export default function Terms() {
    return (
        <div className='page-bangla'>

            <main>
                <div className="container">
                    <div className="TopHomeSection"></div>
                    <DocumentTitle title=' দ্য নিউজ ২৪ ::   Terms and Conditions' />
                    <div className="SectionTitleEn"><h3><Link to="/terms-service" onClick={scrollTop}><span className="ColorBox"></span>Terms And Conditions</Link></h3></div>
                    <div className='row mt-5'>
                        <div className='col-lg-8 col-12'>
                            <div className="policy-details">
                                <p>Welcome to thenews24.com. By accessing or using our website, you agree to abide by the following terms and conditions:</p>
                                <div className='policy-list'>
                                    <ul>
                                        <ol>1. Use of Content: The content provided on thenews24.com is for informational purposes only. You may not modify, reproduce, distribute, or sell any of the content without prior written permission from thenews24.com.</ol>
                                        <ol>2. User Conduct: You agree to use thenews24.com for lawful purposes only. You must not engage in any activity that disrupts the functioning of the website or infringes upon the rights of others.</ol>
                                        <ol>3. Intellectual Property: All content, trademarks, logos, and other intellectual property displayed on thenews24.com are owned by thenews24.com or third parties. You may not use or reproduce any of these without express permission.</ol>
                                        <ol>4. Third-Party Links: thenews24.com may contain links to third-party websites. We are not responsible for the content or privacy practices of these websites.</ol>
                                        <ol>5. Disclaimer of Warranties: thenews24.com is provided "as is" without any warranties, express or implied. We do not guarantee the accuracy, reliability, or completeness of any content on the website.</ol>
                                        <ol>6. Limitation of Liability: thenews24.com shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of your use of the website.</ol>
                                        <ol>7. Changes to Terms: thenews24.com reserves the right to modify or replace these terms and conditions at any time. Your continued use of the website after any such changes constitutes acceptance of the new terms.</ol>
                                        <ol>8. Governing Law: These terms and conditions shall be governed by and construed in accordance with the laws of Bangladesh.</ol>
                                    </ul>
                                    <p>If you have any questions or concerns about these terms and conditions, please contact us at <a href="mailto:hello@thenews24.com" target="_blank"  rel="noreferrer">[hello@thenews24.com]</a>.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12">
                            <FBpagePlugin />
                            <div className='mt-5'>
                            <LeadLatestNews />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
