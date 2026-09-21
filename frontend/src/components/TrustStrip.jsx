const items = ['Custom Development', 'Responsive Design', 'Scalable Solutions', 'Business-Focused Technology'];
export default function TrustStrip()  {
    return <section className="trust-strip">
<div className="container trust-grid"> {
        items.map(x => <div key= {
            x
        }
        >
<span>✓</span> {
            x
        }
        </div>)
    }
    </div>
</section>;
}
