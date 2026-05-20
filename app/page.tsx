import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-900 flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="relative z-20 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase">
            District Taekwondo Association
          </h1>
          <p className="text-xl text-gray-300 mb-8 font-light">
            Dehradun, Uttarakhand
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/events" className="bg-red-600 text-white px-8 py-3 rounded-md font-bold hover:bg-red-700 transition">
              View Events
            </Link>
            <Link href="/contact" className="bg-white text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links / Grid */}
      <section className="py-16 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Belt Tests', desc: 'Information, syllabus, and results for upcoming grading.' },
          { title: 'Coaches & Referees', desc: 'Meet our certified district officials.' },
          { title: 'Downloads', desc: 'Forms, rules, and official documentation.' }
        ].map((item, i) => (
          <div key={i} className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50">
            <h3 className="text-xl font-bold mb-2 uppercase">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}