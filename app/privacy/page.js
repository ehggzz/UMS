import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — UMS",
  description: "How Unmatched Services handles information when you visit the UMS website."
};

export default function PrivacyPolicy() {
  return <main className="legalPage">
    <header className="legalHeader">
      <Link className="legalBrand" href="/">UMS<span>.</span><small>UNMATCHED SERVICES</small></Link>
      <Link className="legalBack" href="/">← Back to UMS</Link>
    </header>
    <article className="legalContent">
      <p className="eyebrow">PRIVACY &amp; DATA</p>
      <h1>Privacy Policy</h1>
      <p className="legalLead">This policy explains how UMS — Unmatched Services (“UMS”, “we”, “us” or “our”) handles information when you visit this website or contact us about a service.</p>
      <p className="legalUpdated">Last updated: 28 October 2026</p>

      <div className="legalNotice"><strong>Pre-launch note</strong><p>This policy describes the current website, which does not currently offer account registration or on-site checkout. Before orders or new features are introduced, we will review and update this policy to match the actual contact channels, service providers and data handling in use.</p></div>

      <h2>1. Who is responsible for your information?</h2>
      <p>UMS is the operator of this fan-made service directory. UMS is not affiliated with, endorsed by, or operated by Torn City. Before this policy is used for live service orders, UMS’s operator contact details must be added here so you can contact us about your information.</p>

      <h2>2. Information we may handle</h2>
      <p>The public website displays service descriptions and prices. It does not currently ask visitors to create an account, submit a form, or enter payment details directly on the site.</p>
      <p>When you visit a website, the hosting and security services that deliver it may process technical information such as your IP address, browser/device details, requested pages, timestamps and security logs. If you contact UMS through an external platform, we may receive the account name, messages, order details and other information you choose to share there.</p>
      <p>Please do not send passwords, payment card details, or personal information that is not needed to discuss a service.</p>

      <h2>3. Why information may be used</h2>
      <p>Where applicable, information may be used to:</p>
      <ul>
        <li>display and maintain the website;</li>
        <li>protect the site, investigate misuse and troubleshoot errors;</li>
        <li>reply to enquiries and discuss or fulfil a service request;</li>
        <li>keep appropriate records of orders, fees, disputes and refunds; and</li>
        <li>meet legal obligations or establish, exercise or defend legal claims.</li>
      </ul>
      <p>We will only use personal information where a lawful basis applies. Depending on the circumstances, this may be taking steps at your request before entering an agreement, performing an agreement, complying with a legal obligation, or pursuing legitimate interests such as site security and handling enquiries.</p>

      <h2>4. Who may receive information?</h2>
      <p>Technical information may be processed by website hosting or infrastructure providers. If you arrange a service through a separate platform, that platform will also handle information under its own terms and privacy policy. Where a service requires a separate provider or agent, relevant order details may need to be shared with them to fulfil the request. We will explain material sharing at the point of ordering where appropriate.</p>
      <p>We do not sell personal information. We may disclose information if required by law or where reasonably necessary to protect rights, safety or the security of the service.</p>

      <h2>5. Cookies, analytics and external content</h2>
      <p>The website may load fonts from Google Fonts. Your browser may make a request to Google to retrieve those fonts, which can involve technical information such as your IP address being processed by Google. Please consult Google’s own privacy information for details.</p>
      <p>We do not currently intentionally use advertising cookies or an analytics dashboard on this website. If non-essential cookies or similar tracking technologies are added, we will update this policy and provide any consent controls required by law before using them.</p>

      <h2>6. How long information is kept</h2>
      <p>Technical logs are generally retained by relevant providers for the period needed for security, operation and troubleshooting under their own retention practices. If UMS receives enquiry or order information, we will keep it only for as long as reasonably necessary to handle the enquiry or service, maintain appropriate records, resolve disputes and meet legal obligations. Exact retention periods will be set and explained as the service operation is finalised.</p>

      <h2>7. Security</h2>
      <p>We take reasonable steps appropriate to the information and the nature of the service to protect information from unauthorised access, loss or misuse. No website or method of online communication can be guaranteed to be completely secure.</p>

      <h2>8. Your privacy rights</h2>
      <p>Depending on the circumstances and applicable law, you may have the right to request access to your personal information, correction of inaccurate information, deletion, restriction of use, or to object to certain processing. Where processing relies on consent, you can withdraw it. These rights are not absolute and some exceptions may apply.</p>
      <p>To make a request, contact UMS using the official contact details that will be published here before live orders begin. You also have the right to complain to the UK Information Commissioner’s Office (ICO) at <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noreferrer">ico.org.uk/make-a-complaint</a>.</p>

      <h2>9. Children</h2>
      <p>This website is not designed to collect children’s personal information. Please do not submit information about a child unless it is necessary and you are authorised to provide it.</p>

      <h2>10. Changes to this policy</h2>
      <p>We may update this policy when the website, services, providers or applicable law changes. The latest version will be published on this page with its updated date. We will provide additional notice where required.</p>

      <div className="legalNotice"><strong>Before launch</strong><p>UMS must add a working operator contact method and confirm the actual order channels, data retention practices, and any third-party service providers before this policy is treated as final.</p></div>
      <p className="legalEnd"><Link href="/">← Return to Unmatched Services</Link></p>
    </article>
    <footer className="legalFooter"><span>UMS · UNMATCHED SERVICES</span><span>Fan-made; not affiliated with Torn City.</span></footer>
  </main>;
}
