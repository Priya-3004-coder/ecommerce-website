import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import toast from 'react-hot-toast'
const ProductDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [cart, setCart] = useCart()
    const [product, setProduct] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        if (params?.slug) getProduct()

    }, [params?.slug])
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id)

        } catch (error) {
            console.log(error)
        }
    }

    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            {product && product._id ? (
                <div className='container my-5'>
                    <div className='row' style={{
                        background: '#fff',
                        borderRadius: '20px',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                        overflow: 'hidden',
                        padding: '40px'
                    }}>
                        <div className='col-md-6 mb-4'>
                            <div style={{
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                background: '#f8f9fa'
                            }}>
                                <img
                                    src={`/api/v1/product/product-photo/${product._id}`}
                                    alt={product.name}
                                    style={{
                                        width: '100%',
                                        height: '500px',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div style={{ padding: '20px' }}>
                                <span style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    padding: '6px 16px',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: '600'
                                }}>
                                    {product.category?.name}
                                </span>
                                <h1 style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 'bold',
                                    color: '#333',
                                    marginTop: '20px',
                                    marginBottom: '20px'
                                }}>
                                    {product.name}
                                </h1>
                                <div style={{
                                    background: '#f8f9fa',
                                    padding: '20px',
                                    borderRadius: '12px',
                                    marginBottom: '25px'
                                }}>
                                    <h5 style={{ color: '#666', fontWeight: '600', marginBottom: '10px' }}>
                                        📝 Description
                                    </h5>
                                    <p style={{
                                        fontSize: '1.1rem',
                                        color: '#555',
                                        lineHeight: '1.8',
                                        margin: 0
                                    }}>
                                        {product.description}
                                    </p>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '20px',
                                    marginBottom: '30px'
                                }}>
                                    <div>
                                        <p style={{
                                            fontSize: '0.9rem',
                                            color: '#666',
                                            margin: 0,
                                            marginBottom: '5px'
                                        }}>
                                            Price
                                        </p>
                                        <h2 style={{
                                            fontSize: '3rem',
                                            fontWeight: 'bold',
                                            color: '#667eea',
                                            margin: 0
                                        }}>
                                            ${product.price}
                                        </h2>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-lg w-100"
                                    onClick={() => {
                                        setCart([...cart, product]);
                                        localStorage.setItem('cart', JSON.stringify([...cart, product]));
                                        toast.success('Item added to cart')
                                    }}
                                    style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        padding: '15px',
                                        fontSize: '1.2rem',
                                        fontWeight: '600',
                                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                                        transition: 'transform 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    🛒 Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Similar Products Section */}
                    <div className='mt-5'>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: '#333',
                            marginBottom: '30px',
                            textAlign: 'center'
                        }}>
                            ✨ Similar Products You May Like
                        </h2>
                        {relatedProducts.length < 1 ? (
                            <p className='text-center' style={{ color: '#666', fontSize: '1.1rem' }}>
                                No similar products found
                            </p>
                        ) : (
                            <div className='row g-4'>
                                {relatedProducts?.map((p) => (
                                    <div className='col-lg-3 col-md-4 col-sm-6' key={p._id}>
                                        <div className="card h-100" style={{
                                            border: 'none',
                                            borderRadius: '15px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                            overflow: 'hidden'
                                        }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-8px)';
                                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                            }}>
                                            <div style={{
                                                position: 'relative',
                                                paddingTop: '100%',
                                                overflow: 'hidden',
                                                background: '#f8f9fa'
                                            }}>
                                                <img
                                                    src={`/api/v1/product/product-photo/${p._id}`}
                                                    alt={p.name}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </div>
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title" style={{
                                                    fontSize: '1.1rem',
                                                    fontWeight: '600',
                                                    color: '#333',
                                                    marginBottom: '10px'
                                                }}>
                                                    {p.name}
                                                </h5>
                                                <p className="card-text" style={{
                                                    color: '#666',
                                                    fontSize: '0.9rem',
                                                    marginBottom: '10px',
                                                    flexGrow: 1
                                                }}>
                                                    {p.description.substring(0, 50)}...
                                                </p>
                                                <p className="card-text" style={{
                                                    fontSize: '1.5rem',
                                                    fontWeight: 'bold',
                                                    color: '#667eea',
                                                    marginBottom: '15px'
                                                }}>
                                                    ${p.price}
                                                </p>
                                                <div className='d-flex gap-2'>
                                                    <button
                                                        className="btn btn-outline-primary flex-grow-1"
                                                        onClick={() => navigate(`/product/${p.slug}`)}
                                                        style={{ borderRadius: '8px', fontWeight: '600' }}
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        className="btn btn-primary flex-grow-1"
                                                        onClick={() => {
                                                            setCart([...cart, p]);
                                                            localStorage.setItem('cart', JSON.stringify([...cart, p]));
                                                            toast.success('Item added to cart')
                                                        }}
                                                        style={{
                                                            borderRadius: '8px',
                                                            fontWeight: '600',
                                                            background: '#667eea',
                                                            border: 'none'
                                                        }}
                                                    >
                                                        🛒 Add
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p style={{ marginTop: '20px', fontSize: '1.2rem', color: '#666' }}>Loading product...</p>
                </div>
            )}
        </Layout>
    )
}

export default ProductDetails
