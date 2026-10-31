import OwnerAdminLink from "./components/OwnerAdminLink";

export default function Home() {
  return <main>
    <header className="topbar">
      <a className="brand" href="/"><img src="/ums-logo.svg" alt="UMS — Unmatched Services" /><span>UNMATCHED<br/>SERVICES</span></a>
      <nav aria-label="Main navigation"><a href="/services">Services</a><a href="/events">Events</a><a href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noopener noreferrer">Contact</a></nav>
      <a className="topCta" href="/account">My account <span>→</span></a>
    </header>

    <section className="hero landingHero" id="home">
      <div className="heroContent">
        <p className="eyebrow"><i/> TORN CITY COMMUNITY SERVICES</p>
        <h1>Services, events<br/><em>and community.</em></h1>
        <p className="heroCopy">Find paid services, see upcoming UMS events, and keep track of your requests in one place.</p>
        <div className="landingActions">
          <a className="primaryButton" href="/services">Explore services <span>→</span></a>
          <a className="secondaryHeroButton" href="/events">Events <span>→</span></a>
        </div>
        <small>UMS · UNMATCHED SERVICES</small>
      </div>
      <div className="heroArt"><img className="heroLogo" src="/unmatched-services.gif" alt="Unmatched Services emblem with a masked figure, crossed rifles, money and green growth bars." /></div>
    </section>

    <section className="trustStrip">
      <div><b>◈</b><strong>Clear pricing</strong><p>Browse service options and fees.</p></div>
      <div><b>↗</b><strong>UMS events</strong><p>Find event details as they are announced.</p></div>
      <div><b>◎</b><strong>Order updates</strong><p>Ask UMS for request and payment progress.</p></div>
    </section>

    <section className="landingChoices" aria-label="Explore UMS">
      <a className="landingChoice" href="/services"><span className="eyebrow">01 · PAID SERVICES</span><h2>Find your <em>service.</em></h2><p>Browse the full directory, compare prices and send a request.</p><span className="choiceArrow">Explore services ↗</span></a>
      <a className="landingChoice" href="/events"><span className="eyebrow">02 · UMS EVENTS</span><h2>See what’s <em>coming up.</em></h2><p>Check confirmed events and read the details in one place.</p><span className="choiceArrow">View events ↗</span></a>
      <a className="landingChoice" href="/account"><span className="eyebrow">03 · MEMBER AREA</span><h2>Your UMS <em>account.</em></h2><p>Torn API key sign-in and order tracking are planned for a later update.</p><span className="choiceArrow">Account access coming later</span></a>
    </section>

    <section className="contactPanel" id="contact"><div className="contactMark">UMS<span>.</span></div><div><p className="eyebrow">READY WHEN YOU ARE</p><h2>Need a hand?</h2><p>Questions about a service, an event or your account? Reach the UMS team on Discord.</p></div><div className="contactActions"><a className="primaryButton" href="/services">View services ↑</a><a className="discordButton" href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noopener noreferrer">Join the UMS Discord <span aria-hidden="true">↗</span></a></div></section>

    <footer><a href="/"><strong>UMS</strong><span>UNMATCHED SERVICES</span></a><p>UMS is fan-made and is not affiliated with or endorsed by Torn City.</p><div className="footerLinks"><a href="/privacy">Privacy Policy</a><a href="/eula">EULA / Terms</a><a href="/">Back to top ↑</a></div></footer>
    <div className="ownerAccess"><OwnerAdminLink /></div>
  </main>;
}
