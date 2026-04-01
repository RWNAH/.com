import { useLanguage } from '../context/LanguageContext'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'


const WHATSAPP_NUM = '79278595957'
const WHATSAPP_MSG = encodeURIComponent('السلام عليكم، حاب أستفسر عن الباقات السياحية الروسية')
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MSG}`

const IMG_MAIN = '/page-0001.jpg' // User selected hero image
const IMG_SECONDARY = 'https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=600&q=80' // High-end winter accent

// Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
}

const revealUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

export default function Hero() {
  const { t, dir } = useLanguage()

  return (
    <section className="hero-editorial" id="hero">
      
      {/* The Giant Watermark Logo behind texts */}
      <img src="/logo.png" alt="" className="hero-watermark" aria-hidden="true" />
      
      <div className="container hero-editorial-container">
        
        {/* Texts Column */}
        <motion.div 
          className="hero-editorial-text"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Top Badge matching "TRAVEL TO RUSSIA!" */}
          <motion.div variants={revealUp} className="hero-poster-badge">
            {t('hero.badge')}
          </motion.div>

          <motion.h1 
            variants={revealUp}
            className="editorial-title poster-title"
          >
            {t('hero.subtitle')}
          </motion.h1>

          <motion.ul variants={revealUp} className="hero-poster-bullets">
            <li><CheckCircle2 size={24} className="bullet-icon"/> {t('hero.bullet1')}</li>
            <li><CheckCircle2 size={24} className="bullet-icon"/> {t('hero.bullet2')}</li>
            <li><CheckCircle2 size={24} className="bullet-icon"/> {t('hero.bullet3')}</li>
          </motion.ul>

          <motion.div variants={revealUp} className="editorial-actions">
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn-editorial">
              {t('hero.cta1')}
              {dir === 'rtl' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </a>
          </motion.div>
          
          {/* Subtle Stats Row below the text */}
          <motion.div variants={revealUp} className="editorial-stats">
            <div className="stat-block">
              <h4>{t('hero.stat1num')}</h4>
              <p>{t('hero.stat1label')}</p>
            </div>
            <div className="stat-block">
              <h4>{t('hero.stat2num')}</h4>
              <p>{t('hero.stat2label')}</p>
            </div>
            <div className="stat-block">
              <h4>{t('hero.stat3num')}</h4>
              <p>{t('hero.stat3label')}</p>
            </div>
          </motion.div>

        </motion.div>

        {/* User Specific Image Column - PURE and UNBLOCKED */}
        <motion.div 
          className="hero-editorial-gallery"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="gallery-main-img">
            <img src={IMG_MAIN} alt="Rwnah Luxury Travel" loading="lazy" />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
