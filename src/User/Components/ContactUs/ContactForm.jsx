import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        
        if (!formData.firstName || !formData.phone || !formData.message) {
            alert('Please fill in all required fields: First Name, Phone Number, and Message');
            return;
        }

        // Format the message for WhatsApp
        const whatsappMessage = `
*New Contact Form Submission*

*Name:* ${formData.firstName} ${formData.lastName}
*Email:* ${formData.email || 'Not provided'}
*Phone:* ${formData.phone}
*Message:*
${formData.message}

*Sent via Poky Store Website*
        `.trim();

        
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappNumber = '917994237001'; 
        
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
       
        window.open(whatsappUrl, '_blank');
        
        
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
        });
        
       
        alert('Redirecting to WhatsApp... Please send the pre-filled message to complete your inquiry.');
    };

    return (
        <div>
            <div className="text-center py-12 px-4">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
                <p className="text-gray-600">Any question or remarks? Just write us a message!</p>
            </div>
            <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">

                <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}

                    {/* Main Content */}
                    <div className="grid md:grid-cols-5 gap-0">
                        {/* Left Side - Contact Information */}
                        <div className="md:col-span-2 bg-black text-white p-10 relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-3xl font-semibold mb-3">Contact Information</h2>
                                <p className="text-gray-400 mb-12">Say something to start a live chat!</p>

                                {/* Contact Details */}
                                <div className="space-y-8 mb-16">
                                    <div className="flex items-center gap-4">
                                        <Phone className="w-5 h-5" />
                                        <span>+91 79942 37001</span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Mail className="w-5 h-5" />
                                        <span>pokyonline@gmail.com</span>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                                        <span>Poky Store - Adam square, Angamaly - 680308</span>
                                    </div>
                                </div>

                                {/* Social Media Icons */}
                                <div className="flex gap-4">
                                    <button className="w-10 h-10 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition">
                                        <FaTwitter className="w-5 h-5 text-white" />
                                    </button>
                                    <button className="w-10 h-10 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition">
                                        <FaInstagram className="w-5 h-5 text-white" />
                                    </button>
                                    <button className="w-10 h-10 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition">
                                        <FaLinkedin className="w-5 h-5 text-white" />
                                    </button>
                                </div>

                            </div>

                            {/* Decorative Circle */}
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gray-900 rounded-full transform translate-x-1/3 translate-y-1/3"></div>
                            <div className="absolute bottom-24 right-12 w-32 h-32 bg-gray-800 rounded-full"></div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="md:col-span-3 p-10">
                            <div className="space-y-8">
                                {/* Name Fields */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-2">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 focus:border-black outline-none py-2 transition"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 focus:border-black outline-none py-2 transition"
                                        />
                                    </div>
                                </div>

                                {/* Email and Phone */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 focus:border-black outline-none py-2 transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-2">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 focus:border-black outline-none py-2 transition"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write your message..."
                                        rows="4"
                                        className="w-full border-b border-gray-300 focus:border-black outline-none py-2 resize-none transition"
                                        required
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end pt-4">
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-black text-white px-12 py-3 rounded-md hover:bg-gray-800 transition font-medium"
                                    >
                                        Send via WhatsApp
                                    </button>
                                </div>

                                {/* Note */}
                                <div className="text-sm text-gray-500 text-center">
                                    <p>You'll be redirected to WhatsApp to send your message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}