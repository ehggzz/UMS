export const metadata = {
  title: "My Account — UMS",
  description: "UMS account access is planned for a future update."
};

export default function AccountPage() {
  return <main className="workflowPage accountPage">
    <header className="topbar">
      <a className="brand" href="/"><img src="/ums-logo.svg" alt="UMS — Unmatched Services" /><span>UNMATCHED<br/>SERVICES</span></a>
      <nav aria-label="Main navigation"><a href="/services">Services</a><a href="/achievements">Achievement Finder</a><a href="/events">Events</a><a href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noopener noreferrer">Contact</a></nav>
      <a className="topCta" href="/services">Browse services <span>→</span></a>
    </header>
    <section className="accountIntro">
      <p className="eyebrow">MEMBER AREA</p>
      <h1>Your UMS <em>account.</em></h1>
      <p>Order tracking is planned for a future update.</p>
    </section>
    <section className="workflowCard accountCard accountComingSoon">
      <p className="eyebrow">COMING LATER</p>
      <h2>Account access is in the works.</h2>
      <p>When it’s ready, customers will use their Torn API key to access order and payment updates here. Please don’t enter or send an API key until that feature is available.</p>
      <div className="accountComingActions">
        <a className="discordButton" href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noopener noreferrer">Contact UMS on Discord <span aria-hidden="true">↗</span></a>
        <a className="secondaryHeroButton" href="/services">Browse paid services <span>→</span></a>
      </div>
    </section>
    <footer className="workflowFooter"><a href="/services">Services</a><a href="/events">Events</a><a href="/privacy">Privacy Policy</a><a href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noreferrer">UMS Discord ↗</a></footer>
  </main>;
}
