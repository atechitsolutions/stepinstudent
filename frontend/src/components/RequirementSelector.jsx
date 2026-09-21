import  {
    useState
}
from 'react';
import  {
    Check, ArrowRight
}
from 'lucide-react';
const options = ['Website', 'E-Commerce', 'Web Application', 'Mobile App', 'CRM', 'Custom Software', 'SEO', 'Google Ads', 'Meta Ads', 'UI/UX', 'API / Backend', 'Other'];
export default function RequirementSelector( {
    onContinue
}
)  {
    const [selected, setSelected] = useState([]);
    const toggle = x => setSelected(s => s.includes(x) ? s.filter(i => i !== x) : [...s, x]);
    return <section className="section selector">
<div className="container">
<div className="selector-box">
<div className="eyebrow">START WITH YOUR REQUIREMENT</div>
<h2>Not Sure What You Need?</h2>
<p>Select what you're looking to build and we'll help you identify the right digital solution.</p>
<div className="option-grid"> {
        options.map(x => <button key= {
            x
        }
        className= {
            `option ${selected.includes(x) ? 'selected' : ''}`
        }
        onClick= {
            () => toggle(x)
        }
        aria-pressed= {
            selected.includes(x)
        }
        > {
            selected.includes(x) && <Check size= {
                15
            }
            />
        }
        <span> {
            x
        }
        </span>
</button>)
    }
    </div>
<div className="selector-bottom">
<span>Selected: <b> {
        selected.length
    }
    </b>
</span>
<button className="btn btn-primary" disabled= {
        !selected.length
    }
    onClick= {
        () => onContinue(selected)
    }
    >Discuss My Requirement <ArrowRight size= {
        17
    }
    />
</button>
</div>
</div>
</div>
</section>;
}
