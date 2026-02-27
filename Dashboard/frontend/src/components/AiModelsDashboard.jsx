import React from 'react';
import { Mail, Globe, Key, MessageSquare, Eye, ShieldCheck, Lock, FileText, Search } from 'lucide-react';

const ModelCard = ({ icon: Icon, title, description, accuracy, status = "online" }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-green-500 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
        {status}
      </span>
    </div>
    
    <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed mb-6 h-10 line-clamp-2">
      {description}
    </p>
    
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs font-medium text-slate-400">
        <span>Accuracy</span>
        <span className="text-green-600 font-bold">{accuracy}%</span>
      </div>
      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-green-500 h-full rounded-full" 
          style={{ width: `${accuracy}%` }}
        ></div>
      </div>
    </div>
  </div>
);

const AiModelsDashboard = () => {
  const models = [
    { icon: Mail, title: "Email Phishing Detection", description: "AI-powered phishing email detection using machine learning", accuracy: 94.2 },
    { icon: Globe, title: "Malicious URL Detection", description: "Detect malicious URLs and protect against cyber threats", accuracy: 96.8 },
    { icon: Key, title: "Password Strength Checker", description: "Advanced password strength analysis and suggestions", accuracy: 98.1 },
    { icon: MessageSquare, title: "Sentiment Analysis", description: "Natural language processing for sentiment analysis", accuracy: 95.3 },
    { icon: Eye, title: "Deep Fake Detection", description: "AI-powered deep fake video and image detection", accuracy: 91.7 },
    { icon: ShieldCheck, title: "Fraud Detection", description: "Real-time transaction fraud detection system", accuracy: 93.5 },
    { icon: Lock, title: "File Encryption", description: "Secure file encryption and decryption services", accuracy: 97.0 },
    { icon: FileText, title: "Steganography", description: "Hide and extract data in images using steganography", accuracy: 89.9 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-20">
      {}
      <header className="flex justify-center pt-8 px-4">
        <nav className="bg-[#475569] rounded-full px-2 py-1.5 flex items-center gap-6 shadow-xl">
          <div className="flex items-center gap-2 pl-4 pr-2 border-r border-slate-500">
            <div className="w-6 h-6 bg-gradient-to-tr from-blue-400 to-emerald-400 rounded-sm italic font-black text-[10px] flex items-center justify-center text-white">S</div>
            <span className="text-white text-xs font-bold uppercase tracking-tighter italic">Secure</span>
          </div>
          
          <div className="hidden md:flex gap-6 text-[11px] font-semibold text-slate-300 uppercase tracking-widest">
            <a href="#" className="hover:text-white">Dashboard</a>
            <a href="#" className="text-white border-b border-white pb-0.5">ML Models</a>
            <a href="#" className="hover:text-white">Demo</a>
            <a href="#" className="hover:text-white">Threat Report</a>
          </div>

          <button className="bg-[#EF4444] text-white text-[11px] font-bold uppercase tracking-widest px-6 py-2 rounded-full shadow-lg shadow-red-500/20 hover:bg-red-600 transition-colors">
            Alert Security
          </button>
        </nav>
      </header>

      {}
      <main className="max-w-6xl mx-auto mt-16 px-6">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Our AI Models</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Eight specialized machine learning models working together to provide comprehensive cybersecurity solutions.
          </p>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {models.map((model, idx) => (
            <ModelCard key={idx} {...model} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AiModelsDashboard;