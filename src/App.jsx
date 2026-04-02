import { useEffect } from 'react'
import { useLanguage } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Packages from './components/Packages'
import Hotels from './components/Hotels'
import Activities from './components/Activities'
import Services from './components/Services'
import Footer from './components/Footer'

export default function App() {
  const { dir, lang } = useLanguage()

  // Update HTML dir, lang attributes, and SEO metadata
  useEffect(() => {
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', lang)
    document.body.style.fontFamily = lang === 'ar'
      ? "'Tajawal', sans-serif" // Since Almarai isn't linked in index.html but Tajawal is
      : "'Inter', sans-serif"

    // SEO Dynamic Update
    const seoTitle = lang === 'ar' 
      ? 'رونة للسفريات والسياحة | Rwnah Travel' 
      : 'Rwnah Travel & Tourism | Luxury Trips'
      
    const seoDesc = lang === 'ar'
      ? 'رقم 1 للسفريات والسياحة في روسيا. نصنع لك ذكريات لا تُنسى في أرقى وأفخم الوجهات السياحية في موسكو، سوتشي وداغستان.'
      : 'Your #1 Travel & Tourism agency in Russia. We create unforgettable luxury experiences across Moscow, Sochi, and Dagestan.'
      
    document.title = seoTitle
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', seoDesc)

  }, [dir, lang])

  return (
    <div className="app-wrapper">
      <Navbar />
      <Hero />
      <Packages />
      <Hotels />
      <Activities />
      <Services />
      <Footer />
    </div>
  )
}
