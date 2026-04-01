import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

const WHATSAPP_NUM = '79278595957'

// Independent Component for tracking Card-level State (Currency Switcher)
function PackageCard({ pkg, index, lang, dir, t }) {
  const [currencyIdx, setCurrencyIdx] = useState(0)

  // Construct dynamic pricing options combining the base RUB and localized arrays
  const baseCurrencyLabel = t('packages.currency') || (lang === 'ar' ? 'روبل' : 'RUB')
  const allPrices = [
    { currency: baseCurrencyLabel, amount: pkg.priceRub },
    ...(pkg.prices || [])
  ]

  const activePrice = allPrices[currencyIdx]

  const msg = encodeURIComponent(
    lang === 'ar'
      ? `السلام عليكم، مهتم بتفاصيل ${pkg.title}`
      : `Hello, I'm interested in the ${pkg.title}`
  )
  const link = `https://wa.me/${WHATSAPP_NUM}?text=${msg}`

  return (
    <motion.div 
      className="package-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Top Image Section */}
      <div className="package-img">
        <img src={pkg.image} alt={pkg.title} loading="lazy" />
        <div className="package-badge">{pkg.badge || 'VIP'}</div>
      </div>
      
      {/* Bottom Content Section */}
      <div className="package-content">
        <div className="package-header">
          <div>
            <h3 className="package-title">{pkg.title}</h3>
            <div className="package-duration">{pkg.duration}</div>
          </div>
          
          {/* Dynamic Dazzling Pricing Engine */}
          <div className="package-price-wrap" style={{ textAlign: dir === 'rtl' ? 'left' : 'right' }}>
            <div className="price-animation-box">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activePrice.currency}
                  initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="price-dynamic-row"
                >
                  <span className="package-price-gigantic">{activePrice.amount}</span>
                  <span className="package-currency">{activePrice.currency}</span>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Interactive Currency Pills */}
            <div className={`currency-pills-row ${dir === 'rtl' ? 'rtl-pills' : 'ltr-pills'}`}>
              {allPrices.map((p, i) => (
                <button
                  key={p.currency}
                  onClick={() => setCurrencyIdx(i)}
                  className={`currency-pill ${currencyIdx === i ? 'active' : ''}`}
                  aria-label={`Show price in ${p.currency}`}
                >
                  {p.currency}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="package-features">
          {pkg.features.slice(0, 5).map((feat, j) => (
            <div key={j} className="package-feature">
              <Check size={18} color="var(--accent-gold)" className="feature-check" />
              <span>{feat}</span>
            </div>
          ))}
          {pkg.features.length > 5 && (
            <div className="package-feature feature-more">
              <span>+ {pkg.features.length - 5} {lang === 'ar' ? 'مميزات إضافية' : 'more features'}</span>
            </div>
          )}
        </div>

        <a href={link} target="_blank" rel="noreferrer" className="btn-package">
          <span>{t('packages.inquire')}</span>
          <ArrowRight size={20} className={dir === 'rtl' ? 'icon-rtl' : 'icon-ltr'} />
        </a>
      </div>
    </motion.div>
  )
}

export default function Packages() {
  const { t, lang, dir } = useLanguage()

  const items = t('packages.items')
  if (!Array.isArray(items)) return null

  return (
    <section className="section packages-mega-section" id="packages">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-tag">{t('packages.sectionTag')}</div>
          <h2 className="h-section">{t('packages.sectionTitle')}</h2>
          <p className="hero-desc" style={{ margin: '1.5rem 0' }}>{t('packages.sectionDesc')}</p>
        </motion.div>

        <div className="packages-grid">
          {items.map((pkg, i) => (
            <PackageCard 
              key={i} 
              pkg={pkg} 
              index={i} 
              lang={lang} 
              dir={dir} 
              t={t} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}
