"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebaseConfigured } from "../../lib/firebase";

const OWNER_UID = process.env.NEXT_PUBLIC_UMS_OWNER_UID || "";

export default function OwnerAdminLink() {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (!firebaseConfigured || !auth || !OWNER_UID) {
      setIsOwner(false);
      return;
    }

    return onAuthStateChanged(auth, (user) => {
      setIsOwner(Boolean(user && user.uid === OWNER_UID));
    });
  }, []);

  if (!isOwner) return null;

  return <Link className="topCta" href="/admin" aria-label="Open owner admin panel">Owner panel <span>↗</span></Link>;
}
