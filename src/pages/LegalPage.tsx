import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Shield, FileText, Lock, RotateCcw, Cookie, CheckCircle2, Award, Scale, Zap, Check } from 'lucide-react';

interface LegalPageProps {
  type: 'terms' | 'privacy' | 'refund' | 'cookies' | 'cookie-consent' | 'legal-notice';
  onNavigate?: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type: initialType, onNavigate }) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [activeType, setActiveType] = useState<LegalPageProps['type']>(initialType);

  React.useEffect(() => {
    setActiveType(initialType);
  }, [initialType]);

  // Interactive Cookie Preferences
  const [cookieState, setCookieState] = useState({
    essential: true,
    analytics: true,
    dropoff: false,
    saved: false,
  });

  const tabs = [
    { id: 'legal-notice', num: '01', label: language === 'es' ? 'AVISO LEGAL' : 'LEGAL NOTICE', icon: Shield, color: '#D4AF37' },
    { id: 'terms', num: '02', label: language === 'es' ? 'TÉRMINOS Y CONDICIONES' : 'TERMS & CONDITIONS', icon: FileText, color: '#48C765' },
    { id: 'privacy', num: '03', label: language === 'es' ? 'PRIVACIDAD RGPD' : 'GDPR PRIVACY', icon: Lock, color: '#8B5CF6' },
    { id: 'refund', num: '04', label: language === 'es' ? 'REEMBOLSOS Y SEGUROS' : 'REFUND & CLAIMS', icon: RotateCcw, color: '#3B82F6' },
    { id: 'cookies', num: '05', label: language === 'es' ? 'POLÍTICA DE COOKIES' : 'COOKIE POLICY', icon: Cookie, color: '#10B981' },
    { id: 'cookie-consent', num: '06', label: language === 'es' ? 'GESTIÓN DE CONSENTIMIENTO' : 'CONSENT MANAGER', icon: CheckCircle2, color: '#10B981' },
  ];

  const legalRegistry = {
    'legal-notice': {
      color: '#D4AF37',
      stageTag: language === 'es' ? 'PROTOCOLO REGISTRAL // COMPLIANCE EUROPEO' : 'REGULATORY PROTOCOL // EU COMPLIANCE',
      hudHeader: language === 'es' ? 'REGISTRO MERCANTIL // MADRID FACILITY' : 'COMMERCIAL REGISTRY // MADRID FACILITY',
      hudSpec: 'TOMO 4120 · FOLIO 88 · HOJA M-73012 · EUIPO 018942109',
      hudFooterLeft: 'ENTIDAD: GORILLA GRADING EUROPE S.L.',
      hudFooterRight: 'JURISDICCIÓN: AUDIENCIA PROVINCIAL MADRID',
      metrics: [
        { label: language === 'es' ? 'REGISTRO MERCANTIL' : 'COMMERCIAL REGISTRY', val: 'TOMO 4120 / FOLIO 88', highlight: true },
        { label: language === 'es' ? 'JURISDICCIÓN PRIMARIA' : 'PRIMARY JURISDICTION', val: 'AUDIENCIA PROV. MADRID', highlight: false },
        { label: language === 'es' ? 'MARCA REGISTRADA' : 'REGISTERED TRADEMARK', val: 'EUIPO Nº 018942109', highlight: true },
        { label: language === 'es' ? 'DIRECTIVA COMUNITARIA' : 'EU COMPLIANCE STANDARD', val: 'DIRECTIVA 2000/31/CE', highlight: false },
      ],
      es: {
        title: 'Aviso Legal y Estructura Societaria',
        desc: 'Identificación societaria, régimen de propiedad intelectual y marco normativo europeo aplicable a los servicios tecnológicos de peritaje y graduación numismática de cartas coleccionables.',
        articles: [
          { num: '01', title: 'Identidad del Titular y Sede Operativa', text: 'Gorilla Grading Europe S.L., entidad debidamente constituida conforme al ordenamiento mercantil español y comunitario, titular del NIF/VAT intracomunitario correspondiente. Domicilio social e instalaciones centrales de peritaje óptico multiespectral ubicadas en Madrid, España, con servicio integral para los 27 Estados Miembros de la Unión Europea.' },
          { num: '02', title: 'Propiedad Intelectual, Algoritmos y Patentes', text: 'Todos los signos distintivos, la marca registrada Gorilla Grading (EUIPO), el diseño industrial del slab ultrasónico de 35 kHz, los algoritmos propietarios de cálculo centesimal de centrado óptico y la arquitectura criptográfica de los certificados digitales son propiedad exclusiva de Gorilla Grading Europe S.L., amparados por los convenios internacionales de propiedad industrial.' },
          { num: '03', title: 'Condiciones de Uso del Registro Global', text: 'Queda estrictamente prohibida la reproducción no autorizada, la ingeniería inversa de los sistemas de escaneo, el raspado automatizado (scraping) de la base de datos de certificados o cualquier intento de falsificación de los códigos QR criptográficos y etiquetas inviolables Gorilla Grading.' },
          { num: '04', title: 'Exclusión de Responsabilidad y Red de Comunicaciones', text: 'Gorilla Grading no se responsabiliza de daños provocados por interrupciones en los servicios de telecomunicaciones ajenas a nuestra infraestructura, ni por la custodia negligente de las claves de acceso a la Bóveda por parte del usuario titular.' }
        ]
      },
      en: {
        title: 'Legal Notice & Corporate Entity',
        desc: 'Corporate disclosure, intellectual property governance, and European statutory framework governing optical authentication and numismatic encapsulation services.',
        articles: [
          { num: '01', title: 'Corporate Identity and Registered Facilities', text: 'Gorilla Grading Europe S.L., legally established under Spanish and European Union commercial law with registered Community VAT identification. Headquarters and high-precision multispectral optical laboratory based in Madrid, Spain, serving all 27 EU Member States with unified transit logistics.' },
          { num: '02', title: 'Intellectual Property & Proprietary Telemetry', text: 'All registered trademarks, the Gorilla Grading brand (EUIPO registration), industrial designs of the 35 kHz sonic slab holder, sub-millimeter centering measurement algorithms, and cryptographic ledger verification engines remain the exclusive property of Gorilla Grading Europe S.L.' },
          { num: '03', title: 'Authorized Use of Verification Registry', text: 'Unauthorized replication, automated web scraping of certification registries, reverse engineering of telemetry scanners, or tampering with cryptographic security seals and holographic QR stamps is strictly prohibited and subject to civil and criminal prosecution.' },
          { num: '04', title: 'Liability Disclaimer & Infrastructure', text: 'Gorilla Grading is not liable for external telecommunication downtimes beyond direct facility systems, nor for losses resulting from compromised collector account credentials stored on third-party client devices.' }
        ]
      }
    },
    terms: {
      color: '#48C765',
      stageTag: language === 'es' ? 'CONVENIO VINCULANTE // PROTOCOLO DE PERITAJE' : 'BINDING COVENANT // CERTIFICATION PROTOCOL',
      hudHeader: language === 'es' ? 'CÁMARA DE CUSTODIA // ACUERDO DE SERVICIO' : 'SECURE VAULT // SERVICE SPECIFICATION',
      hudSpec: 'ISO-9001 / ISO-17025 VERIFIED · STANDARD V4.2',
      hudFooterLeft: 'COBERTURA: 100% VALOR DECLARADO',
      hudFooterRight: 'PRECISIÓN LÁSER: ±0.01 MM SUB-GRADOS',
      metrics: [
        { label: language === 'es' ? 'COBERTURA ASEGURADA' : 'INSURED REPLACEMENT', val: '100% VALOR MERCADO', highlight: true },
        { label: language === 'es' ? 'TOLERANCIA LÁSER' : 'LASER CALIPER SPECS', val: '±0.01 MM SUBMILÍMETRO', highlight: false },
        { label: language === 'es' ? 'FUSIÓN DEL SLAB' : 'HERMETIC SEAL FUSION', val: '35 KHZ ULTRASONIC WELD', highlight: true },
        { label: language === 'es' ? 'VINCULACIÓN LEGAL' : 'LEGAL COVENANT', val: 'CÓD. CIVIL ART. 1255', highlight: false },
      ],
      es: {
        title: 'Términos y Condiciones del Servicio',
        desc: 'Contrato vinculante de prestación de servicios numismáticos: recepción en sala limpia ISO, custodia acorazada, evaluación espectrométrica imparcial y encapsulado hermético.',
        articles: [
          { num: '01', title: 'Ámbito de Aplicación y Consentimiento Contractual', text: 'Al formalizar un pedido online o consignar cartas en nuestros puntos oficiales de Drop-off, el coleccionista acepta de forma vinculante los presentes términos operativos y las directrices técnicas de conservación.' },
          { num: '02', title: 'Criterio de Evaluación Imparcial y Telemetría', text: 'La graduación de cartas coleccionables se fundamenta en auditoría óptica multiespectral a 1200 DPI y telemetría láser a 0.01 mm en cuatro cuadrantes (Centrado, Esquinas, Bordes, Superficie). Las notas son imparciales y no negociables; no se garantizan notas comerciales predeterminadas.' },
          { num: '03', title: 'Custodia Acorazada y Seguro Integral a Todo Riesgo', text: 'Desde el momento exacto en que un lote es escaneado en nuestra recepción de Madrid, cada ejemplar queda cubierto por nuestra póliza de seguro de transporte y custodia a todo riesgo con cobertura de valor real de reposición.' },
          { num: '04', title: 'Liquidación de Tarifas y Plazos de Entrega', text: 'Los plazos de entrega estimados (Tarifa Estándar, Prioridad y Guante Blanco) se computan en días hábiles a partir de la confirmación de ingreso en cámara acorazada, devengándose el pago según la modalidad seleccionada.' },
          { num: '05', title: 'Límites de Responsabilidad e Indemnización', text: 'En caso fortuito de siniestro comprobado durante el procesamiento técnico, la responsabilidad de Gorilla Grading se canaliza a través de la aseguradora colegiada, liquidando hasta el valor de reposición de mercado acreditado o el valor declarado en la orden.' }
        ]
      },
      en: {
        title: 'Terms of Service & Custody Protocol',
        desc: 'Binding operational covenant governing laboratory intake, ISO cleanroom processing, impartial spectrometric grading, and hermetic ultrasonic preservation.',
        articles: [
          { num: '01', title: 'Contractual Scope and Consent', text: 'By submitting cards online or consigning them at authorized European Drop-off events, the collector unconditionally agrees to this formal service covenant and archival handling guidelines.' },
          { num: '02', title: 'Impartial Evaluation & Precision Telemetry', text: 'Grading is executed via 1200 DPI multispectral imaging and 0.01 mm laser telemetry across 4 quadrants (Centering, Corners, Edges, Surface). Grades are determined objectively by certified forensic standards and are non-negotiable.' },
          { num: '03', title: 'Armored Custody & Full-Replacement Insurance', text: 'Upon intake scan at our Madrid facility, each collectible is backed by our comprehensive armored transit and vault insurance policy covering verified full replacement market value.' },
          { num: '04', title: 'Service Tiers & Estimated Turnarounds', text: 'Turnaround schedules (Standard, Priority, and White Glove) are calculated in business days from validated intake date, with fees settling according to the selected tier specifications.' },
          { num: '05', title: 'Liability Limits & Insurance Settlement', text: 'In the unforeseen event of physical damage during grading, liability is resolved exclusively via authorized commercial insurance coverage up to the established fair replacement value.' }
        ]
      }
    },
    privacy: {
      color: '#8B5CF6',
      stageTag: language === 'es' ? 'SEGURIDAD DE DATOS // PROTOCOLO RGPD (UE)' : 'DATA SECURITY // GDPR (EU) PROTOCOL',
      hudHeader: language === 'es' ? 'BÓVEDA DE DATOS // CIFRADO CRIPTOGRÁFICO' : 'CRYPTOGRAPHIC VAULT // DATA ENCLAVE',
      hudSpec: 'AES-256-GCM · TLS 1.3 · ISO-27001 SECURED',
      hudFooterLeft: 'UBICACIÓN: FRANCFORT & MADRID (UE)',
      hudFooterRight: 'CESIÓN A TERCEROS: 0.0% GARANTIZADO',
      metrics: [
        { label: language === 'es' ? 'ALGORITMO DE CIFRADO' : 'CIPHER ALGORITHM', val: 'AES-256-GCM / TLS 1.3', highlight: true },
        { label: language === 'es' ? 'DATA CENTERS' : 'STORAGE ENCLAVES', val: 'FRANCFORT & MADRID (UE)', highlight: false },
        { label: language === 'es' ? 'DELEGADO DPO' : 'OFFICIAL DPO AUDIT', val: 'DPO-CERT-8842 RGPD', highlight: true },
        { label: language === 'es' ? 'POLÍTICA CESIÓN' : 'THIRD-PARTY ADS', val: '0.0% COMERCIALIZACIÓN', highlight: false },
      ],
      es: {
        title: 'Política de Privacidad y Bóveda Digital',
        desc: 'Protección integral del coleccionista conforme al Reglamento General de Protección de Datos (RGPD UE 2016/679) y la Ley Orgánica 3/2018 (LOPDGDD).',
        articles: [
          { num: '01', title: 'Recopilación Estrictamente Necesaria', text: 'Únicamente recopilamos los datos esenciales para emitir el certificado de graduación, tramitar la custodia acorazada y coordinar el envío de retorno: nombre, dirección validada, correo de telemetría y datos bancarios tokenizados con certificación PCI-DSS Nivel 1.' },
          { num: '02', title: 'Finalidad del Tratamiento y Trazabilidad', text: 'Tus datos se utilizan con la finalidad exclusiva de gestionar tu cuenta de coleccionista, emitir el registro público del certificado en nuestro explorador digital y remitir alertas críticas sobre el estado de tu pedido en tiempo real.' },
          { num: '03', title: 'Infraestructura Criptográfica y Aislamiento', text: 'Toda la información personal reside en bases de datos con cifrado AES-256 en reposo y conexiones forzadas TLS 1.3. Los servidores se encuentran físicamente en centros de datos certificados ISO-27001 dentro de la Unión Europea.' },
          { num: '04', title: 'Cero Cesión a Redes Publicitarias', text: 'Gorilla Grading no vende, alquila ni cede datos a corredores de información o agencias de publicidad. La transmisión de datos se restringe estrictamente a los transportistas asegurados (GLS, CTT, DHL Express) para hacer efectiva la entrega.' },
          { num: '05', title: 'Ejercicio de Derechos ARCO / RGPD', text: 'Tienes derecho en cualquier momento al acceso, rectificación, portabilidad, limitación y supresión de tus datos personales remitiendo solicitud firmada a compliance@gorillagrading.com.' }
        ]
      },
      en: {
        title: 'Data Privacy & Cryptographic Vault',
        desc: 'Rigorous compliance with the European Union General Data Protection Regulation (GDPR EU 2016/679) and national digital rights statutes.',
        articles: [
          { num: '01', title: 'Strictly Essential Data Collection', text: 'We collect solely necessary information required for certificate generation, vault returns, and insured shipments: verified physical address, tracking email, and tokenized payment info processed under PCI-DSS Level 1 security.' },
          { num: '02', title: 'Authorized Purpose of Processing', text: 'Your records are utilized solely to administer collector accounts, maintain immutable digital certification registry lookups, and dispatch live order custody updates.' },
          { num: '03', title: 'Cryptographic Infrastructure & Isolation', text: 'Personal records are stored under AES-256 encryption at rest and enforced TLS 1.3 in transit. Physical servers are hosted within ISO-27001 audited data centers inside the European Economic Area.' },
          { num: '04', title: 'Zero Data Brokerage or Ad Sharing', text: 'We never sell or monetise collector records. Data transmission is strictly restricted to authorized armored carriers (GLS, CTT, DHL Express) solely to execute door-to-door delivery.' },
          { num: '05', title: 'Your Legal GDPR Rights', text: 'Collectors retain the unconditional right to inspect, export, correct, or permanently erase their data by contacting our compliance division at compliance@gorillagrading.com.' }
        ]
      }
    },
    refund: {
      color: '#3B82F6',
      stageTag: language === 'es' ? 'GARANTÍA NUMISMÁTICA // CANCELACIONES & SINIESTROS' : 'NUMISMATIC GUARANTEE // CLAIMS & REFUNDS',
      hudHeader: language === 'es' ? 'AUDITORÍA DE COMPENSACIÓN // COBERTURA TOTAL' : 'COMPENSATION AUDIT // TOTAL RECOVERY',
      hudSpec: 'ARMORED TRANSIT GUARANTEE · REVERSIBLE CYCLE',
      hudFooterLeft: 'LIQUIDACIÓN DE RECLAMOS: < 48H',
      hudFooterRight: 'CANCELACIÓN: 100% PRE-RECEPCIÓN',
      metrics: [
        { label: language === 'es' ? 'CANCELACIÓN PEDIDO' : 'ORDER CANCELLATION', val: '100% PRE-RECEPCIÓN', highlight: true },
        { label: language === 'es' ? 'RESOLUCIÓN RECLAMOS' : 'CLAIM DISPATCH SPEED', val: '< 48 HORAS HÁBILES', highlight: false },
        { label: language === 'es' ? 'FALSIFICACIONES' : 'COUNTERFEIT REJECTION', val: 'REEMBOLSO DE GRADUACIÓN', highlight: true },
        { label: language === 'es' ? 'DISCREPANCIA NOTA' : 'GRADE DISCREPANCIES', val: 'VERIFICACIÓN CIEGA', highlight: false },
      ],
      es: {
        title: 'Política de Reembolso e Indemnización',
        desc: 'Protección integral del valor del coleccionable, condiciones transparentes de cancelación previa a la recepción física y tramitación de siniestros.',
        articles: [
          { num: '01', title: 'Cancelación sin Penalización Previa al Ingreso', text: 'Puedes cancelar tu orden de graduación en cualquier instante antes de que el paquete sea escaneado formalmente en nuestra recepción de Madrid, obteniendo el reembolso íntegro del 100% del importe abonado.' },
          { num: '02', title: 'Detección de Falsificaciones o Cartas Alteradas', text: 'Si durante el análisis espectrométrico a 365 nm se detecta que un ejemplar es espurio, reproducido artificialmente o presenta cortes y recoloreos químicos irreversibles que impiden su encapsulado, se reembolsará la tasa de graduación de esa carta específica (deduciendo únicamente 5€ en concepto de peritaje de autenticación).' },
          { num: '03', title: 'Disconformidad con la Calificación Numérica', text: 'Dado que la graduación se ejecuta bajo parámetros ópticos calibrados y doble revisión ciega, no se admiten reembolsos motivados por disconformidad con la nota otorgada. Si consideras que existió un defecto de omisión evidente, puedes solicitar el servicio de revisión pericial con cargo reembonsable si se comprueba error.' },
          { num: '04', title: 'Siniestro o Pérdida en Tránsito de Retorno', text: 'En el improbable caso de retraso grave o pérdida imputable al transportista asegurado, activamos de inmediato la liquidación de la indemnización a todo riesgo para abonar el valor de reposición de mercado en menos de 48 horas tras resolución pericial.' }
        ]
      },
      en: {
        title: 'Refund, Cancellation & Claims Policy',
        desc: 'Comprehensive collectible value protection, transparent pre-intake cancellation procedures, and streamlined courier claims resolution.',
        articles: [
          { num: '01', title: 'Zero-Penalty Pre-Intake Cancellation', text: 'You may cancel any submission order for a 100% complete refund at any point before package check-in scanning at our secure facility.' },
          { num: '02', title: 'Counterfeit Stock or Ineligible Submissions', text: 'If 365 nm spectrometry identifies non-authentic counterfeit stock, chemical re-coloring, or trimmed borders rendering a card ungradeable, the grading fee for that card is promptly refunded (minus a nominal 5€ intake authentication assessment fee).' },
          { num: '03', title: 'Grade Disagreements & Review Protocols', text: 'Because grades are determined through calibrated laser telemetry and objective scientific metrics, refunds are not granted over numerical grade disagreement. Re-evaluation review may be requested under standard submission guidelines.' },
          { num: '04', title: 'In-Transit Courier Claims & Reimbursement', text: 'In the rare circumstance of courier loss or in-transit incident, our claims team initiates rapid insurance settlement paying full replacement market value within 48 hours of claim clearance.' }
        ]
      }
    },
    cookies: {
      color: '#10B981',
      stageTag: language === 'es' ? 'DIRECTIVA E-PRIVACY // TELEMETRÍA TRANSPARENTE' : 'E-PRIVACY DIRECTIVE // TRANSPARENT TELEMETRY',
      hudHeader: language === 'es' ? 'PROTOCOLO DE SESIÓN // TOKEN SEGURO' : 'SESSION PROTOCOL // SECURE TOKEN',
      hudSpec: 'HTTP_ONLY · SAMESITE=STRICT · NO TRACKERS',
      hudFooterLeft: 'RASTREADORES DE TERCEROS: 0.0%',
      hudFooterRight: 'DURACIÓN DE SESIÓN: 30 DÍAS',
      metrics: [
        { label: language === 'es' ? 'RASTREADORES TERCEROS' : 'THIRD-PARTY AD COOKIES', val: '0.0% (ZERO TRACKERS)', highlight: true },
        { label: language === 'es' ? 'DURACIÓN TOKEN SESIÓN' : 'SESSION TOKEN LIFETIME', val: '30 DÍAS // HTTP_ONLY', highlight: false },
        { label: language === 'es' ? 'PROTECCIÓN CSRF' : 'CSRF PROTECTION', val: 'SAMESITE=STRICT ENFORCED', highlight: true },
        { label: language === 'es' ? 'TELEMETRÍA BÓVEDA' : 'VAULT ANALYTICS', val: '100% ANÓNIMA Y AGREGADA', highlight: false },
      ],
      es: {
        title: 'Política de Cookies y Almacenamiento Local',
        desc: 'Información clara sobre el uso exclusivo de cookies técnicas y de sesión cifrada, sin tecnologías intrusivas de rastreo de perfiles comerciales.',
        articles: [
          { num: '01', title: 'Cookies Técnicas Esenciales (Obligatorias)', text: 'Imprescindibles para mantener tu sesión activa y cifrada en la Bóveda de Coleccionista, asegurar las transacciones de pago contra ataques CSRF y recordar tu idioma seleccionado.' },
          { num: '02', title: 'Cookies de Diagnóstico y Velocidad del Visor', text: 'Registran de forma anónima y agregada el rendimiento de carga del visor de certificados 3D y tiempos de respuesta de la base de datos europea, sin recopilar identificadores personales.' },
          { num: '03', title: 'Almacenamiento Local para Preferencias de Eventos', text: 'Permite recordar temporalmente tu código postal o ciudad para informarte sobre próximas fechas de recogida presencial en mano (Pickup & Drop-off) en ferias de cartas.' },
          { num: '04', title: 'Control Absoluto en tu Navegador', text: 'Puedes inspeccionar, bloquear o purgar las cookies en cualquier momento a través del menú de privacidad de tu navegador web o utilizando nuestro gestor de consentimiento interactivo.' }
        ]
      },
      en: {
        title: 'Cookie & Local Storage Policy',
        desc: 'Transparent disclosure regarding our exclusive use of technical and encrypted session identifiers, free from third-party tracking scripts.',
        articles: [
          { num: '01', title: 'Essential Technical Identifiers (Required)', text: 'Strictly required to maintain authenticated sessions within the Collector Vault, protect payment checkouts against CSRF attacks, and retain language preferences.' },
          { num: '02', title: 'Performance & 3D Slab Viewer Diagnostics', text: 'Measures anonymous, aggregated system throughput and certificate 3D rendering velocities across Europe without profiling personal browsing habits.' },
          { num: '03', title: 'Local Preference Storage for Drop-off Events', text: 'Retains your selected city preference to surface relevant in-person drop-off dates at European card shows and conventions.' },
          { num: '04', title: 'Complete User Control and Erasure', text: 'Users may inspect, reject, or purge stored tokens anytime through standard browser settings or via our dedicated consent management terminal.' }
        ]
      }
    },
    'cookie-consent': {
      color: '#10B981',
      stageTag: language === 'es' ? 'TERMINAL DE CONTROL // GESTIÓN DE PERMISOS' : 'CONTROL TERMINAL // PERMISSION MANAGEMENT',
      hudHeader: language === 'es' ? 'PANEL DE CONSENTIMIENTO // SESIÓN PRIVADA' : 'CONSENT PANEL // PRIVATE SESSION',
      hudSpec: 'AUDITORÍA DE PRIVACIDAD EN TIEMPO REAL',
      hudFooterLeft: 'ESTADO: PERSONALIZADO POR EL USUARIO',
      hudFooterRight: 'ENCRIPTACIÓN LOCAL ACTIVA',
      metrics: [
        { label: language === 'es' ? 'COOKIES ESENCIALES' : 'ESSENTIAL COOKIES', val: 'SIEMPRE ACTIVAS', highlight: true },
        { label: language === 'es' ? 'DIAGNÓSTICO BÓVEDA' : 'VAULT DIAGNOSTICS', val: cookieState.analytics ? 'HABILITADO' : 'BLOQUEADO', highlight: cookieState.analytics },
        { label: language === 'es' ? 'AVISOS DROP-OFF' : 'DROP-OFF ALERTS', val: cookieState.dropoff ? 'HABILITADO' : 'DESACTIVADO', highlight: cookieState.dropoff },
        { label: language === 'es' ? 'CONSENTIMIENTO RGPD' : 'GDPR CONSENT AUDIT', val: 'VERIFICADO EN NAVEGADOR', highlight: false },
      ],
      es: {
        title: 'Gestor de Consentimiento y Privacidad',
        desc: 'Configura tus permisos de almacenamiento de forma granular y transparente. Puedes modificar o revocar tus elecciones en cualquier instante.',
        articles: [
          { num: '01', title: 'Transparencia Numismática y Digital', text: 'En Gorilla Grading aplicamos la misma rigurosidad a tus datos personales que a la autenticación de tus cartas más valiosas. No utilizamos cookies de rastreo publicitario de terceros.' },
          { num: '02', title: 'Opciones Granulares del Coleccionista', text: 'Utiliza el panel de interruptores a continuación para autorizar diagnósticos anónimos de velocidad de carga o la localización de eventos presenciales de entrega.' }
        ]
      },
      en: {
        title: 'Consent Manager & Privacy Terminal',
        desc: 'Configure browser telemetry settings with granular transparency. Revoke or alter your permissions at any moment.',
        articles: [
          { num: '01', title: 'Numismatic & Digital Transparency', text: 'At Gorilla Grading, we protect your personal identity with the same uncompromising discipline applied to authenticating prized collectibles. Zero third-party tracking scripts.' },
          { num: '02', title: 'Granular Collector Options', text: 'Utilize the configuration toggles below to authorize anonymous performance diagnostics or local convention event notices.' }
        ]
      }
    }
  };

  const current = legalRegistry[activeType] || legalRegistry['legal-notice'];
  const langKey = language === 'es' ? 'es' : 'en';
  const localized = current[langKey];
  const { color, stageTag, hudHeader, hudSpec, hudFooterLeft, hudFooterRight, metrics } = current;

  const handleTabClick = (tabId: LegalPageProps['type']) => {
    setActiveType(tabId);
    if (onNavigate) {
      onNavigate(`/${tabId}`);
    }
  };

  return (
    <div className={`w-full min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-12 font-sans transition-colors duration-300 ${
      isLight ? 'bg-[#F3EFE6] text-[#1C201D]' : 'bg-[#14170F] text-white'
    }`}>
      <div className="max-w-[1400px] mx-auto space-y-8 sm:space-y-10">

        {/* ── 1. TOP HEADER & HIGH-TECH TAB NAVIGATION (Matching TechDetailModal Style) ── */}
        <div className={`border p-4 sm:p-6 transition-all duration-300 ${
          isLight 
            ? 'bg-[#FAF8F5] border-black/10 shadow-sm' 
            : 'bg-[#1A1E1C] border-white/10 shadow-xl'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-none border flex items-center justify-center font-mono text-xs font-bold"
                style={{ borderColor: `${color}80`, color, backgroundColor: `${color}15` }}
              >
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-['Oswald'] text-lg sm:text-xl font-bold uppercase tracking-wider leading-none">
                  {language === 'es' ? 'ESTATUTO LEGAL & REGULACIÓN EUROPEA' : 'LEGAL STATUTE & EUROPEAN REGULATION'}
                </h2>
                <span className="font-mono text-[9px] sm:text-[10px] text-[#A4ACA1] tracking-widest uppercase">
                  GORILLA GRADING EUROPE S.L. // PROTOCOLO REGISTRAL V4.2 // AUDITORÍA ISO
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: color }} />
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase" style={{ color }}>
                {language === 'es' ? 'REGISTRO ACTIVO & VINCULANTE' : 'ACTIVE & BINDING REGISTRY'}
              </span>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pt-4 no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeType === tab.id;
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id as LegalPageProps['type'])}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-mono font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer border ${
                    isActive
                      ? (isLight 
                          ? 'bg-white text-neutral-900 border-black/20 shadow-md scale-100' 
                          : 'bg-[#14170F] text-white border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.6)]')
                      : (isLight 
                          ? 'border-transparent text-[#6B7268] hover:text-[#1C201D] hover:bg-black/5' 
                          : 'border-transparent text-white/50 hover:text-white hover:bg-white/5')
                  }`}
                  style={isActive ? { borderTop: `2.5px solid ${tab.color}` } : undefined}
                >
                  <IconComp className="w-3.5 h-3.5" style={{ color: isActive ? tab.color : undefined }} />
                  <span className="text-[10px] sm:text-xs">{tab.num}. {tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 2. FORENSIC HUD VIEWPORT & SPECIFICATIONS GRID (Like TechDetailModal) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Authentic Forensic Chamber Viewport (Dark High-Tech Terminal) */}
          <div className="lg:col-span-6 bg-[#080C09] border border-white/10 p-5 sm:p-6 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[380px] sm:min-h-[440px]">
            {/* Ambient Radial Matrix Grid */}
            <div 
              className="absolute inset-0 bg-[radial-gradient(#48C765_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"
              style={{ backgroundImage: `radial-gradient(${color} 1px, transparent 1px)` }}
            />

            {/* Top HUD Telemetry Bar */}
            <div className="flex items-center justify-between text-[9px] font-mono text-[#A4ACA1] border-b border-white/10 pb-2.5 relative z-10">
              <span className="flex items-center gap-2 font-bold tracking-wider" style={{ color }}>
                <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: color }} />
                {hudHeader}
              </span>
              <span className="text-white/60 tracking-widest">{hudSpec}</span>
            </div>

            {/* Centerpiece: Physical Document Slab / High-Tech Notarized Seal */}
            <div className="my-auto py-6 flex flex-col items-center justify-center relative z-10">
              
              {/* Outer Viewport Frame */}
              <div 
                className="relative w-52 sm:w-60 h-64 sm:h-72 border-2 bg-[#0D1310] p-2 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
                style={{ borderColor: `${color}60` }}
              >
                {/* Crosshairs & Crop Marks */}
                <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2" style={{ borderColor: color }} />
                <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2" style={{ borderColor: color }} />
                <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2" style={{ borderColor: color }} />
                <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2" style={{ borderColor: color }} />

                {/* Laser Sweep Scan Beam across document */}
                <div 
                  className="absolute left-0 right-0 h-[2px] shadow-[0_0_12px] pointer-events-none z-20 animate-pulse"
                  style={{ 
                    backgroundColor: color, 
                    boxShadow: `0 0 15px ${color}`,
                    top: '40%'
                  }}
                />

                {/* Inner Notarized Document / Certificate Layout */}
                <div className="w-full h-full border border-white/10 bg-[#121814] p-3 flex flex-col justify-between text-white font-mono text-[8px] relative overflow-hidden">
                  
                  {/* Document Header Band */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-none flex items-center justify-center font-bold text-[7px]" style={{ backgroundColor: color, color: '#080C09' }}>
                        G
                      </div>
                      <span className="font-bold tracking-widest text-white/90">GORILLA GRADING EUROPE</span>
                    </div>
                    <span className="px-1 py-0.2 text-[6.5px] font-bold" style={{ backgroundColor: `${color}30`, color }}>
                      EU-CERT
                    </span>
                  </div>

                  {/* Document Body Blueprint Graphic */}
                  <div className="my-auto py-2 flex flex-col items-center text-center space-y-2">
                    <div 
                      className="w-16 h-16 rounded-full border-2 flex items-center justify-center relative shadow-inner"
                      style={{ borderColor: color, backgroundColor: `${color}10` }}
                    >
                      <Scale className="w-8 h-8" style={{ color }} />
                      <div className="absolute inset-0 rounded-full border border-dashed border-white/30 animate-spin" style={{ animationDuration: '24s' }} />
                    </div>

                    <div className="space-y-0.5">
                      <div className="font-['Oswald'] text-xs font-bold uppercase tracking-wider text-white">
                        {localized.title}
                      </div>
                      <div className="text-[7.5px] text-[#A4ACA1] tracking-widest uppercase">
                        DOCUMENT REF // GG-{activeType.toUpperCase()}-2026
                      </div>
                      <div className="text-[6.5px] text-white/50 tracking-wider">
                        HASH: 7F89B...019E · TIMESTAMP: REAL-TIME
                      </div>
                    </div>
                  </div>

                  {/* Document Seal & Barcode Footer */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-1.5">
                    <div className="flex items-center gap-1 text-[7px] text-[#A4ACA1]">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                      <span>MADRID LAB AUDITED</span>
                    </div>
                    <div className="h-2.5 w-14 bg-white/20 flex items-center justify-center font-mono text-[5px] text-white tracking-widest">
                      ||||||||||||||||
                    </div>
                  </div>
                </div>

                {/* Laser Tag Flag */}
                <div 
                  className="absolute right-0 top-3 px-1.5 py-0.5 font-mono text-[7px] font-bold uppercase tracking-wider z-20"
                  style={{ backgroundColor: color, color: '#080C09' }}
                >
                  VALIDATED DIRECTIVE
                </div>
              </div>

            </div>

            {/* Bottom Telemetry Metrics Bar */}
            <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-white/10 text-[9px] font-mono relative z-10">
              <div className="flex justify-between bg-black/40 px-2.5 py-1.5 border border-white/5">
                <span className="text-[#A4ACA1]">STATUS:</span>
                <span className="font-bold tracking-wider" style={{ color }}>{hudFooterLeft}</span>
              </div>
              <div className="flex justify-between bg-black/40 px-2.5 py-1.5 border border-white/5">
                <span className="text-[#A4ACA1]">LEDGER:</span>
                <span className="text-white font-bold tracking-wider">{hudFooterRight}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Technical Specifications & 4-Item Telemetry Metric Tiles */}
          <div className={`lg:col-span-6 p-6 sm:p-8 border flex flex-col justify-between transition-all duration-300 ${
            isLight 
              ? 'bg-[#FAF8F5] border-black/10 shadow-sm' 
              : 'bg-[#1A1E1C] border-white/10 shadow-xl'
          }`}>
            <div className="space-y-4">
              
              {/* Stage Badge */}
              <div 
                className="inline-flex items-center gap-2 px-2.5 py-1 border font-mono text-[10px] font-bold tracking-widest uppercase w-fit"
                style={{ borderColor: `${color}60`, color, backgroundColor: `${color}15` }}
              >
                {stageTag}
              </div>

              {/* Title */}
              <h1 className={`font-['Oswald'] text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide leading-tight ${
                isLight ? 'text-[#1C201D]' : 'text-white'
              }`}>
                {localized.title}
              </h1>

              {/* Description */}
              <p className={`font-sans text-xs sm:text-sm leading-relaxed ${
                isLight ? 'text-[#4A5048]' : 'text-[#A4ACA1]'
              }`}>
                {localized.desc}
              </p>
            </div>

            {/* 4-Item Telemetry Metrics Matrix (Exact visual standard of TechDetailModal) */}
            <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-black/10 dark:border-white/10">
              {metrics.map((m, idx) => (
                <div 
                  key={idx} 
                  className={`p-3.5 border flex flex-col justify-between transition-colors ${
                    isLight 
                      ? 'bg-[#ECE5D8] border-[#DDD6C9]' 
                      : 'bg-[#151916] border-white/5'
                  }`}
                >
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#A4ACA1] mb-1 font-semibold">
                    {m.label}
                  </span>
                  <span 
                    className={`font-['Oswald'] text-sm sm:text-base font-bold tracking-wide ${
                      m.highlight ? '' : (isLight ? 'text-[#1C201D]' : 'text-white')
                    }`}
                    style={m.highlight ? { color } : undefined}
                  >
                    {m.val}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* ── 3. STRUCTURED ARTICLES & LEGAL DIRECTIVES ── */}
        <div className="space-y-4 sm:space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.08] dark:border-white/[0.08]">
            <span className="font-mono text-xs font-bold tracking-widest uppercase" style={{ color }}>
              {language === 'es' ? 'CLÁUSULAS Y ESTATUTOS OFICIALES' : 'OFFICIAL STATUTORY CLAUSES'}
            </span>
            <span className="font-mono text-[10px] text-[#A4ACA1] tracking-widest uppercase">
              REVISIÓN V4.2 // 2026
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {localized.articles.map((art) => (
              <div
                key={art.num}
                className={`p-6 border transition-all duration-300 relative group overflow-hidden ${
                  isLight 
                    ? 'bg-[#FAF8F5] border-black/10 hover:border-black/20 shadow-sm' 
                    : 'bg-[#1A1E1C] border-white/10 hover:border-white/20 shadow-lg'
                }`}
              >
                {/* Tech Accent Top Corner */}
                <div 
                  className="absolute top-0 left-0 w-8 h-[2px] transition-all group-hover:w-full"
                  style={{ backgroundColor: color }} 
                />

                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="font-mono text-[11px] font-bold px-2 py-0.5 border"
                    style={{ borderColor: `${color}60`, color, backgroundColor: `${color}15` }}
                  >
                    ART. {art.num}
                  </span>
                  <span className="font-mono text-[9px] text-[#A4ACA1] tracking-widest uppercase">
                    [ENFORCEABLE // ACTIVO]
                  </span>
                </div>

                <h3 className={`font-['Oswald'] text-lg font-bold uppercase tracking-wide mb-2 ${
                  isLight ? 'text-[#1C201D]' : 'text-white'
                }`}>
                  {art.title}
                </h3>

                <p className={`font-sans text-xs sm:text-sm leading-relaxed ${
                  isLight ? 'text-[#4A5048]' : 'text-[#A4ACA1]'
                }`}>
                  {art.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. INTERACTIVE COOKIE CONSENT TERMINAL ── */}
        {activeType === 'cookie-consent' && (
          <div className={`p-6 sm:p-8 border transition-all ${
            isLight ? 'bg-[#FAF8F5] border-black/10' : 'bg-[#151916] border-white/10'
          }`}>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/10 dark:border-white/10">
              <div>
                <h4 className="font-['Oswald'] text-xl font-bold uppercase tracking-wide">
                  {language === 'es' ? 'Terminal de Configuración de Privacidad' : 'Privacy Preference Terminal'}
                </h4>
                <p className="font-mono text-[10px] text-[#A4ACA1] uppercase tracking-wider">
                  GESTIÓN LOCAL DE IDENTIFICADORES Y SESIÓN SIN RASTREO COMERCIAL
                </p>
              </div>
              <Lock className="w-5 h-5 text-[#10B981]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              
              {/* Option 1 */}
              <div className={`p-4 border ${isLight ? 'bg-white border-black/10' : 'bg-[#0E1310] border-white/10'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold uppercase text-[#10B981]">01. OBLIGATORIAS</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#10B981]/20 text-[#10B981] font-bold">ACTIVA</span>
                </div>
                <h5 className="font-['Oswald'] text-base uppercase font-bold mb-1">
                  {language === 'es' ? 'Cookies Técnicas' : 'Essential Cookies'}
                </h5>
                <p className="text-xs text-[#A4ACA1] leading-relaxed">
                  {language === 'es' ? 'Imprescindibles para inicio de sesión seguro, cifrado CSRF y cesta de pedidos.' : 'Required for secure login, CSRF tokens, and checkout sessions.'}
                </p>
              </div>

              {/* Option 2 */}
              <div 
                onClick={() => setCookieState(prev => ({ ...prev, analytics: !prev.analytics, saved: false }))}
                className={`p-4 border cursor-pointer transition-all ${
                  cookieState.analytics 
                    ? (isLight ? 'bg-white border-[#10B981] shadow-sm' : 'bg-[#121A14] border-[#10B981]')
                    : (isLight ? 'bg-black/[0.02] border-black/10 opacity-60' : 'bg-[#0E1310] border-white/5 opacity-60')
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold uppercase text-[#10B981]">02. RENDIMIENTO</span>
                  <input type="checkbox" checked={cookieState.analytics} onChange={() => {}} className="accent-[#10B981] w-4 h-4 pointer-events-none" />
                </div>
                <h5 className="font-['Oswald'] text-base uppercase font-bold mb-1">
                  {language === 'es' ? 'Diagnóstico de Bóveda' : 'Vault Diagnostics'}
                </h5>
                <p className="text-xs text-[#A4ACA1] leading-relaxed">
                  {language === 'es' ? 'Métricas anónimas de carga del visor de slabs 3D y latencia de base de datos.' : 'Anonymous telemetry measuring 3D certificate render speed.'}
                </p>
              </div>

              {/* Option 3 */}
              <div 
                onClick={() => setCookieState(prev => ({ ...prev, dropoff: !prev.dropoff, saved: false }))}
                className={`p-4 border cursor-pointer transition-all ${
                  cookieState.dropoff 
                    ? (isLight ? 'bg-white border-[#10B981] shadow-sm' : 'bg-[#121A14] border-[#10B981]')
                    : (isLight ? 'bg-black/[0.02] border-black/10 opacity-60' : 'bg-[#0E1310] border-white/5 opacity-60')
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold uppercase text-[#10B981]">03. LOCALIZACIÓN</span>
                  <input type="checkbox" checked={cookieState.dropoff} onChange={() => {}} className="accent-[#10B981] w-4 h-4 pointer-events-none" />
                </div>
                <h5 className="font-['Oswald'] text-base uppercase font-bold mb-1">
                  {language === 'es' ? 'Avisos Drop-Off' : 'Drop-off Notices'}
                </h5>
                <p className="text-xs text-[#A4ACA1] leading-relaxed">
                  {language === 'es' ? 'Recuerda tu ciudad más cercana para avisarte sobre eventos presenciales de entrega.' : 'Remembers city preference to alert regarding nearby in-person card shows.'}
                </p>
              </div>

            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setCookieState(prev => ({ ...prev, saved: true }))}
                className="px-6 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                {language === 'es' ? 'Guardar Preferencias' : 'Save Preferences'}
              </button>
              <button
                onClick={() => setCookieState({ essential: true, analytics: true, dropoff: true, saved: true })}
                className={`px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  isLight ? 'border-black/20 text-[#1C201D] hover:bg-black/5' : 'border-white/20 text-white hover:bg-white/5'
                }`}
              >
                {language === 'es' ? 'Aceptar Todo' : 'Accept All'}
              </button>
              {cookieState.saved && (
                <span className="font-mono text-xs text-[#10B981] font-bold flex items-center gap-1.5 animate-fadeIn">
                  <Check className="w-4 h-4" />
                  {language === 'es' ? 'Preferencias criptográficas guardadas en tu navegador' : 'Cryptographic preferences saved locally'}
                </span>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
