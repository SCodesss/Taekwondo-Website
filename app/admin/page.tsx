'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    // Data States
    const [events, setEvents] = useState<any[]>([]);
    const [athletes, setAthletes] = useState<any[]>([]);

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
                fetchAllData();
            }
        };
        checkUserAndFetchData();
    }, [router]);

    const fetchAllData = async () => {
        // Fetch Events
        const { data: eventsData } = await supabase
            .from('events')
            .select('*')
            .order('start_date', { ascending: true });
        if (eventsData) setEvents(eventsData);

        // Fetch Athletes
        const { data: athletesData } = await supabase
            .from('athletes')
            .select('*')
            .order('created_at', { ascending: false });
        if (athletesData) setAthletes(athletesData);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    // --- Event Handlers ---
    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { error } = await supabase.from('events').insert([{ title, location, start_date: startDate, end_date: endDate }]);
        if (error) alert('Error adding event: ' + error.message);
        else {
            setTitle(''); setLocation(''); setStartDate(''); setEndDate('');
            fetchAllData();
        }
        setIsSubmitting(false);
    };

    const handleDeleteEvent = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        const { error } = await supabase.from('events').delete().eq('id', id);
        if (error) alert('Error deleting event: ' + error.message);
        else fetchAllData();
    };

    // --- CSV Export Logic ---
    const exportAthletesToCSV = () => {
        if (athletes.length === 0) {
            alert("No athlete data to export.");
            return;
        }

        // 1. Create CSV Headers
        const headers = ['ID', 'Full Name', 'Father Name', 'DOB', 'Blood Group', 'Address', 'Coach', 'Branch', 'Registered Date'];
        const csvRows = [headers.join(',')];

        // 2. Add Data Rows (wrapping text in quotes to handle commas/newlines in addresses)
        athletes.forEach(a => {
            const row = [
                a.id,
                `"${a.full_name}"`,
                `"${a.father_name}"`,
                a.dob,
                a.blood_group,
                `"${a.address.replace(/\n/g, ' ')}"`,
                `"${a.coach_name}"`,
                `"${a.branch_name}"`,
                new Date(a.created_at).toLocaleDateString()
            ];
            csvRows.push(row.join(','));
        });

        // 3. Trigger Download
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `dtaddn_athletes_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

            {/* --- EVENTS SECTION --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm self-start">
                    <h2 className="text-2xl font-bold mb-1">Add New Event</h2>
                    <form onSubmit={handleAddEvent} className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Event Title</label>
                            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
                            <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border p-2 rounded" />
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
                        <button type="submit" disabled={isSubmitting} className="w-full bg-gray-900 text-white font-bold py-3 rounded hover:bg-gray-800 transition disabled:bg-gray-400">
                            {isSubmitting ? 'Publishing...' : 'Publish Event'}
                        </button>
                    </form>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm self-start">
                    <h2 className="text-2xl font-bold mb-4">Manage Events</h2>
                    <div className="space-y-3 h-80 overflow-y-auto pr-2">
                        {events.length === 0 ? <p className="text-sm text-gray-500 italic">No events in database.</p> : events.map((event) => (
                            <div key={event.id} className="bg-white border p-4 rounded shadow-sm flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-sm">{event.title}</h3>
                                    <p className="text-xs text-gray-500">{event.start_date} to {event.end_date}</p>
                                </div>
                                <button onClick={() => handleDeleteEvent(event.id)} className="text-red-500 hover:text-red-700 text-sm font-bold ml-4 p-2 bg-red-50 rounded">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- ATHLETES SECTION --- */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <div>
                        <h2 className="text-2xl font-bold">Registered Athletes</h2>
                        <p className="text-sm text-gray-500">Latest admission forms submitted through the website.</p>
                    </div>
                    <button
                        onClick={exportAthletesToCSV}
                        className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700 transition flex items-center gap-2"
                    >
                        ⬇️ Download Excel (CSV)
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-700 text-sm uppercase">
                                <th className="p-3 border-b">ID</th>
                                <th className="p-3 border-b">Name</th>
                                <th className="p-3 border-b">Coach</th>
                                <th className="p-3 border-b">Branch</th>
                                <th className="p-3 border-b">Reg. Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {athletes.length === 0 ? (
                                <tr><td colSpan={5} className="p-4 text-center text-gray-500">No athletes registered yet.</td></tr>
                            ) : (
                                athletes.map((athlete) => (
                                    <tr key={athlete.id} className="border-b text-sm hover:bg-gray-50">
                                        <td className="p-3 font-bold text-gray-500">#{athlete.id}</td>
                                        <td className="p-3 font-semibold">{athlete.full_name}</td>
                                        <td className="p-3">{athlete.coach_name}</td>
                                        <td className="p-3">{athlete.branch_name}</td>
                                        <td className="p-3">{new Date(athlete.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}