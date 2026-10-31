export const metadata = {
  title: "Events — UMS",
  description: "Confirmed Unmatched Services events and event details."
};

export default function EventsPage() {
  return <main className="workflowPage eventsPage">
    <header className="topbar">
      <a className="brand" href="/"><img src="/ums-logo.svg" alt="UMS — Unmatched Services" /><span>UNMATCHED<br/>SERVICES</span></a>
      <nav aria-label="Main navigation"><a href="/services">Services</a><a href="/events" aria-current="page">Events</a><a href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noopener noreferrer">Contact</a></nav>
      <a className="topCta" href="/account">My account <span>→</span></a>
    </header>
    <section className="eventsIntro">
      <p className="eyebrow">UMS COMMUNITY</p>
      <h1>Events and <em>updates.</em></h1>
      <p>Confirmed events and their details will be listed here as they’re announced.</p>
    </section>
    <section className="eventTbc">
      <span className="eventIcon" aria-hidden="true">◈</span>
      <div><p className="eyebrow">EVENT LISTINGS</p><h2>Upcoming events</h2><p>Event dates and information are being confirmed. Check back here for updates, or join the UMS Discord for announcements.</p></div>
      <a className="discordButton" href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noopener noreferrer">Join the UMS Discord <span aria-hidden="true">↗</span></a>
    </section>
    <p className="eventsBack"><a href="/">← Back to UMS home</a></p>
    <footer className="workflowFooter"><a href="/privacy">Privacy Policy</a><a href="/eula">EULA / Terms</a><a href="/">UMS home</a></footer>
  </main>;
}
