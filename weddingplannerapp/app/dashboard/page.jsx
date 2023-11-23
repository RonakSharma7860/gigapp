'use client'
import { useState, useEffect } from "react";

const UserDashboard = () => {

    // fetch user session
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env['NEXT_PUBLIC_SERVER_URL']}/session`, {
            method: 'GET',
            cache: 'no-store',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                setUser(data.email);
                setLoading(false);
            })
            .catch(() => window.location.href = '/unauthenticated');
    }, []);

    return (
        <main>
            <section id='about-us' className="flex flex-col items-center justify-center gap-24 h-screen w-screen bg-pink-100">
                <button onClick={() => {document.cookie = 'token=none'; window.location.href = '/'}} className="absolute top-0 right-0 m-5 p-2 rounded-lg shadow-md bg-red-500 text-white hover:scale-105">Logout</button>
                <h2 className="text-4xl font-bold text-center">Welcome</h2>
                <h3>{loading? 'loading...': user}</h3>
                <div className="flex flex-row flex-wrap h-max w-full gap-8 justify-center items-center">
                    <a href="/dashboard/event" className="p-6 rounded-lg w-max shadow-md bg-fuchsia-500 text-white items-center justify-center flex flex-row h-max gap-5">
                        <p className="text-4xl">🗓️</p>
                        <p className="text-2xl font-bold self-center">Save event details &rarr;</p>
                    </a>
                    <a href="/dashboard/estimate" className="p-6 rounded-lg w-max shadow-md bg-sky-500 text-white items-center justify-center flex flex-row h-max gap-5">
                        <p className="text-4xl">💰</p>
                        <p className="text-2xl font-bold self-center">Get an estimate &rarr;</p>
                    </a>
                    <a href="/dashboard/vendor" className="p-6 rounded-lg w-max shadow-md bg-purple-500 text-white items-center justify-center flex flex-row h-max gap-5">
                        <p className="text-4xl">🎂</p>
                        <p className="text-2xl font-bold self-center">Register your vendors &rarr;</p>
                    </a>
                </div>
            </section>
        </main>
    );
};

export default UserDashboard;
