export default function Officials() {
    return (
        <main className="p-8 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl font-black mb-10 uppercase border-l-4 border-red-600 pl-4">Our Officials</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Dummy data for now */}
                {[
                    { role: "President", name: "John Doe" },
                    { role: "General Secretary", name: "Jane Smith" },
                    { role: "Technical Director", name: "Mike Johnson" }
                ].map((official, i) => (
                    <div key={i} className="border border-gray-200 p-6 rounded-lg text-center shadow-sm">
                        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                        <h3 className="text-xl font-bold">{official.name}</h3>
                        <p className="text-red-600 font-semibold uppercase text-sm mt-1">{official.role}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}