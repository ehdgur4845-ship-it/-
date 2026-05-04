import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import { Lock, Image as ImageIcon, Camera, Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  date: any;
  isPrivate: boolean;
}

export default function Gallery() {
  const { user, isAdmin } = useAuth();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
        setLoading(false);
        return;
    }

    const q = query(collection(db, 'gallery'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryItem[];
      setItems(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-4 text-center">
          <div className="bg-white rounded-[60px] p-20 shadow-xl border border-warm-ink/5">
              <div className="w-20 h-20 bg-warm-accent/10 rounded-3xl flex items-center justify-center text-warm-accent mx-auto mb-8">
                  <Lock size={40} />
              </div>
              <h1 className="text-4xl font-serif font-bold text-warm-ink mb-6 italic">ご家族様専用ギャラリー</h1>
              <p className="text-xl text-warm-ink/60 max-w-2xl mx-auto leading-relaxed mb-12">
                  ご利用者様のプライバシー保護のため、活動写真は登録されたご家族様のみ閲覧可能です。<br />
                  ログインして大切なご家族の笑顔をご確認ください。
              </p>
              <Link to="/login" className="px-12 py-5 bg-warm-ink text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all inline-block">
                ログインしてギャラリーを見る
              </Link>
          </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-warm-bg border-b border-warm-ink/5 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center space-x-3 text-warm-accent mb-4">
                <Camera size={24} />
                <span className="font-bold tracking-widest uppercase text-sm">活動の様子</span>
              </div>
              <h1 className="text-5xl font-serif font-bold text-warm-ink italic">笑健ギャラリー</h1>
            </div>
            <div className="flex flex-col items-start md:items-end gap-6 text-right">
                <p className="text-lg text-warm-ink/50 max-w-md italic">
                    "毎日、新しく生まれるご利用者様の貴重な瞬間を記録しています。"
                </p>
                {user && (
                    <Link to="/admin?tab=upload" className="flex items-center space-x-2 px-6 py-3 bg-warm-accent text-white rounded-full font-bold shadow-lg hover:scale-105 transition-all">
                        <Plus size={20} />
                        <span>写真をアップロード</span>
                    </Link>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="aspect-square bg-warm-ink/5 rounded-[40px] animate-pulse" />
                ))}
            </div>
        ) : items.length === 0 ? (
            <div className="text-center py-40 border-2 border-dashed border-warm-ink/10 rounded-[60px]">
                <ImageIcon size={64} className="mx-auto text-warm-ink/10 mb-6" />
                <p className="text-warm-ink/40 font-medium">現在、登録されている活動写真はありません。</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, i) => (
                    <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                        className="group relative bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-warm-ink/5"
                    >
                        <div className="aspect-[4/5] relative overflow-hidden">
                            <img 
                                src={item.imageUrl} 
                                alt={item.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-8">
                            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-warm-accent mb-3">
                                <Calendar size={14} />
                                <span>{item.date?.toDate ? format(item.date.toDate(), 'yyyy.MM.dd') : 'Recently'}</span>
                            </div>
                            <h3 className="text-xl font-bold text-warm-ink mb-2">{item.title}</h3>
                            <p className="text-sm text-warm-ink/50 line-clamp-2">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        )}
      </section>
    </div>
  );
}
