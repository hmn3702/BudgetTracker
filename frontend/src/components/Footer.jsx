// src/components/Footer.jsx
import React from "react";

const defaultLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

export default function Footer({
  brand = "Budget Tracker",
  links = defaultLinks,
  className = "",
}) {
  return (
    <footer className={`py-10 border-t bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} {brand}. All rights reserved.
        </div>

        <nav className="flex gap-6 text-sm text-gray-600">
          {links.map((l) => (
            <a key={l.label} className="hover:text-gray-900" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
