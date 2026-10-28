"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs, orderBy, query, updateDoc, doc } from "firebase/firestore";
import { auth, db, firebaseConfigured } from "../../lib/firebase";

const OWNER_UID = process.env.NEXT_PUBLIC_UMS_OWNER_UID || "";
const statuses = [
  ["pending_review", "Pending review"],
  ["declined", "Declined"],
  ["awaiting_payment", "Awaiting payment"],
  ["payment_confirmed", "Payment confirmed manually"],
  ["in_progress", "In progress"],
  ["completed", "Completed"],
];

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState([]);
  const [instructions, setInstructions] = useState({});
  const [statusEdits, setStatusEdits] = useState({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setOrders([]);
      setError("");
    });
  }, []);

  const isOwner = Boolean(user && OWNER_UID && user.uid === OWNER_UID);

  async function loadOrders() {
    if (!isOwner || !db) return;
    setBusy(true);
    setError("");
    try {
      const result = await getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc")));
      setOrders(result.docs.map((item) => ({ id: item.id, ...item.data() })));
    } catch (err) {
      console.error("UMS order loading failed", err);
      setError("Couldn't load orders. Check that Firestore rules contain your owner UID and have been published.");
    } finally {
      setBusy(false);
    }
  }

  async function login(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!auth) {
      setError("Firebase isn't configured. Add the Firebase web-app values in Vercel first.");
      return;
    }
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setPassword("");
    } catch {
      setError("Sign-in failed. Check your email/password and confirm Email/Password sign-in is enabled in Firebase.");
    } finally {
      setBusy(false);
    }
  }

  async function saveOrder(order) {
    if (!isOwner || !db) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const nextStatus = statusEdits[order.id] || order.status;
      const paymentInstructions = instructions[order.id] ?? order.paymentInstructions ?? "";
      await updateDoc(doc(db, "orders", order.id), {
        status: nextStatus,
        paymentInstructions,
        updatedAt: new Date(),
      });
      setMessage("Order updated. Payment is only marked confirmed when you select that status manually.");
      await loadOrders();
    } catch (err) {
      console.error("UMS order update failed", err);
      setError("Couldn't update this order. Check the Firestore owner UID rule and published rules.");
    } finally {
      setBusy(false);
    }
  }

  if (!firebaseConfigured) return <main className="workflowPage"><section className="workflowCard"><p className="eyebrow">OWNER AREA</p><h1>Admin <em>login.</em></h1><p>Firebase web configuration must be added to the Vercel environment before the dashboard can be used.</p><Link className="primaryButton" href="/">Back to UMS</Link></section></main>;

  return <main className="workflowPage">
    <header className="workflowHeader"><Link className="workflowBrand" href="/">UMS<span>.</span><small>OWNER CONTROL CENTRE</small></Link><Link className="workflowBack" href="/">← Public site</Link></header>
    <section className="workflowCard adminCard">
      <p className="eyebrow">PRIVATE OWNER AREA</p>
      <h1>Order <em>control.</em></h1>
      {!user ? <form className="orderForm" onSubmit={login}>
        <p>Sign in with the owner account created in Firebase Authentication.</p>
        <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="username" /></label>
        <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></label>
        <button className="primaryButton formSubmit" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in →"}</button>
      </form> : !isOwner ? <div className="workflowNotice"><strong>This account isn't the configured owner.</strong><p>Sign out and use the owner account. The dashboard checks the owner UID, and Firestore rules must independently enforce it.</p><button className="secondaryButton" onClick={() => signOut(auth)}>Sign out</button></div> : <>
        <div className="adminToolbar"><p>Signed in as the configured owner.</p><button className="secondaryButton" onClick={() => signOut(auth)}>Sign out</button></div>
        <button className="primaryButton" onClick={loadOrders} disabled={busy}>{busy ? "Loading…" : "Refresh orders ↻"}</button>
        {message && <p className="formSuccess" role="status">{message}</p>}
        {error && <p className="formError" role="alert">{error}</p>}
        <div className="adminOrders">
          {orders.length === 0 ? <p className="emptyOrders">No orders loaded yet. Select “Refresh orders” to check the queue.</p> : orders.map((order) => <article className="adminOrder" key={order.id}>
            <div className="adminOrderTop"><div><small>{order.id.slice(-8).toUpperCase()}</small><h2>{order.serviceTitle}</h2></div><span className={"statusPill status-" + order.status}>{(statuses.find(([value]) => value === order.status) || [order.status, order.status]).[1]}</span></div>
            <p><strong>Player:</strong> {order.tornUsername}{order.tornId ? " (ID " + order.tornId + ")" : ""}</p>
            <p><strong>Plan:</strong> {order.plan}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Discord:</strong> {order.contactDiscord}</p>
            {order.details && <p><strong>Details:</strong> {order.details}</p>}
            <label>Status<select value={statusEdits[order.id] ?? order.status} onChange={(event) => setStatusEdits((current) => ({ ...current, [order.id]: event.target.value }))}>{statuses.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            <label>Payment instructions<textarea rows={3} value={instructions[order.id] ?? order.paymentInstructions ?? ""} onChange={(event) => setInstructions((current) => ({ ...current, [order.id]: event.target.value }))} placeholder="Add payment instructions after accepting the order." /></label>
            <button className="primaryButton" onClick={() => saveOrder(order)} disabled={busy}>Save order changes</button>
          </article>)}
        </div>
      </>}
      {error && !user && <p className="formError" role="alert">{error}</p>}
    </section>
    <footer className="workflowFooter"><Link href="/">Back to UMS</Link><Link href="/privacy">Privacy Policy</Link></footer>
  </main>;
}
