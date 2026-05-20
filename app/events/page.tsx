import { supabase } from '../utils/supabase';

export const revalidate = 60;

export default async function Events() {
    const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true });

    if (error) {
        console.error('Error fetching events:', error);
    }

    return (
        <main className="p-8 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl font-black mb-10 uppercase border-l-4 border-red-600 pl-4">
                Upcoming Events
            </h1>

            <div className="space-y-6">
                {!events || events.length === 0 ? (
                    <p className="text-gray-500">No upcoming events scheduled right now.</p>
                ) : (
                    events.map((event) => (
                        <div key={event.id} className="border border-gray-200 p-6 rounded-lg shadow-sm hover:border-red-600 transition">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold">{event.title}</h2>
                                    <p className="text-gray-600 mt-1">📍 {event.location}</p>
                                </div>
                                <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded uppercase">
                                    Upcoming
                                </span>
                            </div>
                            <p className="text-sm font-semibold text-gray-800">
                                📅 {new Date(event.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                {' - '}
                                {new Date(event.end_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}