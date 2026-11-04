"use client";

import { useMemo, useState } from "react";
import OwnerAdminLink from "../components/OwnerAdminLink";

const achievements = [
  { name:"Anti Social", type:"Medal", category:"Attacks won", requirement:"Win 50 attacks", support:"indirect", services:["battlestats","loadout-reveals"], explanation:"Battlestat and loadout information can help you assess and prepare for an attack. The attack wins must still be yours." },
  { name:"Happy Slapper", type:"Medal", category:"Attacks won", requirement:"Win 250 attacks", support:"indirect", services:["battlestats","loadout-reveals"], explanation:"Revealed stats and loadouts can help with target assessment. UMS does not supply the wins themselves." },
  { name:"Scar Maker", type:"Medal", category:"Attacks won", requirement:"Win 500 attacks", support:"indirect", services:["battlestats","loadout-reveals"], explanation:"Use intelligence to make more informed attack decisions; the qualifying wins must be recorded on your account." },
  { name:"Going Postal", type:"Medal", category:"Attacks won", requirement:"Win 2,500 attacks", support:"indirect", services:["battlestats","loadout-reveals"], explanation:"Battlestat and loadout reveals can support preparation, but do not count as attack wins." },
  { name:"Somebody Call 911", type:"Medal", category:"Attacks won", requirement:"Win 10,000 attacks", support:"indirect", services:["battlestats","loadout-reveals"], explanation:"Intelligence can help you assess opponents. You must achieve the qualifying wins yourself." },
  { name:"Hired Gun", type:"Medal", category:"Bounties", requirement:"Collect 25 bounties", support:"indirect", services:["bounty-reveals"], explanation:"A bounty reveal can provide information to help you identify a bounty to pursue. You still need to collect it." },
  { name:"Bone Collector", type:"Medal", category:"Bounties", requirement:"Collect 100 bounties", support:"indirect", services:["bounty-reveals"], explanation:"Bounty information can help with target selection; the bounty collections must be credited to your account." },
  { name:"The Fett", type:"Medal", category:"Bounties", requirement:"Collect 500 bounties", support:"indirect", services:["bounty-reveals"], explanation:"Bounty reveals can assist your hunting decisions, but do not themselves collect bounties." },
  { name:"Bounty Hunter", type:"Honour", category:"Bounty hunting", requirement:"Collect 250 bounties", support:"indirect", services:["bounty-reveals"], explanation:"A reveal may help you find a bounty opportunity. You must successfully collect the bounties yourself." },
  { name:"Dead Or Alive", type:"Honour", category:"Bounty hunting", requirement:"Earn $10,000,000 from bounty hunting", support:"indirect", services:["bounty-reveals"], explanation:"Bounty information may help you choose opportunities. The bounty-hunting earnings must be yours." },
  { name:"Precision", type:"Honour", category:"Critical hits", requirement:"Achieve 25 critical hits", support:"indirect", services:["battlestats","loadout-reveals"], explanation:"Opponent intelligence can support attack preparation, but critical hits are determined in combat and are not guaranteed." },
  { name:"50 Cal", type:"Honour", category:"Critical hits", requirement:"Achieve 1,000 critical hits", support:"indirect", services:["battlestats","loadout-reveals"], explanation:"Reveals can help with preparation only. The critical hits must occur in your own qualifying combat." },
  { name:"Night Walker", type:"Honour", category:"Stealthed attacks", requirement:"Win 100 stealthed attacks", support:"indirect", services:["battlestats","loadout-reveals"], explanation:"Intelligence can help assess a target before an attack. The qualifying stealthed wins must be yours." }
];

const serviceOptions = [
  ["all","All services"],["bounty-reveals","Bounty Reveals"],["battlestats","Battlestat Reveals"],["loadout-reveals","Loadout Reveals"]
];

export default function AchievementsPage() {
  const [support,setSupport] = useState("all");
  const [type,setType] = useState("all");
  const [service,setService] = useState("all");
  const [search,setSearch] = useState("");
  const filtered = useMemo(() => achievements.filter(item =>
    (support === "all" || item.support === support) &&
    (type === "all" || item.type === type) &&
    (service === "all" || item.services.includes(service)) &&
    (item.name + " " + item.requirement + " " + item.category).toLowerCase().includes(search.toLowerCase())
  ),[support,type,service,search]);

  return <main>
    <header className="topbar">
      <a className="brand" href="/"><img src="/ums-logo.svg" alt="UMS — Unmatched Services" /><span>UNMATCHED<br/>SERVICES</span></a>
      <nav aria-label="Main navigation"><a href="/services">Services</a><a href="/achievements" aria-current="page">Achievement Finder</a><a href="/events">Events</a><a href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noopener noreferrer">Contact</a></nav>
      <a className="topCta" href="/services">View services <span>→</span></a>
    </header>

    <section className="achievementIntro">
      <p className="eyebrow">UMS · TORN CITY PROGRESSION</p>
      <h1>Achievement <em>Finder.</em></h1>
      <p>Find medals and honours that UMS services may help you work towards. Filter by support type, achievement type or service.</p>
      <div className="achievementLegend">
        <span><i className="supportDot indirect"/> Indirect support</span>
        <span><i className="supportDot direct"/> Direct support</span>
      </div>
    </section>

    <section className="achievementFinder" aria-label="Filter achievements">
      <div className="achievementFilters">
        <label>Support type<select value={support} onChange={e=>setSupport(e.target.value)}><option value="all">All support</option><option value="direct">Direct support</option><option value="indirect">Indirect support</option></select></label>
        <label>Achievement type<select value={type} onChange={e=>setType(e.target.value)}><option value="all">Medals &amp; honours</option><option value="Medal">Medals</option><option value="Honour">Honours</option></select></label>
        <label>UMS service<select value={service} onChange={e=>setService(e.target.value)}>{serviceOptions.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
        <label className="achievementSearch">Search<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search achievements..." /></label>
      </div>
      <div className="achievementResultsHeading"><strong>{filtered.length} {filtered.length===1?"achievement":"achievements"}</strong><button type="button" onClick={()=>{setSupport("all");setType("all");setService("all");setSearch("");}}>Clear filters ↺</button></div>
      <div className="achievementList">
        {filtered.map(item=><article className="achievementCard" key={item.name}>
          <div className="achievementCardTop"><div><span className="achievementType">{item.type} · {item.category}</span><h2>{item.name}</h2></div><span className={"supportTag "+item.support}>{item.support==="direct"?"Direct support":"Indirect support"}</span></div>
          <p className="achievementRequirement">{item.requirement}</p>
          <p className="achievementExplanation">{item.explanation}</p>
          <div className="achievementServices"><small>RELATED UMS SERVICES</small><div>{item.services.map(id=><a key={id} href={"/services#"+id}>{id==="bounty-reveals"?"Bounty Reveals":id==="battlestats"?"Battlestat Reveals":"Loadout Reveals"} ↗</a>)}</div></div>
        </article>)}
        {filtered.length===0 && <div className="achievementEmpty"><h2>{support === "direct" ? "No direct support confirmed yet" : "No matches found"}</h2><p>{support === "direct" ? "We have not verified a UMS service that directly completes a customer’s medal or honour requirement. We would rather be accurate than promise progress that the game may not credit." : "Try changing your filters or search term."}</p></div>}
      </div>
      <aside className="achievementDisclaimer"><strong>Important — support is not a guarantee.</strong><p>Indirect support means a service may provide information or preparation that helps you pursue an achievement. It does not complete the requirement or guarantee the result. Achievement progress is credited according to Torn's own game mechanics and the account performing the qualifying activity. Services that only benefit the service provider, or have no verified link to a customer's achievement progress, are not listed as customer support.</p><p>UMS keeps merit points separate from medals and honours. This finder currently lists verified medal and honour requirements with a plausible link to a UMS service; it does not claim that buying a service awards merit points.</p><small>Achievement requirements can change. Always check the current in-game requirement.</small></aside>
    </section>

    <section className="contactPanel"><div className="contactMark">UMS<span>.</span></div><div><p className="eyebrow">NEED A HAND?</p><h2>Find the right service.</h2><p>Browse the service directory or ask the UMS team if you need help choosing.</p></div><div className="contactActions"><a className="primaryButton" href="/services">View services ↑</a><a className="discordButton" href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noopener noreferrer">Join the UMS Discord ↗</a></div></section>
    <footer><a href="/"><strong>UMS</strong><span>UNMATCHED SERVICES</span></a><p>UMS is fan-made and is not affiliated with or endorsed by Torn City.</p><div className="footerLinks"><a href="/privacy">Privacy Policy</a><a href="/eula">EULA / Terms</a><a href="/">Back to home ↑</a></div></footer>
    <div className="ownerAccess"><OwnerAdminLink /></div>
  </main>;
}
