import { readFileSync, writeFileSync } from "fs";

const files = [
  "src/app/(customer)/book/[slug]/page.tsx",
  "src/app/(customer)/queue/[id]/page.tsx",
  "src/components/customer/book-not-found.tsx",
];

const bad = "</" + "motion.div>";
const good = "</" + "motion.div>".replace("motion.", "");

for (const f of files) {
  let s = readFileSync(f, "utf8");
  const orig = s;
  s = s.replaceAll(bad, good);
  s = s.replaceAll("<motion.div className=", "<div className=");
  if (s !== orig) {
    writeFileSync(f, s);
    console.log("fixed", f);
  }
}
