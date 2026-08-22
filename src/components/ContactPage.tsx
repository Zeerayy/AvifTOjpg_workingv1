import React, { useState } from 'react';
import { PageId } from '../types';
import { useLocale } from '../context/LocaleContext';
import { Mail, MessageSquare, Send, CheckCircle2, ArrowLeft } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { t } = useLocale();
  const ct = t.pages.contact;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    const subject = encodeURIComponent(`AVIFtoJPG.in Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${ct.emailAddress}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8 md:p-10 space-y-7 text-gray-800">
      <div className="border-b border-gray-100 pb-4 space-y-2">
        <div className="flex items-center gap-2 text-teal-700 font-bold text-xs tracking-wider uppercase">
          <Mail className="w-4 h-4" />
          <span>{t.meta.contactTitle}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {ct.title}
        </h1>
        <p className="text-sm text-gray-600">
          {ct.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Contact Info & Guidelines */}
        <div className="space-y-5">
          <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-5 sm:p-6 space-y-3.5">
            <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-600" />
              {ct.emailLabel}
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed">
              {ct.emailDesc}
            </div>
            <a
              href={`mailto:${ct.emailAddress}`}
              className="inline-block font-mono text-sm font-semibold text-teal-800 hover:text-teal-950 bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded transition-colors"
            >
              {ct.emailAddress}
            </a>
            <div className="text-xs text-gray-500 font-medium">
              {ct.responseTime}
            </div>
          </div>

          <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-5 sm:p-6 space-y-2.5">
            <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-teal-600" />
              {ct.noteTitle}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {ct.noteText}
            </p>
            <button
              onClick={() => onNavigate('avif-to-jpg')}
              className="text-sm font-semibold text-teal-700 hover:underline cursor-pointer pt-1 inline-block"
            >
              {t.footer.navHome} →
            </button>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6 space-y-4">
          <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-teal-600" />
            {ct.title}
          </h2>

          {submitted ? (
            <div className="bg-teal-50 border border-teal-200 text-teal-900 p-4 rounded-lg text-sm space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Message Client Triggered</span>
              </div>
              <p className="text-sm text-teal-900">
                Your email client was opened. You can also send directly to <strong>{ct.emailAddress}</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm text-teal-700 font-semibold underline mt-2 cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help?"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm py-2.5 rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Email</span>
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-start">
        <button
          onClick={() => onNavigate('avif-to-jpg')}
          className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.footer.navHome}</span>
        </button>
      </div>
    </div>
  );
};
