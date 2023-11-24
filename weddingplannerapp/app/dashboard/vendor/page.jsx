'use client'
import { useState } from 'react';

const VendorPage = () => {
    const [vendorName, setVendorName] = useState('');
    const [vendorCategory, setVendorCategory] = useState('catering');
    const [vendorContact, setVendorContact] = useState('');
    const [vendorQuote, setVendorQuote] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVendorNameChange = (event) => {
        setError('')
        setVendorName(event.target.value);
    };

    const handleVendorCategoryChange = (event) => {
        setError('')
        setVendorCategory(event.target.value);
    };

    const handleVendorContactChange = (event) => {
        setError('')
        setVendorContact(event.target.value);
    };

    const handleVendorQuoteChange = (event) => {
        setError('')
        setVendorQuote(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/vendor`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: vendorName,
                category: vendorCategory,
                contact: vendorContact,
                quote: vendorQuote,
            }),
        })
            .then((response) => {
                if (response.ok)
                    setError('🟢 saved successfully')
                else
                    throw new Error('An error occurred while submitting vendor data');
            })
            .catch(() => setError('error saving vendor'))
            .finally(() => setLoading(false))
    };

    return (
        <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-10">Vendor Regitration</h2>
            <a href="/dashboard" className='mb-5 underline absolute top-5 left-5'>Return to Dashboard</a>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Vendor Name
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Enter vendor name"
                        value={vendorName}
                        onChange={handleVendorNameChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Vendor Category
                    </label>
                    <select
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category"
                        value={vendorCategory}
                        onChange={handleVendorCategoryChange}
                    >
                        <option value="catering">Catering</option>
                        <option value="venue">Venue</option>
                        <option value="decoration">Decoration</option>
                        <option value="shopping">Shopping</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                        Vendor Contact
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="contact"
                        type="text"
                        placeholder="Enter email or phone"
                        value={vendorContact}
                        onChange={handleVendorContactChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quote">
                        Vendor Quote
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="quote"
                        type="text"
                        placeholder="Price in ₹"
                        value={vendorQuote}
                        onChange={handleVendorQuoteChange}
                    />
                </div>
                <div className="flex items-center justify-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleSubmit}
                    >
                        {loading ? 'saving...' : 'save'}
                    </button>
                </div>
                <p className='text-red-400 mt-5'>{error}</p>
        </main>
    );
};

export default VendorPage;
