"use client";

import { useMemo, useState } from "react";
import OwnerAdminLink from "../components/OwnerAdminLink";

const achievements = [
  { name:"Bouncer", type:"Medal", category:"Defends won", requirement:"Win 50 defends", support:"direct", services:["losses"], explanation:"With UMS Losses, another player attacks you and deliberately loses. The resulting defence win is credited to your account." },
  { name:"Brick wall", type:"Medal", category:"Defends won", requirement:"Win 250 defends", support:"direct", services:["losses"], explanation:"UMS Losses can help build your defence-win count: the customer is attacked and the attacker deliberately loses." },
  { name:"Turtle", type:"Medal", category:"Defends won", requirement:"Win 500 defends", support:"direct", services:["losses"], explanation:"UMS Losses can contribute defence wins towards this milestone. Progress is credited to the customer being attacked." },
  { name:"Solid as a Rock", type:"Medal", category:"Defends won", requirement:"Win 2,500 defends", support:"direct", services:["losses"], explanation:"UMS Losses can contribute qualifying defence wins towards this milestone." },
  { name:"Fortress", type:"Medal", category:"Defends won", requirement:"Win 10,000 defends", support:"direct", services:["losses"], explanation:"UMS Losses can contribute qualifying defence wins towards this milestone." },
  { name:"Self Defense", type:"Honour", category:"Defends won", requirement:"Win 50 defends", support:"direct", services:["losses"], explanation:"A qualifying defence win is credited when another player attacks you and loses. UMS Losses is designed to provide this type of progression." },
  { name:"007", type:"Honour", category:"Attacks and defends", requirement:"Win 1,000 attacks and 1,000 defends", support:"direct", services:["losses"], explanation:"UMS Losses can support both parts of this requirement: buy losses where you are the attacker to earn attack wins, and where you are the defender to earn defence wins. Both counters must reach 1,000." },
  { name:"Anti Social", type:"Medal", category:"Attacks won", requirement:"Win 50 attacks", support:"direct", services:["losses"], explanation:"Buy losses with you as the attacker: the other player attacks you and deliberately loses, giving your account the attack win." },
  { name:"Happy Slapper", type:"Medal", category:"Attacks won", requirement:"Win 250 attacks", support:"direct", services:["losses"], explanation:"Buy losses with you as the attacker: the other player attacks you and deliberately loses, crediting the attack win to your account." },
  { name:"Scar Maker", type:"Medal", category:"Attacks won", requirement:"Win 500 attacks", support:"direct", services:["losses"], explanation:"UMS Losses can provide qualifying attack wins when the customer is the attacker and the other player deliberately loses." },
  { name:"Going Postal", type:"Medal", category:"Attacks won", requirement:"Win 2,500 attacks", support:"direct", services:["losses"], explanation:"UMS Losses can provide qualifying attack wins when the customer is the attacker and the other player deliberately loses." },
  { name:"Somebody Call 911", type:"Medal", category:"Attacks won", requirement:"Win 10,000 attacks", support:"direct", services:["losses"], explanation:"UMS Losses can provide qualifying attack wins when the customer is the attacker and the other player deliberately loses." },
  { name:"Hired Gun", type:"Medal", category:"Bounties", requirement:"Collect 25 bounties", support:"indirect", services:["bounty-reveals"], explanation:"A bounty reveal can provide information to help you identify a bounty to pursue. You still need to collect it." },
  { name:"Bone Collector", type:"Medal", category:"Bounties", requirement:"Collect 100 bounties", support:"indirect", services:["bounty-reveals"], explanation:"Bounty information can help with target selection; the bounty collections must be credited to your account." },
  { name:"The Fett", type:"Medal", category:"Bounties", requirement:"Collect 500 bounties", support:"indirect", services:["bounty-reveals"], explanation:"Bounty reveals can assist your hunting decisions, but do not themselves collect bounties." },
  { name:"Bounty Hunter", type:"Honour", category:"Bounty hunting", requirement:"Collect 250 bounties", support:"indirect", services:["bounty-reveals"], explanation:"A reveal may help you find a bounty opportunity. You must successfully collect the bounties yourself." },
  { name:"Dead Or Alive", type:"Honour", category:"Bounty hunting", requirement:"Earn $10,000,000 from bounty hunting", support:"indirect", services:["bounty-reveals"], explanation:"Bounty information may help you choose opportunities. The bounty-hunting earnings must be yours." },
  { name:"Boom Headshot", type:"Medal", category:"Critical hits", requirement:"Deal 500 critical hits", support:"indirect", services:["battlestats","loadout-reveals"], explanation:"Opponent intelligence may help with combat preparation, but critical hits are determined in combat and are not guaranteed." },
  { name:"Pwned in the face", type:"Medal", category:"Critical hits", requirement:"Deal 2,500 critical hits", support:"indirect", services:["battlestats","loadout-reveals"], explanation:"Reveals can help with preparation only. The critical hits must occur in your own qualifying combat." },
  { name:"Lee Harvey Oswald", type:"Medal", category:"Critical hits", requirement:"Deal 10,000 critical hits", support:"indirect", services:["battlestats","loadout-reveals"], explanation:"Intelligence can help with preparation, but the qualifying critical hits must occur in your own combat." },
  { name:"Night Walker", type:"Honour", category:"Stealthed attacks", requirement:"Win 100 stealthed attacks", support:"indirect", services:["battlestats","loadout-reveals"], explanation:"Intelligence can help assess a target before an attack. The qualifying stealthed wins must be yours." },
  { name:"Bare", type:"Award", category:"Unarmoured combat", requirement:"Win 250 unarmoured attacks or defends", support:"can", services:["losses"], explanation:"Losses may help arrange the qualifying unarmoured fights. The relevant attacks or defends must meet Torn's unarmoured condition." },
  { name:"Ego Smashing", type:"Award", category:"Enemy escapes", requirement:"Have 50 enemies escape from you", support:"can", services:["losses"], explanation:"Could be worked towards through arranged combat where the opponent escapes rather than loses. Confirm the arrangement and game credit before ordering." },
  { name:"Underestimated", type:"Award", category:"Enemy escapes", requirement:"Have 250 enemies escape from you", support:"can", services:["losses"], explanation:"Could be worked towards through arranged combat where the opponent escapes rather than loses. Confirm the arrangement and game credit before ordering." },
  { name:"Run Forrest Run", type:"Award", category:"Enemy escapes", requirement:"Have 1,000 enemies escape from you", support:"can", services:["losses"], explanation:"Could be worked towards through arranged combat where the opponent escapes rather than loses. Confirm the arrangement and game credit before ordering." },
  { name:"Precision", type:"Award", category:"Critical hits", requirement:"Achieve 25 critical hits", support:"can", services:["losses"], explanation:"Arranged fights through Losses may provide opportunities to work towards critical-hit totals. Critical hits are chance-based and are not guaranteed." },
  { name:"50cal", type:"Award", category:"Critical hits", requirement:"Achieve 1,000 critical hits", support:"can", services:["losses"], explanation:"Arranged fights through Losses may provide opportunities to work towards critical-hit totals. Critical hits are chance-based and are not guaranteed." },
  { name:"Fury", type:"Award", category:"Combat hits", requirement:"Achieve 10,000 hits", support:"can", services:["losses"], explanation:"Repeated arranged fights may provide opportunities to build hit totals. Actual credit depends on the fight and Torn's tracking rules." },
  { name:"Flatline", type:"Award", category:"One-hit kills", requirement:"Achieve a one-hit kill", support:"can", services:["losses"], explanation:"An arranged fight may create an opportunity for a one-hit kill, but the required outcome cannot be guaranteed." },
  { name:"Pressure Point", type:"Award", category:"One-hit kills", requirement:"Achieve 100 one-hit kills", support:"can", services:["losses"], explanation:"Arranged fights may provide opportunities to work towards one-hit kills. The required outcome cannot be guaranteed." },
  { name:"Wham!", type:"Award", category:"Total damage", requirement:"Deal over 100,000 total damage", support:"can", services:["losses"], explanation:"Repeated arranged fights may provide opportunities to accumulate damage. Damage credit depends on the combat results." },
  { name:"Bam!", type:"Award", category:"Total damage", requirement:"Deal over 1,000,000 total damage", support:"can", services:["losses"], explanation:"Repeated arranged fights may provide opportunities to accumulate damage. Damage credit depends on the combat results." },
  { name:"Boom!", type:"Award", category:"Total damage", requirement:"Deal over 10,000,000 total damage", support:"can", services:["losses"], explanation:"Repeated arranged fights may provide opportunities to accumulate damage. Damage credit depends on the combat results." },
  { name:"Kapow!", type:"Award", category:"Total damage", requirement:"Deal over 100,000,000 total damage", support:"can", services:["losses"], explanation:"Repeated arranged fights may provide opportunities to accumulate damage. Damage credit depends on the combat results." },
  { name:"Surplus", type:"Award", category:"Special ammunition", requirement:"Use 100 special-ammo rounds", support:"can", services:["losses"], explanation:"Losses may provide arranged combat opportunities to use special ammunition. Ammunition use must be eligible and recorded by Torn." },
  { name:"Bandolier", type:"Award", category:"Special ammunition", requirement:"Use 1,000 special-ammo rounds", support:"can", services:["losses"], explanation:"Losses may provide arranged combat opportunities to use special ammunition. Ammunition use must be eligible and recorded by Torn." },
  { name:"Quartermaster", type:"Award", category:"Special ammunition", requirement:"Use 10,000 special-ammo rounds", support:"can", services:["losses"], explanation:"Losses may provide arranged combat opportunities to use special ammunition. Ammunition use must be eligible and recorded by Torn." },
  { name:"Maimed", type:"Award", category:"Ammunition types", requirement:"Use 2,500 Hollow Point rounds", support:"can", services:["losses"], explanation:"Arranged fights may provide opportunities to use the specified ammunition type. Check that the round is counted towards this award." },
  { name:"Marked", type:"Award", category:"Ammunition types", requirement:"Use 2,500 Tracer rounds", support:"can", services:["losses"], explanation:"Arranged fights may provide opportunities to use the specified ammunition type. Check that the round is counted towards this award." },
  { name:"Scorched", type:"Award", category:"Ammunition types", requirement:"Use 2,500 Incendiary rounds", support:"can", services:["losses"], explanation:"Arranged fights may provide opportunities to use the specified ammunition type. Check that the round is counted towards this award." },
  { name:"Penetrated", type:"Award", category:"Ammunition types", requirement:"Use 2,500 Piercing rounds", support:"can", services:["losses"], explanation:"Arranged fights may provide opportunities to use the specified ammunition type. Check that the round is counted towards this award." },
  { name:"Dragon's Breath", type:"Award", category:"Ammunition types", requirement:"Use a 12 Gauge Incendiary round", support:"can", services:["losses"], explanation:"An arranged fight may provide an opportunity to use this round. Confirm the weapon and ammunition combination before ordering." },
  { name:"Spray And Pray", type:"Award", category:"Rounds fired", requirement:"Fire 1,000 rounds", support:"can", services:["losses"], explanation:"Arranged fights may provide opportunities to fire rounds and build this total. Actual credit depends on combat tracking." },
  { name:"Two Halves Make A Hole", type:"Award", category:"Rounds fired", requirement:"Fire 10,000 rounds", support:"can", services:["losses"], explanation:"Arranged fights may provide opportunities to fire rounds and build this total. Actual credit depends on combat tracking." },
  { name:"Lead Salad", type:"Award", category:"Rounds fired", requirement:"Fire 100,000 rounds", support:"can", services:["losses"], explanation:"Arranged fights may provide opportunities to fire rounds and build this total. Actual credit depends on combat tracking." },
  { name:"Peppered", type:"Award", category:"Rounds fired", requirement:"Fire 1,000,000 rounds", support:"can", services:["losses"], explanation:"Arranged fights may provide opportunities to fire rounds and build this total. Actual credit depends on combat tracking." },
  { name:"2800 Ft/S", type:"Award", category:"Weapon finishing hits", requirement:"100 finishing hits with rifles", support:"can", services:["losses"], explanation:"Losses may provide arranged fights to work towards weapon-specific finishing hits. The finishing blow must use the required weapon category." },
  { name:"Act of Faith", type:"Award", category:"Weapon finishing hits", requirement:"100 finishing hits with SMGs", support:"can", services:["losses"], explanation:"Losses may provide arranged fights to work towards weapon-specific finishing hits. The finishing blow must use the required weapon category." },
  { name:"Axe Wound", type:"Award", category:"Weapon finishing hits", requirement:"100 finishing hits with clubbing weapons", support:"can", services:["losses"], explanation:"Losses may provide arranged fights to work towards weapon-specific finishing hits. The finishing blow must use the required weapon category." },
  { name:"Cartridge Packer", type:"Award", category:"Weapon finishing hits", requirement:"100 finishing hits with shotguns", support:"can", services:["losses"], explanation:"Losses may provide arranged fights to work towards weapon-specific finishing hits. The finishing blow must use the required weapon category." },
  { name:"Leonidas", type:"Award", category:"Weapon finishing hits", requirement:"1 finishing hit with Kick", support:"can", services:["losses"], explanation:"Losses may provide arranged fights to work towards this finishing hit. Confirm the required finishing action before ordering." },
  { name:"Lend A Hand", type:"Award", category:"Weapon finishing hits", requirement:"100 finishing hits with machine guns", support:"can", services:["losses"], explanation:"Losses may provide arranged fights to work towards weapon-specific finishing hits. The finishing blow must use the required weapon category." },
  { name:"Pin Puller", type:"Award", category:"Weapon finishing hits", requirement:"100 finishing hits with temporary weapons", support:"can", services:["losses"], explanation:"Losses may provide arranged fights to work towards weapon-specific finishing hits. The finishing blow must use the required weapon category." },
  { name:"Machinist", type:"Award", category:"Weapon finishing hits", requirement:"100 finishing hits with mechanical weapons", support:"can", services:["losses"], explanation:"Losses may provide arranged fights to work towards weapon-specific finishing hits. The finishing blow must use the required weapon category." },
  { name:"Slasher", type:"Award", category:"Weapon finishing hits", requirement:"100 finishing hits with slashing weapons", support:"can", services:["losses"], explanation:"Losses may provide arranged fights to work towards weapon-specific finishing hits. The finishing blow must use the required weapon category." },
  { name:"Stumped", type:"Award", category:"Weapon finishing hits", requirement:"100 finishing hits with heavy artillery", support:"can", services:["losses"], explanation:"Losses may provide arranged fights to work towards weapon-specific finishing hits. The finishing blow must use the required weapon category." },
  { name:"The Stabbist", type:"Award", category:"Weapon finishing hits", requirement:"100 finishing hits with piercing weapons", support:"can", services:["losses"], explanation:"Losses may provide arranged fights to work towards weapon-specific finishing hits. The finishing blow must use the required weapon category." },
  { name:"Yours Says Replica...", type:"Award", category:"Weapon finishing hits", requirement:"100 finishing hits with pistols", support:"can", services:["losses"], explanation:"Losses may provide arranged fights to work towards weapon-specific finishing hits. The finishing blow must use the required weapon category." },
  { name:"Unarmed", type:"Award", category:"Weapon finishing hits", requirement:"100 finishing hits with fists or kick", support:"can", services:["losses"], explanation:"Losses may provide arranged fights to work towards this finishing-hit total. The finishing blow must use fists or kick." },
  { name:"War Machine", type:"Award", category:"Weapon finishing hits", requirement:"1,000 finishing hits in every category", support:"can", services:["losses"], explanation:"Losses may provide arranged fights to work towards each weapon-category finishing-hit total. Every category must meet its requirement." },
  { name:"Specialist", type:"Award", category:"Weapon experience", requirement:"Achieve 100% weapon XP on 25 different weapons", support:"can", services:["losses"], explanation:"Weapon XP farming through arranged Losses fights may help build weapon experience. The required 100% XP must be reached on 25 different weapons." }
];

const serviceOptions = [
  ["all","All services"],["losses","Losses"],["bounty-reveals","Bounty Reveals"],["battlestats","Battlestat Reveals"],["loadout-reveals","Loadout Reveals"]
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
        <span><i className="supportDot can"/> Can support</span>
        <span><i className="supportDot direct"/> Direct support</span>
      </div>
    </section>

    <section className="achievementFinder" aria-label="Filter achievements">
      <div className="achievementFilters">
        <label>Support type<select value={support} onChange={e=>setSupport(e.target.value)}><option value="all">All support</option><option value="direct">Direct support</option><option value="indirect">Indirect support</option><option value="can">Can support</option></select></label>
        <label>Achievement type<select value={type} onChange={e=>setType(e.target.value)}><option value="all">Medals &amp; honours</option><option value="Medal">Medals</option><option value="Honour">Honours</option></select></label>
        <label>UMS service<select value={service} onChange={e=>setService(e.target.value)}>{serviceOptions.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
        <label className="achievementSearch">Search<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search achievements..." /></label>
      </div>
      <div className="achievementResultsHeading"><strong>{filtered.length} {filtered.length===1?"achievement":"achievements"}</strong><button type="button" onClick={()=>{setSupport("all");setType("all");setService("all");setSearch("");}}>Clear filters ↺</button></div>
      <div className="achievementList">
        {filtered.map(item=><article className="achievementCard" key={item.name}>
          <div className="achievementCardTop"><div><span className="achievementType">{item.type} · {item.category}</span><h2>{item.name}</h2></div><span className={"supportTag "+item.support}>{item.support==="direct"?"Direct support":item.support==="can"?"Can support":"Indirect support"}</span></div>
          <p className="achievementRequirement">{item.requirement}</p>
          <p className="achievementExplanation">{item.explanation}</p>
          <div className="achievementServices"><small>RELATED UMS SERVICES</small><div>{item.services.map(id=><a key={id} href={"/services#"+id}>{id==="losses"?"Losses":id==="bounty-reveals"?"Bounty Reveals":id==="battlestats"?"Battlestat Reveals":"Loadout Reveals"} ↗</a>)}</div></div>
        </article>)}
        {filtered.length===0 && <div className="achievementEmpty"><h2>{support === "direct" ? "No direct support confirmed yet" : "No matches found"}</h2><p>{support === "direct" ? "We have not verified a UMS service that directly completes a customer’s medal or honour requirement. We would rather be accurate than promise progress that the game may not credit." : "Try changing your filters or search term."}</p></div>}
      </div>
      <aside className="achievementDisclaimer"><strong>Important — support is not a guarantee.</strong><p>Indirect support means a service may provide information or preparation that helps you pursue an achievement. “Can support” means arranged Losses may create opportunities to work towards the requirement, but the exact outcome, weapon, ammunition, escape or game-credit conditions must be met. No result is guaranteed. Always confirm the required setup before ordering.</p><p>Merits are the points awarded for completing qualifying milestones; medals and honours are the awards themselves. Losses can be arranged with you as the attacker or defender. The wider combat awards listed here are marked “Can support” where fights may provide opportunities to build progress; they are not promises that every requirement can be completed in every order.</p><small>Achievement requirements can change. Always check the current in-game requirement.</small></aside>
    </section>

    <section className="contactPanel"><div className="contactMark">UMS<span>.</span></div><div><p className="eyebrow">NEED A HAND?</p><h2>Find the right service.</h2><p>Browse the service directory or ask the UMS team if you need help choosing.</p></div><div className="contactActions"><a className="primaryButton" href="/services">View services ↑</a><a className="discordButton" href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noopener noreferrer">Join the UMS Discord ↗</a></div></section>
    <footer><a href="/"><strong>UMS</strong><span>UNMATCHED SERVICES</span></a><p>UMS is fan-made and is not affiliated with or endorsed by Torn City.</p><div className="footerLinks"><a href="/privacy">Privacy Policy</a><a href="/eula">EULA / Terms</a><a href="/">Back to home ↑</a></div></footer>
    <div className="ownerAccess"><OwnerAdminLink /></div>
  </main>;
}
