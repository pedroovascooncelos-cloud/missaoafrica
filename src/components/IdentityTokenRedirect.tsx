"use client";

import { useEffect } from "react";

const IDENTITY_TOKENS = ["invite_token", "recovery_token", "confirmation_token"];

export function IdentityTokenRedirect() {
  useEffect(() => {
    const { hash, pathname } = window.location;

    if (!hash) {
      return;
    }

    const hasIdentityToken = IDENTITY_TOKENS.some((token) => hash.includes(token));
    if (!hasIdentityToken) {
      return;
    }

    const isOnAdmin =
      pathname === "/admin" || pathname === "/admin/" || pathname === "/admin/index.html";

    if (isOnAdmin) {
      return;
    }

    window.location.href = `/admin/index.html${hash}`;
  }, []);

  return null;
}
