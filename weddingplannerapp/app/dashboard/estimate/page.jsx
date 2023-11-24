'use client'
import { useState, useEffect } from 'react';
import VendorList from '@/components/VendorList';
import { getCookie } from 'cookies-next';

const EstimatePage = () => {
    const [selectedVendors, setSelectedVendors] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [error, setError] = useState('fetching vendors...');
    const token = getCookie('token');

    useEffect(() => {
        fetch(`${process.env['NEXT_PUBLIC_SERVER_URL']}/vendor`, {
            method: 'GET',
            cache: 'no-store',
            credentials: 'include',
            headers: {
                'Authorization': token,
            }
        })
            .then(response => response.json())
            .then(data => setVendors(data.vendors))
            .catch(() => setError('error fetching vendors'));
        setError('')
    }, []);

    const handleVendorSelect = (vendor, isSelected) => {
        if (isSelected) {
            setSelectedVendors((prevSelectedVendors) =>
                prevSelectedVendors.filter((item) => item !== vendor)
            );
        } else {
            setSelectedVendors((prevSelectedVendors) => [
                ...prevSelectedVendors,
                vendor,
            ]);
        }
    };

    return (
        <main className="flex flex-col h-screen w-screen p-10 bg-gradient-to-tr from-blue-600 to-sky-300 via-indigo-400">
            <a href="/dashboard" className="mb-5 underline">Return to Dashboard</a>
            <h2 className="text-2xl font-bold mb-4 bg-white w-max p-2 rounded-lg">Available Vendors:</h2>
            <p className="text-black text-xl">{error}</p>
            <p className="text-black mb-3 mt-1 text-xl">{vendors.length} vendors available</p>
            <VendorList vendors={vendors} onSelect={handleVendorSelect} />
            <h2 className="text-2xl font-bold mt-8 mb-4 bg-white w-max p-2 rounded-lg">Estimated Cost:</h2>
            <h2 className="text-2xl font-bold mb-8 bg-blue-600 w-max p-3 text-white rounded-lg">₹{
                selectedVendors.reduce((acc, vendor) => acc + vendor.quote, 0)
            }</h2>
            <h2 className="text-2xl font-bold mt-8 mb-4 bg-white w-max p-2 rounded-lg">Breakdown:</h2>
            <ul className='flex flex-col w-max h-max justify-center items-center gap-1'>
                {selectedVendors.map((vendor) => (
                    <li className='pb-1 border-b-2 border-black border-dashed w-full' key={vendor.name}>{vendor.name} - {vendor.quote}</li>
                ))}
            </ul>
        </main>
    );
};

export default EstimatePage;
