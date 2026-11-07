import OwnerAdminLink from "./components/OwnerAdminLink";

export default function Home() {
  return <main>
    <header className="topbar">
      <a className="brand" href="/"><img src="/ums-logo.svg" alt="UMS — Unmatched Services" /><span>UNMATCHED<br/>SERVICES</span></a>
      <nav aria-label="Main navigation"><a href="/services">Services</a><a href="/achievements">Achievement Finder</a><a href="/events">Events</a><a href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noopener noreferrer">Contact</a></nav>
      <a className="topCta" href="/account">My account <span>→</span></a>
    </header>

    <section className="hero landingHero imageOnlyHero" id="home" aria-label="Unmatched Services">
      <div className="heroArt">
        <img className="heroLogo" src="/unmatched-services.png" alt="Unmatched Services emblem with a masked figure, crossed rifles, money and green growth bars." />
      </div>
    </section>

    <section className="memberPortalSection" aria-label="Member account">
      <a className="memberPortalCard" href="/account">
        <div className="memberPortalHeading"><span className="eyebrow">YOUR MEMBER SPACE</span><span className="memberPortalIcon" aria-hidden="true">◎</span></div>
        <span className="memberPortalStatus">MEMBER PORTAL · COMING SOON</span>
        <h2>Your UMS account</h2>
        <span className="memberPortalLink">Explore member area ↗</span>
      </a>
    </section>
    <section className="landingChoices landingChoicesSimple" aria-label="Explore UMS">
      <a className="landingChoice" href="/services"><h2>Services</h2></a>
      <a className="landingChoice" href="/events"><h2>UMS Events</h2></a>
      <a className="landingChoice" href="/achievements"><h2>Award support</h2></a>
    </section>

    <section className="contactPanel" id="contact"><div className="contactMark">UMS<span>.</span></div><div><p className="eyebrow">READY WHEN YOU ARE</p><h2>Need a hand?</h2><p>Questions about a service, an event or your account? Reach the UMS team on Discord.</p></div><div className="contactActions"><a className="primaryButton" href="/services">View services ↑</a><a className="discordButton" href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noopener noreferrer">Join the UMS Discord <span aria-hidden="true">↗</span></a></div></section>

    <footer><a href="/"><strong>UMS</strong><span>UNMATCHED SERVICES</span></a><p>UMS is fan-made and is not affiliated with or endorsed by Torn City.</p><div className="footerLinks"><a href="/privacy">Privacy Policy</a><a href="/eula">EULA / Terms</a><a href="/">Back to top ↑</a></div></footer>
    <div className="ownerAccess"><OwnerAdminLink /></div>
  </main>;
}
