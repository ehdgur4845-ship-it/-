import { motion } from 'motion/react';
import { Smile, Coffee, Users, ChevronRight, Utensils, Heart, Camera, MapPin, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../constants';

const features = [
  {
    icon: <Smile className="text-warm-accent" />,
    title: "機能訓練・認知予防",
    description: "理学療法に基づいた訓練や最新のプログラムで、心身の活力をサポートします。"
  },
  {
    icon: <Utensils className="text-warm-accent" />,
    title: "お食事の提供",
    description: "一人ひとりに合わせた調理法で、安全で美味しい食事を提供いたします。"
  },
  {
    icon: <Heart className="text-warm-accent" />,
    title: "入浴・身体介助",
    description: "お身体の状態に合わせた安全な介助で、清潔で心地よい時間を提供します。"
  },
];

const ShokenMascot = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 8C6 6 4 9 7 11M16 8C18 6 20 9 17 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="white" fillOpacity="0.4" />
    <circle cx="12" cy="12" r="8" fill="#FACC15" />
    <path d="M6 10C6 10 9 9 12 9C15 9 18 10 18 10M6 14C6 14 9 15 12 15C15 15 18 14 18 14" stroke="#422006" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="11.5" r="1" fill="#422006" />
    <circle cx="14" cy="11.5" r="1" fill="#422006" />
    <path d="M11 14C11 14 11.5 15 12 15C12.5 15 13 14 13 14" stroke="#422006" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-warm-bg">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&w=2688&auto=format&fit=crop" 
            alt="Mascot Pomeranian"
            className="w-full h-full object-cover brightness-95 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-warm-bg/95 via-warm-bg/60 to-transparent" />
          
          {/* Floating Mascot Effect */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute bottom-24 right-24 hidden lg:block z-20"
          >
            <div className="relative">
                <div className="absolute -inset-8 bg-warm-accent/20 rounded-full blur-3xl" />
                <div className="w-56 h-56 bg-white rounded-[50px] shadow-2xl p-8 border-4 border-warm-accent flex flex-col items-center justify-center">
                    <ShokenMascot className="w-28 h-28 mb-3 text-warm-accent" />
                    <p className="text-warm-ink font-bold text-center text-sm leading-tight">
                        管理者わらびが <br /> 皆様をお待ちしています！
                    </p>
                </div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center space-x-4 mb-6">
                <span className="inline-block px-4 py-1.5 bg-warm-accent/10 text-warm-accent rounded-full text-sm font-semibold tracking-wider">
                  宮城県岩沼市の地域密着型デイサービス
                </span>
            </div>
            <h1 className="text-6xl sm:text-7xl font-serif font-bold text-warm-ink leading-[1.1] mb-8">
              笑う門には <br />
              <span className="text-warm-accent italic font-medium">健康</span>が来たる
            </h1>
            <p className="text-xl text-warm-ink/70 leading-relaxed mb-10 max-w-lg">
              {SITE_CONFIG.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="px-8 py-4 bg-warm-accent text-white rounded-full font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                お問い合わせ
              </Link>
              <Link to="/facility" className="px-8 py-4 bg-white text-warm-ink border border-warm-ink/10 rounded-full font-bold text-lg hover:bg-warm-bg transition-all text-center text-nowrap">
                案内
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-warm-bg overflow-hidden text-center lg:text-left">
          <div className="max-w-7xl mx-auto px-4 lg:flex items-center gap-20">
              <div className="flex-1">
                  <span className="text-sm font-bold uppercase tracking-[0.3em] text-warm-accent opacity-60 mb-6 block">私たちの理念</span>
                  <h2 className="text-4xl sm:text-5xl font-serif font-bold text-warm-ink mb-10 leading-tight">
                    家よりも笑顔が <br />
                    <span className="italic text-warm-accent font-medium">あふれる場所</span>へ
                  </h2>
                  <div className="space-y-8 text-lg text-warm-ink/60 leading-relaxed italic">
                      <p>
                        私たちは、ご利用者様が単にサービスを受ける側ではなく、一人の「主役」として輝ける時間を大切にしています。
                        温かな手と心のこもったケアが、明日の活力へとつながります。
                      </p>
                  </div>
              </div>
              <div className="flex-1 mt-12 lg:mt-0 grid grid-cols-2 gap-8">
                  <div className="bg-white p-10 rounded-[40px] shadow-sm border border-warm-ink/5">
                      <p className="text-4xl font-serif font-bold text-warm-ink italic mb-2">120%</p>
                      <p className="text-sm border-t border-warm-ink/10 pt-2 font-medium">利用満足度</p>
                  </div>
                  <div className="bg-white p-10 rounded-[40px] shadow-sm border border-warm-ink/5">
                      <p className="text-4xl font-serif font-bold text-warm-ink italic mb-2">365日</p>
                      <p className="text-sm border-t border-warm-ink/10 pt-2 font-medium">安心のサポート</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-warm-bg p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all border border-warm-ink/5"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-warm-ink mb-4">{feature.title}</h3>
                <p className="text-warm-ink/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-warm-accent rounded-[60px] overflow-hidden relative flex flex-col md:flex-row items-center p-12 md:p-24 text-white">
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
            <div className="relative z-10 flex-1 mb-12 md:mb-0">
              <div className="flex items-center space-x-3 mb-6">
                 <Camera size={32} strokeWidth={1.5} />
                 <span className="text-sm font-bold uppercase tracking-widest opacity-60">Daily Gallery</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight italic">
                毎日更新される大切な人の笑顔、 <br />
                今すぐご確認ください。
              </h2>
              <div className="flex flex-wrap gap-4">
                <Link to="/gallery" className="px-8 py-4 bg-white text-warm-accent rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                  ギャラリーを見る <ChevronRight size={20} />
                </Link>
                <Link to="/contact" className="px-8 py-4 border border-white/30 rounded-full font-bold hover:bg-white/10 transition-colors">
                  ご利用相談
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
