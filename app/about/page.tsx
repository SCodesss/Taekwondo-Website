import Link from 'next/link';

export default function About() {
    return (
        <main className="min-h-screen bg-white text-gray-900 p-8 max-w-4xl mx-auto">

            <h1 className="text-4xl font-black mb-6 uppercase">About Us</h1>
            <div className="prose prose-lg">
                <p className="mb-4">
                    The District Taekwondo Association Dehradun (DTADDN) is the official governing body for Taekwondo in the Dehradun district.
                </p>
                <p>
                    We are dedicated to promoting martial arts, organizing official belt grading, and hosting district-level championships to prepare our athletes for state and national platforms.
                </p>
            </div>
        </main>
    );
}