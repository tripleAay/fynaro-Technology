import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ product: data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const { error } = await supabase.from("products").delete().eq("id", id);

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

export async function PATCH(req: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const updates: Record<string, unknown> = {};

    if (typeof body.isHotStuff === "boolean") {
      updates.isHotStuff = body.isHotStuff;
    }

    if (typeof body.name === "string") updates.name = body.name;
    if (typeof body.price === "string") updates.price = body.price;
    if (typeof body.category === "string") updates.category = body.category;
    if (typeof body.description === "string")
      updates.description = body.description;
    if (typeof body.stock === "string") updates.stock = body.stock;
    if (typeof body.status === "string") updates.status = body.status;
    if (typeof body.tag === "string") updates.tag = body.tag;
    if (typeof body.rating === "number") updates.rating = body.rating;
    if (typeof body.reviewsCount === "number")
      updates.reviewsCount = body.reviewsCount;
    if (typeof body.isFulfilled === "boolean")
      updates.isFulfilled = body.isFulfilled;
    if (typeof body.image === "string") updates.image = body.image;
    if (Array.isArray(body.images)) updates.images = body.images;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, product: data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}