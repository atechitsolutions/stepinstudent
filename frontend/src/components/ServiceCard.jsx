import * as Icons from 'lucide-react';
import  {
    ArrowUpRight
}
from 'lucide-react';
export default function ServiceCard( {
    service
}
)  {
    const Icon = Icons[service.icon] || Icons.Circle;
    return <article className="service-card">
<div className="card-top">
<span className="number"> {
        service.number
    }
    </span>
<span className="service-icon">
<Icon size= {
        21
    }
    />
</span>
</div>
<h3> {
        service.title
    }
    </h3>
<p> {
        service.description
    }
    </p>
<ul> {
        service.capabilities.map(x => <li key= {
            x
        }
        > {
            x
        }
        </li>)
    }
    </ul>
<span className="card-arrow">
<ArrowUpRight size= {
        18
    }
    />
</span>
</article>;
}
