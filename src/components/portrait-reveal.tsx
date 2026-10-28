"use client";

import Image from "next/image";
import { useState } from "react";

import { site } from "~/data/site";

/**
 * Black-and-white portrait that fades to the colour original.
 *
 * Both layers share one box and one set of dimensions, so nothing moves while
 * the colour layer's opacity changes. The reveal is pure CSS (see `.portrait-*`
 * in globals.css): pointer hover on devices that have hover, keyboard focus,
 * and a tap-to-toggle on touch screens.
 */
export function PortraitReveal() {
  const [pinned, setPinned] = useState(false);

  return (
    <button
      type="button"
      className="portrait-btn"
      aria-pressed={pinned}
      aria-label={`Portrait of ${site.name}. Show the colour version`}
      onClick={() => {
        // Only touch screens need the toggle; with a mouse, hover does the job.
        if (window.matchMedia("(hover: none)").matches) setPinned((v) => !v);
      }}
    >
      <Image
        src="/images/portrait-bw.webp"
        alt=""
        width={1296}
        height={1214}
        priority
        sizes="(min-width: 1024px) 800px, 92vw"
        className="portrait-img"
      />
      <Image
        src="/images/portrait-color.webp"
        alt=""
        width={1296}
        height={1214}
        priority
        sizes="(min-width: 1024px) 800px, 92vw"
        className="portrait-img portrait-color"
      />
    </button>
  );
}
