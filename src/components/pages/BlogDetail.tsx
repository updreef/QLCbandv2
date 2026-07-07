import { ArrowLeft, Calendar, User, BookOpen, MessageCircle, HelpCircle } from "lucide-react";
import type { BlogPost } from "../../data";
import SquiggleUnderline from "../SquiggleUnderline";

interface BlogDetailProps {
  post: BlogPost;
}

export default function BlogDetail({ post }: BlogDetailProps) {

  if (!post) {
    return (
      <div className="pt-36 pb-24 text-center min-h-screen">
        <h2 className="font-display text-4xl text-brand-cream uppercase mb-4">Artikel niet gevonden</h2>
        <p className="text-brand-text-muted mb-8">We konden het gevraagde blogartikel niet vinden.</p>
        <a 
          href="/blog" 
          className="font-display uppercase tracking-widest text-sm px-6 py-2.5 bg-brand-cream text-brand-bg border-2 border-brand-cream hard-shadow-cream"
        >
          TERUG NAAR BLOGS
        </a>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Link */}
        <a 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm text-brand-neon font-mono uppercase mb-8 hover:underline group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Terug naar de blog
        </a>

        {/* Article Container */}
        <article className="bg-brand-bg-2 border-3 border-brand-cream p-6 sm:p-10 rounded-2xl hard-shadow-cream relative overflow-hidden">
          
          {/* Top category meta */}
          <div className="flex items-center gap-3 text-xs font-mono text-brand-neon uppercase mb-4">
            <span>{post.category}</span>
            <span className="text-brand-cream/10">|</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-amber" /> {post.date}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-cream uppercase tracking-wide leading-tight mb-4">
            {post.title}
          </h1>
          <SquiggleUnderline />

          {/* Author meta and visual spacer */}
          <div className="flex items-center gap-2 text-xs text-brand-text-muted font-mono mt-4 mb-8 pb-4 border-b border-brand-cream/10">
            <User className="w-4 h-4 text-brand-red" /> Geschreven door: <span className="text-brand-cream font-bold">{post.author}</span>
          </div>

          {/* HTML Render Body */}
          <div 
            className="prose prose-invert max-w-none text-brand-text-muted text-sm sm:text-base leading-relaxed mb-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Dynamic FAQ Accordion Section (GEO / SEO Requirement) */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-12 pt-8 border-t border-brand-cream/10">
              <h3 className="font-display text-2xl text-brand-amber uppercase tracking-wider mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-red" /> VEELGESTELDE VRAGEN (FAQ)
              </h3>
              
              <div className="flex flex-col gap-4">
                {post.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-brand-bg-3 border border-brand-cream/10 p-5 rounded-xl">
                    <h4 className="font-semibold text-brand-cream text-sm sm:text-base flex items-start gap-2">
                      <span className="text-brand-red font-bold">V.</span>
                      <span>{faq.question}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-brand-text-muted mt-2 pl-4 border-l border-brand-amber/30">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </article>

        {/* Dynamic Booking pitch below blog detail */}
        <div className="mt-12 bg-brand-bg-3 border-2 border-brand-cream p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 card-rotate-left">
          <div className="text-center sm:text-left">
            <h4 className="font-display text-xl text-brand-cream uppercase tracking-wide">ZELF EEN FEESTJE PLANNEN?</h4>
            <p className="text-xs text-brand-text-muted mt-1 max-w-md">
              Van huiskamers tot grote dorpspleinen; we nemen alle professionele techniek mee voor een onvergetelijke liveshow.
            </p>
          </div>
          <a 
            href="/boek-ons"
            className="font-display uppercase tracking-widest text-xs px-5 py-2.5 bg-brand-amber text-brand-bg-3 font-bold border-2 border-brand-cream hover-bounce shrink-0"
          >
            VRAAG OFFERTE AAN
          </a>
        </div>

      </div>
    </div>
  );
}
