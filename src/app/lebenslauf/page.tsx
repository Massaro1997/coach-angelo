"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Dati di default
const defaultData = {
  name: "ANGELO MAGLIARISI",
  subtitle: "Fitnesstrainer",
  address: "Freiheitsring 1, 50226 Frechen",
  phone: "+49 176 93193043",
  email: "magliarisiangelo912@gmail.com",
  birthdate: "16.07.1998",
  website: "angelocoach.com",
  skills: [
    "Trainer B-Lizenz",
    "Personal Training",
    "Motivationsfähigkeit",
    "Kreativität im Training",
    "Praxiserfahrung in der Erstellung von Trainingsprogrammen",
    "Ernährungswissen",
    "Grundlegende Kenntnisse in Erster Hilfe",
  ],
  languages: [
    { name: "Italienisch", level: "Muttersprache" },
    { name: "Deutsch", level: "C1 - Fortgeschritten" },
  ],
  experience: [
    {
      title: "Lagerist",
      date: "01/2022 - Aktuell",
      company: "BECHER - Köln",
      tasks: [
        "Kontrollieren der Wareneingänge und -ausgänge",
        "Auftragsbezogenes Kommissionieren nach Lieferschein",
        "Kontrollieren von Lieferscheinen und Warenempfangsbestätigungen",
        "Bearbeiten von Kommissionier- und Versandaufträgen",
      ],
    },
    {
      title: "Koch",
      date: "01/2019 - 12/2021",
      company: "TUTTO Restaurant - Köln",
      tasks: [],
    },
    {
      title: "Personal Trainer, Kundenbetreuung",
      date: "05/2017 - 09/2018",
      company: "Bodygymclub - Italien",
      tasks: [
        "Regelmäßiges Überprüfen der Leistungsniveaus",
        "Geben von Feedback und Durchführen von Coachings",
        "Erstellen von Trainingsmaterialien und Beurteilungsgrundlagen",
        "Vereinbarung von Trainings- und Probetrainingsterminen",
      ],
    },
  ],
  education: [
    {
      title: "Trainer B-Lizenz",
      date: "2024 - 2025",
      institution: "OTL Akademie - Frechen",
    },
    {
      title: "Ausbildung als Koch",
      date: "2012 - 2017",
      institution: "Berufsschule - Italien",
    },
    {
      title: "Mittlere Reife",
      date: "2009 - 2012",
      institution: "Mittelschule - Italien",
    },
  ],
  footer: "Angelo Magliarisi, Köln den 09.12.2025",
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
  tag?: "span" | "p" | "h1" | "h2" | "h3" | "li" | "div";
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
  if (tag === "h3") return <h3 {...commonProps} />;
  if (tag === "p") return <p {...commonProps} />;
  if (tag === "li") return <li {...commonProps} />;
  if (tag === "div") return <div {...commonProps} />;
  return <span {...commonProps} />;
}

export default function LebenslaufPage() {
  const [data, setData] = useState(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carica dati da localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lebenslauf-data");
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
      localStorage.setItem("lebenslauf-data", JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm("Tutti i dati verranno resettati ai valori originali. Continuare?")) {
      setData(defaultData);
      localStorage.removeItem("lebenslauf-data");
    }
  };

  const updateField = (field: keyof typeof data, value: unknown) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...data.skills];
    newSkills[index] = value;
    updateField("skills", newSkills);
  };

  const updateLanguage = (index: number, field: "name" | "level", value: string) => {
    const newLanguages = [...data.languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    updateField("languages", newLanguages);
  };

  const updateExperience = (index: number, field: string, value: unknown) => {
    const newExp = [...data.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    updateField("experience", newExp);
  };

  const updateExperienceTask = (expIndex: number, taskIndex: number, value: string) => {
    const newExp = [...data.experience];
    const newTasks = [...newExp[expIndex].tasks];
    newTasks[taskIndex] = value;
    newExp[expIndex] = { ...newExp[expIndex], tasks: newTasks };
    updateField("experience", newExp);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEdu = [...data.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    updateField("education", newEdu);
  };

  if (!isLoaded) {
    return <div className="lebenslauf-wrapper"><div className="lebenslauf-container" /></div>;
  }

  return (
    <div className="lebenslauf-wrapper">
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

      {/* Lebenslauf Document */}
      <div className="lebenslauf-container">
        <div className="lebenslauf-page">

          {/* Header with Photo */}
          <header className="cv-header">
            <div className="cv-photo">
              <Image
                src="/Angelo lebenslauf.png"
                alt="Angelo Magliarisi"
                width={180}
                height={220}
                className="photo-img"
                priority
              />
            </div>
            <div className="cv-header-content">
              <EditableField
                tag="h1"
                value={data.name}
                onChange={(v) => updateField("name", v)}
                className="cv-name"
              />
              <EditableField
                tag="p"
                value={data.subtitle}
                onChange={(v) => updateField("subtitle", v)}
                className="cv-subtitle"
              />
              <div className="cv-contact-grid">
                <div className="cv-contact-item">
                  <svg className="cv-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <EditableField value={data.address} onChange={(v) => updateField("address", v)} />
                </div>
                <div className="cv-contact-item">
                  <svg className="cv-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <EditableField value={data.phone} onChange={(v) => updateField("phone", v)} />
                </div>
                <div className="cv-contact-item">
                  <svg className="cv-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <EditableField value={data.email} onChange={(v) => updateField("email", v)} />
                </div>
                <div className="cv-contact-item">
                  <svg className="cv-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <EditableField value={data.birthdate} onChange={(v) => updateField("birthdate", v)} />
                </div>
                <div className="cv-contact-item">
                  <svg className="cv-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <EditableField value={data.website} onChange={(v) => updateField("website", v)} />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content - Two Column Layout */}
          <div className="main-content-wrapper">

            {/* LEFT SIDEBAR */}
            <aside className="sidebar-left">
              {/* Kompetenzen */}
              <div className="sidebar-section">
                <h3 className="sidebar-section-title">Kompetenzen</h3>
                {data.skills.map((skill, i) => (
                  <div className="sidebar-skill-item" key={i}>
                    <span className="skill-bullet">+</span>
                    <EditableField value={skill} onChange={(v) => updateSkill(i, v)} />
                  </div>
                ))}
              </div>

              {/* Sprachen */}
              <div className="sidebar-section">
                <h3 className="sidebar-section-title">Sprachen</h3>
                {data.languages.map((lang, i) => (
                  <div className="sidebar-language" key={i}>
                    <EditableField
                      value={lang.name}
                      onChange={(v) => updateLanguage(i, "name", v)}
                      className="lang-name"
                    />
                    <EditableField
                      value={lang.level}
                      onChange={(v) => updateLanguage(i, "level", v)}
                      className="lang-level"
                    />
                  </div>
                ))}
              </div>
            </aside>

            {/* RIGHT CONTENT */}
            <div className="main-content">

              {/* Berufserfahrung */}
              <section className="content-section">
                <h2 className="section-title">Berufserfahrung</h2>
                {data.experience.map((exp, i) => (
                  <div className="entry" key={i}>
                    <div className="entry-header">
                      <EditableField
                        value={exp.title}
                        onChange={(v) => updateExperience(i, "title", v)}
                        className="entry-title"
                      />
                      <EditableField
                        value={exp.date}
                        onChange={(v) => updateExperience(i, "date", v)}
                        className="entry-date"
                      />
                    </div>
                    <EditableField
                      tag="p"
                      value={exp.company}
                      onChange={(v) => updateExperience(i, "company", v)}
                      className="entry-company"
                    />
                    {exp.tasks.length > 0 && (
                      <ul className="entry-tasks">
                        {exp.tasks.map((task, j) => (
                          <li key={j}>
                            <EditableField
                              value={task}
                              onChange={(v) => updateExperienceTask(i, j, v)}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>

              {/* Ausbildung */}
              <section className="content-section">
                <h2 className="section-title">Ausbildung</h2>
                {data.education.map((edu, i) => (
                  <div className="entry" key={i}>
                    <div className="entry-header">
                      <EditableField
                        value={edu.title}
                        onChange={(v) => updateEducation(i, "title", v)}
                        className="entry-title"
                      />
                      <EditableField
                        value={edu.date}
                        onChange={(v) => updateEducation(i, "date", v)}
                        className="entry-date"
                      />
                    </div>
                    <EditableField
                      tag="p"
                      value={edu.institution}
                      onChange={(v) => updateEducation(i, "institution", v)}
                      className="entry-company"
                    />
                  </div>
                ))}
              </section>

              {/* Footer */}
              <div className="content-footer">
                <EditableField
                  tag="p"
                  value={data.footer}
                  onChange={(v) => updateField("footer", v)}
                />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Styles */}
      <style jsx global>{`
        .lebenslauf-wrapper {
          min-height: 100vh;
        }

        .lebenslauf-container {
          min-height: 100vh;
          background: #171717;
          padding: 2rem 1rem;
        }

        .lebenslauf-page {
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

        /* Header */
        .cv-header {
          background: #000;
          color: white;
          padding: 40px;
          display: flex;
          gap: 40px;
          align-items: center;
        }

        .cv-photo {
          flex-shrink: 0;
        }

        .photo-img {
          width: 160px;
          height: 200px;
          object-fit: cover;
          border: 3px solid white;
        }

        .cv-header-content {
          flex: 1;
        }

        .cv-name {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
          display: block;
        }

        .cv-subtitle {
          font-size: 16px;
          color: #9ca3af;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: block;
        }

        .cv-contact-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 16px 32px;
        }

        .cv-contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }

        .cv-icon {
          width: 16px;
          height: 16px;
          color: #9ca3af;
          flex-shrink: 0;
        }

        /* Main Content Wrapper */
        .main-content-wrapper {
          display: flex;
          flex: 1;
        }

        /* Sidebar */
        .sidebar-left {
          width: 220px;
          background: #1a1a1a;
          color: white;
          padding: 28px 20px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Sidebar Sections */
        .sidebar-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sidebar-section-title {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9ca3af;
          margin: 0 0 8px 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #333;
        }

        .sidebar-skill-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 11px;
          line-height: 1.4;
          color: white;
        }

        .skill-bullet {
          color: #22c55e;
          font-weight: 700;
          flex-shrink: 0;
        }

        .sidebar-skill-item .editable {
          color: white !important;
        }

        /* Languages */
        .sidebar-language {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          padding: 4px 0;
        }

        .lang-name {
          color: white;
        }

        .lang-level {
          color: #9ca3af;
          font-size: 10px;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          padding: 28px 36px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Content Sections */
        .content-section {
          margin-bottom: 8px;
        }

        .section-title {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 12px 0;
          padding-bottom: 6px;
          border-bottom: 2px solid #000;
        }

        /* Entries */
        .entry {
          margin-bottom: 14px;
        }

        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 2px;
        }

        .entry-title {
          font-size: 13px;
          font-weight: 700;
          color: #000;
        }

        .entry-date {
          font-size: 11px;
          color: #6b7280;
        }

        .entry-company {
          font-size: 12px;
          color: #374151;
          margin: 0 0 6px 0;
          display: block;
        }

        .entry-tasks {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .entry-tasks li {
          font-size: 11px;
          color: #6b7280;
          padding: 2px 0;
          padding-left: 12px;
          position: relative;
        }

        .entry-tasks li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #9ca3af;
        }

        /* Content Footer */
        .content-footer {
          margin-top: auto;
          padding-top: 16px;
          text-align: right;
          font-size: 11px;
          color: #6b7280;
        }

        /* PRINT STYLES */
        @media print {
          .no-print {
            display: none !important;
          }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          @page {
            size: A4;
            margin: 0;
          }

          .lebenslauf-wrapper {
            min-height: auto !important;
            width: 210mm !important;
          }

          .lebenslauf-container {
            background: white !important;
            padding: 0 !important;
            min-height: auto !important;
            width: 210mm !important;
          }

          .lebenslauf-page {
            width: 210mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            overflow: hidden !important;
          }

          .cv-header {
            background: #000 !important;
            background-color: #000 !important;
            padding: 30px !important;
          }

          .cv-name {
            font-size: 28px !important;
          }

          .photo-img {
            width: 140px !important;
            height: 175px !important;
          }

          /* Sidebar */
          .sidebar-left {
            width: 220px !important;
            background: #1a1a1a !important;
            background-color: #1a1a1a !important;
            padding: 28px 20px !important;
          }

          .sidebar-section-title {
            color: #9ca3af !important;
            border-bottom: 1px solid #333 !important;
          }

          .sidebar-skill-item {
            color: white !important;
          }

          .skill-bullet {
            color: #22c55e !important;
          }

          .lang-name {
            color: white !important;
          }

          .lang-level {
            color: #9ca3af !important;
          }

          .main-content {
            padding: 28px 36px !important;
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
