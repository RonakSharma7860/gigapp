'use client'
import { useState } from "react";

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        document.getElementById('email-warning').classList.add('hidden');
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        document.getElementById('password-warning').classList.add('hidden');
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('email-warning').classList.remove('hidden');
        }
        else if(!(password.length >= 8)) {
            document.getElementById('password-warning').classList.remove('hidden');
        }
        else {
            // send request to create user
            await fetch(`${process.env['NEXT_PUBLIC_SERVER_URL']}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                cache: 'no-store',
                credentials: 'include'
            })
            .then((response) => response.json())
            .then((data) => document.cookie = data.cookie)
            .then(() => window.location.href = '/dashboard')
            .catch(error => console.log(error));
            return;
        }   
    };

    return (
        <main className="flex flex-col h-screen justify-center items-center bg-pink-100">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 text-xl items-center justify-center h-full w-full">
                <h2 className="text-4xl font-bold mb-10">🔑 Signup</h2>
                <a href="/login" className="underline">Login instead?</a>
                <div className="flex flex-col gap-5">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="rounded-md p-2 text-lg w-[300px]"
                    />
                </div>

                <div className="flex flex-col gap-5">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="rounded-md p-2 text-lg w-[300px]"
                    />
                </div>

                <button className="bg-pink-400 text-white hover:scale-105 duration-200 w-max self-center p-1 rounded-full px-3 text-xl mt-10" type="submit">Signup</button>
                <p id="email-warning" className="text-red-400 hidden">Please use a unique valid email</p>
                <p id="password-warning" className="text-red-400 hidden">Password must contain at least 8 characters</p>
            </form>
        </main>
    );
};

export default SignupPage;
