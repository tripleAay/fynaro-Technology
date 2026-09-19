import { cookies } from "next/headers";

// ======================================================
// API URL
// ======================================================

function getApiUrl() {
  const url =
    process.env.FYNARO_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3500";

  return url.replace(/\/$/, "");
}

// ======================================================
// TYPES
// ======================================================

export type ClientProject = {
  id: string;
  reference: string;

  client_id: string;
  request_id: string;
  proposal_id: string;
  order_id: string | null;

  title: string;
  service: string;
  status: string;

  total_investment: number;
  progress: number;

  current_phase_id: string | null;
  next_milestone: string | null;

  started_at: string | null;
  estimated_delivery: string | null;
  completed_at: string | null;

  created_at: string;
  updated_at: string;
};

export type ProjectPhase = {
  id: string;
  project_id: string;

  position: number;

  title: string;
  description: string | null;

  status: string;

  started_at: string | null;
  completed_at: string | null;

  created_at: string;
  updated_at: string;
};

export type ProjectActivity = {
  id: string;
  project_id: string;

  activity_type: string;

  title: string;
  description: string | null;

  metadata: Record<string, unknown>;

  visible_to_client: boolean;

  created_at: string;
};

export type ProjectOrder = {
  id: string;
  reference: string;

  order_type: string;

  title: string;
  service: string;

  currency: string;
  total: number;

  status: string;

  payment_status: string;
  fulfillment_status: string;

  accepted_at: string | null;
  placed_at: string | null;

  created_at: string;
};

// ======================================================
// PROJECT FILE
// ======================================================

export type ProjectFile = {
  id: string;
  project_id: string;

  name: string;
  original_name: string;

  mime_type: string | null;
  file_size: number | null;

  category: string;

  description: string | null;

  visible_to_client: boolean;

  created_at: string;

  signed_url: string;
  signed_url_expires_in: number;
};

// ======================================================
// PROJECT MESSAGE
// ======================================================

export type ProjectMessageSender = {
  id: string;

  external_auth_id?: string | null;

  email: string;

  full_name?: string | null;
  company_name?: string | null;

  role?: string | null;

  avatar_url?: string | null;
};

export type ProjectMessageType =
  | "message"
  | "update"
  | "feedback"
  | "question";

export type ProjectMessage = {
  id: string;

  project_id: string;

  sender_profile_id: string | null;

  message: string;

  message_type:
    | ProjectMessageType
    | "internal_note";

  visible_to_client: boolean;

  edited_at: string | null;

  created_at: string;

  sender:
    | ProjectMessageSender
    | ProjectMessageSender[]
    | null;
};

// ======================================================
// API RESPONSE TYPES
// ======================================================

type ProjectsResponse = {
  success: boolean;

  message?: string;
  code?: string;

  projects?: ClientProject[];
};

type ProjectResponse = {
  success: boolean;

  message?: string;
  code?: string;

  project?: ClientProject;

  phases?: ProjectPhase[];

  activities?: ProjectActivity[];

  order?: ProjectOrder | null;
};

type ProjectFilesResponse = {
  success: boolean;

  message?: string;
  code?: string;

  projectId?: string;

  files?: ProjectFile[];
};

type ProjectFileResponse = {
  success: boolean;

  message?: string;
  code?: string;

  file?: ProjectFile;
};

type ProjectMessagesResponse = {
  success: boolean;

  message?: string;
  code?: string;

  projectId?: string;

  messages?: ProjectMessage[];
};

// ======================================================
// AUTH TOKEN
// ======================================================

async function getAuthToken() {
  const cookieStore =
    await cookies();

  return cookieStore.get(
    "fynaro_token"
  )?.value;
}

// ======================================================
// SAFE JSON
// ======================================================

async function readJson<T>(
  response: Response
): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

// ======================================================
// PROJECT LIST
// ======================================================

export async function getClientProjects(): Promise<
  ClientProject[]
> {
  const token =
    await getAuthToken();

  if (!token) {
    return [];
  }

  const response =
    await fetch(
      `${getApiUrl()}/api/client/projects`,
      {
        method: "GET",

        headers: {
          Accept:
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        cache:
          "no-store",
      }
    );

  const data =
    await readJson<ProjectsResponse>(
      response
    );

  if (!data) {
    throw new Error(
      "The project server returned an invalid response."
    );
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to load projects."
    );
  }

  return data.projects || [];
}

// ======================================================
// PROJECT DETAIL
// ======================================================

export async function getClientProjectById(
  projectId: string
): Promise<{
  project: ClientProject;
  phases: ProjectPhase[];
  activities: ProjectActivity[];
  order: ProjectOrder | null;
} | null> {
  const token =
    await getAuthToken();

  if (!token) {
    return null;
  }

  if (!projectId?.trim()) {
    throw new Error(
      "Project ID is required."
    );
  }

  const response =
    await fetch(
      `${getApiUrl()}/api/client/projects/${encodeURIComponent(
        projectId
      )}`,
      {
        method: "GET",

        headers: {
          Accept:
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        cache:
          "no-store",
      }
    );

  if (
    response.status === 404
  ) {
    return null;
  }

  const data =
    await readJson<ProjectResponse>(
      response
    );

  if (!data) {
    throw new Error(
      "The project server returned an invalid response."
    );
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to load project."
    );
  }

  if (!data.project) {
    return null;
  }

  return {
    project:
      data.project,

    phases:
      data.phases || [],

    activities:
      data.activities || [],

    order:
      data.order || null,
  };
}

// ======================================================
// PROJECT FILES
// ======================================================

export async function getClientProjectFiles(
  projectId: string
): Promise<ProjectFile[]> {
  const token =
    await getAuthToken();

  if (!token) {
    return [];
  }

  if (!projectId?.trim()) {
    throw new Error(
      "Project ID is required."
    );
  }

  const response =
    await fetch(
      `${getApiUrl()}/api/client/projects/${encodeURIComponent(
        projectId
      )}/files`,
      {
        method: "GET",

        headers: {
          Accept:
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        cache:
          "no-store",
      }
    );

  const data =
    await readJson<ProjectFilesResponse>(
      response
    );

  if (!data) {
    throw new Error(
      "The project file server returned an invalid response."
    );
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to load project files."
    );
  }

  return data.files || [];
}

// ======================================================
// PROJECT FILE DETAIL
// ======================================================

export async function getClientProjectFileById(
  projectId: string,
  fileId: string
): Promise<ProjectFile | null> {
  const token =
    await getAuthToken();

  if (!token) {
    return null;
  }

  if (!projectId?.trim()) {
    throw new Error(
      "Project ID is required."
    );
  }

  if (!fileId?.trim()) {
    throw new Error(
      "File ID is required."
    );
  }

  const response =
    await fetch(
      `${getApiUrl()}/api/client/projects/${encodeURIComponent(
        projectId
      )}/files/${encodeURIComponent(
        fileId
      )}`,
      {
        method: "GET",

        headers: {
          Accept:
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        cache:
          "no-store",
      }
    );

  if (
    response.status === 404
  ) {
    return null;
  }

  const data =
    await readJson<ProjectFileResponse>(
      response
    );

  if (!data) {
    throw new Error(
      "The project file server returned an invalid response."
    );
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to load project file."
    );
  }

  return data.file || null;
}

// ======================================================
// PROJECT MESSAGES
// ======================================================

export async function getClientProjectMessages(
  projectId: string
): Promise<ProjectMessage[]> {
  const token =
    await getAuthToken();

  if (!token) {
    return [];
  }

  if (!projectId?.trim()) {
    throw new Error(
      "Project ID is required."
    );
  }

  const response =
    await fetch(
      `${getApiUrl()}/api/client/projects/${encodeURIComponent(
        projectId
      )}/messages`,
      {
        method: "GET",

        headers: {
          Accept:
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        cache:
          "no-store",
      }
    );

  const data =
    await readJson<ProjectMessagesResponse>(
      response
    );

  if (!data) {
    throw new Error(
      "The project message server returned an invalid response."
    );
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to load project messages."
    );
  }

  return data.messages || [];
}

// ======================================================
// SEND PROJECT MESSAGE
// ======================================================

type CreateProjectMessageResponse = {
  success: boolean;

  message?: string;
  code?: string;

  projectMessage?: ProjectMessage;
};

export async function createClientProjectMessage(
  projectId: string,
  message: string,
  messageType: ProjectMessageType = "message"
): Promise<ProjectMessage> {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("Authentication required.");
  }

  if (!projectId?.trim()) {
    throw new Error("Project ID is required.");
  }

  const cleanMessage = message.trim();

  if (!cleanMessage) {
    throw new Error("Message is required.");
  }

  const response = await fetch(
    `${getApiUrl()}/api/client/projects/${encodeURIComponent(
      projectId
    )}/messages`,
    {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        message: cleanMessage,
        messageType,
      }),

      cache: "no-store",
    }
  );

  const data =
    await readJson<CreateProjectMessageResponse>(
      response
    );

  if (!data) {
    throw new Error(
      "The project message server returned an invalid response."
    );
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to send project message."
    );
  }

  if (!data.projectMessage) {
    throw new Error(
      "The server did not return the created message."
    );
  }

  return data.projectMessage;
}