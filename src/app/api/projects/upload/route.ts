import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const rawProject = formData.get("project");

    if (!rawProject || typeof rawProject !== "string") {
      return NextResponse.json(
        { error: "Missing project payload" },
        { status: 400 }
      );
    }

    const project = JSON.parse(rawProject);

    const coverFile = formData.get("coverImage");

    const galleryFiles = formData
      .getAll("galleryImages")
      .filter((item): item is File => item instanceof File);

    // ✅ validations
    if (!(coverFile instanceof File)) {
      return NextResponse.json(
        { error: "Cover image is required" },
        { status: 400 }
      );
    }

    if (galleryFiles.length !== 5) {
      return NextResponse.json(
        { error: "Exactly 5 gallery images are required" },
        { status: 400 }
      );
    }

    // unique folder
    const folder = crypto.randomUUID();

    // ======================
    // UPLOAD COVER IMAGE
    // ======================
    const coverExt = coverFile.name.split(".").pop() || "jpg";
    const coverPath = `projects/${folder}/cover.${coverExt}`;

    const { error: coverError } = await supabase.storage
      .from("project-images")
      .upload(coverPath, coverFile, {
        contentType: coverFile.type,
      });

    if (coverError) {
      return NextResponse.json(
        { error: coverError.message },
        { status: 500 }
      );
    }

    const { data: coverData } = supabase.storage
      .from("project-images")
      .getPublicUrl(coverPath);

    // ======================
    // UPLOAD GALLERY (5)
    // ======================
    const galleryUrls: string[] = [];

    for (let i = 0; i < galleryFiles.length; i++) {
      const file = galleryFiles[i];

      const ext = file.name.split(".").pop() || "jpg";
      const filePath = `projects/${folder}/gallery-${i + 1}.${ext}`;

      const { error } = await supabase.storage
        .from("project-images")
        .upload(filePath, file, {
          contentType: file.type,
        });

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      const { data } = supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

      galleryUrls.push(data.publicUrl);
    }

    // ======================
    // SAVE TO DATABASE
    // ======================
    const payload = {
      title: project.title,
      category: project.category,
      subtitle: project.subtitle,
      year: project.year,
      client_name: project.clientName,
      services: project.services,
      overview: project.overview,
      challenge: project.challenge,
      approach: project.approach,
      outcome: project.outcome,
      cover_image: coverData.publicUrl,
      gallery_images: galleryUrls,
    };

    const { data, error } = await supabase
      .from("projects")
      .insert(payload)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      project: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected error",
      },
      { status: 500 }
    );
  }
}