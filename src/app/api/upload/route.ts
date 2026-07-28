import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "image/svg+xml": "svg",
  "image/heic": "heic",
  "image/heif": "heif",
  "application/pdf": "pdf",
};

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "product-images";

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    const ext = ALLOWED_TYPES[file.type] || file.name.split(".").pop()?.toLowerCase();

    if (!ext) {
      return NextResponse.json(
        { error: `Formato no soportado: ${file.type || "desconocido"}. Use JPG, PNG, WebP, GIF, AVIF, SVG o PDF.` },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `El archivo es muy grande (${(file.size / 1024 / 1024).toFixed(1)}MB). Máximo 10MB.` },
        { status: 400 }
      );
    }

    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const path = `${folder}/${fileName}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const supabase = createAdminClient();
    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, buffer, {
        contentType: file.type || `image/${ext}`,
        upsert: true,
      });

    if (error) {
      console.error("Upload error:", error);
      return NextResponse.json(
        { error: `Error al subir: ${error.message}` },
        { status: 500 }
      );
    }

    const { data } = supabase.storage.from("product-images").getPublicUrl(path);

    return NextResponse.json({ url: data.publicUrl, path });
  } catch (err) {
    console.error("Upload unexpected error:", err);
    return NextResponse.json(
      { error: "Error inesperado al subir el archivo" },
      { status: 500 }
    );
  }
}
