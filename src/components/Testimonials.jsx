import { useLanguage } from '../context/LanguageContext'

export default function Testimonials() {
  const { t } = useLanguage()

  const testimonials = t('testimonials.items')
  if (!Array.isArray(testimonials)) return null

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-layout">
          <div className="about-text reveal">
            <div className="section-tag">{t('about.sectionTag')}</div>
            <h2 className="section-title">{t('about.sectionTitle')}</h2>
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
          </div>

          <div>
            <div className="reveal" style={{ marginBottom: '1.5rem' }}>
              <div className="section-tag" style={{ color: 'var(--cyan-300)' }}>{t('testimonials.sectionTag')}</div>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((item, i) => (
                <div key={i} className={`testimonial-card reveal reveal-delay-${i + 1}`}>
                  <div className="testimonial-stars">
                    {Array.from({ length: item.rating }, (_, j) => (
                      <span key={j}>★</span>
                    ))}
                  </div>
                  <div className="testimonial-name">{item.name}</div>
                  <div className="testimonial-text">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
