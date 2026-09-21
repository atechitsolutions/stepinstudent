import  {
    useState
}
from 'react';
import  {
    Plus, Minus
}
from 'lucide-react';
import  {
    faqs
}
from '../data/faq';
export default function FAQ()  {
    const [open, setOpen] = useState(0);
    return <section className="section faq">
<div className="container faq-grid">
<div>
<div className="eyebrow dark">FAQ</div>
<h2>Frequently Asked Questions</h2>
<p>Clear answers to common questions before you start a project.</p>
</div>
<div className="faq-list"> {
        faqs.map(f => <div className="faq-item" key= {
            f.id
        }
        >
<button aria-expanded= {
            open === f.id
        }
        aria-controls= {
            `faq-${f.id}`
        }
        onClick= {
            () => setOpen(open === f.id ? 0 : f.id)
        }
        >
<span> {
            f.question
        }
        </span> {
            open === f.id ? <Minus size= {
                18
            }
            /> : <Plus size= {
                18
            }
            />
        }
        </button> {
            open === f.id && <div id= {
                `faq-${f.id}`
            }
            className="faq-answer">
<p> {
                f.answer
            }
            </p>
</div>
        }
        </div>)
    }
    </div>
</div>
</section>;
}
