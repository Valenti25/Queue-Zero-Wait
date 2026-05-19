import fs from "fs";
const badOpen = "<" + "motion ";
const goodOpen = "<" + "div ";
const badClose = "</" + "motion>";
const goodClose = "</" + "div>";
for (const p of process.argv.slice(2)) {
  let s = fs.readFileSync(p, "utf8");
  const n = (s.match(new RegExp(badClose.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
  s = s.split(badOpen).join(goodOpen);
  s = s.split(badClose).join(goodClose);
  fs.writeFileSync(p, s);
  console.log(p, "fixed", n);
}
