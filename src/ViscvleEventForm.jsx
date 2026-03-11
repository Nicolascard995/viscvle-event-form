import { useState } from "react";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Lora:wght@600;700&display=swap";

const COLORS = {
    color1: "#CCCCCC",
    color2: "#999999",
    color3: "#666666",
    color4: "#333333",
    color5: "#1A1A1A",
    color6: "#9C9C8B",
    color7: "#E8E8DB",
    color8: "#323232",
    color9: "#D0D0B9",
    color10: "#F9F9F9",
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
            { value: "hochzeit", label: "Hochzeit / Standesamtliche Feier" },
            { value: "geburtstag", label: "Geburtstag / Jubiläum" },
            { value: "firmenfeier", label: "Firmenfeier / Teamdinner" },
            { value: "andere", label: "Andere Feier" },
        ],
    },
    {
        id: "date",
        question: "Wann soll gefeiert werden?",
        type: "date_info",
        fields: [
            { name: "date", label: "Wunschdatum", type: "date", required: true },
            { name: "time", label: "Gewünschte Uhrzeit", type: "select", options: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"], required: true },
            { name: "flexible", label: "Datum flexibel?", type: "select", options: ["Ja, +/- 1 Woche", "Ja, +/- 1 Monat", "Nein, nur dieses Datum"] },
        ],
    },
    {
        id: "guests_org",
        question: "Wie viele Gäste erwarten Sie?",
        type: "fields",
        fields: [
            { name: "adults", label: "Personenzahl (Erwachsene)", type: "number", placeholder: "z.B. 20 (max. 80)", required: true, max: 80 },
            { name: "children", label: "Kinder", type: "text", placeholder: "Anzahl + Alter", sublabel: "Kinder 1–3 Jahre frei · Ab 12 Jahren Vollzahler" },
            { name: "company", label: "Firma / Organisation (optional)", type: "text" },
            { name: "onsite_contact", label: "Ansprechpartner vor Ort", type: "text", required: true },
            { name: "mobile", label: "Mobiltelefonnummer", type: "tel", required: true },
        ],
    },
    {
        id: "budget",
        question: "Budget pro Person",
        type: "budget_slider",
        min: 69.90,
        max: 129.90,
        step: 1.00,
    },
    {
        id: "special_notes",
        question: "Besondere Hinweise",
        type: "fields",
        fields: [
            { name: "veg_count", label: "Vegetarier Anzahl", type: "number", placeholder: "Anzahl vegetarischer Gäste" },
            { name: "fish_allowed", label: "Davon Fisch erlaubt?", type: "select", options: ["Ja", "Nein", "Nicht zutreffend"] },
            { name: "allergies", label: "Allergien / Unverträglichkeiten", type: "textarea", placeholder: "Bitte alle Allergien und Unverträglichkeiten genau mitteilen" },
            { name: "decoration", label: "Eigene Dekoration / Floristik?", type: "select", options: ["Ja, wir bringen eigene Deko mit", "Nein", "Noch unklar"] },
            { name: "music", label: "DJ / Livemusik / Technik?", type: "select", options: ["Ja, wir organisieren selbst", "Nein", "Möchten wir besprechen"], sublabel: "Wichtig: Max. Lautstärke ab 22:00 Uhr · Eventende 00:00 Uhr" },
            { name: "other_notes", label: "Sonstige Wünsche", type: "textarea", placeholder: "Besondere Sitzordnung, Zeitplan, weitere Fragen..." },
        ],
    },
    {
        id: "payment",
        question: "Wie möchten Sie bezahlen?",
        type: "payment_select",
        options: [
            { value: "ec", label: "Kartenzahlung (EC / Kredit)", sublabel: "Alle Karten möglich (außer American Express)" },
            { value: "rechnung", label: "Auf Rechnung", sublabel: "Kostenübernahme nur innerhalb Deutschlands" },
            { value: "bar", label: "Barzahlung vor Ort", sublabel: "Bei Einzelzahlungen kann es zu Wartezeiten kommen" },
        ],
    },
    {
        id: "contact_final",
        question: "Ihre Kontaktdaten",
        type: "contact_fields",
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "email", label: "E-Mail", type: "email", required: true },
            { name: "billing_address_private", label: "Rechnungsadresse", type: "textarea", placeholder: "Ihre Anschrift für die Rechnung" },
        ],
    },
];

export default function ViscvleEventForm() {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const current = formSteps[step];
    const progress = ((step + 1) / formSteps.length) * 100;

    const updateField = (key, value) => setData((d) => ({ ...d, [key]: value }));

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                setError("Entschuldigung, es gab ein Problem. Bitte versuchen Sie es später erneut.");
            }
        } catch (err) {
            setError("Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung.");
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (step < formSteps.length - 1) {
            setStep(step + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => step > 0 && setStep(step - 1);

    if (submitted) {
        return (
            <div style={styles.page}>
                <link href={FONT_URL} rel="stylesheet" />
                <div style={styles.container}>
                    <div style={styles.successCard}>
                        <div style={{ fontSize: 48, marginBottom: 16, color: COLORS.color12 }}>✓</div>
                        <h2 style={styles.successTitle}>Vielen Dank für Ihre Anfrage!</h2>
                        <p style={styles.successText}>
                            Wir haben Ihre Anfrage erhalten. Ein Mitarbeiter wird sich innerhalb von 48 Stunden persönlich bei Ihnen melden, um alle Details zu besprechen und Ihre Buchung zu bestätigen.
                        </p>
                        <p style={{ ...styles.successText, fontSize: 13, fontStyle: "italic" }}>
                            Bitte beachten Sie: Nach der Bestätigung durch unser Team wird eine Anzahlung zur verbindlichen Reservierung fällig.
                        </p>

                        <div style={styles.summaryBox}>
                            <h3 style={styles.summaryTitle}>Ihre Anfrage im Überblick</h3>
                            <div style={styles.summaryGrid}>
                                {data.type && <SummaryRow label="Anlass" value={formSteps[0].options.find(o => o.value === data.type)?.label} />}
                                {data.date && <SummaryRow label="Datum" value={`${data.date} um ${data.time || "—"}`} />}
                                {data.adults && <SummaryRow label="Gäste" value={`${data.adults} Erwachsene${data.veg_count ? ` (${data.veg_count} Veg.)` : ""}`} />}
                                {data.budget && <SummaryRow label="Budget" value={`${data.budget} € p.P.`} />}
                                {data.name && <SummaryRow label="Kontakt" value={`${data.name} — ${data.email}`} />}
                            </div>
                        </div>
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

                {/* Question Card */}
                <div style={styles.questionCard}>
                    <h2 style={styles.question}>{current.question}</h2>

                    {/* Paso 1: Select simple */}
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
                                    <span>{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Paso 2, 3, 5: Fields normal */}
                    {(current.type === "fields" || current.type === "date_info") && (
                        <>
                            <div style={styles.fieldsContainer}>
                                {current.fields.map((field) => (
                                    <div key={field.name} style={styles.fieldGroup}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                            <label style={styles.fieldLabel}>
                                                {field.label} {field.required && <span style={{ color: COLORS.color6 }}>*</span>}
                                            </label>
                                            {field.sublabel && <span style={{ fontSize: 11, color: COLORS.color3, fontStyle: "italic" }}>{field.sublabel}</span>}
                                        </div>
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
                            <div style={styles.buttonGroup}>
                                {step > 0 && (
                                    <button onClick={handleBack} style={styles.backBtnOutline}>← Zurück</button>
                                )}
                                <button onClick={handleNext} style={styles.nextBtn}>Weiter →</button>
                            </div>
                        </>
                    )}                    {/* Paso 4: Budget Slider */}
                    {current.type === "budget_slider" && (
                        <div style={{ padding: "10px 0 30px" }}>
                            <div style={{ textAlign: "center", marginBottom: 32 }}>
                                <span style={{ fontSize: 42, fontWeight: 600, color: COLORS.color5, fontFamily: '"Lora", serif' }}>
                                    {Number(data.budget || current.min).toLocaleString("de-DE", { minimumFractionDigits: 2 })} €
                                </span>
                                <span style={{ display: "block", fontSize: 13, color: COLORS.color3, marginTop: 4 }}>Pro Person</span>
                                <span style={{ display: "block", fontSize: 11, color: COLORS.color3, marginTop: 8, fontStyle: "italic" }}>Exklusive Getränke · Keine Getränke-Flatrate verfügbar</span>
                            </div>
                            <input
                                type="range"
                                min={current.min}
                                max={current.max}
                                step={current.step}
                                value={data.budget || current.min}
                                onChange={(e) => updateField(current.id, e.target.value)}
                                style={styles.rangeSlider}
                            />
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.color3, marginTop: 12 }}>
                                <span>69,90 €</span>
                                <span>129,90 €</span>
                            </div>
                            <div style={{ ...styles.buttonGroup, marginTop: 40 }}>
                                {step > 0 && (
                                    <button onClick={handleBack} style={styles.backBtnOutline}>← Zurück</button>
                                )}
                                <button onClick={handleNext} style={styles.nextBtn}>Weiter →</button>
                            </div>
                        </div>
                    )}

                    {/* Paso 6: Payment Select con Condicionales */}
                    {current.type === "payment_select" && (
                        <div style={styles.optionsGrid}>
                            {current.options.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => updateField(current.id, opt.value)}
                                    style={{
                                        ...styles.optionBtn,
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: 4,
                                        ...(data[current.id] === opt.value ? styles.optionBtnActive : {}),
                                    }}
                                >
                                    <span style={{ fontWeight: 600 }}>{opt.label}</span>
                                    <span style={{ fontSize: 13, color: COLORS.color3 }}>{opt.sublabel}</span>
                                </button>
                            ))}

                            {data[current.id] === "rechnung" && (
                                <div style={{ ...styles.fieldsContainer, marginTop: 24, padding: "20px", background: COLORS.color10, borderRadius: 4 }}>
                                    <div style={styles.fieldGroup}>
                                        <label style={styles.fieldLabel}>Firma (Rechnungsempfänger) <span style={{ color: COLORS.color6 }}>*</span></label>
                                        <input
                                            style={styles.input}
                                            value={data.billing_company || ""}
                                            onChange={(e) => updateField("billing_company", e.target.value)}
                                        />
                                    </div>
                                    <div style={styles.fieldGroup}>
                                        <label style={styles.fieldLabel}>Rechnungsadresse <span style={{ color: COLORS.color6 }}>*</span></label>
                                        <textarea
                                            style={styles.textarea}
                                            placeholder="Straße, PLZ, Ort"
                                            value={data.billing_address || ""}
                                            onChange={(e) => updateField("billing_address", e.target.value)}
                                            rows={2}
                                        />
                                    </div>
                                    <p style={{ fontSize: 12, color: COLORS.color3 }}>Eine Kostenübernahmebestätigung wird nach der Buchung benötigt.</p>
                                </div>
                            )}

                            <div style={{ ...styles.buttonGroup, marginTop: 16 }}>
                                {step > 0 && (
                                    <button onClick={handleBack} style={styles.backBtnOutline}>← Zurück</button>
                                )}
                                {data[current.id] && (
                                    <button onClick={handleNext} style={styles.nextBtn}>Weiter →</button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Paso 7: Contact Final con lógica de dirección */}
                    {current.type === "contact_fields" && (
                        <>
                            <div style={styles.fieldsContainer}>
                                {current.fields.map((field) => {
                                    const isCompany = !!data.company || (data.payment === "rechnung" && !!data.billing_company);
                                    const alreadyHasAddress = data.payment === "rechnung" && !!data.billing_address;
                                    const showAddressField = field.name === "billing_address_private" ? (!isCompany && !alreadyHasAddress) : true;

                                    if (!showAddressField) return null;

                                    return (
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
                                    );
                                })}
                            </div>
                            <div style={styles.buttonGroup}>
                                {step > 0 && (
                                    <button onClick={handleBack} style={styles.backBtnOutline}>← Zurück</button>
                                )}
                                <button
                                    onClick={handleNext}
                                    style={{ ...styles.nextBtn, opacity: loading ? 0.7 : 1, cursor: loading ? "wait" : "pointer" }}
                                    disabled={loading}
                                >
                                    {loading ? "Wird gesendet..." : "Anfrage absenden"}
                                </button>
                                {error && (
                                    <p style={{ color: COLORS.color6, fontSize: 13, marginTop: 12, textAlign: "center" }}>{error}</p>
                                )}
                            </div>
                        </>
                    )}

                    {/* Minimal Back button specifically for Paso 1 (not needed) but ensuring it's available if flow allows back to step 0 */}
                    {current.type === "select" && step > 0 && (
                        <button onClick={handleBack} style={{ ...styles.backBtn, marginTop: 16 }}>← Zurück</button>
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
            <span style={{ color: COLORS.color3, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: 12, fontWeight: 300, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
            <span style={{ color: COLORS.color5, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: 13, fontWeight: 300, textAlign: "right", maxWidth: "60%" }}>{value}</span>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        background: COLORS.color6,
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
        width: "100%",
        boxSizing: "border-box",
    },
    optionBtnActive: {
        borderColor: COLORS.color6,
        background: COLORS.color10,
    },
    infoBox: {
        marginTop: 8,
        padding: "12px 16px",
        background: COLORS.color10,
        borderLeft: `3px solid ${COLORS.color6}`,
        fontSize: 14,
        color: COLORS.color4,
        lineHeight: 1.5,
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
        flex: 2,
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
    buttonGroup: {
        display: "flex",
        gap: 12,
        alignItems: "center",
    },
    backBtnOutline: {
        flex: 1,
        padding: "16px",
        background: "transparent",
        border: `1px solid ${COLORS.color7}`,
        borderRadius: 4,
        color: COLORS.color3,
        fontSize: 15,
        cursor: "pointer",
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: 300,
        transition: "all 0.2s",
    },
    rangeSlider: {
        width: "100%",
        cursor: "pointer",
        accentColor: COLORS.color5,
    },
    backBtn: {
        display: "block",
        margin: "0 auto",
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
        margin: "0 0 16px",
    },
    successText: {
        fontSize: 15,
        color: COLORS.color3,
        margin: "0 0 24px",
        lineHeight: 1.6,
        fontWeight: 300,
    },
    summaryBox: {
        background: COLORS.color10,
        borderRadius: 4,
        padding: "24px",
        textAlign: "left",
        marginTop: 32,
        border: `1px solid ${COLORS.color7}`,
    },
    summaryTitle: {
        fontFamily: '"Lora", serif',
        fontSize: 18,
        fontWeight: 600,
        color: COLORS.color5,
        margin: "0 0 16px",
    },
};
