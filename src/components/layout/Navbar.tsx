import { motion } from 'motion/react';
import { Menu, X, Smile, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';

const navItems = [
  { name: 'HOME', path: '/' },
  { name: '施設理念', path: '/about' },
  { name: 'サービス', path: '/services' },
  { name: 'ギャラリー', path: '/gallery' },
  { name: 'お問い合わせ', path: '/contact' },
];

const ShokenMascot = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Wings */}
    <path d="M8 8C6 6 4 9 7 11M16 8C18 6 20 9 17 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="white" fillOpacity="0.4" />
    {/* Body */}
    <circle cx="12" cy="12" r="8" fill="#FACC15" />
    <path d="M6 10C6 10 9 9 12 9C15 9 18 10 18 10M6 14C6 14 9 15 12 15C15 15 18 14 18 14" stroke="#422006" strokeWidth="1.5" strokeLinecap="round" />
    {/* Eyes */}
    <circle cx="10" cy="11.5" r="1" fill="#422006" />
    <circle cx="14" cy="11.5" r="1" fill="#422006" />
    {/* Smile */}
    <path d="M11 14C11 14 11.5 15 12 15C12.5 15 13 14 13 14" stroke="#422006" strokeWidth="1" strokeLinecap="round" />
    {/* Antenna */}
    <path d="M11 5L10 3M13 5L14 3" stroke="#422006" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, isAdmin } = useAuth();
  const location = useLocation();

  const handleLogout = () => signOut(auth);

  return (
    <nav className="sticky top-0 z-50 bg-warm-bg/80 backdrop-blur-md border-b border-warm-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-12 h-12 bg-white border-2 border-warm-accent rounded-full flex items-center justify-center p-1.5 transition-transform group-hover:scale-110 shadow-sm">
              <ShokenMascot className="w-full h-full text-warm-accent" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-warm-ink font-serif leading-none mb-1">デイサービス笑健</span>
              <span className="text-[10px] uppercase tracking-widest opacity-60">Day Service Shoken</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-warm-accent ${
                  location.pathname === item.path ? 'text-warm-accent' : 'text-warm-ink/70'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {isAdmin && (
              <Link to="/admin" className="p-2 text-warm-accent hover:bg-warm-accent/10 rounded-full transition-colors">
                <LayoutDashboard size={20} />
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-warm-ink/10">
                <Link to="/mypage" className="flex items-center space-x-2 text-sm font-medium text-warm-ink/70 hover:text-warm-ink">
                  <User size={18} />
                  <span>{profile?.displayName}様</span>
                </Link>
                <button onClick={handleLogout} className="text-warm-ink/50 hover:text-red-500 transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-6 py-2 bg-warm-accent text-white rounded-full text-sm font-medium hover:bg-opacity-90 transition-all shadow-sm"
              >
                ログイン
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-warm-ink p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-warm-bg border-b border-warm-ink/10 px-4 pt-2 pb-6 space-y-2"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-medium text-warm-ink hover:bg-warm-accent/10 rounded-xl transition-colors"
            >
              {item.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-medium text-warm-accent border-t border-warm-ink/10"
            >
              管理者パネル
            </Link>
          )}
          {user ? (
            <div className="pt-4 border-t border-warm-ink/10 flex items-center justify-between px-3">
              <span className="text-sm font-medium">{profile?.displayName}様</span>
              <button onClick={handleLogout} className="text-red-500 text-sm">ログアウト</button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-3 py-4 bg-warm-accent text-white rounded-xl font-medium"
            >
              ログイン
            </Link>
          )}
        </motion.div>
      )}
    </nav>
  );
}
