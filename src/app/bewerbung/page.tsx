"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Dati di default
const defaultData = {
  subtitle: "Bewerbung als",
  title: "FITNESSTRAINER",
  name: "Angelo Magliarisi",
  birthInfo: "Geboren am 16.07.1998 in Licata, Italien",
  location: "Innenstadt, Köln",
  phone: "0176 93193043",
  email: "magliarisiangelo912@gmail.com",
  website: "angelocoach.com",
  // Nuovi campi sidebar
  availability: "Sofort verfügbar",
  languages: "Deutsch, Italienisch",
  license: "Führerschein Klasse B",
  badges: [
    "Trainer B-Lizenz",
    "8+ Jahre Erfahrung",
    "3x Wettkampf-Teilnehmer",
    "10+ aktive Kunden",
    "Bilingual DE/IT",
  ],
  salutation: "Sehr geehrte Damen und Herren,",
  introduction: "hiermit bewerbe ich mich als Fitnesstrainer für Ihren Standort Köln-Zentrum. Mit über acht Jahren Trainingserfahrung, drei absolvierten Bodybuilding-Wettkämpfen und einer abgeschlossenen Trainer B-Lizenz bringe ich fundiertes Fachwissen und praktische Kompetenz mit. Mein Ansatz basiert auf strukturierter Trainingsplanung und messbaren Ergebnissen.",
  experience: "Derzeit betreue ich rund zehn Kunden in Italien und Deutschland im Online-Coaching und erstelle für jeden individuelle Trainingspläne sowie Ernährungsempfehlungen. Über meinen eigenen Webauftritt gewinne ich kontinuierlich neue Kunden. Diese Erfahrung in der Kundenakquise und -bindung möchte ich bei XTRAFIT gezielt einsetzen.",
  qualificationsTitle: "Qualifikationen",
  qualifications: [
    "Trainer B-Lizenz und 8 Jahre praktische Erfahrung",
    "Fundierte Kenntnisse in Trainingsplanung und Ernährungsberatung",
    "Nachweisbare Erfolge in der Kundenbetreuung",
    "Erfahrung im Verkauf und in der Mitgliederberatung",
    "Zuverlässigkeit, Eigenverantwortung und Professionalität",
    "Zweisprachig: Deutsch und Italienisch",
  ],
  motivation: "XTRAFIT überzeugt mich durch sein modernes Konzept und den Fokus auf Qualität. Ich bin überzeugt, dass meine Erfahrung und mein strukturierter Arbeitsansatz einen echten Mehrwert für Ihr Team darstellen. Mein Ziel ist es, Mitglieder kompetent zu betreuen und dabei zu nachhaltigen Ergebnissen zu führen.",
  closing: "Gerne stelle ich mich Ihnen in einem persönlichen Gespräch vor und erläutere, wie ich Ihr Team verstärken kann.",
  greeting: "Mit freundlichen Grüßen",
  signatureName: "Angelo Magliarisi",
};

// Componente editabile
function EditableField({
  value,
  onChange,
  className = "",
  tag = "span"
}: {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  tag?: "span" | "p" | "h1" | "h2" | "div";
}) {
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    onChange(e.currentTarget.innerText);
  };

  const commonProps = {
    contentEditable: true as const,
    suppressContentEditableWarning: true as const,
    onBlur: handleBlur,
    className: `editable ${className}`,
    dangerouslySetInnerHTML: { __html: value }
  };

  if (tag === "h1") return <h1 {...commonProps} />;
  if (tag === "h2") return <h2 {...commonProps} />;
  if (tag === "p") return <p {...commonProps} />;
  if (tag === "div") return <div {...commonProps} />;
  return <span {...commonProps} />;
}

export default function BewerbungPage() {
  const [data, setData] = useState(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carica dati da localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bewerbung-data");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch {
        // usa default
      }
    }
    setIsLoaded(true);
  }, []);

  // Salva automaticamente
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("bewerbung-data", JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm("Tutti i dati verranno resettati ai valori originali. Continuare?")) {
      setData(defaultData);
      localStorage.removeItem("bewerbung-data");
    }
  };

  const updateField = (field: keyof typeof data, value: unknown) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updateBadge = (index: number, value: string) => {
    const newBadges = [...data.badges];
    newBadges[index] = value;
    updateField("badges", newBadges);
  };

  const updateQualification = (index: number, value: string) => {
    const newQualifications = [...data.qualifications];
    newQualifications[index] = value;
    updateField("qualifications", newQualifications);
  };

  if (!isLoaded) {
    return <div className="bewerbung-wrapper"><div className="bewerbung-container" /></div>;
  }

  return (
    <div className="bewerbung-wrapper">
      {/* Buttons */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>
        <button
          onClick={handlePrint}
          className="bg-white hover:bg-gray-100 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center gap-2 border border-gray-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          PDF Herunterladen
        </button>
      </div>

      {/* Edit Mode Hint */}
      <div className="no-print fixed top-4 left-4 z-50 bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
        Klicken Sie auf einen Text, um ihn zu bearbeiten
      </div>

      {/* Bewerbung Document */}
      <div className="bewerbung-container">
        <div className="bewerbung-page">

          {/* Hero Header with Image on Right */}
          <header className="hero-header">
            {/* Photo on right */}
            <div className="hero-image">
              <Image
                src="/images/Foto Angelo/Hero Banner 2.png"
                alt="Angelo Magliarisi"
                fill
                className="object-contain object-right"
                priority
              />
            </div>

          </header>

          {/* Main Content - Two Column Layout */}
          <div className="main-content-wrapper">

            {/* LEFT SIDEBAR - Contacts & Badges (extends to bottom) */}
            <aside className="sidebar-left">
              {/* Name Heading */}
              <div className="sidebar-header">
                <EditableField
                  tag="h2"
                  value={data.name}
                  onChange={(v) => updateField("name", v)}
                  className="sidebar-name"
                />
                <EditableField
                  tag="p"
                  value={data.birthInfo}
                  onChange={(v) => updateField("birthInfo", v)}
                  className="sidebar-birth"
                />
              </div>

              {/* Contact Info */}
              <div className="sidebar-contacts">
                <div className="sidebar-contact-item">
                  <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <EditableField value={data.location} onChange={(v) => updateField("location", v)} />
                </div>
                <div className="sidebar-contact-item">
                  <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <EditableField value={data.phone} onChange={(v) => updateField("phone", v)} />
                </div>
                <div className="sidebar-contact-item">
                  <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <EditableField value={data.email} onChange={(v) => updateField("email", v)} />
                </div>
                <div className="sidebar-contact-item">
                  <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <EditableField value={data.website} onChange={(v) => updateField("website", v)} />
                </div>
              </div>

              {/* Badges */}
              <div className="sidebar-badges">
                {data.badges.map((badge, i) => (
                  <div className="sidebar-badge" key={i}>
                    <EditableField value={badge} onChange={(v) => updateBadge(i, v)} />
                  </div>
                ))}
              </div>

              {/* Qualifications */}
              <div className="sidebar-qualifications">
                <h3 className="sidebar-info-title">Qualifikationen</h3>
                {data.qualifications.map((qual, i) => (
                  <div className="sidebar-qual-item" key={i}>
                    <span className="qual-bullet">+</span>
                    <EditableField value={qual} onChange={(v) => updateQualification(i, v)} />
                  </div>
                ))}
              </div>
            </aside>

            {/* RIGHT CONTENT - Letter Text + Qualifications */}
            <div className="main-content">

              {/* Page Heading */}
              <div className="page-heading">
                <EditableField
                  tag="span"
                  value={data.subtitle}
                  onChange={(v) => updateField("subtitle", v)}
                  className="heading-subtitle"
                />
                <EditableField
                  tag="h1"
                  value={data.title}
                  onChange={(v) => updateField("title", v)}
                  className="heading-title"
                />
              </div>

              {/* Anrede */}
              <section className="section-anrede">
                <EditableField
                  tag="p"
                  value={data.salutation}
                  onChange={(v) => updateField("salutation", v)}
                />
              </section>

              {/* Einleitung */}
              <section className="section-text">
                <EditableField
                  tag="p"
                  value={data.introduction}
                  onChange={(v) => updateField("introduction", v)}
                />
              </section>

              {/* Erfahrung */}
              <section className="section-text">
                <EditableField
                  tag="p"
                  value={data.experience}
                  onChange={(v) => updateField("experience", v)}
                />
              </section>

              {/* Motivation */}
              <section className="section-text">
                <EditableField
                  tag="p"
                  value={data.motivation}
                  onChange={(v) => updateField("motivation", v)}
                />
              </section>

              {/* Closing */}
              <section className="section-text">
                <EditableField
                  tag="p"
                  value={data.closing}
                  onChange={(v) => updateField("closing", v)}
                />
              </section>

              {/* Signature */}
              <section className="signature">
                <EditableField
                  tag="p"
                  value={data.greeting}
                  onChange={(v) => updateField("greeting", v)}
                  className="gruss"
                />
                <EditableField
                  tag="p"
                  value={data.signatureName}
                  onChange={(v) => updateField("signatureName", v)}
                  className="name"
                />
              </section>


            </div>
          </div>

        </div>
      </div>

      {/* Styles */}
      <style jsx global>{`
        /* Reset for print */
        .bewerbung-wrapper {
          min-height: 100vh;
        }

        .bewerbung-container {
          min-height: 100vh;
          background: #171717;
          padding: 2rem 1rem;
        }

        .bewerbung-page {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          background: white;
          box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.5);
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Editable fields */
        .editable {
          outline: none;
          cursor: text;
          transition: background 0.2s;
          border-radius: 2px;
          padding: 0 2px;
          margin: 0 -2px;
        }

        .editable:hover {
          background: rgba(255, 255, 0, 0.2);
        }

        .editable:focus {
          background: rgba(255, 255, 0, 0.3);
        }

        /* Hero Header */
        .hero-header {
          position: relative;
          background: #1a1a1a;
          color: white;
          height: 265px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .hero-image {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 10;
        }

        .hero-image img {
          object-fit: cover !important;
          object-position: center 20% !important;
        }

        .hero-content {
          position: relative;
          z-index: 20;
          padding: 48px 40px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-text {
          max-width: 48%;
        }

        .hero-subtitle {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #9ca3af;
          margin-bottom: 8px;
          display: block;
        }

        .hero-title {
          font-size: 30px;
          font-weight: 900;
          letter-spacing: -0.025em;
          margin-bottom: 16px;
          display: block;
        }

        .hero-line {
          width: 56px;
          height: 4px;
          background: white;
          margin-bottom: 16px;
        }

        .hero-name {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
          display: block;
        }

        .hero-birth {
          font-size: 14px;
          color: #d1d5db;
          display: block;
        }

        /* Two Column Layout */
        .main-content-wrapper {
          display: flex;
          flex: 1;
          min-height: 0;
        }

        /* Left Sidebar - extends to bottom */
        .sidebar-left {
          width: 200px;
          flex-shrink: 0;
          background: #1a1a1a;
          color: white;
          padding: 28px 18px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sidebar-header {
          padding-bottom: 18px;
          border-bottom: 1px solid #333;
        }

        .sidebar-name {
          font-size: 16px;
          font-weight: 700;
          color: white;
          margin: 0 0 6px 0;
          display: block;
        }

        .sidebar-birth {
          font-size: 11px;
          color: #9ca3af;
          margin: 0;
          display: block;
          line-height: 1.4;
        }

        .sidebar-contacts {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .sidebar-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 12px;
          line-height: 1.4;
          word-break: break-word;
        }

        .sidebar-icon {
          width: 14px;
          height: 14px;
          color: #9ca3af;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .sidebar-badges {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 18px;
          border-top: 1px solid #333;
        }

        .sidebar-badge {
          background: transparent;
          color: white;
          padding: 7px 10px;
          font-size: 10px;
          font-weight: 500;
          border: 1px solid #444;
          text-align: center;
        }

        /* Additional Info Section */
        .sidebar-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 18px;
          border-top: 1px solid #333;
        }

        .sidebar-info-title {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9ca3af;
          margin: 0 0 4px 0;
        }

        .sidebar-info-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 12px;
          line-height: 1.4;
          color: white;
        }

        .sidebar-info-item .editable {
          color: white !important;
          min-width: 50px;
        }

        /* Sidebar Qualifications */
        .sidebar-qualifications {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 18px;
          border-top: 1px solid #333;
        }

        .sidebar-qual-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 10px;
          line-height: 1.4;
          color: white;
        }

        .qual-bullet {
          color: #22c55e;
          font-weight: 700;
          flex-shrink: 0;
        }

        .sidebar-qual-item .editable {
          color: white !important;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          padding: 28px 36px;
          display: flex;
          flex-direction: column;
        }

        .page-heading {
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 2px solid #000;
        }

        .heading-subtitle {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #6b7280;
          display: block;
          margin-bottom: 4px;
        }

        .heading-title {
          font-size: 24px;
          font-weight: 900;
          color: #000;
          letter-spacing: -0.025em;
          margin: 0;
          display: block;
        }

        .section-anrede {
          margin-bottom: 16px;
          color: #1f2937;
          font-size: 15px;
        }

        .section-text {
          margin-bottom: 14px;
          color: #374151;
          font-size: 14px;
          line-height: 1.7;
          text-align: justify;
        }

        /* Skills Box */
        .skills-box {
          margin-top: auto;
          background: #fafafa;
          padding: 18px;
          border-radius: 6px;
          border-left: 4px solid #000;
        }

        .skills-title {
          font-size: 14px;
          font-weight: 700;
          color: #000;
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          font-size: 12px;
        }

        .skill-item {
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }

        .skill-plus {
          color: #000;
          font-weight: 700;
          flex-shrink: 0;
        }

        .skill-item span:last-child {
          color: #374151;
        }

        /* Signature */
        .signature {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .gruss {
          color: #6b7280;
          margin-bottom: 8px;
          display: block;
          font-size: 14px;
        }

        .name {
          font-size: 18px;
          font-weight: 700;
          color: #000;
          display: block;
        }

        /* PRINT STYLES */
        @media print {
          .no-print {
            display: none !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            width: 210mm !important;
            height: 297mm !important;
          }

          @page {
            size: A4;
            margin: 0;
          }

          .bewerbung-wrapper {
            min-height: auto !important;
            width: 210mm !important;
          }

          .bewerbung-container {
            background: white !important;
            padding: 0 !important;
            min-height: auto !important;
            width: 210mm !important;
          }

          .bewerbung-page {
            width: 210mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            overflow: hidden !important;
          }

          .hero-header {
            height: 265px !important;
            background: #1a1a1a !important;
            background-color: #1a1a1a !important;
          }

          .hero-image {
            left: 0 !important;
            right: 0 !important;
            top: 0 !important;
            bottom: 0 !important;
          }

          .hero-image img {
            object-fit: cover !important;
            object-position: center 20% !important;
          }

          /* Sidebar */
          .sidebar-left {
            width: 200px !important;
            background: #1a1a1a !important;
            background-color: #1a1a1a !important;
            padding: 28px 18px !important;
          }

          .sidebar-header {
            padding-bottom: 18px !important;
            border-bottom: 1px solid #333 !important;
          }

          .sidebar-name {
            font-size: 16px !important;
          }

          .sidebar-birth {
            font-size: 11px !important;
          }

          .sidebar-contact-item {
            font-size: 12px !important;
          }

          .sidebar-icon {
            width: 14px !important;
            height: 14px !important;
          }

          .sidebar-badge {
            font-size: 10px !important;
            padding: 7px 10px !important;
          }

          .sidebar-info {
            padding-top: 18px !important;
            border-top: 1px solid #333 !important;
          }

          .sidebar-info-title {
            font-size: 11px !important;
          }

          .sidebar-info-item {
            font-size: 12px !important;
          }

          .sidebar-qualifications {
            padding-top: 18px !important;
            border-top: 1px solid #333 !important;
          }

          .sidebar-qual-item {
            font-size: 10px !important;
            color: white !important;
          }

          .qual-bullet {
            color: #22c55e !important;
          }

          .main-content {
            padding: 28px 36px !important;
          }

          .page-heading {
            margin-bottom: 20px !important;
            padding-bottom: 16px !important;
            border-bottom: 2px solid #000 !important;
          }

          .heading-subtitle {
            font-size: 11px !important;
          }

          .heading-title {
            font-size: 24px !important;
          }

          .section-anrede {
            font-size: 15px !important;
          }

          .section-text {
            font-size: 14px !important;
            margin-bottom: 14px !important;
          }

          .skills-box {
            background: #fafafa !important;
            background-color: #fafafa !important;
            padding: 18px !important;
          }

          .skills-title {
            font-size: 14px !important;
          }

          .skills-grid {
            font-size: 12px !important;
          }

          .gruss {
            font-size: 14px !important;
          }

          .name {
            font-size: 18px !important;
          }

          .editable:hover,
          .editable:focus {
            background: transparent !important;
          }
        }
      `}</style>
    </div>
  );
}
