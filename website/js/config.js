// ============================================================
//  HANDWERKER TEMPLATE — Elektro Karo
//  Alle kundespezifischen Werte hier eintragen.
//  Bilder: logo-client.png, favicon-client.png, hero-video.mp4, ref_*.jpg
// ============================================================
const CLIENT = {
  // ── FIRMA ──────────────────────────────────────────────────
  name:                 "Elektro Karo",
  nameKurz:             "Karo",
  unternehmenstyp:      "",
  handwerksbezeichnung: "Elektroinstallateur",
  berufsbezeichnung:    "Elektromeister",
  gruendungsjahr:       "2021",
  slogan:               "Meisterbetrieb für Elektroinstallation in Wiesbaden — zuverlässig, sauber und mit 24h-Notdienst.",
  heroEyebrow:          "Elektromeister · Wiesbaden",
  leistungenKurz:       "Elektroinstallation, Smart Home & KNX, Wallbox, Sicherheit & Netzwerk",

  // ── KONTAKT & ADRESSE ──────────────────────────────────────
  strasse:        "Dotzheimer-Str. 160",
  plz:            "65197",
  ort:            "Wiesbaden",
  telefon:        "+4915750020222",
  telefonDisplay: "01575 / 0020222",
  fax:            "",
  faxDisplay:     "",
  email:          "info@elektro-karo.de",

  // ── ONLINE ─────────────────────────────────────────────────
  domain:        "https://elektro-karo.de",
  calcomLink:    "",
  web3formsKey:  "[WEB3FORMS_ACCESS_KEY]",
  pdfSlug:       "kalkulation",

  // ── WHATSAPP ───────────────────────────────────────────────
  whatsapp:            "+4915750020222",
  whatsappVornachricht: "Hallo, ich interessiere mich für Ihre Elektro-Leistungen und hätte eine Anfrage.",

  // ── TERMINBUCHUNG VARIANTE ─────────────────────────────────
  terminVariante: "rueckruf",

  // ── FORMULARE ──────────────────────────────────────────────
  formularModus: "web3forms",

  // ── GOOGLE ─────────────────────────────────────────────────
  googleMapsEmbedUrl:    "",
  googleMapsLink:        "https://maps.google.com/?q=Dotzheimer-Str.+160,+65197+Wiesbaden",
  googleBewertungsLink:  "https://www.google.com/maps/search/Elektro+Karo+Wiesbaden",
  googleBewertungAnzahl: "18 Bewertungen",
  googleBewertungNote:   "Ausgezeichnet",

  // ── ÖFFNUNGSZEITEN ─────────────────────────────────────────
  oeffnungszeiten: {
    moDo: [
      { von: "08:00", bis: "16:00" }
    ],
    fr: [
      { von: "08:00", bis: "16:00" }
    ]
  },

  // ── LEISTUNGEN (Startseite, 4 Karten) ──────────────────────
  leistung1Titel: "Elektroinstallation",
  leistung1Text:  "Installation, Reparatur und Wartung für Wohn- und Geschäftsgebäude — vom Unterverteiler bis zur Steckdose.",
  leistung2Titel: "Smart Home & KNX",
  leistung2Text:  "Gebäudeautomation, Lichtszenen und intelligente Steuerung — geplant und fachgerecht installiert.",
  leistung3Titel: "Wallbox & E-Mobilität",
  leistung3Text:  "Wallbox-Montage, Anmeldung beim Netzbetreiber und sichere Ladeinfrastruktur für Ihr E-Auto.",
  leistung4Titel: "Sicherheit & Netzwerk",
  leistung4Text:  "Videoüberwachung, Alarmtechnik, LAN/WLAN und Prüfungen nach DGUV — alles aus einer Hand.",

  // ── WARUM-WIR (Startseite, 4 Punkte) ───────────────────────
  warumLabel:  "Warum Elektro Karo",
  warum1Titel: "Junger Meisterbetrieb",
  warum1Text:  "Elektromeister Jubran Karo — aktuelles Fachwissen, Normen und moderne Elektrotechnik seit 2021 in Wiesbaden.",
  warum2Titel: "24h-Notdienst",
  warum2Text:  "Bei Stromausfall oder akuten Defekten sind wir erreichbar — schnelle Hilfe, wenn es darauf ankommt.",
  warum3Titel: "Smart Home & KNX",
  warum3Text:  "Von klassischer Installation bis Gebäudeautomation — individuelle Lösungen statt Standard von der Stange.",
  warum4Titel: "Sauber & termintreu",
  warum4Text:  "Ordentliche Baustellen, transparente Absprachen und Arbeit, die Budget und Zeitrahmen respektiert.",

  // ── REFERENZEN ─────────────────────────────────────────────
  referenzenIntro: "Auswahl von Elektroprojekten aus Wiesbaden und Umgebung.",

  // ── ÜBER UNS TEXT ──────────────────────────────────────────
  ueberUns: [
    "Elektro Karo ist Ihr Elektromeisterbetrieb in Wiesbaden. Seit der Gründung im November 2021 stehen wir für maßgeschneiderte Elektroinstallationen, Reparaturen und Wartungen in Wohn- und Geschäftsgebäuden.",
    "Inhaber Jubran Karo hat 2020 seine Ausbildung zum Elektroniker für Energie- und Gebäudetechnik abgeschlossen und im April 2021 den Meisterbrief erworben. Qualifikation, saubere Ausführung und persönliche Beratung sind für uns selbstverständlich.",
    "Wir sind in der Handwerksrolle der Handwerkskammer Wiesbaden eingetragen und über die DEVK berufshaftpflichtversichert. Mit 24-Stunden-Notdienst, Smart-Home-Kompetenz und KNX-Erfahrung sind wir Ihr regionaler Ansprechpartner in Wiesbaden und Umgebung."
  ],

  dokBild1: "",
  dokBild2: "",
  dokBild3: "",

  // ── TEAM (team.html, bis zu 3 Mitglieder) ──────────────────
  team1Name:  "Jubran Karo",
  team1Rolle: "Elektromeister & Inhaber",
  team1Init:  "JK",
  team2Name:  "Fachteam Installation",
  team2Rolle: "Elektroinstallation & Reparatur",
  team2Init:  "EI",
  team3Name:  "Fachteam Smart Home",
  team3Rolle: "KNX, Netzwerk & Sicherheit",
  team3Init:  "SH",

  kostenrechnerAktiv: true,

  // ── KOSTENRECHNER PREISE (€/m² Richtwerte) ─────────────────
  preise: {
    standard:           95,
    premium:            125,
    xl:                 110,
    altbelagEntfernen:  45,
    abdichtung:         12,
    fussbodenheizung:   18
  },

  calcProjekte: [
    { id: "bath",    label: "Elektroinstallation",        multi: 1.0  },
    { id: "floor",   label: "Renovierung & Reparatur",    multi: 0.85 },
    { id: "terrace", label: "Smart Home / KNX",           multi: 1.35 },
    { id: "repair",  label: "Sicherheit & Netzwerk",      multi: 1.15 }
  ],
  calcMaterialien: [
    { id: "standard", label: "Basisinstallation", desc: "Elektroarbeiten im Bestand, ca. 95 €/m²" },
    { id: "premium",  label: "Neuinstallation", desc: "Hochwertige Leitungsführung, ca. 125 €/m²" },
    { id: "xl",       label: "Smart-Home-ready", desc: "Verkabelung für Automation, ca. 110 €/m²" }
  ],
  calcExtras: [
    { id: "debris",        label: "Unterverteiler / Sicherungskasten", desc: "+ ca. 45 €/m²" },
    { id: "waterproofing", label: "Prüfung & Dokumentation", desc: "+ ca. 12 €/m²" },
    { id: "floorHeating",  label: "Netzwerk-Verkabelung", desc: "+ ca. 18 €/m²" }
  ],

  kontaktformularAktiv: true,

  kontaktAnliegen: [
    { value: "beratung",    label: "Beratung / Angebot anfragen"  },
    { value: "installation", label: "Elektroinstallation"         },
    { value: "smarthome",   label: "Smart Home / KNX"            },
    { value: "wallbox",     label: "Wallbox / E-Mobilität"       },
    { value: "notdienst",   label: "Notdienst / Störung"         },
    { value: "allgemein",   label: "Allgemeine Anfrage"          }
  ],

  facebook:  "",
  instagram: "",

  colors: {
    primary:      "#1e4a8a",
    primaryDark:  "#0a1628",
    primaryMid:   "#122640",
    primaryLight: "#1a3358",
    accent:       "#f5a623",
    accentHover:  "#ffc04d",
    accentLight:  "#c4841a"
  },

  branche:  "Electrician",
  geoLat:   "50.0826",
  geoLng:   "8.2400",

  kammer:      "Handwerkskammer Wiesbaden, Wiesbaden",
  fachverband: "Elektroinnung Wiesbaden",

  bundesland:          "Hessen",
  aufsichtsbehoerde:   "Der Hessische Beauftragte für Datenschutz und Informationsfreiheit",
  aufsichtsbehoerdeUrl:"https://datenschutz.hessen.de/",

  jahreErfahrung:    "Seit 2021",
  teamGroesse:       "Meisterbetrieb",
  bewertungenAnzahl: "18 Google-Bewertungen",

  partnerIntro: "",
  partnerBgColor: "var(--secondary-dark, #122640)",
  partner: [],

  faq: [
    {
      frage: "Welche Elektro-Leistungen bietet Elektro Karo in Wiesbaden an?",
      antwort: "Elektroinstallation, Reparatur und Wartung, Smart Home & KNX, Wallbox, Sicherheitstechnik, Netzwerke, SAT-Anlagen, Messungen nach DIN VDE und Anlagenprüfung nach DGUV."
    },
    {
      frage: "Bieten Sie einen Notdienst an?",
      antwort: "Ja — Elektro Karo bietet einen 24-Stunden-Notdienst. Rufen Sie uns unter 01575 / 0020222 an oder schreiben Sie uns per WhatsApp."
    },
    {
      frage: "In welchem Gebiet sind Sie tätig?",
      antwort: "Unser Standort ist Dotzheimer-Str. 160 in 65197 Wiesbaden. Wir betreuen Projekte in Wiesbaden und der näheren Umgebung."
    },
    {
      frage: "Wie läuft eine Anfrage ab?",
      antwort: "Sie erreichen uns telefonisch, per WhatsApp, über das Kontaktformular oder die Rückruf-Anfrage. Wir klären Umfang und Termin in einem unverbindlichen Gespräch."
    },
    {
      frage: "Installieren Sie Wallboxen für E-Autos?",
      antwort: "Ja — von der Planung über die Anmeldung beim Netzbetreiber bis zur fachgerechten Montage Ihrer Ladestation."
    },
    {
      frage: "Erstellen Sie kostenlose Angebote?",
      antwort: "Ja. Nach Ihrer Anfrage klären wir den Umfang und erstellen auf Wunsch ein unverbindliches Angebot — vor Ort in Wiesbaden oder telefonisch."
    }
  ],

  klaroStorageName: "karo-consent-v1"
};
