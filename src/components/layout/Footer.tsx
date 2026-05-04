import { Instagram, Facebook, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../constants';

export default function Footer() {
  return (
    <footer className="bg-warm-ink text-warm-bg pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-6">{SITE_CONFIG.name}</h3>
            <p className="text-warm-bg/60 max-w-md leading-relaxed mb-8">
              「{SITE_CONFIG.slogan}」<br />
              {SITE_CONFIG.description}
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-warm-bg/80">
                <MapPin size={20} className="text-white/40" />
                <span>{SITE_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center space-x-3 text-2xl font-medium">
                <Phone size={24} className="text-white/40" />
                <span>{SITE_CONFIG.contact.phone}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-40 text-white">メニュー</h4>
            <ul className="space-y-4 text-warm-bg/70">
              <li><Link to="/about" className="hover:text-white transition-colors">施設理念</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">サービス内容</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">活動ギャラリー</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">お問い合わせ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-40 text-white">SNSメディア</h4>
            <div className="flex space-x-6">
              <a href={SITE_CONFIG.social.instagram} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-warm-ink transition-all">
                <Instagram size={20} />
              </a>
              <a href={SITE_CONFIG.social.facebook} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-warm-ink transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs opacity-40 tracking-wider">
          <p>© 2026 {SITE_CONFIG.name} All Rights Reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#">プライバシーポリシー</a>
            <a href="#">利用規約</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
