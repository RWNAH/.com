import { useLanguage } from '../context/LanguageContext'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, Mail } from 'lucide-react'

const WHATSAPP_NUM = '79278595957'
const WHATSAPP_MSG = encodeURIComponent('السلام عليكم، حاب أستفسر عن باقات رونة للسفريات والسياحة')
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MSG}`

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

export default function Footer() {
  const { t, dir } = useLanguage()
  const isRTL = dir === 'rtl'

  return (
    <footer className="footer-2026" id="contact">
      <div className="container">

        {/* ─── Contact Strip (intentionally inverted card) ─── */}
        <motion.div
          className="footer-contact-strip"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            {t('contact.sectionTag')}
          </div>
          <h2 className="h-section">{t('contact.sectionTitle')}</h2>
          <p>{t('contact.desc')}</p>

          {/* Main WhatsApp CTA */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="btn-hotel-whatsapp"
            style={{ maxWidth: '320px', margin: '0 auto', fontSize: '1.15rem', padding: '1.1rem 2rem' }}
          >
            <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, flexShrink: 0 }} fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
            </svg>
            {t('contact.whatsapp')}
          </a>

          {/* Secondary contact links */}
          <div className="footer-contact-btns">
            <a href="tel:+79278595957" className="footer-contact-btn">
              <Phone size={16} /> +7 927 859-59-57
            </a>
            <a href="https://instagram.com/rwnah_kh" target="_blank" rel="noreferrer" className="footer-contact-btn">
              <InstagramIcon /> @rwnah_kh
            </a>
            <a href="mailto:hello@Rwnah.com" className="footer-contact-btn">
              <Mail size={16} /> hello@Rwnah.com
            </a>
          </div>
        </motion.div>

        {/* ─── Footer Columns ─── */}
        <div className="footer-columns">

          {/* Brand Column */}
          <div>
            <div className="navbar-logo" style={{ marginBottom: '1rem' }}>
              <img src="/logo.png" alt="Rwnah Logo" style={{ height: '60px', width: 'auto' }} />
              <div className="logo-text">
                <span className="logo-main" style={{ fontSize: '1.6rem', color: 'var(--accent-gold)' }}>{t('nav.brandName')}</span>
                <span className="logo-sub">{t('nav.brandSubtitle')}</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              {isRTL
                ? 'رقم 1 للسفريات والسياحة في روسيا — نصنع لك ذكريات لا تُنسى في أرقى الوجهات.'
                : 'Your #1 Travel & Tourism agency in Russia. Unforgettable luxury experiences in Moscow, Sochi & Dagestan.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="footer-col-title">{isRTL ? 'الروابط السريعة' : 'Quick Links'}</p>
            <a href="#packages" className="footer-col-link">{t('nav.packages')}</a>
            <a href="#hotels"   className="footer-col-link">{t('nav.hotels')}</a>
            <a href="#activities" className="footer-col-link">{t('nav.activities')}</a>
            <a href="#services" className="footer-col-link">{t('nav.services')}</a>
          </div>

          {/* Contact Details */}
          <div>
            <p className="footer-col-title">{isRTL ? 'تواصل معنا' : 'Contact Us'}</p>
            <a href="tel:+79278595957" className="footer-col-link">
              <Phone size={15} className="footer-col-icon" /> +7 927 859-59-57
            </a>
            <a href="https://instagram.com/rwnah_kh" target="_blank" rel="noreferrer" className="footer-col-link">
              <span className="footer-col-icon"><InstagramIcon /></span> @rwnah_kh
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="footer-col-link">
              <MessageCircle size={15} className="footer-col-icon" />
              {isRTL ? 'واتساب' : 'WhatsApp'}
            </a>
            <a href="mailto:hello@Rwnah.com" className="footer-col-link">
              <Mail size={15} className="footer-col-icon" /> hello@Rwnah.com
            </a>
          </div>

        </div>

        {/* ─── Copyright ─── */}
        <div className="footer-bottom-bar">
          {t('footer.rights')} © {new Date().getFullYear()}
        </div>

      </div>
    </footer>
  )
}
