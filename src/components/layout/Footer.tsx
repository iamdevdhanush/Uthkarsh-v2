import { Link } from 'react-router-dom'
import { eventConfig } from '../../data/eventConfig'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <h3 className="footer__title">{eventConfig.eventName}</h3>
            <p className="footer__text">{eventConfig.institutionFull}</p>
            <p className="footer__text">{eventConfig.department}</p>
            <p className="footer__text">{eventConfig.location}</p>
          </div>

          <div className="footer__links">
            <span className="footer__links-label">Navigate</span>
            <Link to="/" className="footer__link">Home</Link>
            <Link to="/register" className="footer__link">Register</Link>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} {eventConfig.eventName}. {eventConfig.institutionShort}.
          </p>
          <div className="footer__badge">
            <span className="footer__badge-text">6-Hour Hackathon</span>
            <span className="footer__badge-dot" />
            <span className="footer__badge-text">On-site Problem</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
