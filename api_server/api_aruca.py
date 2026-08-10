"""
API ARUCA - Conexion directa a A2 via ODBC
Requiere: Python 3.11+, pyodbc, flask, flask-cors
DSN ODBC configurado en el sistema: A2DAT

Ejecutar: python api_aruca.py
Puerto: 5000
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import pyodbc
import os

app = Flask(__name__)
CORS(app)

DSN = os.environ.get("A2_DSN", "A2DAT")


def get_connection():
    return pyodbc.connect(f"DSN={DSN};", timeout=10, autocommit=True)


def safe_float(val, default=0.0):
    try:
        return round(float(val), 4) if val else default
    except (ValueError, TypeError):
        return default


def safe_str(val, default=""):
    return str(val).strip() if val else default


# ─── CLIENTES ────────────────────────────────────────────────

@app.route("/api/clients")
def search_clients():
    q = request.args.get("q", "").strip().upper()
    vendor = request.args.get("vendor", "").strip()
    limit = request.args.get("limit", 20, type=int)

    if not q and not vendor:
        return jsonify([])

    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()

        conditions = []
        params = []

        if q:
            conditions.append(
                "(C.FC_DESCRIPCION LIKE ? OR C.FC_CODIGO LIKE ? OR C.FC_RIF LIKE ? OR C.FC_NIT LIKE ?)"
            )
            like = f"%{q}%"
            params.extend([like, like, like, like])

        if vendor:
            conditions.append("C.FC_VENDEDOR = ?")
            params.append(vendor)

        where = " AND ".join(conditions) if conditions else "1=1"

        sql = f"""
            SELECT TOP {limit}
                C.FC_CODIGO,
                C.FC_DESCRIPCION,
                C.FC_RIF,
                C.FC_NIT,
                C.FC_TELEFONO,
                C.FC_TELEFAX,
                C.FC_EMAIL,
                C.FC_DIRECCION1,
                C.FC_CONTACTO,
                C.FC_VENDEDOR,
                C.FC_CLASIFICACION,
                C.FC_SALDO,
                C.FC_LIMITECREDITO,
                C.FC_DIASCREDITO,
                C.FC_MONEDA
            FROM Sclientes C
            WHERE {where}
            ORDER BY C.FC_DESCRIPCION
        """

        cursor.execute(sql, params)
        cols = [d[0] for d in cursor.description]
        results = []

        for row in cursor.fetchall():
            r = {cols[i]: safe_str(row[i]) if isinstance(row[i], str) else row[i] for i in range(len(cols))}
            results.append({
                "a2_code": safe_str(r.get("FC_CODIGO")),
                "name": safe_str(r.get("FC_DESCRIPCION")),
                "rif": safe_str(r.get("FC_RIF")),
                "nit": safe_str(r.get("FC_NIT")),
                "phone": safe_str(r.get("FC_TELEFONO")),
                "fax": safe_str(r.get("FC_TELEFAX")),
                "email": safe_str(r.get("FC_EMAIL")),
                "address": safe_str(r.get("FC_DIRECCION1")),
                "contact": safe_str(r.get("FC_CONTACTO")),
                "vendor_code": safe_str(r.get("FC_VENDEDOR")),
                "classification": safe_str(r.get("FC_CLASIFICACION")),
                "balance": safe_float(r.get("FC_SALDO")),
                "credit_limit": safe_float(r.get("FC_LIMITECREDITO")),
                "credit_days": int(safe_float(r.get("FC_DIASCREDITO"))),
                "currency": safe_str(r.get("FC_MONEDA")),
            })

        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()


@app.route("/api/clients/<code>")
def get_client(code):
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT
                C.FC_CODIGO, C.FC_DESCRIPCION, C.FC_RIF, C.FC_NIT,
                C.FC_TELEFONO, C.FC_TELEFAX, C.FC_EMAIL, C.FC_DIRECCION1,
                C.FC_CONTACTO, C.FC_VENDEDOR, C.FC_CLASIFICACION,
                C.FC_SALDO, C.FC_LIMITECREDITO, C.FC_DIASCREDITO, C.FC_MONEDA
            FROM Sclientes C
            WHERE C.FC_CODIGO = ?
            """,
            (code,),
        )
        row = cursor.fetchone()
        if not row:
            return jsonify({"error": "Client not found"}), 404

        cols = [d[0] for d in cursor.description]
        r = {cols[i]: row[i] for i in range(len(cols))}

        return jsonify({
            "a2_code": safe_str(r.get("FC_CODIGO")),
            "name": safe_str(r.get("FC_DESCRIPCION")),
            "rif": safe_str(r.get("FC_RIF")),
            "nit": safe_str(r.get("FC_NIT")),
            "phone": safe_str(r.get("FC_TELEFONO")),
            "fax": safe_str(r.get("FC_TELEFAX")),
            "email": safe_str(r.get("FC_EMAIL")),
            "address": safe_str(r.get("FC_DIRECCION1")),
            "contact": safe_str(r.get("FC_CONTACTO")),
            "vendor_code": safe_str(r.get("FC_VENDEDOR")),
            "classification": safe_str(r.get("FC_CLASIFICACION")),
            "balance": safe_float(r.get("FC_SALDO")),
            "credit_limit": safe_float(r.get("FC_LIMITECREDITO")),
            "credit_days": int(safe_float(r.get("FC_DIASCREDITO"))),
            "currency": safe_str(r.get("FC_MONEDA")),
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()


# ─── PRODUCTOS ────────────────────────────────────────────────

@app.route("/api/products")
def search_products():
    q = request.args.get("q", "").strip().upper()
    limit = request.args.get("limit", 20, type=int)

    if not q:
        return jsonify([])

    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()

        like = f"%{q}%"
        sql = f"""
            SELECT TOP {limit}
                I.FI_CODIGO,
                I.FI_DESCRIPCION,
                ISNULL(SUM(D.FT_EXISTENCIA), 0) AS EXISTENCIA,
                P.FIC_P01PRECIOTOTALEXT,
                P.FIC_P03PRECIOTOTALEXT
            FROM Sinventario I
            INNER JOIN SinvDep D ON I.FI_CODIGO = D.FT_CODIGOPRODUCTO
            LEFT JOIN a2InvCostosPrecios P ON I.FI_CODIGO = P.FIC_CODEITEM
            WHERE (I.FI_DESCRIPCION LIKE ? OR I.FI_CODIGO LIKE ?)
            GROUP BY I.FI_CODIGO, I.FI_DESCRIPCION, P.FIC_P01PRECIOTOTALEXT, P.FIC_P03PRECIOTOTALEXT
            ORDER BY I.FI_DESCRIPCION
        """

        cursor.execute(sql, (like, like))
        results = []

        for row in cursor.fetchall():
            results.append({
                "code": safe_str(row[0]),
                "description": safe_str(row[1]),
                "stock": safe_float(row[2]),
                "price": safe_float(row[4]),
                "price_wholesale": safe_float(row[3]),
            })

        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()


@app.route("/api/products/<code>")
def get_product(code):
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()

        sql = """
            SELECT
                I.FI_CODIGO, I.FI_DESCRIPCION,
                ISNULL(SUM(D.FT_EXISTENCIA), 0) AS EXISTENCIA,
                P.FIC_P01PRECIOTOTALEXT, P.FIC_P03PRECIOTOTALEXT
            FROM Sinventario I
            INNER JOIN SinvDep D ON I.FI_CODIGO = D.FT_CODIGOPRODUCTO
            LEFT JOIN a2InvCostosPrecios P ON I.FI_CODIGO = P.FIC_CODEITEM
            WHERE I.FI_CODIGO = ?
            GROUP BY I.FI_CODIGO, I.FI_DESCRIPCION, P.FIC_P01PRECIOTOTALEXT, P.FIC_P03PRECIOTOTALEXT
        """

        cursor.execute(sql, (code,))
        row = cursor.fetchone()
        if not row:
            return jsonify({"error": "Product not found"}), 404

        return jsonify({
            "code": safe_str(row[0]),
            "description": safe_str(row[1]),
            "stock": safe_float(row[2]),
            "price": safe_float(row[4]),
            "price_wholesale": safe_float(row[3]),
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()


# ─── HEALTH ────────────────────────────────────────────────

@app.route("/api/health")
def health():
    try:
        conn = get_connection()
        conn.close()
        return jsonify({"status": "ok", "dsn": DSN})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500


if __name__ == "__main__":
    print(f"Iniciando API ARUCA en puerto 5000 (DSN: {DSN})")
    app.run(host="0.0.0.0", port=5000, debug=True)
