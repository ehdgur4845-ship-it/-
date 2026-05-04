import { motion } from 'motion/react';
import { Clock, Utensils, Smile, Sun, Moon } from 'lucide-react';

const schedule = [
  { time: "09:00", title: "ご利用者様のお迎え (送迎)", description: "安全で快適な専用車両で、ご利用者様をお迎えに上がる時間です。" },
  { time: "10:30", title: "健康チェックとお茶の時間", description: "血圧、体温チェックの後、温かいお茶と共に談笑を楽しみます。" },
  { time: "11:30", title: "入浴・レクリエーション", description: "個々の体調に合わせたゆったりとした入浴時間や、楽しいレクリエーションを行います。" },
  { time: "12:30", title: "休息と談笑の時間", description: "ゆったりとした空間で、他の方々との交流や自由な時間をお過ごしいただけます。" },
  { time: "14:00", title: "笑いプログラム", description: "専門スタッフと共に行うレクリエーションや認知機能向上のための活動時間です。" },
  { time: "16:00", title: "午後のおやつと休憩", description: "旬の果物や栄養価の高いおやつを楽しみながら、ゆったりと休憩します。" },
  { time: "17:30", title: "安全なお帰り (送迎)", description: "ご家族のもとまで、安全にお送りいたします。" },
];

export default function Services() {
  return (
    <div className="pb-24">
      {/* Page Header */}
      <section className="bg-warm-accent py-24 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-serif font-bold italic mb-6">サービス紹介</h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            専門的なチームワークで、ご利用者様の一日を健康と笑顔で満たします。
          </p>
        </div>
      </section>

      {/* Tabs / Anchors */}
      <div className="sticky top-20 z-40 bg-warm-bg/90 backdrop-blur-md border-b border-warm-ink/5 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-center space-x-8">
            <a href="#routine" className="text-sm font-bold tracking-widest uppercase hover:text-warm-accent transition-colors">一日の流れ</a>
            <a href="#bath" className="text-sm font-bold tracking-widest uppercase hover:text-warm-accent transition-colors">入浴と交流</a>
            <a href="#meal" className="text-sm font-bold tracking-widest uppercase hover:text-warm-accent transition-colors">お食事</a>
        </div>
      </div>

      {/* Daily Routine */}
      <section id="routine" className="py-24 max-w-5xl mx-auto px-4">
        <div className="flex items-center space-x-4 mb-16 justify-center md:justify-start">
            <div className="w-12 h-12 bg-warm-accent/10 rounded-2xl flex items-center justify-center text-warm-accent">
                <Clock size={24} />
            </div>
            <h2 className="text-3xl font-serif font-bold text-warm-ink italic">一日の流れ</h2>
        </div>

        <div className="space-y-12 relative before:absolute before:left-[19px] md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-warm-ink/10">
          {schedule.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-start md:items-center w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 w-full md:pr-12 md:text-right md:even:text-left md:even:pl-12">
                {i % 2 !== 0 && (
                  <div className="hidden md:block">
                    <span className="text-4xl font-serif font-black text-warm-accent/20 mb-2 block italic">{item.time}</span>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-warm-ink/60">{item.description}</p>
                  </div>
                )}
                {i % 2 === 0 && (
                  <div className="block md:hidden mb-12">
                     <span className="text-4xl font-serif font-black text-warm-accent/20 mb-2 block italic">{item.time}</span>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-warm-ink/60">{item.description}</p>
                  </div>
                )}
              </div>

              <div className="relative z-10 w-10 h-10 bg-warm-bg border-4 border-warm-accent rounded-full flex items-center justify-center shrink-0 mb-6 md:mb-0">
                 {item.time.startsWith('0') || item.time.startsWith('10') || item.time.startsWith('11') ? <Sun size={14} className="text-warm-accent" /> : <Moon size={14} className="text-warm-accent" />}
              </div>

              <div className="flex-1 w-full md:pl-12 md:odd:pr-12 md:odd:text-right">
                {i % 2 === 0 && (
                   <div className="hidden md:block">
                   <span className="text-4xl font-serif font-black text-warm-accent/20 mb-2 block italic">{item.time}</span>
                   <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                   <p className="text-warm-ink/60">{item.description}</p>
                 </div>
                )}
                {i % 2 !== 0 && (
                  <div className="block md:hidden mb-12">
                   <span className="text-4xl font-serif font-black text-warm-accent/20 mb-2 block italic">{item.time}</span>
                   <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                   <p className="text-warm-ink/60">{item.description}</p>
                 </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bathing & Social Section */}
      <section id="bath" className="py-24 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-12 h-12 bg-warm-accent/10 rounded-2xl flex items-center justify-center text-warm-accent mb-6">
                    <Smile size={24} />
                </div>
                <h2 className="text-4xl font-serif font-bold mb-8 italic">心安らぐ入浴と交流</h2>
                <p className="text-lg text-warm-ink/60 leading-relaxed mb-8">
                    清潔で安全な設備の中での入浴サービスや、ご利用者様同士の温かな交流を大切にしています。
                    お一人おひとりのペースを尊重し、スタッフが優しくサポートいたします。
                </p>
                <ul className="space-y-4">
                    {['個別入浴サポート', '手工芸・レクリエーション', '季節の行事・おやつ', '談笑・お茶の時間'].map((item, i) => (
                        <li key={i} className="flex items-center space-x-3 text-warm-ink/80 font-medium">
                            <div className="w-2 h-2 bg-warm-accent rounded-full" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-[30px] overflow-hidden aspect-square mt-12">
                      <img src="https://images.unsplash.com/photo-1540336109968-3e5e48d3db8b?auto=format&fit=crop&q=80&w=600" alt="Activity 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-[30px] overflow-hidden aspect-square">
                      <img src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=600" alt="Activity 2" className="w-full h-full object-cover" />
                  </div>
              </div>
          </div>
      </section>

      {/* Meal Service Section */}
      <section id="meal" className="py-24 bg-white border-t border-warm-ink/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-12 h-12 bg-warm-accent/10 rounded-2xl flex items-center justify-center text-warm-accent mx-auto mb-6">
            <Utensils size={24} />
          </div>
          <h2 className="text-4xl font-serif font-bold mb-8 italic">お食事の提供</h2>
          <p className="text-lg text-warm-ink/60 leading-relaxed max-w-2xl mx-auto mb-12">
            お身体の状態に合わせた調理で、安全にお召し上がりいただけます。
          </p>
          <div className="inline-block bg-warm-bg rounded-[30px] p-8 border border-warm-ink/5">
            <div className="flex flex-col sm:flex-row items-center gap-8 px-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-warm-accent rounded-full" />
                <span className="font-bold text-warm-ink">手作りの味</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-warm-accent rounded-full" />
                <span className="font-bold text-warm-ink">栄養バランス</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-warm-accent rounded-full" />
                <span className="font-bold text-warm-ink">個別調理対応</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
