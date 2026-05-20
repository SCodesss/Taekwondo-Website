export default function Contact() {
    return (
        <main className="p-8 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl font-black mb-10 uppercase border-l-4 border-red-600 pl-4">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-gray-600 mb-6">Have questions about belt testing, events, or joining? Send us a message.</p>
                    <form className="space-y-4">
                        <input type="text" placeholder="Your Name" className="w-full border border-gray-300 p-3 rounded-md" />
                        <input type="email" placeholder="Your Email" className="w-full border border-gray-300 p-3 rounded-md" />
                        <textarea placeholder="Your Message" rows={4} className="w-full border border-gray-300 p-3 rounded-md"></textarea>
                        <button type="button" className="bg-red-600 text-white px-6 py-3 rounded-md font-bold hover:bg-red-700 w-full">Send Message</button>
                    </form>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Office Address</h2>
                    <p className="text-gray-700 mb-2">B-39, Rakshapuram, Ladpur,<br />P.O.-Raipur, Dehradun<br />Uttarakhand, India</p>
                    <div className="mt-6 space-y-2 font-semibold">
                        <p>📞 +91 9412975549</p>
                        <p>✉️ dtaddn@gmail.com</p>
                    </div>
                </div>
            </div>
        </main>
    );
}