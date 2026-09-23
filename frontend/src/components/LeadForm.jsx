import { useEffect, useState } from "react";
import {
    ArrowRight,
    CheckCircle2,
    Loader2,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import { submitInquiry } from "../services/inquiryService";

const serviceOptions = [
    "Website",
    "E-Commerce",
    "Web Application",
    "Mobile App",
    "CRM",
    "Custom Software",
    "SEO",
    "Google Ads",
    "Meta Ads",
    "UI/UX",
    "API / Backend",
    "Other",
];

const initial = {
    fullName: "",
    phone: "",
    email: "",
    company: "",
    services: [],
    message: "",
};

export default function LeadForm({ selectedServices = [] }) {
    const [form, setForm] = useState({
        ...initial,
        services: selectedServices,
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        setForm((current) => ({
            ...current,
            services: selectedServices,
        }));
    }, [selectedServices]);

    const update = (key, value) => {
        setForm((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const toggleService = (service) => {
        update(
            "services",
            form.services.includes(service)
                ? form.services.filter((item) => item !== service)
                : [...form.services, service]
        );
    };

    const validate = () => {
        const validationErrors = {};

        // Full Name
        if (!form.fullName.trim()) {
            validationErrors.fullName =
                "Please enter your full name.";
        }

        // Phone
        if (!form.phone.trim()) {
            validationErrors.phone =
                "Please enter your phone number.";
        } else if (
            !/^(\+91[-\s]?)?[6-9]\d{9}$/.test(
                form.phone.trim()
            )
        ) {
            validationErrors.phone =
                "Please enter a valid Indian phone number.";
        }

        // Email
        if (!form.email.trim()) {
            validationErrors.email =
                "Please enter your email address.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                form.email.trim()
            )
        ) {
            validationErrors.email =
                "Please enter a valid email address.";
        }

        // Services
        if (!form.services.length) {
            validationErrors.services =
                "Select at least one service.";
        }

        // Message
        if (!form.message.trim()) {
            validationErrors.message =
                "Please describe your requirement.";
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        setStatus("loading");

        try {
            await submitInquiry(form);

            setStatus("success");

            setForm({
                ...initial,
                services: [],
            });

            setErrors({});
        } catch (error) {
            console.error(
                "Inquiry submission failed:",
                error
            );

            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <section
                id="contact"
                className="section lead-section"
            >
                <div className="container success-card">
                    <CheckCircle2 size={48} />

                    <div className="eyebrow dark">
                        INQUIRY RECEIVED
                    </div>

                    <h2>Thank You!</h2>

                    <p>
                        Your project inquiry has been
                        submitted successfully.
                        <br />
                        Your requirement has been received.
                        We'll get in touch using the contact
                        details you provided.
                    </p>

                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setStatus("idle");

                            document
                                .getElementById("home")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                });
                        }}
                    >
                        Back to Home
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section
            id="contact"
            className="section lead-section"
        >
            <div className="container lead-grid">

                {/* Left Information */}
                <div className="lead-info">
                    <div className="eyebrow">
                        START A PROJECT
                    </div>

                    <h2>
                        Let's Talk About Your Project.
                    </h2>

                    <p>
                        Tell us what you're looking to build.
                        Share a few details and we'll understand
                        your requirement.
                    </p>

                    <div className="lead-list">
                        {[
                            "Your business",
                            "Your idea",
                            "Your required solution",
                            "Your expected timeline",

                        ].map((item) => (
                            <div key={item}>
                                <CheckCircle2 size={16} />
                                {item}
                            </div>
                        ))}
                    </div>

                    <div className="contact-meta">
                        <span>
                            <Mail size={17} />
                            ashasvitech@gmail.com
                        </span>

                        <span>
                            <Phone size={17} />
                            +919772733319
                        </span>

                        <span>
                            <MapPin size={17} />
                            Plot No E-90,
                            eden garden ,sikar road , Rajawas, jaipur , rajeshtan, India 302013
                        </span>
                        <span>
                                                    <MapPin size={17} />
                                                   Plot no - 1,2
                                                   Om plaza , vinobha margh, kings road, nirman nagar , jaipur, rajeshtan, India  302019
                                                </span>
                    </div>
                </div>

                {/* Lead Form */}
                <form
                    className="lead-form"
                    onSubmit={handleSubmit}
                    noValidate
                >

                    {/* Name + Phone */}
                    <div className="form-row">
                        <Field
                            label="Full Name"
                            error={errors.fullName}
                        >
                            <input
                                type="text"
                                value={form.fullName}
                                onChange={(event) =>
                                    update(
                                        "fullName",
                                        event.target.value
                                    )
                                }
                                placeholder="Your name"
                            />
                        </Field>

                        <Field
                            label="Phone Number"
                            error={errors.phone}
                        >
                            <input
                                type="tel"
                                value={form.phone}
                                onChange={(event) =>
                                    update(
                                        "phone",
                                        event.target.value
                                    )
                                }
                                placeholder="+91 XXXXX XXXXX"
                                inputMode="tel"
                            />
                        </Field>
                    </div>

                    {/* Email + Company */}
                    <div className="form-row">
                        <Field
                            label="Email"
                            error={errors.email}
                        >
                            <input
                                type="email"
                                value={form.email}
                                onChange={(event) =>
                                    update(
                                        "email",
                                        event.target.value
                                    )
                                }
                                placeholder="you@example.com"
                            />
                        </Field>

                        <Field label="Company / Business">
                            <input
                                type="text"
                                value={form.company}
                                onChange={(event) =>
                                    update(
                                        "company",
                                        event.target.value
                                    )
                                }
                                placeholder="Company name"
                            />
                        </Field>
                    </div>

                    {/* Services */}
                    <Field
                        label="What do you need?"
                        error={errors.services}
                    >
                        <div className="form-services">
                            {serviceOptions.map((service) => {
                                const isSelected =
                                    form.services.includes(
                                        service
                                    );

                                return (
                                    <button
                                        type="button"
                                        key={service}
                                        className={
                                            isSelected
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            toggleService(
                                                service
                                            )
                                        }
                                    >
                                        {isSelected && (
                                            <CheckCircle2
                                                size={13}
                                            />
                                        )}

                                        {service}
                                    </button>
                                );
                            })}
                        </div>
                    </Field>

                    {/* Message */}
                    <Field
                        label="Message"
                        error={errors.message}
                    >
                        <textarea
                            value={form.message}
                            onChange={(event) =>
                                update(
                                    "message",
                                    event.target.value
                                )
                            }
                            rows="5"
                            placeholder="Briefly describe what you want to build or the problem you want to solve."
                        />
                    </Field>

                    {/* Error */}
                    {status === "error" && (
                        <div className="form-error-banner">
                            Something went wrong while
                            submitting your inquiry.

                            <button
                                type="button"
                                onClick={() =>
                                    setStatus("idle")
                                }
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? (
                            <>
                                <Loader2
                                    className="spin"
                                    size={18}
                                />
                                Submitting...
                            </>
                        ) : (
                            <>
                                Submit Project Inquiry
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}

function Field({ label, error, children }) {
    return (
        <label className="field">
            <span>{label}</span>

            {children}

            {error && (
                <small className="error">
                    {error}
                </small>
            )}
        </label>
    );
}