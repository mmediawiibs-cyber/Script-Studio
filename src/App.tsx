import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Loader2, PenLine, Sparkles, Film, Copy, Check } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [idea, setIdea] = useState('');
  const [script, setScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateScript = async () => {
    if (!idea.trim()) return;
    
    setIsLoading(true);
    setScript('');
    
    const prompt = `
You are an expert Director and Professional Scriptwriter. Your task is to transform a simple content idea into a comprehensive, high-quality production script suitable for an Islamic Boarding School (WIIBS) environment.

### ABSOLUTE CONSTRAINTS & IDENTITY (BANAT DIVISION):

1. Role & Audience: I am the Student Content Creator Team. The target audience is Parents and Prospective Parents of students.
2. Subject (Banat/Female Division):
   - Visual Representation: All female talents (Students or Teachers) MUST be shown wearing a Niqab (face veil).
   - Talent Interaction: Ensure all movements and actions remain modest and Sharia-compliant.
3. Language Requirements:
   - All spoken dialogues or on-screen talent speech MUST be in either ARABIC or ENGLISH to highlight the International School branding.
   - You MUST provide the Indonesian translation in parentheses for every line of dialogue.
   - Note: If using Arabic, you must use the Arabic script/font.
4. Audio Policy (Strict):
   - NO MUSICAL INSTRUMENTS.
   - Use only Original Sounds (ASMR), Clear Dialogue, and Vocal-only Nasheed (Acapella).
5. Brand Persona: The tone must be Sophisticated (High-Class), Syar'i, yet relatable to Islamic Gen-Z lifestyle (Aesthetic & Modern).

### Script Structure Requirements:

Upon receiving a content idea, you must generate a script with the following strict structure:

* **The Title**: Create a catchy and relevant title.
* **The Story**: Provide a brief summary of the storyline/premise.

**[HOOK VARIATIONS] (3 Detik Pertama)**:
Berdasarkan ide konten, buatkan 5 variasi Hook 3 Detik Pertama yang dirancang untuk menghentikan audiens saat scrolling. Setiap Hook harus terdiri dari:
1. Teks Headline (On-Screen): Kalimat singkat, padat, dan kontras yang muncul di layar (maksimal 7 kata).
2. Visual Action: Instruksi gerakan atau transisi kamera yang harus dilakukan kreator dalam 3 detik pertama agar video terasa dinamis.

Gunakan formula berikut untuk variasi Hook:
* The Mistake: 'Jangan lakukan [Kesalahan] kalau mau [Hasil]!'
* The Secret: 'Rahasia [Hasil] yang jarang orang tahu...'
* The Transformation: Tunjukkan 'Before' yang berantakan lalu langsung transisi ke 'After' yang estetik.
* The Specific Value: '3 Cara [Tujuan] cuma pakai [Alat/Modal Minimal].'
* The Call-out: 'Buat kamu yang masih bingung cara [Masalah]...'

**[ALUR CERITA] (Storyline)**: Break down the story into detailed Scenes. Each scene MUST include:

**Scene [Number]**
* **Visual & Action**: Detailed activity of the talent, facial expressions, and physical movements.
* **Directing Focus**: What the talents say and what they do.
* **Dialogue Format**:
    * *Talent A (Arabic/English)*: "..." (translate: ...)
    * *Talent B (Arabic/English)*: "..." (translate: ...)
* **Filming Properties**: List all physical objects in the frame (e.g., Al-Qur'an, books, etc.).
* **3 point of DOP (Director of Photography)**:
    - **Shot Size**: (misal: Close Up, Medium Shot, Wide Shot dan deskripsikan siapa/apa target/objek)
    - **Camera Angle**: (misal: Eye Level, High Angle, Low Angle dan deskripsikan siapa/apa target/objek)
    - **Camera Movement**: (misal: Static, Pan, Tilt, Tracking dan deskripsikan siapa/apa target/objek)
* **AUDIO ATMOSPHERE**: Suggested Vocal-only Nasheed or Sound Effects (e.g., rain, footsteps, school bell).
* **School Name**: Al Wafi International Islamic Boarding School or Al Wafi IIBS or WIIBS.
* **Setting**: Specific location within WIIBS (Mosque, Library, Court, Class, etc.).

you must make each scene has many or few of shoot, so the filming are smooth step and be better!!! each shoot has a 3 point of DOP



Tone of Voice: Persuasif, santai, namun tetap profesional sesuai dengan citra sekolah. Hindari kalimat yang terlalu panjang atau bertele-tele. Provide the final script output in Indonesian, but incorporate Islamic phrases (e.g., Bismillah, Alhamdulillah, MasyaaAllah, Subhanallah, etc.).
Talent: Always female with Islamic names.

Content Idea:
${idea}
    `;

    try {
      const response = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      let fullScript = '';
      for await (const chunk of response) {
        if (chunk.text) {
          fullScript += chunk.text;
          setScript(fullScript);
        }
      }
    } catch (error) {
      console.error('Error generating script:', error);
      setScript('Afwan, sepertinya sedang High-Demand. Tunggu semenit dan coba lagi ya.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
              <Film className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">WIIBS Script Studio</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <PenLine className="w-5 h-5 text-stone-500" />
                <h2 className="text-lg font-medium">Ide Konten</h2>
              </div>
              
              <p className="text-sm text-stone-500 mb-4">
                Halo Hasna, Mia, Kayla dan Nalin, apa ide mu kali ini, coba tulis disini, nanti kita buatin naskahnya.
              </p>

              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Contoh: Video pendek tentang pentingnya menjaga kebersihan asrama dan masjid..."
                className="w-full h-40 p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none text-sm"
              />

              <button
                onClick={generateScript}
                disabled={isLoading || !idea.trim()}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Menyusun Naskah...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Buat Naskah
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 min-h-[600px] flex flex-col overflow-hidden">
              <div className="border-b border-stone-100 p-4 flex items-center justify-between bg-stone-50/50">
                <h2 className="font-medium text-stone-700">Hasil Naskah Produksi</h2>
                {script && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 transition-colors px-3 py-1.5 rounded-md hover:bg-stone-100"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Tersalin!' : 'Salin Naskahnya'}
                  </button>
                )}
              </div>
              
              <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                {!script && !isLoading ? (
                  <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
                    <Film className="w-12 h-12 opacity-20" />
                    <p className="text-sm text-center max-w-sm">
                      Naskahmu akan muncul di sini. Silakan masukin ide kontenmu di panel sebelah kiri.
                    </p>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-stone max-w-none prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-stone-600 prose-li:text-stone-600 prose-strong:text-stone-900"
                  >
                    <Markdown>{script}</Markdown>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
