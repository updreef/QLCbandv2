import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "../../data";
import SquiggleUnderline from "../SquiggleUnderline";

export default function Blog() {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center md:text-left mb-16">
          <p className="text-brand-neon font-mono uppercase text-xs tracking-[0.25em]">QCL BACKSTAGE BLOG</p>
          <h1 className="font-display text-5xl sm:text-6xl text-brand-cream uppercase tracking-wider">
            ONZE BLOG
          </h1>
          <SquiggleUnderline className="mx-auto md:mx-0" />
          <p className="text-brand-text-muted max-w-2xl mt-4 text-sm sm:text-base">
            Lees alles over ons ontstaan, handige tips voor tuinfeesten, en onze visie op de live rock-scene in Spakenburg en Amersfoort.
          </p>
        </div>

        {/* Blog Posts Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <article 
                key={post.slug}
                className={`bg-brand-bg-2 border-3 border-brand-cream rounded-2xl overflow-hidden flex flex-col justify-between hover-bounce transition-all ${
                  isEven ? "card-rotate-left hard-shadow-cream" : "card-rotate-right hard-shadow-red"
                }`}
              >
                <div className="p-6 sm:p-8 flex flex-col gap-4">
                  
                  {/* Category & Date */}
                  <div className="flex items-center gap-3 text-xs font-mono text-brand-neon uppercase">
                    <span>{post.category}</span>
                    <span className="text-brand-cream/10">|</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-amber" /> {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl text-brand-cream uppercase tracking-wide leading-tight hover:text-brand-amber transition-colors">
                    <a href={`#/blog/${post.slug}`}>{post.title}</a>
                  </h3>

                  {/* Summary */}
                  <p className="text-brand-text-muted text-xs sm:text-sm leading-relaxed line-clamp-4">
                    {post.summary}
                  </p>

                </div>

                {/* Card footer details */}
                <div className="p-6 sm:p-8 pt-0 border-t border-brand-cream/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-brand-text-muted font-mono">
                    <User className="w-3.5 h-3.5 text-brand-red" /> {post.author}
                  </div>
                  
                  <a 
                    href={`#/blog/${post.slug}`}
                    className="font-display uppercase tracking-widest text-xs text-brand-cream hover:text-brand-neon inline-flex items-center gap-1 group/link"
                  >
                    LEES MEER <ArrowRight className="w-4 h-4 text-brand-red group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>

              </article>
            );
          })}
        </div>

        {/* Direct booking CTA */}
        <div className="mt-20 bg-brand-bg-3 border-3 border-brand-cream p-8 sm:p-12 rounded-2xl text-center hard-shadow-neon relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          <h2 className="font-display text-3xl sm:text-4xl text-brand-cream uppercase tracking-wider relative z-10">
            HULP NODIG BIJ JOUW CONCERT?
          </h2>
          <p className="text-brand-text-muted max-w-xl mx-auto mt-2 mb-6 text-sm relative z-10">
            Wil je zelf een fantastisch live feest plannen of heb je advies nodig over techniek of geluid? We helpen graag mee denken!
          </p>
          <a 
            href="#/boek-ons" 
            className="font-display uppercase tracking-widest text-sm px-8 py-3 bg-brand-red text-white font-bold border-2 border-brand-cream hard-shadow-cream hover-bounce relative z-10 inline-block"
          >
            VRAAG BOEKINGSADVIES
          </a>
        </div>

      </div>
    </div>
  );
}
