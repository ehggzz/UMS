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

  return (
    <Link
      className="topCta"
      href="/admin"
      aria-label={isOwner ? "Open owner admin panel" : "Owner login"}
    >
      {isOwner ? "Owner panel" : "Owner login"} <span>↗</span>
    </Link>
  );
}
