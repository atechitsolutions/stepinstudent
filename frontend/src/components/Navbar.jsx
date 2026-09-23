import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrolled } from '../hooks/useScroll';

const links = [
  ['Home', 'home'],
  ['Services', 'services'],
  ['Solutions', 'solutions'],
  ['Projects', 'projects'],
  ['Process', 'process'],
  ['About', 'about'],
  ['Contact', 'contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener('keydown', onKey);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);

    const target = id === 'about' ? 'about' : id;

    document.getElementById(target)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const goToAdmin = () => {
    setOpen(false);
    navigate('/admin/login');
  };

  return (
    <header
      className={`navbar ${
        scrolled ? 'navbar-scrolled' : ''
      }`}
    >
      <div className="container nav-inner">

        {/* LOGO */}
        <button
          className="brand"
          onClick={() => go('home')}
          aria-label="A-Tech home"
        >
          <span>A</span>-TECH
        </button>

        {/* DESKTOP NAVIGATION */}
        <nav
          className="desktop-nav"
          aria-label="Primary navigation"
        >
          {links.map(([label, id]) => (
            <button
              key={id}
              onClick={() => go(id)}
            >
              {label}
            </button>
          ))}

      {/* ADMIN - AFTER CONTACT */}
                      <button
                        className="nav-admin"
                        onClick={goToAdmin}
                      >
                        Admin
                        <ArrowUpRight size={16} />
                      </button>
        </nav>



        {/* GET A QUOTE */}
        <button
          className="nav-cta"
          onClick={() => go('contact')}
        >
          Get a Quote
          <ArrowUpRight size={16} />
        </button>


        {/* MOBILE MENU BUTTON */}
        <button
          className="menu-btn"
          aria-label={
            open ? 'Close menu' : 'Open menu'
          }
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="mobile-menu">
          <nav aria-label="Mobile navigation">

            {links
              .filter((x) => x[0] !== 'About')
              .map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => go(id)}
                >
                  {label}
                </button>
              ))}

            {/* MOBILE ADMIN */}
            <button
              className="mobile-admin"
              onClick={goToAdmin}
            >
              Admin
              <ArrowUpRight size={17} />
            </button>

            {/* MOBILE CTA */}
            <button
              className="mobile-cta"
              onClick={() => go('contact')}
            >
              Start a Project
              <ArrowUpRight size={17} />
            </button>

          </nav>
        </div>
      )}
    </header>
  );
}