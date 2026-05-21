'use client';

import { useState } from 'react';
import { supabase } from '../utils/supabase';

export default function AdmissionForm() {
    const [formData, setFormData] = useState({
        full_name: '',
        father_name: '',
        dob: '',
        blood_group: '',
        address: '',
        coach_name: '',
        branch_name: '',
        agreed_to_waiver: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreed_to_waiver) {
            alert('You must agree to the injury waiver to proceed.');
            return;
        }

        setIsSubmitting(true);
        const { error } = await supabase.from('athletes').insert([formData]);

        if (error) {
            alert('Error submitting form: ' + error.message);
            setIsSubmitting(false);
        } else {
            setSuccess(true);
        }
    };

    if (success) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md border-t-4 border-green-500">
                    <h2 className="text-2xl font-black mb-2 text-green-600">Application Submitted!</h2>
                    <p className="text-gray-600">Your admission form has been securely sent to the District Taekwondo Association.</p>
                    <button onClick={() => window.location.reload()} className="mt-6 text-sm font-bold text-gray-900 underline">Submit another form</button>
                </div>
            </main>
        );
    }

    return (
        <main className="p-8 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-4xl font-black mb-2 uppercase border-l-4 border-red-600 pl-4">Admission Form</h1>
            <p className="text-gray-500 mb-8 ml-5">Official Digital Registration for DTADDN</p>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Athlete Full Name *</label>
                        <input type="text" required className="w-full border p-2 rounded"
                            onChange={e => setFormData({ ...formData, full_name: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Father's Name *</label>
                        <input type="text" required className="w-full border p-2 rounded"
                            onChange={e => setFormData({ ...formData, father_name: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Date of Birth *</label>
                        <input type="date" required className="w-full border p-2 rounded"
                            onChange={e => setFormData({ ...formData, dob: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Blood Group *</label>
                        <select required className="w-full border p-2 rounded bg-white"
                            onChange={e => setFormData({ ...formData, blood_group: e.target.value })}>
                            <option value="">Select...</option>
                            <option value="A+">A+</option><option value="A-">A-</option>
                            <option value="B+">B+</option><option value="B-">B-</option>
                            <option value="O+">O+</option><option value="O-">O-</option>
                            <option value="AB+">AB+</option><option value="AB-">AB-</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Address *</label>
                    <textarea required rows={3} className="w-full border p-2 rounded"
                        onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Coach Name *</label>
                        <input type="text" required className="w-full border p-2 rounded"
                            onChange={e => setFormData({ ...formData, coach_name: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Branch / Club Name *</label>
                        <input type="text" required className="w-full border p-2 rounded"
                            onChange={e => setFormData({ ...formData, branch_name: e.target.value })} />
                    </div>
                </div>

                <div className="border-t pt-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" required className="mt-1 w-5 h-5 text-red-600"
                            onChange={e => setFormData({ ...formData, agreed_to_waiver: e.target.checked })} />
                        <span className="text-sm text-gray-600 leading-tight">
                            <strong>Declaration & Waiver:</strong> I hereby declare that all information is true. I agree to abide by the rules of DTADDN. I will not hold the association responsible for any injury sustained during practice or competition.
                        </span>
                    </label>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 text-white font-bold py-4 rounded-md hover:bg-red-700 transition disabled:bg-gray-400 text-lg">
                    {isSubmitting ? 'Submitting...' : 'Submit Admission Form'}
                </button>
            </form>
        </main>
    );
}