"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, firebaseConfigured, firebaseConfigMissing } from "../../lib/firebase";

const services = [
  { id: "losses", title: "Losses", plans: ["Standard Plan — $400,000 per loss", "Priority Plan — $450,000 per loss"] },
  { id: "escapes", title: "Escapes", plans: ["Escape — $600,000 per escape"] },
  { id: "bounties", title: "Bounty Placement", plans: ["Bounty placement — bounty + listing fee + $150,000 per slot"] },
  { id: "mercenaries", title: "Mercenary Services", plans: ["Standard — $1,500,000 per hit", "Advanced — $2,000,000 per hit", "Premium — $2,500,000 per hit", "Elite — $3,000,000+ per hit"] },
  { id: "bounty-reveals", title: "Bounty Reveals", plans: ["Bounty reveal — $5,500,000"] },
  { id: "loadout-reveals", title: "Loadout Reveals", plans: ["Loadout reveal — $1,000,000"] },
  { id: "battlestats", title: "Battlestat Reveals", plans: ["Full Spy — $3,500,000", "Partial Spy — $2,000,000"] },
  { id: "detective-agency", title: "Detective Agency Services", plans: ["References — $1,500,000", "Flight Delay — $15,000,000", "Friend or Foe Reveal — $24,000,000"] },
  { id: "embargo", title: "Embargo", plans: ["Embargo — $4,750,000"] },
  { id: "productivity-boost", title: "Company Productivity Boost", plans: ["Productivity boost — $32,000,000"] },
  { id: "meditation", title: "Meditation — True Level Reveal", plans: ["True level reveal — $103,000,000"] },
  { id: "property-destruction", title: "Property Destruction", plans: ["Property destruction — $2,000,000 (split to be confirmed)"] },
];

export default function OrderPage() {
  const [serviceId, setServiceId] = useState("losses");
  const [plan, setPlan] = useState("");
  const [tornUsername, setTornUsername] = useState("");
  const [tornId, setTornId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [details, setDetails] = useState("");
  const [contactDiscord, setContactDiscord] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [orderRef, setOrderRef] = useState("");

  const selectedService = services.find((service) => service.id === serviceId) || services[0];

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    if (requested && services.some((service) => service.id === requested)) setServiceId(requested);
  }, []);

  useEffect(() => {
    setPlan(selectedService.plans[0] || "");
  }, [serviceId]); // eslint-disable-line react-hooks/exhaustive-deps

  async function submitOrder(event) {
    event.preventDefault();
    setError("");
    if (!firebaseConfigured || !db) {
      setError("Ordering is not connected yet. Please try again later or contact UMS on Discord.");
      return;
    }
    if (!agreed) {
      setError("Please confirm that the order is a request for review, not an automatic booking.");
      return;
    }

    setBusy(true);
    try {
      const doc = await addDoc(collection(db, "orders"), {
        serviceId,
        serviceTitle: selectedService.title,
        plan,
        tornUsername: tornUsername.trim(),
        tornId: tornId.trim(),
        quantity: Number(quantity),
        details: details.trim(),
        contactDiscord: contactDiscord.trim(),
        status: "pending_review",
        createdAt: serverTimestamp(),
      });
      setOrderRef("UMS-" + doc.id.slice(-8).toUpperCase());
    } catch (err) {
      console.error("UMS order submission failed", err);
      setError("We couldn't submit your request. Please try again in a moment or contact UMS on Discord.");
    } finally {
      setBusy(false);
    }
  }

  return <main className="workflowPage">
    <header className="workflowHeader">
      <Link className="workflowBrand" href="/">UMS<span>.</span><small>UNMATCHED SERVICES</small></Link>
      <Link className="workflowBack" href="/">← Back to services</Link>
    </header>
    <section className="workflowCard">
      {orderRef ? <>
        <p className="eyebrow">REQUEST RECEIVED</p>
        <h1>You're in the <em>queue.</em></h1>
        <p>Your request has been submitted for owner review. It is not yet accepted and no payment is due at this stage.</p>
        <div className="orderReference"><small>YOUR ORDER REFERENCE</small><strong>{orderRef}</strong></div>
        <p>Keep this reference for your records. UMS will review the request and provide payment instructions if it is accepted.</p>
        <Link className="primaryButton" href="/">Return to UMS ↗</Link>
      </> : <>
        <p className="eyebrow">UMS SERVICE REQUEST</p>
        <h1>Request a <em>service.</em></h1>
        <p className="workflowLead">Send your request to UMS for review. This does not automatically accept your order, and you should not pay until UMS has accepted it and provided instructions.</p>
        {!firebaseConfigured && <div className="workflowNotice"><strong>Setup still in progress</strong><p>The website is waiting for its Firebase environment variables. The form won't submit until the connection is configured.</p><small>Missing: {firebaseConfigMissing.join(", ")}</small></div>}
        <form className="orderForm" onSubmit={submitOrder}>
          <label>Service
            <select value={serviceId} onChange={(event) => setServiceId(event.target.value)} required>
              {services.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}
            </select>
          </label>
          <label>Plan / service option
            <select value={plan} onChange={(event) => setPlan(event.target.value)} required>
              {selectedService.plans.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <div className="formColumns">
            <label>Torn username <span>*</span>
              <input value={tornUsername} onChange={(event) => setTornUsername(event.target.value)} maxLength={40} required autoComplete="off" />
            </label>
            <label>Torn ID (if known)
              <input value={tornId} onChange={(event) => setTornId(event.target.value)} maxLength={20} inputMode="numeric" autoComplete="off" />
            </label>
          </div>
          <label>Quantity
            <input type="number" min="1" max="50" step="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} required />
            <small>For services where quantity doesn't apply, leave this at 1.</small>
          </label>
          <label>Order details
            <textarea value={details} onChange={(event) => setDetails(event.target.value)} maxLength={2000} rows={4} placeholder="Add targets, requirements, timings or other details needed for this service." />
          </label>
          <label>Discord contact <span>*</span>
            <input value={contactDiscord} onChange={(event) => setContactDiscord(event.target.value)} maxLength={100} required placeholder="Your Discord username" autoComplete="off" />
          </label>
          <label className="agreementCheck"><input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} required /><span>I understand this is a request for review. UMS must accept it and provide payment instructions before I pay.</span></label>
          {error && <p className="formError" role="alert">{error}</p>}
          <button className="primaryButton formSubmit" type="submit" disabled={busy || !firebaseConfigured}>{busy ? "Submitting…" : "Submit request →"}</button>
          <p className="formFinePrint">Please only include information needed to arrange your Torn City service. Don't enter passwords or account security details.</p>
        </form>
      </>}
    </section>
    <footer className="workflowFooter"><Link href="/privacy">Privacy Policy</Link><Link href="/eula">EULA / Terms</Link><Link href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noreferrer">UMS Discord ↗</Link></footer>
  </main>;
}
