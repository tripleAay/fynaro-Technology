import {
  NextRequest,
  NextResponse,
} from "next/server";

// ======================================================
// API
// ======================================================

function getApiUrl() {
  return (
    process.env.FYNARO_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3500"
  ).replace(/\/$/, "");
}

// ======================================================
// TYPES
// ======================================================

type RouteContext = {
  params: Promise<{
    projectId: string;
  }>;
};

// ======================================================
// SAFE BACKEND RESPONSE
// ======================================================

async function proxyResponse(
  response: Response
) {
  const text = await response.text();

  let data: unknown;

  try {
    data = text
      ? JSON.parse(text)
      : {};
  } catch {
    data = {
      success: false,
      message:
        "The backend returned an invalid response.",
    };
  }

  return NextResponse.json(data, {
    status: response.status,
  });
}

// ======================================================
// GET PROJECT FILES
// ======================================================

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { projectId } =
      await context.params;

    const token =
      request.cookies.get(
        "fynaro_token"
      )?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Authentication required.",
        },
        {
          status: 401,
        }
      );
    }

    if (!projectId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Project ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const response = await fetch(
      `${getApiUrl()}/api/admin/projects/${encodeURIComponent(
        projectId
      )}/files`,
      {
        method: "GET",

        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },

        cache: "no-store",
      }
    );

    return proxyResponse(response);
  } catch (error) {
    console.error(
      "[ADMIN PROJECT FILES GET PROXY]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load project files.",
      },
      {
        status: 500,
      }
    );
  }
}

// ======================================================
// UPLOAD PROJECT FILE
// ======================================================

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { projectId } =
      await context.params;

    const token =
      request.cookies.get(
        "fynaro_token"
      )?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Authentication required.",
        },
        {
          status: 401,
        }
      );
    }

    if (!projectId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Project ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const formData =
      await request.formData();

    const file =
      formData.get("file");

    if (
      !file ||
      !(file instanceof File)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A project file is required.",
        },
        {
          status: 400,
        }
      );
    }

    const backendFormData =
      new FormData();

    backendFormData.append(
      "file",
      file,
      file.name
    );

    const name =
      formData.get("name");

    const category =
      formData.get("category");

    const description =
      formData.get("description");

    const visibleToClient =
      formData.get(
        "visibleToClient"
      );

    if (
      typeof name === "string" &&
      name.trim()
    ) {
      backendFormData.append(
        "name",
        name.trim()
      );
    }

    if (
      typeof category ===
        "string" &&
      category.trim()
    ) {
      backendFormData.append(
        "category",
        category.trim()
      );
    }

    if (
      typeof description ===
      "string"
    ) {
      backendFormData.append(
        "description",
        description.trim()
      );
    }

    if (
      typeof visibleToClient ===
      "string"
    ) {
      backendFormData.append(
        "visibleToClient",
        visibleToClient
      );
    }

    const response = await fetch(
      `${getApiUrl()}/api/admin/projects/${encodeURIComponent(
        projectId
      )}/files`,
      {
        method: "POST",

        headers: {
          Accept:
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: backendFormData,

        cache: "no-store",
      }
    );

    return proxyResponse(response);
  } catch (error) {
    console.error(
      "[ADMIN PROJECT FILE UPLOAD PROXY]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to upload project file.",
      },
      {
        status: 500,
      }
    );
  }
}