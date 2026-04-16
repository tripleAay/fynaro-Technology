import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const rawService = formData.get("service");
    const imageFile = formData.get("image");

    if (!rawService || typeof rawService !== "string") {
      return NextResponse.json(
        { error: "Missing service payload" },
        { status: 400 }
      );
    }

    if (!(imageFile instanceof File)) {
      return NextResponse.json(
        { error: "Service image is required" },
        { status: 400 }
      );
    }

    const service = JSON.parse(rawService);

    const folder = crypto.randomUUID();
    const ext = imageFile.name.split(".").pop() || "jpg";
    const filePath = `services/${folder}/cover.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("service-images")
      .upload(filePath, imageFile, {
        contentType: imageFile.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    const { data: publicData } = supabase.storage
      .from("service-images")
      .getPublicUrl(filePath);

    const payload = {
      title: service.title,
      category: service.category,
      subtitle: service.subtitle,
      pricing: service.pricing,
      delivery: service.delivery,
      status: service.status,
      description: service.description,
      cta_note: service.ctaNote,
      tag: service.tag,
      is_featured: !!service.isFeatured,
      image: publicData.publicUrl,
      features: Array.isArray(service.features) ? service.features : [],
      deliverables: Array.isArray(service.deliverables)
        ? service.deliverables
        : [],
    };

    const { data, error: insertError } = await supabase
      .from("services")
      .insert(payload)
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, service: data });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unexpected server error",
      },
      { status: 500 }
    );
  }
}