import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface LegalPageProps {
  type: 'terms' | 'privacy' | 'refund' | 'cookies' | 'cookie-consent';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const { language } = useLanguage();

  const content = {
    terms: {
      es: {
        title: 'Términos y Condiciones',
        body: `
          1. Introducción: Al utilizar los servicios de Gorilla Grading, aceptas estos términos y condiciones.
          2. Servicios de Graduación: Nos esforzamos por ofrecer un servicio de graduación preciso y objetivo. Sin embargo, la graduación es subjetiva y no garantizamos grados específicos.
          3. Envíos y Seguros: Eres responsable de enviar tus cartas de forma segura. Recomendamos utilizar envíos asegurados. Una vez recibidas, tus cartas están cubiertas por nuestro seguro a todo riesgo.
          4. Pagos: El pago de los servicios de graduación se realizará en el momento del envío o antes de la devolución de las cartas, dependiendo del nivel de servicio elegido.
          5. Limitación de Responsabilidad: Nuestra responsabilidad máxima por cualquier pérdida o daño a una carta durante el proceso de graduación se limita al valor declarado o al valor de mercado asegurado por nuestro seguro, lo que sea menor.
        `
      },
      en: {
        title: 'Terms and Conditions',
        body: `
          1. Introduction: By using Gorilla Grading services, you agree to these terms and conditions.
          2. Grading Services: We strive to offer an accurate and objective grading service. However, grading is subjective and we do not guarantee specific grades.
          3. Shipping and Insurance: You are responsible for shipping your cards safely. We recommend using insured shipping. Once received, your cards are covered by our comprehensive insurance.
          4. Payments: Payment for grading services is due upon submission or prior to the return of the cards, depending on the chosen service tier.
          5. Limitation of Liability: Our maximum liability for any loss or damage to a card during the grading process is limited to the declared value or the market value insured by our policy, whichever is less.
        `
      }
    },
    privacy: {
      es: {
        title: 'Política de Privacidad',
        body: `
          1. Recopilación de Datos: Recopilamos información personal como nombre, dirección, correo electrónico y detalles de pago para procesar tus pedidos.
          2. Uso de la Información: Utilizamos tu información para proporcionar y mejorar nuestros servicios, procesar transacciones y comunicarnos contigo sobre tus envíos.
          3. Protección de Datos: Implementamos medidas de seguridad para proteger tu información personal contra accesos no autorizados.
          4. Compartir con Terceros: No vendemos ni compartimos tu información personal con terceros para fines de marketing sin tu consentimiento, excepto con proveedores de servicios esenciales (ej. empresas de mensajería).
          5. Derechos del Usuario: Tienes derecho a acceder, corregir o eliminar tu información personal almacenada en nuestros sistemas.
        `
      },
      en: {
        title: 'Privacy Policy',
        body: `
          1. Data Collection: We collect personal information such as name, address, email, and payment details to process your orders.
          2. Use of Information: We use your information to provide and improve our services, process transactions, and communicate with you about your submissions.
          3. Data Protection: We implement security measures to protect your personal information against unauthorized access.
          4. Sharing with Third Parties: We do not sell or share your personal information with third parties for marketing purposes without your consent, except with essential service providers (e.g., shipping companies).
          5. User Rights: You have the right to access, correct, or delete your personal information stored in our systems.
        `
      }
    },
    refund: {
      es: {
        title: 'Política de Reembolso',
        body: `
          1. Cancelaciones: Puedes cancelar tu pedido y recibir un reembolso completo antes de que tus cartas sean recibidas en nuestras instalaciones.
          2. Reembolsos por Servicios No Prestados: Si determinamos que una carta no puede ser graduada (ej. es falsa o está alterada), emitiremos un reembolso por el costo de graduación de esa carta específica.
          3. Disconformidad con el Grado: Dado que la graduación es subjetiva, no ofrecemos reembolsos basados en el desacuerdo con el grado asignado.
          4. Daños durante el Envío: En caso de daños o pérdida durante el envío de vuelta, se activará el proceso de reclamación del seguro para compensarte adecuadamente.
        `
      },
      en: {
        title: 'Refund Policy',
        body: `
          1. Cancellations: You may cancel your order and receive a full refund before your cards are received at our facilities.
          2. Refunds for Unrendered Services: If we determine that a card cannot be graded (e.g., it is counterfeit or altered), we will issue a refund for the grading cost of that specific card.
          3. Disagreement with Grade: Since grading is subjective, we do not offer refunds based on disagreement with the assigned grade.
          4. Damage during Shipping: In the event of damage or loss during return shipping, the insurance claim process will be activated to compensate you appropriately.
        `
      }
    },
    cookies: {
      es: {
        title: 'Política de Cookies',
        body: `
          Utilizamos cookies y tecnologías similares para proporcionar, proteger y mejorar nuestros servicios.
          1. Cookies Esenciales: Son necesarias para el funcionamiento del sitio web, permitiéndote navegar y utilizar funciones clave como el inicio de sesión seguro.
          2. Cookies de Rendimiento: Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio, proporcionando información sobre las áreas visitadas y el tiempo invertido.
          3. Cookies de Funcionalidad: Permiten al sitio recordar las elecciones que haces (como tu idioma o región) y proporcionar funciones mejoradas y más personales.
          Puedes gestionar tus preferencias de cookies en cualquier momento a través de la configuración de tu navegador.
        `
      },
      en: {
        title: 'Cookie Policy',
        body: `
          We use cookies and similar technologies to provide, protect, and improve our services.
          1. Essential Cookies: These are necessary for the website to function, allowing you to navigate and use key features like secure login.
          2. Performance Cookies: These help us understand how visitors interact with our site, providing information about the areas visited and the time spent.
          3. Functionality Cookies: These allow the site to remember choices you make (such as your language or region) and provide enhanced, more personal features.
          You can manage your cookie preferences at any time through your browser settings.
        `
      }
    },
    'cookie-consent': {
      es: {
        title: 'Consentimiento de Cookies',
        body: `
          Tu privacidad es importante para nosotros. Utiliza este panel para gestionar tus preferencias de cookies.
          
          [X] Cookies Estrictamente Necesarias (Siempre Activas)
          [ ] Cookies de Análisis y Rendimiento
          [ ] Cookies de Publicidad y Marketing
          
          Al hacer clic en "Aceptar Todo", consientes el uso de todas las cookies. Al hacer clic en "Guardar Preferencias", consientes solo el uso de las categorías seleccionadas.
        `
      },
      en: {
        title: 'Cookie Consent',
        body: `
          Your privacy is important to us. Use this panel to manage your cookie preferences.
          
          [X] Strictly Necessary Cookies (Always Active)
          [ ] Analytics and Performance Cookies
          [ ] Advertising and Marketing Cookies
          
          By clicking "Accept All", you consent to the use of all cookies. By clicking "Save Preferences", you consent only to the use of the selected categories.
        `
      }
    }
  };

  const currentContent = content[type][language === 'es' ? 'es' : 'en'];

  return (
    <div className="w-full min-h-screen bg-[#454545] text-white py-24 px-6 lg:px-12">
      <div className="max-w-[800px] mx-auto">
        <h1 className="font-['Oswald'] text-3xl sm:text-4xl text-white uppercase tracking-wide mb-8">
          {currentContent.title}
        </h1>
        <div className="bg-[#2B302B] border border-white/[0.06] p-8 sm:p-10 rounded-none shadow-xl">
          <div className="font-sans text-[#A4ACA1] text-sm leading-relaxed whitespace-pre-wrap">
            {currentContent.body}
          </div>
        </div>
      </div>
    </div>
  );
};
