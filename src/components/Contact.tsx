'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  Clock
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/SocialIcons';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please complete all required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      // Simulate / dispatch via mailto / API endpoint
      // We also trigger a mailto fallback as standard for client-side forms
      const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${formData.subject || 'Data Analyst Role / Consulting'}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      // Simulate a small network delay for smooth feedback
      await new Promise((res) => setTimeout(res, 800));

      setStatus('success');
      setStatusMessage('Your message has been prepared! If your email client does not open automatically, you can also copy my email directly below.');
      
      // Open mailto link
      window.location.href = mailtoLink;

      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setStatusMessage('An error occurred. Please contact directly via hanzala.analyst@gmail.com.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-semibold text-cyan-400 tracking-wider uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Inquiries & Hiring</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let&apos;s Connect and <span className="text-gradient-cyan-purple">Turn Data Into Value</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Whether you are seeking a full-time Data Analyst, looking to optimize commercial sales dashboards, or interested in collaborating on BI solutions.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Professional Profiles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-white/10 shadow-2xl">
              
              <div>
                <h3 className="text-lg font-bold text-white">Contact Channels</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Prompt response within 24 business hours.
                </p>
              </div>

              {/* Email Card with Copy button */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 space-y-2">
                <span className="text-xs text-slate-400">Professional Email:</span>
                <div className="flex items-center justify-between gap-2">
                  <a 
                    href={`mailto:${PERSONAL_INFO.email}`} 
                    className="text-sm sm:text-base font-bold text-cyan-400 hover:underline truncate"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg glass-panel text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {copiedEmail && (
                  <span className="text-[11px] text-emerald-400 font-semibold block">
                    ✓ Copied to clipboard!
                  </span>
                )}
              </div>

              {/* Location & Availability */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Location & Mobility</strong>
                    <span>Karachi, Pakistan • Open to On-site, Hybrid & Global Remote Roles</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Current Status</strong>
                    <span>Open for Data Analyst, Business Intelligence & Sales Analytics Positions</span>
                  </div>
                </div>
              </div>

              {/* Working Social Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Professional Networks:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl glass-panel text-xs font-bold text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>

                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl glass-panel text-xs font-bold text-slate-200 hover:text-purple-400 hover:border-purple-500/40 transition-all"
                  >
                    <GithubIcon className="w-4 h-4 text-purple-400" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-white/10 shadow-2xl">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <span>Send a Direct Message</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fill in your details below and I will get back to you promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe / Hiring Manager"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-900/70 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Your Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-900/70 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Opportunity: Senior Data Analyst / Power BI Consulting"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-900/70 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your inquiry, project requirements, or role details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-900/70 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                {/* Feedback Toast */}
                {statusMessage && (
                  <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                    status === 'success' 
                      ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-200' 
                      : 'bg-rose-950/40 border border-rose-500/30 text-rose-200'
                  }`}>
                    {status === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <span>Dispatching Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
