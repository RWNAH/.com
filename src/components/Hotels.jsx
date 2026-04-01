import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { Star, MessageCircle, MapPin, ChevronRight, ChevronLeft, Home, Hotel } from 'lucide-react'

const WHATSAPP_NUM = '79278595957'

function buildWhatsAppLink(hotelName, lang) {
  const msgAr = `السلام عليكم، أود الاستفسار عن الإقامة في فندق ${hotelName} 🏨`
  const msgEn = `Hello, I'd like to inquire about ${hotelName} hotel 🏨`
  const msg = encodeURIComponent(lang === 'ar' ? msgAr : msgEn)
  return `https://wa.me/${WHATSAPP_NUM}?text=${msg}`
}

function StarRating({ count }) {
  if (!count) return null
  return (
    <div className="hotel-stars">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="currentColor" />
      ))}
    </div>
  )
}

function HotelCard({ hotel, lang, index, t }) {
  const isRTL = lang === 'ar'
  const displayName = isRTL && hotel.nameAr ? hotel.nameAr : hotel.name
  const badgeLabel = hotel.type === 'chalet'
    ? (isRTL ? 'شاليه' : 'Chalet')
    : hotel.type === 'cottage'
    ? (isRTL ? 'كوخ فاخر' : 'Cottage')
    : (isRTL ? 'فندق' : 'Hotel')

  return (
    <motion.div
      className="hotel-luxe-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      {/* Image Section */}
      <div className="hotel-luxe-img-wrap">
        <img src={hotel.image} alt={displayName} className="hotel-luxe-img" loading="lazy" />
        {/* Type badge */}
        <span className="hotel-type-badge">{badgeLabel}</span>
        {/* Gradient overlay */}
        <div className="hotel-img-gradient" />
      </div>

      {/* Info Section */}
      <div className="hotel-luxe-info">
        <div className="hotel-luxe-top">
          <div>
            <h3 className="hotel-luxe-name">{displayName}</h3>
            <StarRating count={hotel.stars} />
          </div>
        </div>
        <p className="hotel-luxe-desc">{hotel.desc}</p>

        {/* WhatsApp CTA */}
        <a
          href={buildWhatsAppLink(displayName, lang)}
          target="_blank"
          rel="noreferrer"
          className="btn-hotel-whatsapp"
        >
          <svg viewBox="0 0 24 24" className="wa-icon-hotel" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
          </svg>
          <span>{isRTL ? 'احجز عبر واتساب' : 'Book via WhatsApp'}</span>
          <ChevronRight size={16} className={isRTL ? 'wa-chevron-rtl' : ''} />
        </a>
      </div>
    </motion.div>
  )
}

export default function Hotels() {
  const { t, lang } = useLanguage()
  const [activeTab, setActiveTab] = useState('sochi')

  const tabs = t('hotels.tabs')
  const allItems = t('hotels.items')
  if (!tabs || !allItems) return null

  const tabKeys = Object.keys(tabs)
  const hotels = allItems[activeTab] || []
  const isRTL = lang === 'ar'

  const tabIcons = { sochi: '🏔️', spb: '🏛️', moscow: '🌲' }

  return (
    <section className="section hotels-mega" id="hotels">
      <div className="container">

        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-tag">{t('hotels.sectionTag')}</div>
          <h2 className="h-section text-gradient-gold">{t('hotels.sectionTitle')}</h2>
          <p className="hero-desc" style={{ marginTop: '1.25rem' }}>{t('hotels.sectionDesc')}</p>
        </motion.div>

        {/* Luxury Tab Switcher */}
        <motion.div
          className="hotels-tab-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tabKeys.map(key => (
            <button
              key={key}
              className={`hotel-luxe-tab ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              <span className="tab-emoji">{tabIcons[key]}</span>
              <span>{tabs[key]}</span>
              {activeTab === key && (
                <motion.div className="tab-active-line" layoutId="activeHotelTab" />
              )}
            </button>
          ))}
        </motion.div>

        {/* Hotels Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="hotels-luxe-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {hotels.map((hotel, i) => (
              <HotelCard key={`${activeTab}-${i}`} hotel={hotel} lang={lang} index={i} t={t} />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
