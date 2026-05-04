import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Info, Award, Heart, Smile } from 'lucide-react';
import { SITE_CONFIG } from '../constants';

export default function FacilityInfo() {
  return (
    <div className="pb-24">
      {/* Hero Header */}
      <section className="bg-warm-bg py-24 text-center border-b border-warm-ink/5">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-serif font-bold italic mb-6">施設理念</h1>
          <p className="text-xl text-warm-ink/50 max-w-2xl mx-auto italic uppercase tracking-widest text-sm mb-4">私たちの想い</p>
          <div className="w-24 h-1 bg-warm-accent mx-auto rounded-full" />
        </div>
      </section>

      {/* Greeting Section */}
      <section className="py-24 max-w-3xl mx-auto px-4 text-center">
          <div>
              <span className="text-warm-accent font-bold uppercase tracking-widest text-sm mb-4 block">管理者からのご挨拶</span>
              <h2 className="text-4xl font-serif font-bold text-warm-ink mb-10 leading-tight italic">
                  "ご利用者様の健やかな笑顔が、 <br />
                  私たちの社会の未来です。"
              </h2>
              <div className="space-y-6 text-lg text-warm-ink/70 leading-relaxed italic">
                  <p>
                      {SITE_CONFIG.facility.directorGreeting}
                  </p>
              </div>
              <div className="mt-12 flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-warm-ink/5 flex items-center justify-center italic font-serif text-2xl font-bold">笑</div>
                  <div>
                      <p className="text-xl font-bold">{SITE_CONFIG.facility.directorTitle} {SITE_CONFIG.facility.director}</p>
                      <p className="text-sm opacity-50 uppercase tracking-widest font-bold text-[#422006]">Nobuko Inomata</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-20">
                  <h2 className="text-3xl font-serif font-bold italic mb-4">{SITE_CONFIG.name}の理念</h2>
                  <div className="w-16 h-1 bg-warm-accent/20 mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { icon: <Smile className="text-warm-accent" />, title: "Joy (楽しみ)", desc: "作り笑いではなく、心から湧き上がる真の楽しみを追求します。" },
                      { icon: <Heart className="text-warm-accent" />, title: "Sincerity (真真心)", desc: "自分の親に接するような気持ちで、すべてのサービスに真心を込めます。" },
                      { icon: <Award className="text-warm-accent" />, title: "Hospitality (おもてなし)", desc: "温かいおもてなしの心で、ご利用者様が自宅のようにリラックスできる空間を提供します。" }
                  ].map((item, i) => (
                      <div key={i} className="p-12 bg-warm-bg rounded-[50px] text-center hover:shadow-xl transition-shadow border border-warm-ink/5 group">
                          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform">
                              {item.icon}
                          </div>
                          <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                          <p className="text-warm-ink/60 leading-relaxed font-medium text-sm italic">{item.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Location Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
          <div className="bg-warm-ink rounded-[60px] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
               <div className="flex-1 p-12 lg:p-24 text-white">
                  <h2 className="text-3xl font-serif font-bold mb-12 italic">アクセスマップ</h2>
                  <div className="space-y-12">
                      <div className="flex items-start space-x-6">
                            <MapPin className="opacity-40 shrink-0" size={28} />
                            <div>
                                <p className="text-sm uppercase tracking-widest font-bold opacity-40 mb-2">所在地</p>
                                <p className="text-xl font-medium leading-relaxed">
                                    {SITE_CONFIG.contact.address}
                                </p>
                            </div>
                      </div>
                      <div className="flex items-start space-x-6">
                            <Clock className="opacity-40 shrink-0" size={28} />
                            <div>
                                <p className="text-sm uppercase tracking-widest font-bold opacity-40 mb-2">営業時間</p>
                                <p className="text-xl font-medium leading-relaxed">
                                    {SITE_CONFIG.contact.hours} <br />
                                    <span className="text-sm opacity-60">※ {SITE_CONFIG.contact.closed}</span>
                                </p>
                            </div>
                      </div>
                  </div>
                  <div className="mt-20">
                      <button className="px-10 py-4 bg-white text-warm-ink rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
                          Googleマップで見る <Info size={16} />
                      </button>
                  </div>
              </div>
              <div className="flex-1 h-[500px] lg:h-auto bg-warm-ink/20 relative grayscale hover:grayscale-0 transition-all duration-700">
                  <iframe 
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE_CONFIG.contact.address)}&t=&z=17&ie=UTF8&iwloc=&output=embed`} 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
              </div>
          </div>
      </section>
    </div>
  );
}
