import React from 'react'
import Layout from '../components/Layout/Layout'
const Policy = () => {
return (
    <Layout title={"Privacy policy"}>
        <div className='policy'>
                    <div className='col-privacy'>
                        <img src="/images/policy.jpeg" alt="policy" style={{width:"100%"}}/>
                    </div>
                    <div className='col-policy'>
                        <h1 className='bg-dark p-2 text-white text-center'>PRIVACY POLICY</h1>
                        <p className='text-justify mt-2'> A privacy policy for an e-commerce website outlines how the business collects, uses, stores, and protects customer information.
                            It typically includes details about the types of personal data collected—such as names, email addresses, shipping details, payment information, and browsing behavior—and explains the purpose of this data, which may include order processing, account creation, personalized marketing, or customer support. 
                            The policy should clearly state whether information is shared with third parties, such as payment processors or shipping providers, and under what circumstances.
                            It also covers data protection measures, such as encryption and secure servers, to safeguard user information. Additionally, the privacy policy informs users of their rights, such as accessing, correcting, or deleting their data, and provides contact information for privacy-related inquiries. 
                            Ensuring transparency through a clear and accessible privacy policy is essential for building customer trust and complying with data protection laws like the GDPR or CCPA.
                        </p>
                    </div>
        
        </div>

    </Layout>
)
}

export default Policy