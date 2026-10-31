"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db, firebaseConfigured } from "../../lib/firebase";

const statusLabels = {
  pending_review: "Awaiting review",
  declined: "Declined",
  awaiting_payment: "Payment due",
  payment_confirmed: "Payment confirmed",
  in_progress: "In progress",
  completed: "Completed"
};

function submittedDate(order) {
  const date = order.createdAt && typeof order.createdAt.toDate === "function" ? order.createdAt.toDate() : null;
  return date ? date.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "Date unavailable";
}

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [mode, setMode] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!auth) {
      setAuthReady(true);
      return;
    }
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setAuthReady(true);
      setOrders([]);
    });
  }, []);

  useEffect(() => {
    if (!user || !db) return undefined;
    let active = true;
    setOrdersLoading(true);
    getDocs(query(collection(db, "orders"), where("userId", "==", user.uid)))
      .then((snapshot) => {
        if (!active) return;
        const items = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
        items.sort((a, b) => {
          const aDate = a.createdAt && typeof a.createdAt.toMillis === "function" ? a.createdAt.toMillis() : 0;
          const bDate = b.createdAt && typeof b.createdAt.toMillis === "function" ? b.createdAt.toMillis() : 0;
          return bDate - aDate;
        });
        setOrders(items);
      })
      .catch((loadError) => {
        console.error("UMS account order loading failed", loadError);
        if (active) setError("We couldn't load your orders just now. Please try again shortly.");
      })
      .finally(() => {
        if (active) setOrdersLoading(false);
      });
    return () => { active = false; };
  }, [user]);

  async function submitAuth(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!auth) {
      setError("Account sign-in isn't available until Firebase is configured.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "create") {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
        setMessage("Your account is ready. New requests submitted while signed in will appear here.");
      } else if (mode === "reset") {
        await sendPasswordResetEmail(auth, email.trim());
        setMessage("If an account exists for that email, a password reset link has been sent.");
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      setPassword("");
    } catch (authError) {
      console.error("UMS account sign-in failed", authError);
      setError(mode === "create"
        ? "We couldn't create the account. The email may already be in use, or sign-up may need to be enabled."
        : mode === "reset"
          ? "We couldn't send a reset email. Check the address and try again."
          : "Sign-in failed. Check your email and password, then try again.");
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    setError("");
    setMessage("");
    if (auth) await signOut(auth);
  }

  return <main className="workflowPage accountPage">
    <header className="topbar">
      <a className="brand" href="/"><img src="/ums-logo.svg" alt="UMS — Unmatched Services" /><span>UNMATCHED<br/>SERVICES</span></a>
      <nav aria-label="Main navigation"><a href="/services">Services</a><a href="/events">Events</a><a href="/account" aria-current="page">Account</a><a href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noopener noreferrer">Contact</a></nav>
      <a className="topCta" href="/services">Browse services <span>→</span></a>
    </header>
    <section className="accountIntro">
      <p className="eyebrow">MEMBER AREA</p>
      <h1>Your UMS <em>account.</em></h1>
      <p>Sign in to follow your service requests and payment progress.</p>
    </section>
    {!firebaseConfigured ? <section className="workflowCard accountCard"><div className="workflowNotice"><strong>Account setup is in progress</strong><p>The account area is waiting for the site's Firebase connection to be configured.</p></div><a className="discordButton" href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noopener noreferrer">Contact UMS on Discord <span aria-hidden="true">↗</span></a></section>
    : !authReady ? <section className="workflowCard accountCard"><p>Checking your account…</p></section>
    : !user ? <section className="workflowCard accountCard">
      <p className="eyebrow">{mode === "create" ? "CREATE AN ACCOUNT" : mode === "reset" ? "RESET PASSWORD" : "WELCOME BACK"}</p>
      <h2>{mode === "create" ? "Join UMS." : mode === "reset" ? "Reset your password." : "Sign in."}</h2>
      <form className="orderForm" onSubmit={submitAuth}>
        <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label>
        {mode !== "reset" && <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required autoComplete={mode === "create" ? "new-password" : "current-password"} /></label>}
        {error && <p className="formError" role="alert">{error}</p>}
        {message && <p className="formSuccess" role="status">{message}</p>}
        <button className="primaryButton formSubmit" type="submit" disabled={busy}>{busy ? "Please wait…" : mode === "create" ? "Create account →" : mode === "reset" ? "Send reset link →" : "Sign in →"}</button>
      </form>
      <div className="accountLinks">
        {mode === "signIn" && <><button type="button" onClick={() => { setMode("create"); setError(""); setMessage(""); }}>Create an account</button><button type="button" onClick={() => { setMode("reset"); setError(""); setMessage(""); }}>Forgot password?</button></>}
        {mode !== "signIn" && <button type="button" onClick={() => { setMode("signIn"); setError(""); setMessage(""); }}>Back to sign in</button>}
      </div>
      <p className="accountFinePrint">Requests submitted while signed in will appear in this account. Guest requests made before signing in can’t be linked automatically.</p>
    </section>
    : <section className="accountCard accountDashboard">
      <div className="accountDashboardHeader"><div><p className="eyebrow">SIGNED IN</p><h2>{user.email}</h2><p>Your service requests and their latest status.</p></div><button className="secondaryButton" onClick={handleSignOut}>Sign out</button></div>
      {error && <p className="formError" role="alert">{error}</p>}
      {ordersLoading ? <p className="accountEmpty">Loading your requests…</p>
      : orders.length === 0 ? <div className="accountEmpty"><h3>No account-linked orders yet</h3><p>Requests you submit while signed in will show here. Guest requests from before you created an account aren’t linked automatically.</p><Link className="primaryButton" href="/services">Browse services →</Link></div>
      : <div className="accountOrderList">{orders.map((order) => <article className="accountOrder" key={order.id}>
        <div className="accountOrderHeader"><div><small>UMS-{order.id.slice(-8).toUpperCase()}</small><h3>{order.serviceTitle}</h3></div><span className={"statusPill status-" + order.status}>{statusLabels[order.status] || order.status}</span></div>
        <p><strong>Plan:</strong> {order.plan}</p><p><strong>Quantity:</strong> {order.quantity}</p><p><strong>Submitted:</strong> {submittedDate(order)}</p>
        {order.status === "awaiting_payment" && order.paymentInstructions && <div className="workflowNotice"><strong>Payment instructions</strong><p>{order.paymentInstructions}</p><small>Only pay using instructions provided by UMS for this request.</small></div>}
        {order.status === "payment_confirmed" && <p className="accountPaymentStatus">Payment confirmed manually by UMS.</p>}
      </article>)}</div>}
    </section>}
    <footer className="workflowFooter"><Link href="/services">Services</Link><Link href="/events">Events</Link><Link href="/privacy">Privacy Policy</Link><Link href="https://discord.gg/EBXEkRPABG" target="_blank" rel="noreferrer">UMS Discord ↗</Link></footer>
  </main>;
}
