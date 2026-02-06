import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl font-bold mb-4 gold-gradient">Privacy Policy</h1>
        <p className="text-slate-400 mb-12">Last updated: February 2024</p>

        <div className="space-y-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Introduction</h2>
            <p className="leading-relaxed">
              EliteFacesBooking ("we," "us," "our," or "Company") operates the https://elitefacesbooking.com website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Information Collection and Use</h2>
            <p className="leading-relaxed mb-4">We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            <h3 className="text-lg font-semibold mb-2 text-yellow-500">Types of Data Collected:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Personal Data: Name, Email address, Phone number, Address, Cookies & Usage Data</li>
              <li>Usage Data: Browser type, IP address, Pages visited, Time and date of visits</li>
              <li>Device Information: Device type, Operating System, Device identifiers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Use of Data</h2>
            <p className="leading-relaxed mb-4">EliteFacesBooking uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service</li>
              <li>To provide customer care and support</li>
              <li>To gather analysis or valuable information so we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Security of Data</h2>
            <p className="leading-relaxed">
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Changes to This Privacy Policy</h2>
            <p className="leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Email: elitefacesbooking@gmail.com</li>
              <li>Website: https://elitefacesbooking.com</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
