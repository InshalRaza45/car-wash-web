import React from 'react'
import { BRAND_INFO, SERVICES_LIST } from '@/lib/constants'
import { MapPin, Phone, Mail, Clock, ShieldCheck, ChevronRight } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-20 bg-[#04060A] text-slate-400 text-xs border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Col 1: Brand & Logo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-cyan-400/40 p-1 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <img
                src="/assets/images/logo.png"
                alt="Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(0,210,255,0.6)]"
              />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-white tracking-wider block">
                {BRAND_INFO.name}
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">Pforzheim Detailing Studio</span>
            </div>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed font-light">
            Pforzheim's premier automotive detailing center and self-service washpark. Certified ceramic coating, paint correction, and vehicle asset preservation.
          </p>
          <div className="flex items-center gap-2 text-cyan-400 text-[11px] font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Certified German Detailing Studio</span>
          </div>
        </div>

        {/* Col 2: Services Quick Links */}
        <div>
          <h4 className="font-mono text-white uppercase tracking-wider text-xs font-bold mb-4">
            Services & Treatments
          </h4>
          <ul className="space-y-2">
            {SERVICES_LIST.slice(0, 5).map((svc) => (
              <li key={svc.id}>
                <a
                  href="#section-services"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-cyan-500" />
                  <span>{svc.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Opening Hours & Washpark */}
        <div>
          <h4 className="font-mono text-white uppercase tracking-wider text-xs font-bold mb-4">
            Opening Hours
          </h4>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-cyan-400 mt-0.5" />
              <div>
                <span className="text-white block font-medium">Studio Detailing</span>
                <span>{BRAND_INFO.hours.weekdays}</span>
                <span className="block">{BRAND_INFO.hours.saturday}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-white/10">
              <span className="text-cyan-300 font-mono text-[11px] block font-semibold">
                Self-Service Washpark:
              </span>
              <span className="text-slate-300">7 SB Wash Bays & 20 Vacuums (Open 24/7)</span>
            </div>
          </div>
        </div>

        {/* Col 4: Location & Direct Contact */}
        <div>
          <h4 className="font-mono text-white uppercase tracking-wider text-xs font-bold mb-4">
            Contact & Studio
          </h4>
          <div className="space-y-3">
            <a
              href={BRAND_INFO.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <span>{BRAND_INFO.location.fullAddress}</span>
            </a>
            <a
              href={`tel:${BRAND_INFO.contact.phoneRaw}`}
              className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{BRAND_INFO.contact.phone}</span>
            </a>
            <a
              href={`mailto:${BRAND_INFO.contact.email}`}
              className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{BRAND_INFO.contact.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-4">
        <div>
          © {new Date().getFullYear()} {BRAND_INFO.legalName}. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy (Datenschutz)</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Legal Notice (Impressum)</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service (AGB)</a>
        </div>
      </div>
    </footer>
  )
}
