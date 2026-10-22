import { Fragment } from "react";
import { Placeholder } from "./primitives";

/** Renders text, turning any "[NEEDS INPUT …]" token into a visible placeholder chip. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[NEEDS INPUT[^\]]*\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[NEEDS INPUT") ? <Placeholder key={i}>{p}</Placeholder> : <Fragment key={i}>{p}</Fragment>,
      )}
    </>
  );
}
