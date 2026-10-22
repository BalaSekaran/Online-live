// Local preview harness only (not part of the Next.js app): renders app/page.tsx in the browser.
import { createRoot } from "react-dom/client";
import Page from "../app/page";
document.documentElement.classList.add("js");
createRoot(document.getElementById("root")!).render(<Page />);
