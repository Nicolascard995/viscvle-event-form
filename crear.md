Quiero que reescribas el siguiente componente React manteniendo toda la lógica (steps, estado, JSON final, etc.), pero ajustando el diseño visual para que coincida con la web de VISCVLE que está en Wix:

Tipografía de headings: Lora Bold (usa Google Fonts Lora con pesos 600/700).

Tipografía de cuerpo: Helvetica Light (usa "Helvetica Neue", "Helvetica", Arial, sans-serif con font-weight 300).

Mantén un look muy limpio, minimal, elegante, sin sombras fuertes ni bordes muy redondeados.

Paleta de colores que debes usar (crea un objeto const COLORS = { ... }):

Color 1: #CCCCCC

Color 2: #999999

Color 3: #666666

Color 4: #333333

Color 5: #1A1A1A // texto principal y fondo de botones oscuros

Color 6: #9C9C8B // acento suave (sustituye el dorado que uso ahora)

Color 7: #E8E8DB // fondos claros / borde suave

Color 8: #323232

Color 9: #D0D0B9

Color 10: #F9F9F9 // background general

Color 11: #243B24

Color 12: #6CB36C

Color 13: #000000

Reglas de estilo:

body y contenedor principal: fondo #F9F9F9, tipografía Helvetica.

Encabezados (brand VISCVLE, preguntas, títulos de resumen): fuente Lora, weight 600–700, color #1A1A1A.

Cards del formulario: fondo blanco, borde 1px solid #E8E8DB, border-radius pequeño (4–6px), casi sin sombra.

Botón principal (Weiter / Absenden): fondo #1A1A1A, texto #F9F9F9, sin outline azul, hover con ligera aclaración.

Barra de progreso: fondo gris claro (Color 1/2), relleno con Color 6 #9C9C8B.

Textos secundarios, labels, helper text: Color 3 #666666.

Reescribe SOLO el objeto styles y el <link> de fuentes del siguiente componente, sin tocar nada de la lógica de React (useState, formSteps, handleNext, handleSubmit, etc.). Puedes renombrar mis colores internos por el objeto COLORS pero no cambies la estructura ni los ids de los campos. Devuélveme el componente completo listo para pegar, con:

import de React igual.

nuevo <link> a Google Fonts para Lora.

objeto COLORS definido.

objeto styles sustituido por una versión que use la paleta y fuentes indicadas.

Aquí está el componente original que debes estilizar:


import { useState } from "react";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Lora:wght@600;700&display=swap";

const COLORS = {
  color1: "#CCCCCC",
  color2: "#999999",
  color3: "#666666",
  color4: "#333333",
  color5: "#1A1A1A", // texto principal y fondo de botones oscuros
  color6: "#9C9C8B", // acento suave
  color7: "#E8E8DB", // fondos claros / borde suave
  color8: "#323232",
  color9: "#D0D0B9",
  color10: "#F9F9F9", // background general
  color11: "#243B24",
  color12: "#6CB36C",
  color13: "#000000",
};

const formSteps = [
  {
    id: "type",
    question: "Was dürfen wir für Sie planen?",
    type: "select",
    options: [
      { value: "hochzeit", label: "Hochzeit / Standesamtliche Feier", icon: "💍" },
      { value: "geburtstag", label: "Geburtstag / Jubiläum", icon: "🎂" },
      { value: "firmenfeier", label: "Firmenfeier / Teamdinner", icon: "🏢" },
      { value: "andere", label: "Andere Feier", icon: "✨" },
    ],
  },
  {
    id: "date",
    question: "Wann soll gefeiert werden?",
    type: "date",
    fields: [
      { name: "date", label: "Wunschdatum", type: "date", required: true },
      { name: "time", label: "Gewünschte Uhrzeit", type: "select", options: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"], required: true },
      { name: "flexible", label: "Datum flexibel?", type: "select", options: ["Ja, +/- 1 Woche", "Ja, +/- 1 Monat", "Nein, nur dieses Datum"] },
    ],
  },
  {
    id: "guests",
    question: "Wie viele Gäste erwarten Sie?",
    type: "fields",
    fields: [
      { name: "adults", label: "Erwachsene", type: "number", placeholder: "z.B. 15", required: true },
      { name: "children", label: "Kinder (mit Alter)", type: "text", placeholder: "z.B. 2 Kinder (4 und 6 Jahre)" },
      { name: "final_count_date", label: "Endgültige Anzahl bekannt bis", type: "date" },
    ],
  },
  {
    id: "preferences",
    question: "Haben Sie besondere Wünsche?",
    type: "multi",
    options: [
      { value: "empfang", label: "Empfang / Aperitif" },
      { value: "weinlager", label: "Weinlager (separater Raum)" },
      { value: "frueh", label: "Frühere Öffnung (vor 17:00)" },
      { value: "deko", label: "Eigene Dekoration mitbringen" },
      { value: "musik", label: "DJ / Livemusik" },
      { value: "allergien", label: "Allergien / Unverträglichkeiten" },
      { value: "vegetarisch", label: "Vegetarische / Vegane Optionen" },
      { value: "kinder", label: "Kindermenü gewünscht" },
    ],
  },
  {
    id: "budget",
    question: "Budgetrahmen pro Person?",
    type: "select",
    options: [
      { value: "standard", label: "Standard Menü (ab 69,90 € p.P.)", icon: "🍽️" },
      { value: "premium", label: "Premium Menü (ab 79,90 € p.P.)", icon: "⭐" },
      { value: "offen", label: "Offen — beraten Sie uns", icon: "💬" },
    ],
  },
  {
    id: "contact",
    question: "Wie können wir Sie erreichen?",
    type: "fields",
    fields: [
      { name: "name", label: "Ihr Name", type: "text", required: true, placeholder: "Vor- und Nachname" },
      { name: "email", label: "E-Mail", type: "email", required: true, placeholder: "ihre@email.de" },
      { name: "phone", label: "Telefon (optional)", type: "tel", placeholder: "+49..." },
      { name: "notes", label: "Weitere Anmerkungen", type: "textarea", placeholder: "Besondere Wünsche, Fragen, Anmerkungen..." },
    ],
  },
];

export default function ViscvleEventForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [multiSelect, setMultiSelect] = useState([]);

  const current = formSteps[step];
  const progress = ((step + 1) / formSteps.length) * 100;

  const updateField = (key, value) => setData((d) => ({ ...d, [key]: value }));

  const handleNext = () => {
    if (current.type === "multi") {
      updateField(current.id, multiSelect);
    }
    if (step < formSteps.length - 1) {
      setStep(step + 1);
      setMultiSelect([]);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => step > 0 && setStep(step - 1);

  const toggleMulti = (val) => {
    setMultiSelect((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  if (submitted) {
    const summary = { ...data, preferences: data.preferences || multiSelect };
    return (
      <div style={styles.page}>
        <link href={FONT_URL} rel="stylesheet" />
        <div style={styles.container}>
          <div style={styles.successCard}>
            <div style={{ fontSize: 48, marginBottom: 16, color: COLORS.color12 }}>✓</div>
            <h2 style={styles.successTitle}>Vielen Dank für Ihre Anfrage!</h2>
            <p style={styles.successText}>
              Wir melden uns innerhalb von 48 Stunden mit einem individuellen Angebot bei Ihnen.
            </p>
            <div style={styles.summaryBox}>
              <h3 style={styles.summaryTitle}>Ihre Anfrage im Überblick</h3>
              <div style={styles.summaryGrid}>
                {data.type && <SummaryRow label="Anlass" value={formSteps[0].options.find(o => o.value === data.type)?.label} />}
                {data.date && <SummaryRow label="Datum" value={`${data.date} um ${data.time || "—"}`} />}
                {data.adults && <SummaryRow label="Gäste" value={`${data.adults} Erwachsene${data.children ? `, ${data.children}` : ""}`} />}
                {data.budget && <SummaryRow label="Budget" value={formSteps[4].options.find(o => o.value === data.budget)?.label} />}
                {data.name && <SummaryRow label="Kontakt" value={`${data.name} — ${data.email}`} />}
              </div>
            </div>
            <pre style={styles.jsonOutput}>
              {JSON.stringify(summary, null, 2)}
            </pre>
            <p style={{ ...styles.successText, fontSize: 11, opacity: 0.5, marginTop: 8 }}>
              ↑ Dieses JSON wird automáticamente an den n8n Webhook gesendet
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <link href={FONT_URL} rel="stylesheet" />
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.brand}>VISCVLE</h1>
          <p style={styles.subtitle}>Kitchen & Bar · Lüneburg</p>
          <div style={styles.tagline}>Private Events & Feiern</div>
        </div>

        {/* Progress */}
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <span style={styles.progressLabel}>Schritt {step + 1} von {formSteps.length}</span>
        </div>

        {/* Question */}
        <div style={styles.questionCard}>
          <h2 style={styles.question}>{current.question}</h2>

          {/* Select options */}
          {current.type === "select" && (
            <div style={styles.optionsGrid}>
              {current.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { updateField(current.id, opt.value); handleNext(); }}
                  style={{
                    ...styles.optionBtn,
                    ...(data[current.id] === opt.value ? styles.optionBtnActive : {}),
                  }}
                >
                  {opt.icon && <span style={{ fontSize: 24 }}>{opt.icon}</span>}
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Multi select */}
          {current.type === "multi" && (
            <>
              <div style={styles.multiGrid}>
                {current.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => toggleMulti(opt.value)}
                    style={{
                      ...styles.multiBtn,
                      ...(multiSelect.includes(opt.value) ? styles.multiBtnActive : {}),
                    }}
                  >
                    <span style={styles.checkbox}>
                      {multiSelect.includes(opt.value) ? "☑" : "☐"}
                    </span>
                    {opt.label}
                  </button>
                ))}
              </div>
              <button onClick={handleNext} style={styles.nextBtn}>Weiter →</button>
            </>
          )}

          {/* Fields / Date */}
          {(current.type === "fields" || current.type === "date") && (
            <>
              <div style={styles.fieldsContainer}>
                {current.fields.map((field) => (
                  <div key={field.name} style={styles.fieldGroup}>
                    <label style={styles.fieldLabel}>
                      {field.label} {field.required && <span style={{ color: COLORS.color6 }}>*</span>}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        style={styles.textarea}
                        placeholder={field.placeholder}
                        value={data[field.name] || ""}
                        onChange={(e) => updateField(field.name, e.target.value)}
                        rows={3}
                      />
                    ) : field.type === "select" ? (
                      <select
                        style={styles.input}
                        value={data[field.name] || ""}
                        onChange={(e) => updateField(field.name, e.target.value)}
                      >
                        <option value="">Bitte wählen...</option>
                        {field.options.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        style={styles.input}
                        placeholder={field.placeholder}
                        value={data[field.name] || ""}
                        onChange={(e) => updateField(field.name, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
              <button onClick={handleNext} style={styles.nextBtn}>
                {step === formSteps.length - 1 ? "Anfrage absenden" : "Weiter →"}
              </button>
            </>
          )}

          {/* Back button */}
          {step > 0 && (
            <button onClick={handleBack} style={styles.backBtn}>← Zurück</button>
          )}
        </div>

        {/* Footer info */}
        <div style={styles.footer}>
          <p>Salzstraße am Wasser 4 · 21335 Lüneburg</p>
          <p>Di–Fr 17:00–00:00 · Sa 12:00–00:00</p>
          <p>buchung@viscvle.de · +49 4131 28 40 39 5</p>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${COLORS.color7}` }}>
      <span style={{ color: COLORS.color3, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: 13, fontWeight: 300 }}>{label}</span>
      <span style={{ color: COLORS.color5, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: 13, fontWeight: 300, textAlign: "right", maxWidth: "60%" }}>{value}</span>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: COLORS.color10,
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 300,
    display: "flex",
    justifyContent: "center",
    padding: "24px 16px",
  },
  container: {
    maxWidth: 520,
    width: "100%",
  },
  header: {
    textAlign: "center",
    marginBottom: 40,
  },
  brand: {
    fontFamily: '"Lora", serif',
    fontSize: 42,
    fontWeight: 700,
    color: COLORS.color5,
    letterSpacing: 8,
    margin: 0,
  },
  subtitle: {
    fontFamily: '"Lora", serif',
    fontSize: 14,
    color: COLORS.color3,
    letterSpacing: 3,
    margin: "8px 0 20px",
  },
  tagline: {
    display: "inline-block",
    background: COLORS.color5,
    color: COLORS.color10,
    padding: "8px 24px",
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: 600,
    textTransform: "uppercase",
  },
  progressContainer: {
    marginBottom: 32,
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 4,
    background: COLORS.color1,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: COLORS.color6,
    transition: "width 0.4s ease",
    borderRadius: 2,
  },
  progressLabel: {
    fontSize: 11,
    color: COLORS.color3,
    whiteSpace: "nowrap",
  },
  questionCard: {
    background: "#ffffff",
    borderRadius: 6,
    padding: "40px 32px",
    border: `1px solid ${COLORS.color7}`,
    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
    marginBottom: 32,
  },
  question: {
    fontFamily: '"Lora", serif',
    fontSize: 26,
    fontWeight: 600,
    color: COLORS.color5,
    margin: "0 0 32px",
    lineHeight: 1.3,
  },
  optionsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  optionBtn: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "18px 24px",
    background: "#ffffff",
    border: `1px solid ${COLORS.color7}`,
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 15,
    color: COLORS.color5,
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 300,
    transition: "all 0.2s ease",
    textAlign: "left",
  },
  optionBtnActive: {
    borderColor: COLORS.color6,
    background: COLORS.color10,
  },
  multiGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 24,
  },
  multiBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 16px",
    background: "#ffffff",
    border: `1px solid ${COLORS.color7}`,
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 13,
    color: COLORS.color5,
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 300,
    textAlign: "left",
  },
  multiBtnActive: {
    borderColor: COLORS.color6,
    background: COLORS.color10,
  },
  checkbox: {
    fontSize: 16,
    color: COLORS.color6,
  },
  fieldsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginBottom: 28,
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: 400,
    color: COLORS.color3,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  input: {
    padding: "14px 16px",
    border: `1px solid ${COLORS.color7}`,
    borderRadius: 4,
    fontSize: 15,
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 300,
    color: COLORS.color5,
    background: "#ffffff",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  textarea: {
    padding: "14px 16px",
    border: `1px solid ${COLORS.color7}`,
    borderRadius: 4,
    fontSize: 15,
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 300,
    color: COLORS.color5,
    background: "#ffffff",
    outline: "none",
    resize: "vertical",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  nextBtn: {
    width: "100%",
    padding: "16px",
    background: COLORS.color5,
    color: COLORS.color10,
    border: "none",
    borderRadius: 4,
    fontSize: 15,
    fontWeight: 400,
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    cursor: "pointer",
    letterSpacing: 1,
    transition: "background 0.2s",
  },
  backBtn: {
    display: "block",
    margin: "16px auto 0",
    padding: "8px 16px",
    background: "transparent",
    border: "none",
    color: COLORS.color2,
    fontSize: 13,
    cursor: "pointer",
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 300,
    textDecoration: "underline",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: COLORS.color3,
    lineHeight: 1.8,
    marginTop: 40,
  },
  successCard: {
    background: "#ffffff",
    borderRadius: 6,
    padding: "48px 32px",
    border: `1px solid ${COLORS.color7}`,
    textAlign: "center",
  },
  successTitle: {
    fontFamily: '"Lora", serif',
    fontSize: 28,
    fontWeight: 600,
    color: COLORS.color5,
    margin: "0 0 12px",
  },
  successText: {
    fontSize: 15,
    color: COLORS.color3,
    margin: "0 0 32px",
    fontWeight: 300,
  },
  summaryBox: {
    background: COLORS.color10,
    borderRadius: 4,
    padding: "24px",
    textAlign: "left",
    marginBottom: 24,
    border: `1px solid ${COLORS.color7}`,
  },
  summaryTitle: {
    fontFamily: '"Lora", serif',
    fontSize: 18,
    fontWeight: 600,
    color: COLORS.color5,
    margin: "0 0 16px",
  },
  jsonOutput: {
    background: COLORS.color5,
    color: COLORS.color9,
    padding: 20,
    borderRadius: 4,
    fontSize: 11,
    textAlign: "left",
    overflow: "auto",
    maxHeight: 250,
    fontFamily: "monospace",
  },
};
  