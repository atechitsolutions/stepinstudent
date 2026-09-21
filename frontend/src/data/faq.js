export const faqs = [
    ['What services does A-Tech provide?', 'A-Tech provides website development, web applications, e-commerce, CRM and business software, mobile applications, API/backend development, UI/UX design and digital marketing solutions.'],
    ['Can you build a custom website for my business?', 'Yes. Website scope can be tailored to the business, audience, content, integrations and conversion goals.'],
    ['Can you build custom software?', 'Yes. Custom software can be designed around specific workflows, roles, data and operational requirements.'],
    ['Can you integrate APIs and payment gateways?', 'Yes. Applicable REST APIs, payment services and third-party integrations can be incorporated based on the project requirements.'],
    ['Do you provide SEO and digital marketing?', 'Yes. A-Tech offers SEO, Google Ads, Meta Ads, social media and lead-generation services as part of its digital solutions offering.'],
    ['How do I start a project?', 'Use the project inquiry form, select the services you need and describe your requirement. The submitted details can then be reviewed for the next discussion.']
].map(([question, answer], i) => ( {
    id: i + 1, question, answer
}
));
