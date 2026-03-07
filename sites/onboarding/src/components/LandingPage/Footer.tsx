import { Link } from 'react-router-dom'

type FooterLink =
  | { label: string; to: string }
  | { label: string; href: string }

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Terms', to: '/terms' },
  { label: 'Get Started', to: '/started' },
  { label: 'Email Us', href: 'mailto:softwareengineer@techsmartgy.com' },
  { label: 'Support', href: 'mailto:support@1clickcart.com' },
] as const satisfies readonly FooterLink[]

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-links">
        {footerLinks.map((item) => (
          'to' in item ? (
            <Link key={item.label} to={item.to}>
              {item.label}
            </Link>
          ) : (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          )
        ))}
      </div>
      <p>Developed &amp; Maintained by TechSmart Inc</p>
    </footer>
  )
}

export default Footer
