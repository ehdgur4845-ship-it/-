import { motion } from 'motion/react';
import { Smile } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-warm-bg px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[40px] p-12 shadow-xl border border-warm-ink/5 text-center"
      >
        <div className="w-16 h-16 bg-warm-accent rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-lg">
          <Smile size={32} />
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-warm-ink mb-2 italic">デイサービス笑健</h1>
        <p className="text-warm-ink/50 text-sm mb-12 uppercase tracking-widest font-medium">Guardian Portal</p>
        
        <p className="text-warm-ink/70 mb-10 leading-relaxed">
          ご家族様専用のサービスです。<br />
          ログインして、大切なご家族の日常をご確認ください。
        </p>

        {error && <p className="text-red-500 text-sm mb-6 bg-red-50 p-3 rounded-xl">{error}</p>}

        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-warm-ink text-white rounded-full font-bold hover:bg-opacity-90 transition-all shadow-md group"
        >
          <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-warm-ink font-bold text-[10px] group-hover:scale-110 transition-transform">G</span>
          <span>Googleでログイン</span>
        </button>

        <p className="mt-12 text-xs text-warm-ink/30 leading-relaxed uppercase tracking-widest font-semibold">
          Secure Access for Family Members
        </p>
      </motion.div>
    </div>
  );
}
