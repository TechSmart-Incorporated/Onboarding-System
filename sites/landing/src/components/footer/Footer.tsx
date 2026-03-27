import logoMain from '../../assets/logo-main.svg'
// import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { MdEmail, MdPhone } from 'react-icons/md'
import './footer.css'

const platform = [
  { label: 'Order Now',      href: 'https://store.1clickcart.com', external: true },
  { label: 'Features',       href: '#features' },
  { label: 'Download App',   href: '#the-app' },
  { label: 'How It Works',   href: '#how-it-works' },
]

const joinUs = [
  { label: 'For Businesses', href: '#for-business' },
  { label: 'Become a Driver', href: '#deliver' },
  { label: 'Early Access',   href: 'https://n8n.1clickcart.com/form/622a823b-e223-4e87-b509-c6bb3d6750c5', external: true },
]

// const socials = [
//   { icon: FaFacebookF,  href: '#', label: 'Facebook' },
//   { icon: FaInstagram,  href: '#', label: 'Instagram' },
//   { icon: FaWhatsapp,   href: '#', label: 'WhatsApp' },
// ]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Brand */}
        <div className="footer-brand">
          <a href="/" className="footer-logo">
            <img src={logoMain} alt="" className="footer-logo-img" />
            1ClickCart
          </a>
          <p className="footer-tagline">
            Guyana's #1 local delivery and ordering platform. Order food,
            groceries, pharmacy, and more — delivered fast.
          </p>
          {/* <div className="footer-socials">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} className="footer-social" aria-label={label}>
                <Icon size={14} />
              </a>
            ))}
          </div> */}
        </div>

        {/* Platform */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Platform</h4>
          <ul className="footer-links">
            {platform.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="footer-link" {...(l.external && { target: '_blank', rel: 'noopener noreferrer' })}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Join Us */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Join Us</h4>
          <ul className="footer-links">
            {joinUs.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="footer-link">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Contact</h4>
          <ul className="footer-links">
            <li>
              <a href="mailto:support@1clickcart.com" className="footer-link footer-contact-link">
                <MdEmail size={15} />
                support@1clickcart.com
              </a>
            </li>
            <li>
              <a href="tel:+5927182733" className="footer-link footer-contact-link">
                <MdPhone size={15} />
                +592 718 2733
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2026 1ClickCart by TechSmart Inc. All rights reserved.</span>
        <span className="footer-location">
          <img src="https://flagcdn.com/16x12/gy.png" alt="Guyana flag" width="16" height="12" />
          Georgetown, Guyana
        </span>
      </div>
    </footer>
  )
}
