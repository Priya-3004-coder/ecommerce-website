import React from 'react';
import Layout from '../components/Layout/Layout';
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi';
const Contact = () => {
    return (
        <Layout title={"Contact us"}>
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
                        Get In Touch
                    </h1>
                    <p style={{
                        color: 'white',
                        fontSize: '1.3rem',
                        opacity: '0.9',
                        maxWidth: '700px',
                        margin: '0 auto'
                    }}>
                        We're here to help and answer any question you might have
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
                                src="/images/contact.jpg"
                                alt="contactus"
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
                                Contact Us
                            </h2>
                            <p style={{
                                fontSize: '1.1rem',
                                color: '#555',
                                lineHeight: '1.8',
                                marginBottom: '30px'
                            }}>
                                Have any questions or concerns about our products? Feel free to reach out anytime. We're available 24/7 to assist you!
                            </p>

                            {/* Contact Cards */}
                            <div style={{
                                background: '#fff',
                                padding: '25px',
                                borderRadius: '15px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                marginBottom: '20px',
                                transition: 'transform 0.2s'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '1.5rem'
                                    }}>
                                        <BiMailSend />
                                    </div>
                                    <div>
                                        <h6 style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Email</h6>
                                        <p style={{ margin: 0, fontWeight: '600', color: '#333', fontSize: '1.1rem' }}>
                                            help@ecommerce.com
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                background: '#fff',
                                padding: '25px',
                                borderRadius: '15px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                marginBottom: '20px',
                                transition: 'transform 0.2s'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '1.5rem'
                                    }}>
                                        <BiPhoneCall />
                                    </div>
                                    <div>
                                        <h6 style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Phone</h6>
                                        <p style={{ margin: 0, fontWeight: '600', color: '#333', fontSize: '1.1rem' }}>
                                            012-3456789
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                background: '#fff',
                                padding: '25px',
                                borderRadius: '15px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                transition: 'transform 0.2s'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '1.5rem'
                                    }}>
                                        <BiSupport />
                                    </div>
                                    <div>
                                        <h6 style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Support (Toll Free)</h6>
                                        <p style={{ margin: 0, fontWeight: '600', color: '#333', fontSize: '1.1rem' }}>
                                            1800-0000-0000
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className='row mt-5'>
                    <div className='col-12'>
                        <div style={{
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            padding: '40px',
                            borderRadius: '20px',
                            textAlign: 'center',
                            color: 'white'
                        }}>
                            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '15px' }}>
                                Need Immediate Assistance?
                            </h3>
                            <p style={{ fontSize: '1.2rem', opacity: '0.9', marginBottom: '25px' }}>
                                Our customer support team is available 24/7 to help you
                            </p>
                            <button style={{
                                background: 'white',
                                color: '#f5576c',
                                border: 'none',
                                padding: '15px 40px',
                                borderRadius: '25px',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                            }}>
                                Chat With Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact