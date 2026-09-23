import  {
    ArrowUpRight
}
from 'lucide-react';
export default function Footer()  {
    const go = id => document.getElementById(id)?.scrollIntoView( {
        behavior: 'smooth'
    }
    );
    return <footer className="footer">
<div className="container">
<div className="footer-grid">
<div>
<button className="brand footer-brand" onClick= {
        () => go('home')
    }
    >
<span>A</span>-TECH</button>
<p>Technology solutions built around your business.</p>
<p className="footer-description">
    We design and build modern websites, web applications,
    mobile apps and custom software that help businesses
    grow, automate and scale.
  </p>
</div>
<div>
<h4>Company</h4> {
        [['Home', 'home'], ['About', 'about'], ['Services', 'services'], ['Projects', 'projects'], ['Contact', 'contact']].map(([x, id]) => <button key= {
            x
        }
        onClick= {
            () => go(id)
        }
        > {
            x
        }
        </button>)
    }
    </div>
<div>
<h4>Services</h4> {
        ['Web Development', 'E-Commerce', 'CRM', 'Custom Software', 'Mobile Apps', 'Digital Marketing','Lead Generation','AI Consulting'].map(x => <button key= {
            x
        }
        > {
            x
        }
        </button>)
    }
    </div>
<div>
<h4>Contact</h4>
<span>ashasvitech@gmail.com</span>
<span>+919772733319</span>
<span>Plot No E-90,
      eden garden ,sikar road , Rajawas, jaipur , rajeshtan, India 302013</span>
      <span>Plot no - 1,2
            Om plaza , vinobha margh, kings road, nirman nagar , jaipur, rajeshtan, India 302019 </span>
</div>
</div>
<div className="footer-bottom">
<span>© 2026 A-Tech. All rights reserved.</span>
<div>
<button>Privacy Policy</button>
<button>Terms & Conditions</button>
</div>
</div>
</div>
</footer>;
}
