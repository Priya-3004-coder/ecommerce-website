import React from 'react'
import Layout from '../components/Layout/Layout'
const About = () => {
    return (
        <Layout title={"About us-Ecommerce app"}>
            <div className='container my-5'>
                {/* Hero Section */}
                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '60px 40px',
                    borderRadius: '20px',
                    marginBottom: '50px',
                    boxShadow: '0 8px 30px rgba(102, 126, 234, 0.3)',
                    textAlign: 'center'
                }}>
                    <h1 style={{
                        color: 'white',
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        marginBottom: '15px'
                    }}>
                        About Us
                    </h1>
                    <p style={{
                        color: 'white',
                        fontSize: '1.3rem',
                        opacity: '0.9',
                        maxWidth: '700px',
                        margin: '0 auto'
                    }}>
                        Your trusted partner in online shopping
                    </p>
                </div>

                {/* Content Section */}
                <div className='row align-items-center g-5'>
                    <div className='col-md-6'>
                        <div style={{
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                        }}>
                            <img
                                src="/images/aboutus.jpg"
                                alt="aboutus"
                                style={{
                                    width: "100%",
                                    height: "500px",
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div style={{ padding: '20px' }}>
                            <h2 style={{
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                color: '#333',
                                marginBottom: '25px'
                            }}>
                                Who We Are
                            </h2>
                            <p style={{
                                fontSize: '1.1rem',
                                color: '#555',
                                lineHeight: '1.8',
                                marginBottom: '20px',
                                textAlign: 'justify'
                            }}>
                                Our E-commerce platform functions through a coordinated system involving cutting-edge website technology, secure databases, and trusted third-party services such as payment processors.
                            </p>
                            <p style={{
                                fontSize: '1.1rem',
                                color: '#555',
                                lineHeight: '1.8',
                                marginBottom: '20px',
                                textAlign: 'justify'
                            }}>
                                The journey begins when customers visit our site through search engines, ads, or referrals, and browse our extensive product catalog using advanced search filters and sorting tools. After selecting items, they add them to a virtual cart and proceed to our secure checkout.
                            </p>
                            <p style={{
                                fontSize: '1.1rem',
                                color: '#555',
                                lineHeight: '1.8',
                                textAlign: 'justify'
                            }}>
                                Payment information is securely processed through our gateway that validates and transfers funds. Once confirmed, we fulfill orders through our logistics partners, shipping products with full tracking details. Our dedicated customer service team is available 24/7 to handle inquiries, returns, or any issues.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className='row mt-5 g-4'>
                    <div className='col-md-4'>
                        <div style={{
                            background: '#fff',
                            padding: '30px',
                            borderRadius: '15px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            textAlign: 'center',
                            height: '100%'
                        }}>
                            <div style={{
                                fontSize: '3rem',
                                marginBottom: '15px'
                            }}>🚚</div>
                            <h4 style={{ fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                                Fast Delivery
                            </h4>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>
                                Quick and reliable shipping to your doorstep with real-time tracking
                            </p>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div style={{
                            background: '#fff',
                            padding: '30px',
                            borderRadius: '15px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            textAlign: 'center',
                            height: '100%'
                        }}>
                            <div style={{
                                fontSize: '3rem',
                                marginBottom: '15px'
                            }}>🔒</div>
                            <h4 style={{ fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                                Secure Payment
                            </h4>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>
                                Your transactions are protected with industry-leading security
                            </p>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div style={{
                            background: '#fff',
                            padding: '30px',
                            borderRadius: '15px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            textAlign: 'center',
                            height: '100%'
                        }}>
                            <div style={{
                                fontSize: '3rem',
                                marginBottom: '15px'
                            }}>💬</div>
                            <h4 style={{ fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                                24/7 Support
                            </h4>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>
                                Our customer service team is always here to help you
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default About;
