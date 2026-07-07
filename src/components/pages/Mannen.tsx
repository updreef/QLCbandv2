"use client";

import { useState } from "react";
import { members } from "../../data";
import { Star, Sliders, Zap, X, Instagram } from "lucide-react";
import SquiggleUnderline from "../SquiggleUnderline";
import LazyVideo from "../LazyVideo";

export default function Mannen() {
  const [selectedMember, setSelectedMember] = useState<typeof members[0] | null>(null);

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center md:text-left mb-16">
          <p className="text-brand-neon font-mono uppercase text-xs tracking-[0.25em]">DE MANNEN</p>
          <h1 className="font-display text-5xl sm:text-6xl text-brand-cream uppercase tracking-wider">
            DE MUZIKANTEN
          </h1>
          <SquiggleUnderline className="mx-auto md:mx-0" />
          <p className="text-brand-text-muted max-w-2xl mt-4 text-sm sm:text-base">
            Zes muzikanten uit Bunschoten-Spakenburg en Amersfoort. Van jongs af aan altijd al bezig met muziek en op hun 25e besloten dat ze er nooit meer mee zouden stoppen. Klik op een muzikant voor de volledige bio.
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={member.name}
                onClick={() => setSelectedMember(member)}
                className={`group bg-brand-bg-2 border-3 border-brand-cream rounded-2xl overflow-hidden cursor-pointer hover-bounce ${
                  isEven ? "card-rotate-left hard-shadow-cream" : "card-rotate-right hard-shadow-red"
                }`}
              >
                {/* Member Video */}
                <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-brand-cream bg-brand-bg-3">
                  <LazyVideo
                    src={member.video}
                    poster={member.avatar}
                    aria-label={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-3/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                    <div>
                      <h3 className="font-display text-2xl text-brand-cream uppercase tracking-wide">
                        {member.name}
                      </h3>
                      <p className="text-xs font-mono text-brand-neon uppercase tracking-wider">
                        {member.role}
                      </p>
                    </div>
                    <div className="bg-brand-red border border-brand-cream p-1.5 rounded-full shadow-md group-hover:rotate-12 transition-transform">
                      <Zap className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>
                </div>

                {/* Member Brief Card Info */}
                <div className="p-5">
                  <p className="text-xs text-brand-text-muted line-clamp-2">
                    {member.bio}
                  </p>
                  <p className="text-[10px] font-mono text-brand-amber mt-3 uppercase tracking-wider font-semibold">
                    Klik voor volledige bio →
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Member Focus Lightbox Modal */}
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="relative bg-brand-bg-2 border-3 border-brand-cream rounded-2xl max-w-2xl w-full overflow-hidden hard-shadow-cream animate-in zoom-in-95 duration-200">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-brand-bg-3 border-2 border-brand-cream text-brand-cream hover:text-brand-red hover:rotate-90 transition-all rounded-full"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Left side video */}
                <div className="md:col-span-5 h-48 md:h-full relative border-b-2 md:border-b-0 md:border-r-2 border-brand-cream bg-brand-bg-3">
                  <LazyVideo
                    src={selectedMember.video}
                    poster={selectedMember.avatar}
                    aria-label={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right side details */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col gap-4">
                  <div>
                    <h3 className="font-display text-3xl text-brand-cream uppercase tracking-wide leading-none">
                      {selectedMember.name}
                    </h3>
                    <p className="text-xs font-mono text-brand-neon uppercase tracking-wider mt-1.5">
                      {selectedMember.role}
                    </p>
                  </div>

                  <p className="text-xs text-brand-text-muted leading-relaxed">
                    {selectedMember.bio}
                  </p>

                  {/* Fun Fact */}
                  <div className="bg-brand-bg-3 border border-brand-cream/10 p-3 rounded-lg text-xs">
                    <p className="font-mono text-brand-amber font-semibold flex items-center gap-1 uppercase tracking-wider">
                      <Star className="w-3.5 h-3.5 fill-brand-amber" /> Fun Fact:
                    </p>
                    <p className="text-brand-text mt-1">{selectedMember.funFact}</p>
                  </div>

                  {/* Gear List (optional) */}
                  {selectedMember.gear.length > 0 && (
                    <div>
                      <p className="font-mono text-xs text-brand-red font-semibold flex items-center gap-1 uppercase tracking-wider mb-1.5">
                        <Sliders className="w-3.5 h-3.5" /> Gear & Uitrusting:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedMember.gear.map((g) => (
                          <span key={g} className="text-[10px] font-semibold bg-brand-bg-3 border border-brand-cream/10 px-2.5 py-1 text-brand-cream rounded">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Instagram */}
                  {selectedMember.instagram && (
                    <a
                      href={selectedMember.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono text-brand-neon hover:text-brand-amber transition-colors uppercase tracking-wider mt-1"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      {selectedMember.instagram.replace('https://instagram.com/', '@')}
                    </a>
                  )}

                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
