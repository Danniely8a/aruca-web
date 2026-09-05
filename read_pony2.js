const XLSX = require("xlsx");
const path = "\\\\192.168.0.2\\compartido\\Listas de Precios\\ACT\\LISTAS DE PRECIO 24-25\\PONY J - Prensas, Sargentos, herramientas, NIVELES.xlsx";
const wb = XLSX.readFile(path);
const ws = wb.Sheets["PONY J"];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
const products = [];
let section = "";
for (const r of rows) {
  if (!r || r.length === 0) continue;
  const a = String(r[0] ?? "").trim();
  const b = String(r[1] ?? "").trim();
  const c = String(r[2] ?? "").trim();
  // section header (no code, no medida, just a description-like text)
  if (a === "" && b === "" && c === "") continue;
  // data row: code + description + medida
  if (a !== "" && b !== "" ) {
    products.push({ codigo: a, nombre: b, medida: c });
  } else if (b !== "" && a === "" && c === "") {
    section = b; // category header like "PRENSAS PARA CARPINTERIA"
    console.log("SECTION:", b);
  }
}
console.log("TOTAL productos:", products.length);
for (const p of products) {
  console.log(`${p.codigo} | ${p.nombre} | ${p.medida}`);
}
