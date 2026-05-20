export default function Events() {
    return (
        <main className="p-8 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl font-black mb-10 uppercase border-l-4 border-red-600 pl-4">Upcoming Events</h1>
            <div className="space-y-6">
                <div className="border border-gray-200 p-6 rounded-lg shadow-sm hover:border-red-600 transition">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-bold">13th Open National Taekwondo Tournament</h2>
                            <p className="text-gray-600 mt-1">📍 I.G.I Stadium, Haldwani</p>
                        </div>
                        <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded uppercase">Upcoming</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">📅 29-31 May 2026</p>
                </div>
            </div>
        </main>
    );
}