'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    // Event Data State
    const [events, setEvents] = useState<any[]>([]);

    // Form State
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const checkUserAndFetchData = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/login');
            } else {
                setLoading(false);
                fetchEvents();
            }
        };
        checkUserAndFetchData();
    }, [router]);

    const fetchEvents = async () => {
        const { data } = await supabase
            .from('events')
            .select('*')
            .order('start_date', { ascending: true });

        if (data) setEvents(data);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { error } = await supabase.from('events').insert([
            {
                title,
                location,
                start_date: startDate,
                end_date: endDate
            }
        ]);

        if (error) {
            alert('Error adding event: ' + error.message);
        } else {
            // Clear form and refresh list
            setTitle('');
            setLocation('');
            setStartDate('');
            setEndDate('');
            fetchEvents();
        }
        setIsSubmitting(false);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        const { error } = await supabase.from('events').delete().eq('id', id);
        if (error) {
            alert('Error deleting event: ' + error.message);
        } else {
            fetchEvents();
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-xl">Verifying credentials...</div>;

    return (
        <main className="p-8 max-w-6xl mx-auto min-h-screen">
            <div className="flex justify-between items-center mb-10 border-b pb-4">
                <h1 className="text-4xl font-black uppercase text-gray-900">Control Panel</h1>
                <button onClick={handleLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded font-bold hover:bg-red-200 text-sm transition">
                    Sign Out
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* ADD EVENT FORM */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm self-start">
                    <h2 className="text-2xl font-bold mb-1">Add New Event</h2>
                    <p className="text-gray-500 mb-6 text-sm">Instantly publish to the public events page.</p>

                    <form onSubmit={handleAddEvent} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Event Title</label>
                            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded" placeholder="e.g., District Belt Grading" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
                            <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border p-2 rounded" placeholder="e.g., Main Stadium" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Start Date</label>
                                <input type="date" required value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">End Date</label>
                                <input type="date" required value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border p-2 rounded" />
                            </div>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-gray-900 text-white font-bold py-3 rounded hover:bg-gray-800 transition mt-2 disabled:bg-gray-400">
                            {isSubmitting ? 'Publishing...' : 'Publish Event'}
                        </button>
                    </form>
                </div>

                {/* MANAGE EVENTS LIST */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm self-start">
                    <h2 className="text-2xl font-bold mb-1">Manage Existing</h2>
                    <p className="text-gray-500 mb-6 text-sm">Live database overview.</p>

                    <div className="space-y-3">
                        {events.length === 0 ? (
                            <p className="text-sm text-gray-500 italic">No events in database.</p>
                        ) : (
                            events.map((event) => (
                                <div key={event.id} className="bg-white border p-4 rounded shadow-sm flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-sm">{event.title}</h3>
                                        <p className="text-xs text-gray-500">{event.start_date} to {event.end_date}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-bold ml-4 p-2 bg-red-50 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}