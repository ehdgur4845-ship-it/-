import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, Phone, MapPin, Mail, Loader2 } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useState } from 'react';
import { SITE_CONFIG } from '../constants';

const inquirySchema = z.object({
  name: z.string().min(2, "お名前を入力してください。"),
  contact: z.string().min(10, "正確な連絡先を入力してください。"),
  grade: z.string().optional(),
  message: z.string().min(10, "相談内容を10文字以上で入力してください。"),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data: InquiryFormData) => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...data,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('お問い合わせの送信中にエラーが発生しました。しばらくしてから再度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-warm-ink py-24 text-warm-bg text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-serif font-bold italic mb-6">お問い合わせ</h1>
          <p className="text-xl opacity-60 max-w-2xl mx-auto italic uppercase tracking-widest text-sm">
             Contact Us
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-12">
          <div className="bg-white rounded-[60px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 border border-warm-ink/5">
              {/* Info Sidebar */}
              <div className="lg:col-span-2 bg-warm-accent p-12 lg:p-20 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                  <div className="relative z-10">
                    <h2 className="text-3xl font-serif font-bold mb-12 italic">ご相談窓口</h2>
                    
                    <div className="space-y-12">
                        <div className="flex items-start space-x-6">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                <Phone size={24} />
                            </div>
                            <div>
                                <p className="text-sm opacity-60 uppercase tracking-widest font-bold mb-2">電話番号</p>
                                <p className="text-2xl font-medium">{SITE_CONFIG.contact.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-6">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                <Mail size={24} />
                            </div>
                            <div>
                                <p className="text-sm opacity-60 uppercase tracking-widest font-bold mb-2">メールアドレス</p>
                                <p className="text-xl font-medium">{SITE_CONFIG.contact.email}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-6">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="text-sm opacity-60 uppercase tracking-widest font-bold mb-2">アクセス</p>
                                <p className="text-lg font-medium leading-relaxed">
                                    {SITE_CONFIG.contact.address}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-24 pt-12 border-t border-white/10">
                        <p className="text-sm italic opacity-80 leading-relaxed">
                            "専門の相談員が、施設のご利用から介護保険の申請まで、親身になってご案内いたします。"
                        </p>
                    </div>
                  </div>
              </div>

              {/* Form Area */}
              <div className="lg:col-span-3 p-12 lg:p-20">
                  {submitted ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-full flex flex-col items-center justify-center text-center"
                      >
                          <div className="w-20 h-20 bg-warm-accent/10 rounded-full flex items-center justify-center text-warm-accent mb-8">
                              <Send size={40} />
                          </div>
                          <h2 className="text-3xl font-serif font-bold text-warm-ink mb-4 italic">ありがとうございます！</h2>
                          <p className="text-warm-ink/60 mb-10 leading-relaxed">
                             お問い合わせが正常に受け付けられました。<br />
                             後ほど担当者よりご連絡させていただきます。
                          </p>
                          <button 
                            onClick={() => setSubmitted(false)}
                            className="px-8 py-3 border border-warm-ink/20 rounded-full font-bold hover:bg-warm-bg transition-colors"
                          >
                              他のお問い合わせをする
                          </button>
                      </motion.div>
                  ) : (
                    <>
                        <h2 className="text-3xl font-serif font-bold text-warm-ink mb-12 italic">オンライン相談・お問い合わせ</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest opacity-40">お名前</label>
                                    <input 
                                        {...register('name')}
                                        placeholder="山田 太郎"
                                        className="w-full bg-warm-bg/50 border border-warm-ink/10 rounded-2xl p-4 focus:bg-white focus:border-warm-accent outline-none font-medium transition-all"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs px-2">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest opacity-40">ご連絡先</label>
                                    <input 
                                        {...register('contact')}
                                        placeholder="000-0000-0000"
                                        className="w-full bg-warm-bg/50 border border-warm-ink/10 rounded-2xl p-4 focus:bg-white focus:border-warm-accent outline-none font-medium transition-all"
                                    />
                                    {errors.contact && <p className="text-red-500 text-xs px-2">{errors.contact.message}</p>}
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest opacity-40">要介護度 (お持ちの場合)</label>
                                <select 
                                    {...register('grade')}
                                    className="w-full bg-warm-bg/50 border border-warm-ink/10 rounded-2xl p-4 focus:bg-white focus:border-warm-accent outline-none font-medium transition-all appearance-none"
                                >
                                    <option value="">選択してください (なし/不明)</option>
                                    <option value="1">要介護 1</option>
                                    <option value="2">要介護 2</option>
                                    <option value="3">要介護 3</option>
                                    <option value="4">要介護 4</option>
                                    <option value="5">要介護 5</option>
                                    <option value="認知支援">要支援</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest opacity-40">ご相談内容</label>
                                <textarea 
                                    {...register('message')}
                                    rows={5}
                                    placeholder="ご相談内容を詳しくご記入ください。"
                                    className="w-full bg-warm-bg/50 border border-warm-ink/10 rounded-2xl p-4 focus:bg-white focus:border-warm-accent outline-none font-medium transition-all resize-none"
                                />
                                {errors.message && <p className="text-red-500 text-xs px-2">{errors.message.message}</p>}
                            </div>

                            <button 
                                disabled={loading}
                                type="submit"
                                className="w-full py-5 bg-warm-ink text-white rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-opacity-90 disabled:opacity-50 transition-all shadow-xl"
                            >
                                {loading ? (
                                    <Loader2 size={24} className="animate-spin" />
                                ) : (
                                    <>
                                        <Send size={20} />
                                        <span>相談内容を送信する</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
}
