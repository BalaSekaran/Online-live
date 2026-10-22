# EMC Online Full Stack — redesigned landing page

Next.js (App Router) + Tailwind v4 page for the **EMC Full Stack Development Bootcamp with AI**,
rebuilt on the same design system as FutureStack (colours, type, buttons, cards, motion).
All copy comes from the current errormakesclever.com page; nothing is invented.

```bash
npm install
npm run dev        # http://localhost:3000
```

Set `NEXT_PUBLIC_APPLY_ENDPOINT` (see `.env.example`) to receive form submissions. Until it is set,
forms send nothing and show a "please call us" message.

## Where things live

| Path | What |
|---|---|
| `app/page.tsx` | Section order |
| `app/_components/*` | Sections (Hero, Curriculum, Journey, Pricing…) |
| `src/data/program.ts` | Program facts: duration, price, completion %, phone |
| `src/data/content.ts` | All section copy |
| `src/css/globals.css` | Design tokens (shared with FutureStack) |
| `src/components/apply/*` | Lead form, apply modal, `ApplyButton source="…"` |
| `src/components/ui/*` | Button, Eyebrow, SectionHeading, icons, InView |

## Moving into the FutureStack repo

The tokens in `src/css/globals.css` mirror FutureStack's. If this page goes into that repo, drop the
`@theme` block and reuse the existing one, and swap `src/components/ui/Icon.tsx` for `lucide-react`
(icon names match).

## Open items (rendered on the page as yellow `[NEEDS INPUT …]` chips)

- **Program duration** — the live page says both "4 months + 1-month internship" (hero) and
  "3-month program / 2-month internship" (journey, internship). The redesign uses 4 + 1 everywhere;
  change `trainingMonths` / `internshipMonths` in `src/data/program.ts` if that's wrong.
- Intro video (6:07) file or URL
- Lesson lists for modules 2–12, and the AI Modules tab content
- Full 12+ tools list (current list is derived from module titles) and tool logos
- 13 more testimonials + student photos; A Indhu's full testimonial
- Full hiring-company list + logos; mentor-company logos
- Recognition student count (live page shows "6,777,25")
- Photos: internship ID card, award photos, graduation photos
- LinkedIn post URLs
- FAQ answers (all 7)
- Footer link URLs and social profile URLs
- Official EMC logo file (header uses a text mark)
- Brochure PDF (download buttons currently open the form)
- Apply-form endpoint
