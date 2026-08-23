import React, { useState } from 'react'
import { SmoothScrollProvider } from '@/components/scroll/SmoothScrollProvider'
import { VehicleCanvas } from '@/components/3d/VehicleCanvas'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/navigation/Footer'
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor'
import { VehicleTimelineIndicator } from '@/components/ui/VehicleTimelineIndicator'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { BookingModal } from '@/components/ui/BookingModal'

// Story Sections
import { HeroSection } from '@/components/sections/HeroSection'
import { DetailsInspectionSection } from '@/components/sections/DetailsInspectionSection'
import { ServicesScrollSection } from '@/components/sections/ServicesScrollSection'
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { WashParkSection } from '@/components/sections/WashParkSection'
import { FleetSection } from '@/components/sections/FleetSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'

import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useResponsiveBreakpoints } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { VehicleHotspot } from '@/lib/constants'

function AppContent() {
  const { progress, factors, activeMilestone } = useScrollProgress()
  const { deviceTier } = useResponsiveBreakpoints()
  const prefersReducedMotion = useReducedMotion()

  // Interactive 3D Hotspot & Modal State
  const [activeHotspot, setActiveHotspot] = useState<VehicleHotspot | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedServiceId, setSelectedServiceId] = useState<string>('')
  const [isInspectionScanning, setIsInspectionScanning] = useState(false)

  // Show 3D hotspots around the inspection chapter (scrollProgress: 0.25 -> 0.45)
  const show3DHotspots = progress >= 0.22 && progress <= 0.46

  const handleOpenBooking = (serviceId: string = '') => {
    setSelectedServiceId(serviceId)
    setIsBookingOpen(true)
  }

  const handleExploreClick = () => {
    const el = document.getElementById('section-inspection')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative bg-[#080A0F] text-slate-100 min-h-screen selection:bg-cyan-500 selection:text-black">
      {/* Custom Contextual Cursor (Desktop only) */}
      <CustomCursor />

      {/* Primary 3D WebGL Vehicle Canvas */}
      <VehicleCanvas
        scrollProgress={progress}
        factors={factors}
        activeHotspot={activeHotspot}
        onSelectHotspot={setActiveHotspot}
        showHotspots={show3DHotspots}
        isInspectionScanning={isInspectionScanning}
      />

      {/* Sticky Header Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Fixed Journey Milestones Indicator */}
      <VehicleTimelineIndicator scrollProgress={progress} />

      {/* Real-Time Engine Telemetry HUD */}
      <PerformanceMonitor
        scrollProgress={progress}
        milestone={activeMilestone}
        factors={factors}
        deviceTier={deviceTier}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* Single Continuous Storytelling Main Track */}
      <main className="relative z-10 space-y-16">
        <HeroSection
          scrollProgress={progress}
          onExploreClick={handleExploreClick}
          onBookClick={() => handleOpenBooking()}
        />

        <DetailsInspectionSection
          activeHotspot={activeHotspot}
          onSelectHotspot={setActiveHotspot}
        />

        <ServicesScrollSection onBookService={handleOpenBooking} />

        <BeforeAfterSection />

        <ProcessSection onScanToggle={setIsInspectionScanning} />

        <WashParkSection />

        <FleetSection onOpenBooking={() => handleOpenBooking()} />

        <AboutSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Direct Booking Modal Dialog */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={selectedServiceId}
      />
    </div>
  )
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <AppContent />
    </SmoothScrollProvider>
  )
}
