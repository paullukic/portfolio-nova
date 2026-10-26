// CLEARANCE section (ported from cyberpunk v2's certifications block) and the
// schooling / languages strip under the toolkit.

export const certs = [
  {
    id: "pentest-plus",
    title: "CompTIA PenTest+ path",
    issuer: "TryHackMe · Jan 2023",
    scope: "Learning path · pen testing & simulated attacks",
    link: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-BSH7Q3NKOE.png",
  },
  {
    id: "jr-pentester",
    title: "Jr. Penetration Tester path",
    issuer: "TryHackMe · Jan 2023",
    scope: "Learning path · web app & infrastructure security",
    link: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-A3HEPLUMZB.png",
  },
  {
    id: "advent-of-cyber-4",
    title: "Advent of Cyber 4",
    issuer: "TryHackMe · Dec 2022",
    scope: "24-day security challenge event",
    link: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-XDJTNADLJB.png",
  },
];

export const paxhax = {
  title: "PAXHAX",
  blurb:
    "Working notebook of penetration-testing exercises, tooling notes and responsible-disclosure write-ups.",
  bullets: [
    "Lab write-ups: web, network, AD, binary",
    "Tooling snippets: Burp, nmap, ffuf, hashcat",
    "Responsible disclosure log",
  ],
  link: "https://paxhax.notion.site/Ethical-Hacking-14421d1a2d3a45dfbd9fd4dce407f9ee",
};

/** Public TryHackMe profile (handle from Paul's GitHub README). */
export const tryhackme = { href: "https://tryhackme.com/p/paxhax", handle: "paxhax" };

/** Offensive toolkit, from cyberpunk v2's CYBERSEC_TOOLKIT block. */
export const offensiveToolkit = [
  "NMAP", "BURP", "FFUF", "DIRB", "NIKTO", "HYDRA", "NETCAT", "SUBLIST3R",
  "OSINT", "GOOGLE_DORKS", "BASH",
];

export const schooling = {
  title: "INFORMATION TECHNOLOGY TECHNICIAN",
  sub: "Secondary School Krupanj · graduated 2013",
};

export const spokenLanguages = {
  title: "SERBIAN — NATIVE",
  sub: "English — proficient · German — basic",
};
