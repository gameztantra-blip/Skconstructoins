import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingActions } from "./components/FloatingActions";
import { MobileBottomBar } from "./components/MobileBottomBar";
import { LeadCaptureModal } from "./components/LeadCaptureModal";
import { ExitIntentModal } from "./components/ExitIntentModal";
import { ThankYouModal } from "./components/ThankYouModal";
import { NirmaanAiBot } from "./components/NirmaanAiBot";
import { initLeadTracking } from "./services/leadService";

// Pages
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { CostCalculatorPage } from "./pages/CostCalculatorPage";
import { HomeDesigns3DPage } from "./pages/HomeDesigns3DPage";
import { HomeDesign3DDetailPage } from "./pages/HomeDesign3DDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { CareersPage } from "./pages/CareersPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { ContactPage } from "./pages/ContactPage";
import { LocalityPage } from "./pages/LocalityPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsPage } from "./pages/TermsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

/**
 * ScrollToTop component to reset window scroll position on route change
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteServiceSlug, setQuoteServiceSlug] = useState<string | undefined>(undefined);
  const [isNirmaanBotOpen, setIsNirmaanBotOpen] = useState(false);
  const [nirmaanInitialQuery, setNirmaanInitialQuery] = useState<string | undefined>(undefined);

  const [thankYouData, setThankYouData] = useState<{
    isOpen: boolean;
    name: string;
    leadId: string;
  }>({
    isOpen: false,
    name: "",
    leadId: "",
  });

  // Initialize UTM session tracking on mount
  useEffect(() => {
    initLeadTracking();
  }, []);

  const handleOpenQuote = (serviceSlug?: string) => {
    setQuoteServiceSlug(serviceSlug);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteModalOpen(false);
    setQuoteServiceSlug(undefined);
  };

  const handleOpenNirmaanBot = (query?: string) => {
    setNirmaanInitialQuery(query);
    setIsNirmaanBotOpen(true);
  };

  const handleCloseNirmaanBot = () => {
    setIsNirmaanBotOpen(false);
    setNirmaanInitialQuery(undefined);
  };

  const handleOpenThankYou = (name: string, leadId: string) => {
    setIsQuoteModalOpen(false);
    setThankYouData({
      isOpen: true,
      name,
      leadId,
    });
  };

  const handleCloseThankYou = () => {
    setThankYouData({
      isOpen: false,
      name: "",
      leadId: "",
    });
  };

  return (
    <div className="flex flex-col min-h-screen text-on-surface bg-surface-dim font-sans antialiased selection:bg-secondary selection:text-primary pb-16 md:pb-0">
      <ScrollToTop />

      {/* Primary Sticky Header */}
      <Header
        onOpenQuoteModal={() => handleOpenQuote()}
        onOpenConsultation={() => handleOpenNirmaanBot()}
      />

      {/* Main Routed Content Area */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenQuoteModal={handleOpenQuote}
                onSuccess={(name, leadId) => handleOpenThankYou(name, leadId)}
              />
            }
          />
          <Route path="/services" element={<ServicesPage onOpenQuoteModal={handleOpenQuote} />} />
          <Route path="/services/:slug" element={<ServiceDetailPage onOpenThankYou={handleOpenThankYou} />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage onOpenQuoteModal={() => handleOpenQuote()} />} />
          <Route path="/cost-calculator" element={<CostCalculatorPage onOpenThankYou={handleOpenThankYou} />} />
          <Route path="/3d-home-designs" element={<HomeDesigns3DPage />} />
          <Route path="/3d-home-designs/:slug" element={<HomeDesign3DDetailPage onOpenThankYou={handleOpenThankYou} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage onOpenThankYou={handleOpenThankYou} />} />
          <Route path="/blog" element={<BlogPage onOpenConsultation={() => handleOpenNirmaanBot()} />} />
          <Route path="/blog/:slug" element={<BlogPostPage onOpenConsultation={() => handleOpenNirmaanBot()} />} />
          <Route path="/contact" element={<ContactPage onOpenThankYou={handleOpenThankYou} />} />
          <Route path="/house-construction-in/:locality" element={<LocalityPage onOpenThankYou={handleOpenThankYou} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Comprehensive Architectural Footer */}
      <Footer />

      {/* Floating Desktop WhatsApp & Consultation Buttons */}
      <FloatingActions onOpenConsultation={() => handleOpenNirmaanBot()} />

      {/* Mobile Sticky Bottom Action Bar (Call | WhatsApp | Ask AI | Quote) */}
      <MobileBottomBar
        onOpenQuoteModal={() => handleOpenQuote()}
        onOpenConsultation={() => handleOpenNirmaanBot()}
      />

      {/* Modals & Overlays */}
      <LeadCaptureModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuote}
        defaultService={quoteServiceSlug}
        onSuccess={(name, leadId) => handleOpenThankYou(name, leadId)}
      />

      <ExitIntentModal
        onSuccess={(name, leadId) => handleOpenThankYou(name, leadId)}
      />

      <ThankYouModal
        isOpen={thankYouData.isOpen}
        onClose={handleCloseThankYou}
        leadName={thankYouData.name}
        leadId={thankYouData.leadId}
      />

      {/* Nirmaan AI Assistant Chatbot */}
      <NirmaanAiBot
        isOpen={isNirmaanBotOpen}
        onClose={handleCloseNirmaanBot}
        initialQuery={nirmaanInitialQuery}
        onLeadSuccess={(name, leadId) => handleOpenThankYou(name, leadId)}
      />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}
