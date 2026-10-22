/**
 * Program facts for the Online Full Stack page.
 * Every value here comes from the current errormakesclever.com page
 * (snapshot 2026-10-22). Anything unconfirmed is a visible "[NEEDS INPUT …]".
 */

export const program = {
  name: "EMC Full Stack Development Bootcamp with AI",
  shortName: "Online Full Stack",
  mode: "Live Online Program",

  /**
   * ⚠ The live page contradicts itself on duration:
   *   hero        → "4 Months +1 Month Internship"
   *   journey     → "invite-only 3-month immersive cohort-based program"
   *   internship  → "eligible for an 2 Month Internship"
   * The redesign uses the hero's values everywhere so the page is consistent.
   * Confirm with the program team and change only these two fields.
   */
  trainingMonths: 4,
  internshipMonths: 1,

  /** "Eligibility for Graduation" + certificate copy on the live page. */
  completionThreshold: "75%",

  /** "Pre-book your slot. We take only 25-50 candidates per batch" (live page). */
  batchSize: "25–50",

  price: {
    original: "₹62,999",
    current: "₹42,999",
    plan: "Full Access Plan",
  },

  languages: ["Tamil", "Online", "Job Ready"],
} as const;

export const duration = {
  training: `${program.trainingMonths}‑Month`,
  internship: `${program.internshipMonths}‑Month`,
  sentence: `${program.trainingMonths} months of live training + a ${program.internshipMonths}‑month internship`,
};

export const contact = {
  phone: "+91 6380085196",
  phoneHref: "tel:+916380085196",
  email: "enquiry@errormakesclever.com",
  emailHref: "mailto:enquiry@errormakesclever.com",
};

/** Header anchors — every target id exists on the page. */
export const nav = [
  { label: "Curriculum", href: "#curriculum" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faqs" },
];

