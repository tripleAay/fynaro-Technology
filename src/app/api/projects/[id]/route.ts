import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  _: Request,
  context: RouteContext<"/api/projects/[id]">
) {
  try {
    const { id } = await context.params;

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ project: data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  context: RouteContext<"/api/projects/[id]">
) {
  try {
    const { id } = await context.params;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: RouteContext<"/api/projects/[id]">
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const updates: Record<string, unknown> = {};

    if (typeof body.title === "string") updates.title = body.title;
    if (typeof body.category === "string") updates.category = body.category;
    if (typeof body.subtitle === "string") updates.subtitle = body.subtitle;
    if (typeof body.year === "string") updates.year = body.year;
    if (typeof body.client_name === "string") updates.client_name = body.client_name;
    if (typeof body.overview === "string") updates.overview = body.overview;
    if (typeof body.challenge === "string") updates.challenge = body.challenge;
    if (typeof body.approach === "string") updates.approach = body.approach;
    if (typeof body.outcome === "string") updates.outcome = body.outcome;
    if (typeof body.cover_image === "string") updates.cover_image = body.cover_image;
    if (Array.isArray(body.gallery_images)) updates.gallery_images = body.gallery_images;
    if (Array.isArray(body.services)) updates.services = body.services;
    if (typeof body.status === "string") updates.status = body.status;
    if (typeof body.link === "string") updates.link = body.link;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, project: data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}