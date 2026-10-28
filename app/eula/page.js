import Link from "next/link";

export const metadata = {
  title: "EULA & Terms of Use — UMS",
  description: "Terms for using the Unmatched Services website and arranging services."
};

export default function Eula() {
  return <main className="legalPage">
    <header className="legalHeader">
      <Link className="legalBrand" href="/">UMS<span>.</span><small>UNMATCHED SERVICES</small></Link>
      <Link className="legalBack" href="/">← Back to UMS</Link>
    </header>
    <article className="legalContent">
      <p className="eyebrow">TERMS &amp; CONDITIONS</p>
      <h1>EULA &amp; Terms of Use</h1>
      <p className="legalLead">These terms cover your use of the UMS — Unmatched Services website and any service you arrange through UMS.</p>
      <p className="legalUpdated">Last updated: 28 October 2026</p>

      <div className="legalNotice"><strong>Pre-launch note</strong><p>These are draft terms for the current service directory. UMS must add operator contact details and confirm the order, payment, cancellation and refund process before accepting live orders. These terms do not remove any consumer rights that cannot lawfully be excluded.</p></div>

      <h2>1. About UMS</h2>
      <p>UMS — Unmatched Services is an independent, fan-made directory for services associated with Torn City. UMS is not affiliated with, endorsed by, sponsored by, or operated by Torn City or its owners. Any game names or marks belong to their respective owners.</p>

      <h2>2. Agreeing to these terms</h2>
      <p>By using this website, you agree to follow these terms. If you do not agree, do not use the website or arrange services through UMS. Any additional terms clearly provided for a particular service or order will also apply. If there is a conflict, the specific order terms apply only to that order to the extent they are lawful.</p>

      <h2>3. Website use</h2>
      <p>You may use the website to browse the service directory and make legitimate enquiries. You must not misuse the site, attempt unauthorised access, interfere with its operation, submit knowingly false information, or use it in a way that breaks applicable law or the rules of a platform involved in the service.</p>
      <p>We may change, suspend or remove website content or features for maintenance, security, operational or other reasonable reasons. We will try to keep information accurate and current, but a listing may change and an enquiry may be needed to confirm availability before an order is accepted.</p>

      <h2>4. Services, prices and order acceptance</h2>
      <p>The directory describes services and indicative prices. Unless an order is expressly confirmed, a listing is not a guarantee that a provider is available or that a request has been accepted. The final service, price, timing, provider and any additional conditions should be confirmed with you before you commit.</p>
      <p>Prices shown as in-game dollars refer to Torn City in-game currency, not real-world currency, unless clearly stated otherwise. Any real-money charge, fee or payment arrangement must be clearly disclosed before you agree to it. Do not assume that an order is placed merely because you click a link or send an enquiry.</p>

      <h2>5. Payments, cancellations and refunds</h2>
      <p>Payment instructions, any UMS fee, the amount payable to a service provider, and the point at which payment is due must be confirmed before an order is accepted. Do not send payment to an unverified account or follow payment instructions that differ from those confirmed for your order.</p>
      <p>If you wish to cancel or request a refund, contact UMS through the official contact channel published on the website. The outcome may depend on whether the service has started or been completed and on the specific order terms. Nothing in these terms excludes or limits any refund, cancellation or other right that you have under applicable law.</p>

      <h2>6. Third-party providers and platforms</h2>
      <p>Some services may be performed by independent agents or providers, or arranged through third-party websites, messaging services or platforms. Those parties may have their own terms, privacy policies, availability and rules. UMS will identify material third-party involvement when confirming an order where appropriate. We are not responsible for the operation or content of an external website, but this does not remove any responsibility UMS has for services it has agreed to provide.</p>

      <h2>7. Fair use and prohibited requests</h2>
      <p>You must not request a service for an unlawful purpose, provide information you know to be false, impersonate another person, or ask anyone to disclose information or perform an action without the necessary authority. UMS may decline or stop a request where there is a reasonable concern about legality, safety, fraud, abuse, platform rules or a provider’s ability to complete it.</p>

      <h2>8. Service availability and outcomes</h2>
      <p>We will take reasonable care when carrying out any service that UMS has expressly accepted. However, some outcomes depend on in-game mechanics, third-party providers, other players, platform availability and circumstances outside UMS’s control. Unless expressly agreed, no particular in-game result, timing or outcome is guaranteed. If something goes wrong with an accepted order, contact UMS so it can be reviewed.</p>

      <h2>9. Website content and intellectual property</h2>
      <p>Unless otherwise stated, the UMS name, original website design, text and graphics created for UMS are owned by or used with permission by the relevant rights holder. You may not copy or reuse UMS-created material for commercial purposes without permission. Third-party names, logos and marks remain the property of their respective owners.</p>

      <h2>10. Liability</h2>
      <p>Nothing in these terms excludes or limits liability where it would be unlawful to do so, including liability for fraud or fraudulent misrepresentation, or any rights and remedies that cannot lawfully be excluded. Subject to that, UMS is not responsible for losses caused by events outside its reasonable control, or by your misuse of the website or breach of these terms.</p>
      <p>If you are a consumer, you may have statutory rights concerning services supplied to you. These terms do not take those rights away. Any limitation of liability must be interpreted only to the extent permitted by applicable law.</p>

      <h2>11. Privacy</h2>
      <p>Our <Link href="/privacy">Privacy Policy</Link> explains how information is handled when you visit the website or contact UMS. Third-party platforms have their own privacy practices.</p>

      <h2>12. Changes to these terms</h2>
      <p>We may update these terms as the website or services change. The current version will be published on this page with its updated date. Changes will not remove rights that have already accrued or rights that cannot lawfully be changed.</p>

      <h2>13. Governing law and contact</h2>
      <p>These terms are intended to be governed by the law of England and Wales, except where mandatory consumer protection rules require otherwise. Courts with jurisdiction under applicable law may hear disputes.</p>
      <p>Before live orders begin, UMS will publish an official contact method for questions, complaints, cancellations and legal notices. Please use the contact method stated in your confirmed order in the meantime.</p>

      <div className="legalNotice"><strong>Before launch</strong><p>UMS must confirm its operator/contact details and operational rules for order acceptance, payment, cancellation, refunds, disputes and provider responsibility. These draft terms should be reviewed against those real practices before live orders begin.</p></div>
      <p className="legalEnd"><Link href="/">← Return to Unmatched Services</Link></p>
    </article>
    <footer className="legalFooter"><span>UMS · UNMATCHED SERVICES</span><span>Fan-made; not affiliated with Torn City.</span></footer>
  </main>;
}
