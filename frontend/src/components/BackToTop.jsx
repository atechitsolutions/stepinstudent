import  {
    useScrolled
}
from '../hooks/useScroll';
import  {
    ArrowUp
}
from 'lucide-react';
export default function BackToTop()  {
    const show = useScrolled(500);
    if (!show)
    return null;
    return <button className="back-top" aria-label="Back to top" onClick= {
        () => window.scrollTo( {
            top: 0, behavior: 'smooth'
        }
        )
    }
    >
<ArrowUp size= {
        18
    }
    />
</button>;
}
