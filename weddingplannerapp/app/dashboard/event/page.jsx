'use client'
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

const WeddingPage = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [venue, setVenue] = useState('');
    const [name, setName] = useState('');
    const [loginPopupOpen, setLoginPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`${process.env['NEXT_PUBLIC_SERVER_URL']}/wedding`, {
            method: 'GET',
            cache: 'no-store',
            credentials: 'include',
            headers: {
                'Authorization': getCookie('token'),
            },
        })
            .then(async (response) => {
                console.log(response.status)
                if (response.status === 404)
                    return
                else if (!response.status === 200)
                    setLoginPopupOpen(true)
                else if (response.status === 200) {
                    const data = await response.json()
                    const wedding = data.wedding
                    console.log(wedding)
                    if (!wedding)
                        return
                    setName(wedding.name);
                    setDate(wedding.date);
                    setTime(wedding.time);
                    setVenue(wedding.venue);
                }
                else {

                }
            })
            .catch(() => setLoginPopupOpen(true));
    }, []);

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleVenueChange = (e) => {
        setVenue(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSave = () => {
        if (loading)
            return
        setLoading(true);
        // Save the wedding details to the database or perform any other necessary actions
        fetch(`${process.env['NEXT_PUBLIC_SERVER_URL']}/wedding`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('token'),
            },
            body: JSON.stringify({
                name: name,
                date: date,
                time: time,
                venue: venue
            }),
        })
            .then((response) => {
                setLoading(false)
                if (!response.ok) {
                    throw new Error('error saving details');
                }
            })
            .catch(() => {
                setError('error saving details')
                setLoginPopupOpen(true)
            });
    };

    return (
        <>
            <a href="/dashboard" className='mb-5 underline absolute top-5 left-5'>Return to Dashboard</a>
            {loginPopupOpen && (
                <div className="absolute top-5 right-5 w-max h-max flex items-center justify-center">
                    <div className="bg-white rounded-md p-4 flex flex-col w-[300px] h-max gap-3">
                        <h1 className="text-3xl font-bold mb-4">Alert</h1>
                        <p>You must be logged in to save this event</p>
                        <div className='flex w-full justify-around'>
                            <button onClickCapture={() => setLoginPopupOpen(false)} className="bg-gray-500 w-max hover:bg-black text-white font-bold py-2 px-4 rounded" onClick={() => setLoginPopupOpen(false)}>Ignore</button>
                            <a href='/login' className="bg-blue-500 w-max hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setLoginPopupOpen(false)}>Login</a>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col items-center justify-center h-screen bg-sky-200">
                <h1 className="text-3xl font-bold mb-4">Wedding Details</h1>
                <label className="mb-2">Event Name:</label>
                <input placeholder='who weds who' className="w-[250px] border border-gray-300 rounded-md p-2 mb-2" type="text" value={name} onChange={handleNameChange} />
                <br />
                <label className="mb-2">Date:</label>
                <input className="w-[250px] border border-gray-300 rounded-md p-2 mb-2" type="date" value={date} onChange={handleDateChange} />
                <br />
                <label className="mb-2">Time:</label>
                <input className="w-[250px] border border-gray-300 rounded-md p-2 mb-2" type="time" value={time} onChange={handleTimeChange} />
                <br />
                <label className="mb-2">Venue:</label>
                <input placeholder='address or map link' className="w-[250px] border border-gray-300 rounded-md p-2 mb-2" type="text" value={venue} onChange={handleVenueChange} />
                <br />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSave}>{loading ? 'saving...' : 'save'}</button>
                <p className='text-red-400 mt-5'>{error}</p>
            </div>
        </>
    );
};

export default WeddingPage;
