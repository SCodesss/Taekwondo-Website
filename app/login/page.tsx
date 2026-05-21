'use client'; // This tells Next.js this component runs in the browser, needed for forms

import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Attempt to log in with Supabase
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            // If successful, redirect to the admin page
            router.push('/admin');
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-100">
                <h1 className="text-3xl font-black text-center mb-2 text-gray-900">Admin Login</h1>
                <p className="text-center text-gray-500 mb-8 text-sm">Restricted Area: District Officials Only</p>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm mb-4 border border-red-200">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 rounded-md hover:bg-gray-800 transition mt-4">
                        Sign In
                    </button>
                </form>
            </div>
        </main>
    );
}