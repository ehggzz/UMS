const ORDER_LINKS = {
  losses: "", escapes: "", bounties: "", mercenaries: "",
  bountyReveals: "", loadoutReveals: "", battlestats: "", detectiveAgency: ""
};

const services = [
  { id:"losses", icon:"✦", title:"Losses", intro:"Choose the plan that suits your needs.", accent:"orange", plans:[
    {name:"Standard Plan",price:"$400,000",unit:"per loss",detail:"$350,000 to the loss provider · $50,000 UMS fee"},
    {name:"Priority Plan",price:"$450,000",unit:"per loss",detail:"$400,000 to the loss provider · $50,000 UMS fee",featured:true}
  ]},
  { id:"escapes", icon:"↗", title:"Escapes", intro:"Escape service when you need it.", accent:"blue", plans:[
    {name:"Escape",price:"$600,000",unit:"per escape",detail:"$525,000 to the escape provider · $75,000 UMS fee"}
  ]},
  { id:"bounties", icon:"◎", title:"Bounty Placement", intro:"Get a bounty listed with our placement service.", accent:"red", plans:[
    {name:"Bounty placement",price:"Bounty + listing fee",unit:"+ $150,000 per slot",detail:"$100,000 to the bounty placer · $50,000 UMS fee per slot"}
  ]},
  { id:"mercenaries", icon:"⬡", title:"Mercenary Services", intro:"Select the tier that matches the mercenary's merits.", accent:"purple", plans:[
    {name:"Standard",price:"$1,500,000",unit:"per hit · 0–4 merits"},
    {name:"Advanced",price:"$2,000,000",unit:"per hit · 5–9 merits"},
    {name:"Premium",price:"$2,500,000",unit:"per hit · 10 merits"},
    {name:"Elite",price:"$3,000,000+",unit:"per hit · 10 merits + Stricken",detail:"Custom pricing"}
  ],note:"UMS receives 10%; the remainder goes to the mercenary."},
  { id:"bounty-reveals", icon:"⌖", title:"Bounty Reveals", intro:"Reveal bounty information.", accent:"red", plans:[
    {name:"Bounty reveal",price:"$5,500,000",detail:"$5,100,000 to the revealer · $400,000 UMS fee"}
  ]},
  { id:"loadout-reveals", icon:"▤", title:"Loadout Reveals", intro:"Get a loadout revealed.", accent:"blue", plans:[
    {name:"Loadout reveal",price:"$1,000,000",detail:"$900,000 to the agent · $100,000 UMS fee"}
  ]},
  { id:"battlestats", icon:"⌁", title:"Battlestat Reveals", intro:"Choose a full or partial spy.", accent:"green", plans:[
    {name:"Full Spy",price:"$3,500,000",detail:"$3,250,000 to the spy · $250,000 UMS fee"},
    {name:"Partial Spy",price:"$2,000,000",detail:"$1,900,000 to the spy · $100,000 UMS fee"}
  ]},
  { id:"detective-agency", icon:"⌕", title:"Detective Agency Services", intro:"Research and information services.", accent:"purple", plans:[
    {name:"References",price:"$1,500,000",detail:"$1,410,000 to the agent · $90,000 UMS fee"},
    {name:"Flight Delay",price:"$15,000,000",detail:"$14,100,000 to the agent · $900,000 UMS fee"},
    {name:"Friend or Foe Reveal",price:"$24,000,000",detail:"$23,100,000 to the agent · $900,000 UMS fee"}
  ]}
];

function OrderButton({ serviceId }) {
  const href = ORDER_LINKS[serviceId] || "#contact";
  return <a className="orderButton" href={href}>{ORDER_LINKS[serviceId] ? "Order service" : "How to order"}<span>↗</span></a>;
}

export default function Home() {
  return <main>
    <header className="topbar">
      <a className="brand" href="#home"><img src="/ums-logo.svg" alt="UMS — Unmatched Services" /><span>UNMATCHED<br/>SERVICES</span></a>
      <nav aria-label="Main navigation"><a href="#services">Services</a><a href="#how-it-works">How it works</a><a href="#contact">Contact</a></nav>
      <a className="topCta" href="#services">Browse services <span>→</span></a>
    </header>

    <section className="hero" id="home">
      <div className="heroContent">
        <p className="eyebrow"><i/> TORN CITY COMMUNITY SERVICES</p>
        <h1>Services without<br/><em>the guesswork.</em></h1>
        <p className="heroCopy">Clear prices. Straightforward service options. One place to find what you need in Torn City.</p>
        <a className="primaryButton" href="#services">Explore services <span>↓</span></a>
        <small>UMS · UNMATCHED SERVICES</small>
      </div>
      <div className="heroArt" aria-hidden="true"><div className="rings"/><strong>UMS<span>.</span></strong><label>BUILT FOR THE<br/>TORN CITY COMMUNITY</label></div>
    </section>

    <section className="trustStrip" id="how-it-works">
      <div><b>◈</b><strong>Clear pricing</strong><p>Know the price before you order.</p></div>
      <div><b>↗</b><strong>Multiple services</strong><p>Combat, intel and agency services.</p></div>
      <div><b>◎</b><strong>Simple to browse</strong><p>Find what you need quickly.</p></div>
    </section>

    <section className="servicesSection" id="services">
      <div className="sectionHeading"><p className="eyebrow">THE SERVICE DIRECTORY</p><h2>Find your <em>service.</em></h2><p>Browse our current services and pricing below.</p></div>
      <div className="serviceGrid">
        {services.map((service,index)=><article className={`serviceCard ${service.accent}`} id={service.id} key={service.id}>
          <div className="cardTop"><div className="serviceIcon">{service.icon}</div><span>{String(index+1).padStart(2,"0")}</span></div>
          <h3>{service.title}</h3><p className="intro">{service.intro}</p>
          <div className="priceList">{service.plans.map(plan=><div className="priceRow" key={plan.name}>
            <div className="planName">{plan.name}{plan.featured && <mark>PRIORITY</mark>}</div>
            <strong>{plan.price}</strong>{plan.unit && <small>{plan.unit}</small>}{plan.detail && <p>{plan.detail}</p>}
          </div>)}</div>
          {service.note && <p className="note">{service.note}</p>}
          <OrderButton serviceId={service.id}/>
        </article>)}
      </div>
      <p className="priceNote">Prices are shown in in-game dollars unless stated otherwise. Custom services may require confirmation.</p>
    </section>

    <section className="contactPanel" id="contact"><div className="contactMark">UMS<span>.</span></div><div><p className="eyebrow">READY WHEN YOU ARE</p><h2>Need a service?</h2><p>Ordering links and contact details will be added here once they're confirmed.</p></div><a className="primaryButton" href="#services">View pricing ↑</a></section>

    <footer><a href="#home"><strong>UMS</strong><span>UNMATCHED SERVICES</span></a><p>UMS is fan-made and is not affiliated with or endorsed by Torn City.</p><a href="#home">Back to top ↑</a></footer>
  </main>;
}
