import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'

// Helper to render dynamic lucide icons from string name
const DynamicIcon = ({ name, size = 24, className = '' }) => {
  const IconComponent = LucideIcons[name]
  if (!IconComponent) return <span className={className}>✨</span>
  return <IconComponent size={size} className={className} />
}

export default function Activities() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('moscow')

  const tabs = t('activities.tabs')
  const allItems = t('activities.items')
  if (!tabs || !allItems) return null

  const tabKeys = Object.keys(tabs)
  const activities = allItems[activeTab] || []

  return (
    <section className="section" id="activities" style={{ overflow: 'hidden' }}>
      
      {/* Infinite Marquee Architecture */}
      <div className="marquee-container">
        <div className="marquee-content">
          {/* Duplicate content to create seamless infinite scroll loop */}
          <span className="marquee-text">
            {t('activities.sectionTitle')} • {t('activities.sectionTitle')} • {t('activities.sectionTitle')} •
          </span>
          <span className="marquee-text">
            {t('activities.sectionTitle')} • {t('activities.sectionTitle')} • {t('activities.sectionTitle')} •
          </span>
        </div>
      </div>

      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-tag">{t('activities.sectionTag')}</div>
          <p className="hero-desc" style={{ marginTop: '0.5rem' }}>{t('activities.sectionDesc')}</p>
        </motion.div>

        <div className="hotels-tabs" style={{ marginBottom: '4rem', justifyContent: 'center' }}>
          {tabKeys.map(key => (
            <button
              key={key}
              className={`tab-btn ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {tabs[key]}
            </button>
          ))}
        </div>

        <div className="activities-gallery">
          {activities.map((item, i) => (
            <motion.div 
              key={i} 
              className="activity-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              {/* Background Media */}
              {item.image && item.image.endsWith('.mp4') ? (
                <video 
                  src={item.image} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="activity-img" 
                />
              ) : (
                <img src={item.image} alt={item.name} className="activity-img" loading="lazy" />
              )}
              
              <div className="activity-overlay">
                <div className="activity-icon-floating">
                  <DynamicIcon name={item.icon} size={20} />
                </div>
                
                <div className="activity-content">
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
