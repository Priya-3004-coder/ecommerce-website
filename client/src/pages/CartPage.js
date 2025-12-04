import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import dropin from 'braintree-web-drop-in'



const CartPage = () => {
    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart()
    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState(null)
    const [loading, setLoading] = useState(false)
    const dropinContainerRef = useRef(null)
    const navigate = useNavigate()

    const totalPrice = () => {
        try {
            let total = 0
            cart?.map((item) => { total = total + item.price });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            })

        } catch (error) {
            console.log(error)
        }
    }

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex((item) => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }

    const getToken = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/braintree/token')
            setClientToken(data?.clientToken)

        } catch (error) {
            console.log('Error getting Braintree token:', error)
        }
    }

    useEffect(() => {
        getToken();
    }, [auth?.token]);

    useEffect(() => {
        if (clientToken && dropinContainerRef.current) {
            // Clear any existing instance
            if (instance) {
                instance.teardown(() => { })
            }

            dropin.create({
                authorization: clientToken,
                container: dropinContainerRef.current,
                paypal: {
                    flow: 'vault'
                }
            }, (error, dropinInstance) => {
                if (error) {
                    console.error('Braintree DropIn Error:', error)
                    return
                }
                setInstance(dropinInstance)
            })
        }

        return () => {
            if (instance) {
                instance.teardown(() => { })
            }
        }
    }, [clientToken]);



    const handlePayment = async () => {
        try {
            setLoading(true)
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post('/api/v1/product/braintree/payment', { nonce, cart })
            setLoading(false)
            localStorage.removeItem('cart')
            setCart([])
            navigate('/dashboard/user/orders')
            toast.success('Payment completed successfully')
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }


    return (
        <Layout>
            <div className='container my-5'>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '40px',
                    borderRadius: '20px',
                    marginBottom: '30px',
                    boxShadow: '0 8px 30px rgba(102, 126, 234, 0.3)'
                }}>
                    <h1 className='text-center text-white' style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
                        🛒 Shopping Cart
                    </h1>
                    <p className='text-center text-white' style={{ fontSize: '1.2rem', opacity: '0.9', margin: 0 }}>
                        {auth?.token && `Hello, ${auth?.user?.name}!`}
                    </p>
                    <p className='text-center text-white mt-2' style={{ fontSize: '1.1rem' }}>
                        {cart?.length ? `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart` : "Your cart is empty"}
                    </p>
                </div>

                <div className='row g-4'>
                    {/* Cart Items */}
                    <div className='col-lg-8'>
                        {cart?.length > 0 ? (
                            cart.map((p, index) => (
                                <div key={index} style={{
                                    background: '#fff',
                                    borderRadius: '15px',
                                    padding: '20px',
                                    marginBottom: '20px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                    transition: 'transform 0.2s'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                    <div className='row align-items-center'>
                                        <div className='col-md-3'>
                                            <div style={{
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                background: '#f8f9fa'
                                            }}>
                                                <img
                                                    src={`/api/v1/product/product-photo/${p._id}`}
                                                    alt={p.name}
                                                    style={{
                                                        width: '100%',
                                                        height: '150px',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <h5 style={{ fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                                                {p.name}
                                            </h5>
                                            <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '10px' }}>
                                                {p.description.substring(0, 80)}...
                                            </p>
                                            <p style={{
                                                fontSize: '1.5rem',
                                                fontWeight: 'bold',
                                                color: '#667eea',
                                                margin: 0
                                            }}>
                                                ${p.price}
                                            </p>
                                        </div>
                                        <div className='col-md-3 text-center'>
                                            <button
                                                className='btn btn-danger w-100'
                                                onClick={() => removeCartItem(p._id)}
                                                style={{
                                                    borderRadius: '10px',
                                                    fontWeight: '600',
                                                    padding: '10px'
                                                }}
                                            >
                                                🗑️ Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{
                                background: '#fff',
                                borderRadius: '15px',
                                padding: '60px',
                                textAlign: 'center',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                            }}>
                                <h3 style={{ color: '#666', marginBottom: '20px' }}>🛒 Your cart is empty</h3>
                                <button
                                    className='btn btn-primary btn-lg'
                                    onClick={() => navigate('/')}
                                    style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        padding: '12px 30px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Cart Summary */}
                    <div className='col-lg-4'>
                        <div style={{
                            background: '#fff',
                            borderRadius: '15px',
                            padding: '30px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            position: 'sticky',
                            top: '20px'
                        }}>
                            <h3 style={{
                                fontWeight: 'bold',
                                color: '#333',
                                marginBottom: '20px',
                                borderBottom: '2px solid #667eea',
                                paddingBottom: '15px'
                            }}>
                                💳 Cart Summary
                            </h3>

                            <div style={{
                                background: '#f8f9fa',
                                padding: '20px',
                                borderRadius: '12px',
                                marginBottom: '20px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ color: '#666' }}>Items:</span>
                                    <span style={{ fontWeight: '600' }}>{cart?.length}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #ddd' }}>
                                    <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>Total:</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
                                        {totalPrice()}
                                    </span>
                                </div>
                            </div>

                            {auth?.user?.address ? (
                                <div style={{
                                    background: '#e8f5e9',
                                    padding: '15px',
                                    borderRadius: '10px',
                                    marginBottom: '20px'
                                }}>
                                    <h6 style={{ fontWeight: '600', color: '#2e7d32', marginBottom: '10px' }}>
                                        📍 Delivery Address
                                    </h6>
                                    <p style={{ color: '#555', marginBottom: '10px', fontSize: '0.95rem' }}>
                                        {auth?.user?.address}
                                    </p>
                                    <button
                                        className='btn btn-outline-success btn-sm w-100'
                                        onClick={() => navigate('/dashboard/user/profile')}
                                        style={{ borderRadius: '8px', fontWeight: '600' }}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            ) : (
                                <div style={{
                                    background: '#fff3e0',
                                    padding: '15px',
                                    borderRadius: '10px',
                                    marginBottom: '20px',
                                    textAlign: 'center'
                                }}>
                                    <p style={{ color: '#e65100', marginBottom: '10px', fontWeight: '600' }}>
                                        ⚠️ Please add delivery address
                                    </p>
                                    {auth?.token ? (
                                        <button
                                            className='btn btn-warning w-100'
                                            onClick={() => navigate('/dashboard/user/profile')}
                                            style={{ borderRadius: '8px', fontWeight: '600' }}
                                        >
                                            Add Address
                                        </button>
                                    ) : (
                                        <button
                                            className='btn btn-warning w-100'
                                            onClick={() => navigate('/login', { state: "/cart" })}
                                            style={{ borderRadius: '8px', fontWeight: '600' }}
                                        >
                                            Login to Checkout
                                        </button>
                                    )}
                                </div>
                            )}

                            {!clientToken || !cart?.length ? null : (
                                <>
                                    <div ref={dropinContainerRef} id="dropin-container" style={{ marginBottom: '20px' }}></div>
                                    <button
                                        className='btn btn-lg w-100'
                                        onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                        style={{
                                            background: loading || !instance || !auth?.user?.address
                                                ? '#ccc'
                                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '12px',
                                            padding: '15px',
                                            fontSize: '1.2rem',
                                            fontWeight: '600',
                                            boxShadow: loading || !instance || !auth?.user?.address
                                                ? 'none'
                                                : '0 4px 15px rgba(102, 126, 234, 0.4)'
                                        }}
                                    >
                                        {loading ? "Processing...." : '💳 Make Payment'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage
