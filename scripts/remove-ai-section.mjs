import fs from "fs";

const p = "src/components/owner/restaurant-storefront-editor.tsx";
let s = fs.readFileSync(p, "utf8");
const start = '      <Section title="AI Summary Google Highlights">';
const end = '      <Section title="Recommended Menu">';
const i = s.indexOf(start);
const j = s.indexOf(end);
if (i < 0 || j < 0) {
  console.error("not found", i, j);
  process.exit(1);
}
s = s.slice(0, i) + end + s.slice(j);
fs.writeFileSync(p, s);
console.log("removed AI Summary section");
