'use client'
import { useState } from "react";
import { setCookie } from "cookies-next";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        document.getElementById('login-warning').classList.add('hidden');
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        document.getElementById('login-warning').classList.add('hidden');
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your login logic here
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email) && password.length >= 8) {
            // send request to login
            await fetch(`${process.env['NEXT_PUBLIC_SERVER_URL']}/login`, {
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
                .then((data) => setCookie('token', data.token))
                .then(() => window.location.href = '/dashboard')
                .catch((error) => console.log(error))
        }
        else
            document.getElementById('login-warning').classList.remove('hidden');
    };

    return (
        <main className="flex flex-col h-screen justify-center items-center bg-gradient-to-br from-pink-200 to-pink-400 via-fuchsia-300">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 text-xl items-center justify-center h-full w-full">
                <h2 className="text-4xl font-bold mb-10">🔑 Login</h2>
                <a href="/signup" className="underline">Signup instead?</a>
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

                <button className="bg-pink-400 text-white hover:scale-105 duration-200 w-max self-center p-1 rounded-full px-3 text-xl mt-10" type="submit">Login</button>
                <p id="login-warning" className="text-red-400 hidden">invalid credentials</p>
            </form>
        </main>
    );
};

export default LoginPage;
