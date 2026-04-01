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

  // Update HTML dir and lang attributes
  useEffect(() => {
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', lang)
    document.body.style.fontFamily = lang === 'ar'
      ? "'Almarai', sans-serif"
      : "'Inter', sans-serif"
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
