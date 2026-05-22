'use client';

import { useState } from 'react';
import { supabase } from '../utils/supabase';

export default function AdmissionForm() {
    const [formData, setFormData] = useState({
        full_name: '',
        father_name: '',
        mother_name: '',
        dob: '',
        gender: '',
        blood_group: '',
        mobile_no: '',
        address: '',
        pin_code: '',
        branch_name: '',
        branch_code: '',
        coach_name: '',
        coach_reg_no: '',
        parent_signature: false,
        coach_signature: false,
        student_signature: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.parent_signature || !formData.coach_signature || !formData.student_signature) {
            alert('All three digital signatures (checkboxes) are required at the bottom of the form.');
            return;
        }

        setIsSubmitting(true);
        // Explicitly map formData to ensure database columns match exactly
        const payload = {
            full_name: formData.full_name,
            father_name: formData.father_name,
            mother_name: formData.mother_name,
            dob: formData.dob,
            gender: formData.gender,
            blood_group: formData.blood_group,
            mobile_no: formData.mobile_no,
            address: formData.address,
            pin_code: formData.pin_code,
            branch_name: formData.branch_name,
            branch_code: formData.branch_code,
            coach_name: formData.coach_name,
            coach_reg_no: formData.coach_reg_no,
            agreed_to_waiver: true // Kept for legacy compatibility
        };

        const { error } = await supabase.from('athletes').insert([payload]);

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
                    <p className="text-gray-600">Your admission form has been securely sent to Jila Taekwondo Association.</p>
                    <div className="mt-4 p-4 bg-yellow-50 text-sm text-yellow-800 text-left rounded border border-yellow-200">
                        <strong>Mandatory Next Steps:</strong><br />
                        1. Submit a copy of your DOB certificate to your coach.<br />
                        2. Provide two physical photographs to your coach.
                    </div>
                    <button onClick={() => window.location.reload()} className="mt-6 text-sm font-bold text-gray-900 underline">Submit another form</button>
                </div>
            </main>
        );
    }

    return (
        <main className="p-8 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl font-black mb-2 uppercase border-l-4 border-red-600 pl-4">Admission Form</h1>
            <p className="text-gray-500 mb-8 ml-5">Official Digital Registration for Jila Taekwondo Association</p>

            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">

                {/* Personal Details */}
                <h3 className="text-xl font-bold border-b pb-2 uppercase">1. Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Name (In Capital Letters) *</label>
                        <input type="text" required className="w-full border p-2 rounded uppercase"
                            value={formData.full_name}
                            onChange={e => setFormData({ ...formData, full_name: e.target.value.toUpperCase() })} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Father's Name *</label>
                        <input type="text" required className="w-full border p-2 rounded"
                            onChange={e => setFormData({ ...formData, father_name: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Mother's Name *</label>
                        <input type="text" required className="w-full border p-2 rounded"
                            onChange={e => setFormData({ ...formData, mother_name: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Date of Birth *</label>
                        <input type="date" required className="w-full border p-2 rounded"
                            onChange={e => setFormData({ ...formData, dob: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Gender *</label>
                        <select required className="w-full border p-2 rounded bg-white"
                            onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                            <option value="">Select...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
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
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Mobile No. *</label>
                        <input type="tel" required className="w-full border p-2 rounded"
                            onChange={e => setFormData({ ...formData, mobile_no: e.target.value })} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Address *</label>
                    <textarea required rows={2} className="w-full border p-2 rounded"
                        onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Pin Code *</label>
                    <input type="text" required className="w-1/2 border p-2 rounded"
                        onChange={e => setFormData({ ...formData, pin_code: e.target.value })} />
                </div>

                {/* Association Details */}
                <h3 className="text-xl font-bold border-b pb-2 uppercase mt-8">2. Association Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Branch *</label>
                        <input type="text" required className="w-full border p-2 rounded"
                            onChange={e => setFormData({ ...formData, branch_name: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Branch Code *</label>
                        <input type="text" required className="w-full border p-2 rounded"
                            onChange={e => setFormData({ ...formData, branch_code: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Coach Name *</label>
                        <input type="text" required className="w-full border p-2 rounded"
                            onChange={e => setFormData({ ...formData, coach_name: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Coach's Registration No. *</label>
                        <input type="text" required className="w-full border p-2 rounded"
                            onChange={e => setFormData({ ...formData, coach_reg_no: e.target.value })} />
                    </div>
                </div>

                {/* Legal Declaration */}
                <div className="border-2 border-red-200 bg-red-50 p-6 rounded-xl mt-8">
                    <h3 className="text-lg font-black uppercase text-red-800 mb-2">Declaration</h3>
                    <p className="text-sm text-red-900 leading-relaxed text-justify mb-6 font-medium">
                        I, the undersigned do hereby solemnly affirm, declare and confirm for myself, my heirs, executors & administrators that I indemnify the Promoters/ Organisers / Sponsors & its Members, Officials, Participants etc., holding myself personally responsible for all damages, injuries of accidents, claims, demands etc., waiving all prerogative rights, whatsoever related to the above set training. I have been also made aware about the risks involved in the game and I am sending my ward willingly. I will not claim any type of compensation towards Jila Taekwondo Association. In case of any injury or casualty I will be solely responsible and not lodge any case against Jila Taekwondo Association, association officials, coach or administration.
                    </p>

                    <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" required className="w-5 h-5 text-red-600" onChange={e => setFormData({ ...formData, parent_signature: e.target.checked })} />
                            <span className="text-sm font-bold">Signature of Parent / Guardian</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" required className="w-5 h-5 text-red-600" onChange={e => setFormData({ ...formData, coach_signature: e.target.checked })} />
                            <span className="text-sm font-bold">Signature of Coach (Acknowledged)</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" required className="w-5 h-5 text-red-600" onChange={e => setFormData({ ...formData, student_signature: e.target.checked })} />
                            <span className="text-sm font-bold">Signature of Student</span>
                        </label>
                    </div>
                </div>

                <div className="text-xs text-gray-500 font-semibold p-4 bg-gray-100 rounded">
                    Note: 1. Copy of the date of birth certificate received from municipal authority should be attached with the form physically to the coach.<br />
                    2. Two photographs should be attached/provided physically.
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 text-white font-bold py-4 rounded-md hover:bg-red-700 transition disabled:bg-gray-400 text-lg shadow-lg">
                    {isSubmitting ? 'Submitting...' : 'Submit Admission Form'}
                </button>
            </form>
        </main>
    );
}