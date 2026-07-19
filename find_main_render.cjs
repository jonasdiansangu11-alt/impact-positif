const fs = require('fs');

const fileContent = fs.readFileSync('readdy_js.js', 'utf8');

// Search for the sequence of rendered elements in the main component.
// We should see something like: A.jsx(Go,{}), A.jsx(Ko,{}), A.jsx(qo,{}) ... or similar
// Let's search for "Go" inside jsx calls
const target = "(0,A.jsx)(Go,{})";
const idx = fileContent.indexOf(target);
if (idx !== -1) {
  console.log("Found direct Go render!");
  console.log(fileContent.substring(idx - 200, idx + 1000));
} else {
  // Let's search for "Go" as a variable or other pattern
  console.log("Direct Go render not found, let's search for other patterns like 'Go' or 'Ko'");
  const pattern = /Go\b/g;
  let m;
  const positions = [];
  while ((m = pattern.exec(fileContent)) !== null) {
    positions.push(m.index);
  }
  console.log(`Found ${positions.length} matches for Go`);
  positions.slice(0, 10).forEach(pos => {
    console.log(`Match at ${pos}: ${fileContent.substring(pos - 100, pos + 100)}`);
  });
}
