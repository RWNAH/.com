import { useLanguage } from '../context/LanguageContext'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'

const DynamicIcon = ({ name, size = 24, className = '' }) => {
  const IconComponent = LucideIcons[name]
  if (!IconComponent) return null
  return <IconComponent size={size} className={className} strokeWidth={1.5} />
}

export default function Services() {
  const { t } = useLanguage()

  const services = t('services.items')
  const whyItems = t('whyUs.items')
  if (!Array.isArray(services)) return null

  return (
    <section className="section" id="services" style={{ background: 'var(--bg-elevated)' }}>
      <div className="container">
        
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-tag">{t('services.sectionTag')} & {t('whyUs.sectionTag')}</div>
          <h2 className="h-section text-gradient-gold">{t('whyUs.sectionTitle')}</h2>
          <p className="hero-desc" style={{ marginTop: '1rem', maxWidth: '800px' }}>
            {t('services.sectionDesc')}
          </p>
        </motion.div>

        {/* Bento Grid layout combining Services & Why Us visually */}
        <div className="bento-services">
          
          {/* Main Hero Bento Item */}
          <motion.div 
            className="bento-item bento-col-span-2 bento-row-span-2"
            style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(6,182,212,0.1))' }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <div style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>
                <LucideIcons.Sparkles size={40} strokeWidth={1} />
              </div>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>
                {whyItems[2]?.title}
              </h3>
              <p style={{ fontSize: '1.1rem', maxWidth: '400px' }}>{whyItems[2]?.desc}</p>
            </div>
            <div className="bento-icon-large">
              <LucideIcons.Globe size={250} strokeWidth={0.5} />
            </div>
          </motion.div>

          {/* Stat Bento Items (Why Us) */}
          <motion.div className="bento-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }}>
            <h3 style={{ color: 'var(--accent-gold)' }}>{whyItems[3]?.title}</h3>
            <p>{whyItems[3]?.desc}</p>
            <div className="bento-stat">VIP</div>
          </motion.div>

          <motion.div className="bento-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} transition={{ delay: 0.1 }}>
            <h3 style={{ color: 'var(--accent-green)' }}>{whyItems[0]?.title}</h3>
            <p>{whyItems[0]?.desc}</p>
            <div className="bento-stat">30%</div>
          </motion.div>

          {/* Standard Services */}
          {services.slice(0, 4).map((svc, i) => (
            <motion.div 
              key={i} 
              className="bento-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (i * 0.1) }}
            >
              <div style={{ color: 'var(--accent-cyan)' }}>
                <DynamicIcon name={svc.icon} size={32} />
              </div>
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Wide Service Item */}
          <motion.div 
            className="bento-item bento-col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', height: '100%' }}>
              <div style={{ color: 'var(--accent-gold)' }}>
                <DynamicIcon name={services[4]?.icon} size={48} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.8rem' }}>{services[4]?.title}</h3>
                <p style={{ fontSize: '1rem' }}>{services[4]?.desc}</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
