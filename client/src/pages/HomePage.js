import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices';
import { useCart } from '../context/cart'
import toast from 'react-hot-toast'
const HomePage = () => {
    const navigate = useNavigate()
    const [cart, setCart] = useCart()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)


    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error)

        }

    }

    useEffect(() => {
        getAllCategory()
        getTotal()
    }, [])


    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
            setLoading(false)
            setProducts(data.products)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }

    const getTotal = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/product-count')
            setTotal(data?.total)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (page === 1) return
        loadMore()
    }, [page])

    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
            setLoading(false)
            setProducts([...products, ...data.products])

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const handleFilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        } else {
            all = all.filter((c) => c !== id)
        }
        setChecked(all)
    }
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();

    }, [checked.length, radio.length])
    useEffect(() => {
        if (checked.length || radio.length) filterProduct();

    }, [checked, radio]);



    const filterProduct = async () => {
        try {
            const { data } = await axios.post('api/v1/product/product-filters', { checked, radio })
            setProducts(data?.products)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout title={"All Products-Best Offers"}>
            {/* Hero Banner */}
            <div className='hero-banner' style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '60px 20px',
                marginBottom: '30px',
                borderRadius: '0 0 20px 20px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
                <div className='container text-center text-white'>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '15px' }}>
                        Welcome to Our Store
                    </h1>
                    <p style={{ fontSize: '1.3rem', opacity: '0.9' }}>
                        Discover amazing products at unbeatable prices
                    </p>
                </div>
            </div>

            <div className='container-fluid'>
                <div className='row'>
                    {/* Sidebar Filters */}
                    <div className='col-lg-2 col-md-3'>
                        <div className='filter-sidebar' style={{
                            background: '#f8f9fa',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            position: 'sticky',
                            top: '20px'
                        }}>
                            <h4 className='text-center mb-3' style={{
                                color: '#667eea',
                                fontWeight: 'bold',
                                borderBottom: '2px solid #667eea',
                                paddingBottom: '10px'
                            }}>
                                🔍 Filters
                            </h4>

                            <div className='mb-4'>
                                <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '15px' }}>
                                    📂 Categories
                                </h5>
                                <div className='d-flex flex-column'>
                                    {categories?.map((c) => (
                                        <Checkbox
                                            key={c._id}
                                            onChange={(e) => handleFilter(e.target.checked, c._id)}
                                            style={{ marginBottom: '8px' }}
                                        >
                                            {c.name}
                                        </Checkbox>
                                    ))}
                                </div>
                            </div>

                            <div className='mb-4'>
                                <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '15px' }}>
                                    💰 Price Range
                                </h5>
                                <Radio.Group onChange={e => setRadio(e.target.value)}>
                                    {Prices?.map((p) => (
                                        <div key={p._id} style={{ marginBottom: '8px' }}>
                                            <Radio value={p.array}>{p.name}</Radio>
                                        </div>
                                    ))}
                                </Radio.Group>
                            </div>

                            <button
                                className='btn btn-danger w-100'
                                onClick={() => window.location.reload()}
                                style={{
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    padding: '10px'
                                }}
                            >
                                🔄 Reset Filters
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className='col-lg-10 col-md-9'>
                        <div className='products-header mb-4' style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '15px 20px',
                            background: '#fff',
                            borderRadius: '10px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                        }}>
                            <h2 style={{ margin: 0, color: '#333', fontWeight: 'bold' }}>
                                🛍️ All Products
                            </h2>
                            <span style={{
                                background: '#667eea',
                                color: 'white',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                fontWeight: '600'
                            }}>
                                {products.length} Products
                            </span>
                        </div>

                        <div className='row g-4'>
                            {products?.map((p) => (
                                <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6' key={p._id}>
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
                                                marginBottom: '10px',
                                                minHeight: '50px'
                                            }}>
                                                {p.name}
                                            </h5>
                                            <p className="card-text" style={{
                                                color: '#666',
                                                fontSize: '0.9rem',
                                                marginBottom: '10px',
                                                flexGrow: 1
                                            }}>
                                                {p.description.substring(0, 60)}...
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
                                                    style={{
                                                        borderRadius: '8px',
                                                        fontWeight: '600',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    View Details
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
                                                        fontSize: '0.9rem',
                                                        background: '#667eea',
                                                        border: 'none'
                                                    }}
                                                >
                                                    🛒 Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        {products && products.length < total && (
                            <div className='text-center my-5'>
                                <button
                                    className='btn btn-lg'
                                    onClick={(e) => { e.preventDefault(); setPage(page + 1); }}
                                    style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '25px',
                                        padding: '12px 40px',
                                        fontWeight: '600',
                                        fontSize: '1.1rem',
                                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                                    }}
                                >
                                    {loading ? "Loading..." : "Load More Products"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
