const XLSX = require("xlsx");
const path = "\\\\192.168.0.2\\compartido\\Listas de Precios\\ACT\\LISTAS DE PRECIO 24-25\\PONY J - Prensas, Sargentos, herramientas, NIVELES.xlsx";
const wb = XLSX.readFile(path);
const ws = wb.Sheets["PONY J"];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
for (let i = 0; i < rows.length; i++) {
  const r = rows[i];
  const a = String(r[0] ?? "").trim();
  const b = String(r[1] ?? "").trim();
  const c = String(r[2] ?? "").trim();
  if (a === "" && b === "" && c === "") continue;
  console.log(`[${i}] A='${a}' | B='${b}' | C='${c}'`);
}
