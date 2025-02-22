import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <p className="mb-4">
                Welcome to our event management platform. We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
            <p className="mb-4">
                We may collect personal information such as your name, email address, phone number, and payment details when you register for an event or use our services.
            </p>
            <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
            <p className="mb-4">
                Your information is used to manage event registrations, process payments, and communicate with you about event details. We may also use your data to improve our services and provide customer support.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
            <p className="mb-4">
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
            <p className="mb-4">
                We may share your information with third-party service providers who assist us in operating our platform and conducting our business. These providers are obligated to keep your information confidential.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Your Consent</h2>
            <p className="mb-4">
                By using our platform, you consent to our Privacy Policy. If you do not agree with our policies, please do not use our services.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Changes to Our Privacy Policy</h2>
            <p className="mb-4">
                We may update our Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review our policy periodically.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p className="mb-4">
                If you have any questions or concerns about our Privacy Policy, please contact us at privacy@example.com.
            </p>
        </div>
    );
};

export default PrivacyPolicy;