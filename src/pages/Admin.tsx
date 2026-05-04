import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, addDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { LayoutDashboard, Mail, Camera, CheckCircle, Clock, Trash2, Plus, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface Inquiry {
  id: string;
  name: string;
  contact: string;
  grade: string;
  message: string;
  status: 'pending' | 'completed';
  createdAt: any;
}

export default function Admin() {
  const { isAdmin, loading: authLoading } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'upload'>('inquiries');
  const [uploading, setUploading] = useState(false);

  // Upload Form State
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryImage, setGalleryImage] = useState('');
  const [galleryDesc, setGalleryDesc] = useState('');

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Inquiry[];
      setInquiries(data);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const toggleInquiryStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    await updateDoc(doc(db, 'inquiries', id), { status: nextStatus });
  };

  const deleteInquiry = async (id: string) => {
    if (confirm('本当に削除しますか？')) {
      await deleteDoc(doc(db, 'inquiries', id));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle || !galleryImage) return;

    setUploading(true);
    try {
      await addDoc(collection(db, 'gallery'), {
        title: galleryTitle,
        imageUrl: galleryImage,
        description: galleryDesc,
        date: serverTimestamp(),
        isPrivate: true
      });
      setGalleryTitle('');
      setGalleryImage('');
      setGalleryDesc('');
      alert('ギャラリー画像をアップロードしました。');
    } catch (err) {
      console.error(err);
      alert('アップロードに失敗しました。');
    } finally {
      setUploading(false);
    }
  };

  if (authLoading) return <div className="h-[80vh] flex items-center justify-center"><Loader2 className="animate-spin text-warm-accent" size={40} /></div>;
  if (!isAdmin) return <div className="h-[80vh] flex items-center justify-center text-2xl font-serif italic">管理者権限が必要です。</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
            <h1 className="text-2xl font-serif font-bold italic mb-8 px-4 flex items-center gap-3">
                <LayoutDashboard className="text-warm-accent" />
                管理者パネル
            </h1>
            <button 
                onClick={() => setActiveTab('inquiries')}
                className={`w-full text-left px-6 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${activeTab === 'inquiries' ? 'bg-warm-accent text-white shadow-lg' : 'hover:bg-warm-accent/5 opacity-60'}`}
            >
                <Mail size={18} />
                お問い合わせ管理
                {inquiries.filter(i => i.status === 'pending').length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                        {inquiries.filter(i => i.status === 'pending').length}
                    </span>
                )}
            </button>
            <button 
                onClick={() => setActiveTab('upload')}
                className={`w-full text-left px-6 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${activeTab === 'upload' ? 'bg-warm-accent text-white shadow-lg' : 'hover:bg-warm-accent/5 opacity-60'}`}
            >
                <Camera size={18} />
                ギャラリー投稿
            </button>
        </aside>

        {/* Content */}
        <main className="flex-1 bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-warm-ink/5 min-h-[60vh]">
            {activeTab === 'inquiries' ? (
                <div>
                    <h2 className="text-2xl font-serif font-bold italic mb-8">相談・お問い合わせ一覧</h2>
                    <div className="space-y-6">
                        {inquiries.length === 0 ? (
                            <p className="text-center py-20 opacity-30 italic">お問い合わせはありません。</p>
                        ) : inquiries.map(inquiry => (
                            <div key={inquiry.id} className={`p-8 rounded-[30px] border transition-all ${inquiry.status === 'completed' ? 'bg-warm-bg/30 border-transparent opacity-60' : 'bg-white border-warm-ink/5 shadow-md'}`}>
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-lg font-bold">{inquiry.name}</span>
                                            <span className="text-xs font-bold uppercase tracking-widest text-warm-accent px-2 py-0.5 bg-warm-accent/10 rounded-full">
                                                {inquiry.grade ? (inquiry.grade === '인지지원' ? '要支援' : `要介護 ${inquiry.grade}`) : '未設定'}
                                            </span>
                                        </div>
                                        <p className="text-sm opacity-50">{inquiry.contact}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs opacity-40 italic">
                                            {inquiry.createdAt?.toDate ? format(inquiry.createdAt.toDate(), 'yyyy-MM-dd HH:mm') : 'Recently'}
                                        </span>
                                        <button 
                                            onClick={() => toggleInquiryStatus(inquiry.id, inquiry.status)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${inquiry.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}
                                        >
                                            {inquiry.status === 'completed' ? <CheckCircle size={14} /> : <Clock size={14} />}
                                            {inquiry.status === 'completed' ? '対応済み' : '未対応'}
                                        </button>
                                        <button onClick={() => deleteInquiry(inquiry.id)} className="text-warm-ink/20 hover:text-red-500 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-warm-ink/80 leading-relaxed bg-warm-bg/50 p-6 rounded-2xl text-sm italic">
                                    "{inquiry.message}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="max-w-2xl">
                    <h2 className="text-2xl font-serif font-bold italic mb-8">ギャラリー写真の投稿</h2>
                    <form onSubmit={handleUpload} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest opacity-40">タイトル</label>
                            <input 
                                value={galleryTitle}
                                onChange={(e) => setGalleryTitle(e.target.value)}
                                placeholder="活動タイトル (例: 5月のレクリエーション)"
                                className="w-full bg-warm-bg/50 border border-warm-ink/10 rounded-2xl p-4 outline-none focus:bg-white focus:border-warm-accent transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest opacity-40">画像URL (Unsplashなど)</label>
                            <input 
                                value={galleryImage}
                                onChange={(e) => setGalleryImage(e.target.value)}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full bg-warm-bg/50 border border-warm-ink/10 rounded-2xl p-4 outline-none focus:bg-white focus:border-warm-accent transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest opacity-40">詳細説明</label>
                            <textarea 
                                value={galleryDesc}
                                onChange={(e) => setGalleryDesc(e.target.value)}
                                rows={4}
                                placeholder="活動の内容を記入してください。"
                                className="w-full bg-warm-bg/50 border border-warm-ink/10 rounded-2xl p-4 outline-none focus:bg-white focus:border-warm-accent transition-all resize-none"
                            />
                        </div>
                        <button 
                            disabled={uploading}
                            type="submit"
                            className="w-full py-5 bg-warm-ink text-white rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-opacity-90 disabled:opacity-50 transition-all shadow-xl"
                        >
                            {uploading ? <Loader2 size={24} className="animate-spin" /> : <><Plus size={20} /><span>ギャラリーに投稿する</span></>}
                        </button>
                    </form>
                </div>
            )}
        </main>
      </div>
    </div>
  );
}
