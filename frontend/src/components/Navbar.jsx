import  {
    useEffect, useState
}
from 'react';
import  {
    Menu, X, ArrowUpRight
}
from 'lucide-react';
import  {
    useScrolled
}
from '../hooks/useScroll';
const links = [['Home', 'home'], ['Services', 'services'], ['Solutions', 'solutions'], ['Projects', 'projects'], ['Process', 'process'], ['About', 'about'], ['Contact', 'contact']];
export default function Navbar()  {
    const [open, setOpen] = useState(false), scrolled = useScrolled();
    useEffect(() =>  {
        document.body.style.overflow = open ? 'hidden' : '';
        const onKey = e => e.key === 'Escape' && setOpen(false);
        if (open)
    window.addEventListener('keydown', onKey);
        return () =>  {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        }
        ;
    }
    , [open]);
    const go = id =>  {
        setOpen(false);
        const target = id === 'about' ? 'about' : id;
        document.getElementById(target)?.scrollIntoView( {
            behavior: 'smooth'
        }
        );
    }
    ;
    return <header className= {
        `navbar ${scrolled ? 'navbar-scrolled' : ''}`
    }
    >
<div className="container nav-inner">
<button className="brand" onClick= {
        () => go('home')
    }
    aria-label="A-Tech home">
<span>A</span>-TECH</button>
<nav className="desktop-nav" aria-label="Primary navigation"> {
        links.map(([label, id]) => <button key= {
            id
        }
        onClick= {
            () => go(id)
        }
        > {
            label
        }
        </button>)
    }
    </nav>
<button className="nav-cta" onClick= {
        () => go('contact')
    }
    >Get a Quote <ArrowUpRight size= {
        16
    }
    />
</button>
<button className="menu-btn" aria-label= {
        open ? 'Close menu' : 'Open menu'
    }
    aria-expanded= {
        open
    }
    onClick= {
        () => setOpen(!open)
    }
    > {
        open ? <X /> : <Menu />
    }
    </button>
</div> {
        open && <div className="mobile-menu">
<nav aria-label="Mobile navigation"> {
            links.filter(x => x[0] !== 'About').map(([label, id]) => <button key= {
                id
            }
            onClick= {
                () => go(id)
            }
            > {
                label
            }
            </button>)
        }
        <button className="mobile-cta" onClick= {
            () => go('contact')
        }
        >Start a Project <ArrowUpRight size= {
            17
        }
        />
</button>
</nav>
</div>
    }
    </header>;
}
