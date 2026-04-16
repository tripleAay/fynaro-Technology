import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    console.log("UPLOAD ROUTE HIT");

    const formData = await req.formData();
    const rawProduct = formData.get("product");

    console.log("RAW PRODUCT EXISTS:", !!rawProduct);

    if (!rawProduct || typeof rawProduct !== "string") {
      return NextResponse.json(
        { error: "Missing product payload" },
        { status: 400 }
      );
    }

    const product = JSON.parse(rawProduct);
    console.log("PARSED PRODUCT:", product);

    const files = formData
      .getAll("images")
      .filter((item): item is File => item instanceof File);

    console.log("FILES COUNT:", files.length);

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const ext = file.name.split(".").pop() || "jpg";
      const filePath = `products/${crypto.randomUUID()}.${ext}`;

      console.log("UPLOADING FILE:", filePath);

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("UPLOAD ERROR:", uploadError);
        return NextResponse.json(
          { error: uploadError.message },
          { status: 500 }
        );
      }

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    const { id, ...productWithoutId } = product;

    const payload = {
      ...productWithoutId,
      image: uploadedUrls[0] ?? "",
      images: uploadedUrls,
    };

    console.log("FINAL PAYLOAD:", payload);

    const { data, error: insertError } = await supabase
      .from("products")
      .insert(payload)
      .select()
      .single();

    if (insertError) {
      console.error("INSERT ERROR:", insertError);
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    console.log("UPLOAD SUCCESS:", data);

    return NextResponse.json({ success: true, product: data });
  } catch (error) {
    console.error("ROUTE CRASH:", error);

    const message =
      error instanceof Error ? error.message : "Unexpected error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}