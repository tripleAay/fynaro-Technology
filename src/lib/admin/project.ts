import { cookies } from "next/headers";

// ======================================================
// API
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

export type AdminProjectClient = {
  id: string;
  external_auth_id?: string | null;
  email: string;
  full_name?: string | null;
  company_name?: string | null;
  phone?: string | null;
  role?: string | null;
  avatar_url?: string | null;
};

export type AdminProject = {
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

  client?:
    | AdminProjectClient
    | AdminProjectClient[]
    | null;
};

export type AdminProjectPhase = {
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

export type AdminProjectActivity = {
  id: string;
  project_id: string;

  actor_profile_id?: string | null;

  activity_type: string;

  title: string;
  description: string | null;

  metadata: Record<string, unknown>;

  visible_to_client: boolean;

  created_at: string;
};

export type AdminProjectOrder = {
  id: string;
  reference: string;

  order_type: string;

  title: string;
  service: string;

  currency: string;

  subtotal?: number;
  total: number;

  status: string;

  payment_status: string;
  fulfillment_status: string;

  accepted_at: string | null;
  placed_at: string | null;

  created_at: string;
  updated_at?: string;
};

export type AdminProjectPaymentStage = {
  id: string;

  order_id?: string;
  proposal_id?: string;

  position: number;

  stage: string;

  percentage: number;
  amount: number;

  trigger_label: string | null;

  payment_status: string;

  paid_at: string | null;

  created_at?: string;
  updated_at?: string;
};

// ======================================================
// PROJECT FILE
// ======================================================

export type AdminProjectFile = {
  id: string;
  project_id: string;

  uploaded_by_profile_id?: string | null;

  name: string;
  original_name: string;

  mime_type: string | null;
  file_size: number | null;

  category:
    | "document"
    | "design"
    | "deliverable"
    | "asset"
    | "report"
    | "contract"
    | "invoice"
    | "client_upload"
    | "other";

  description: string | null;

  visible_to_client: boolean;

  created_at: string;

  signed_url: string;
  signed_url_expires_in: number;
};

// ======================================================
// PROJECT MESSAGE
// ======================================================

export type AdminProjectMessageSender = {
  id: string;

  external_auth_id?: string | null;

  email: string;

  full_name?: string | null;
  company_name?: string | null;

  role?: string | null;

  avatar_url?: string | null;
};

export type AdminProjectMessageType =
  | "message"
  | "update"
  | "feedback"
  | "question"
  | "internal_note";

export type AdminProjectMessage = {
  id: string;

  project_id: string;

  sender_profile_id: string | null;

  message: string;

  message_type: AdminProjectMessageType;

  visible_to_client: boolean;

  edited_at: string | null;

  created_at: string;

  sender:
    | AdminProjectMessageSender
    | AdminProjectMessageSender[]
    | null;
};

// ======================================================
// API RESPONSE TYPES
// ======================================================

type AdminProjectsResponse = {
  success: boolean;

  message?: string;
  code?: string;

  projects?: AdminProject[];
};

type AdminProjectResponse = {
  success: boolean;

  message?: string;
  code?: string;

  project?: AdminProject;

  phases?: AdminProjectPhase[];

  activities?: AdminProjectActivity[];

  order?: AdminProjectOrder | null;

  paymentStages?: AdminProjectPaymentStage[];
  payment_stages?: AdminProjectPaymentStage[];
};

type AdminProjectFilesResponse = {
  success: boolean;

  message?: string;
  code?: string;

  projectId?: string;

  files?: AdminProjectFile[];
};

type AdminProjectMessagesResponse = {
  success: boolean;

  message?: string;
  code?: string;

  projectId?: string;

  messages?: AdminProjectMessage[];
};

// ======================================================
// TOKEN
// ======================================================

async function getAdminToken() {
  const cookieStore = await cookies();

  return cookieStore.get("fynaro_token")?.value;
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
// LIST ADMIN PROJECTS
// ======================================================

export async function getAdminProjects(): Promise<
  AdminProject[]
> {
  const token = await getAdminToken();

  if (!token) {
    throw new Error("Authentication required.");
  }

  const response = await fetch(
    `${getApiUrl()}/api/admin/projects`,
    {
      method: "GET",

      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },

      cache: "no-store",
    }
  );

  const data =
    await readJson<AdminProjectsResponse>(
      response
    );

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Unable to load admin projects."
    );
  }

  return data?.projects || [];
}

// ======================================================
// GET ADMIN PROJECT
// ======================================================

export async function getAdminProjectById(
  projectId: string
): Promise<{
  project: AdminProject;
  phases: AdminProjectPhase[];
  activities: AdminProjectActivity[];
  order: AdminProjectOrder | null;
  paymentStages: AdminProjectPaymentStage[];
} | null> {
  const token = await getAdminToken();

  if (!token) {
    throw new Error("Authentication required.");
  }

  if (!projectId?.trim()) {
    throw new Error("Project ID is required.");
  }

  const response = await fetch(
    `${getApiUrl()}/api/admin/projects/${encodeURIComponent(
      projectId
    )}`,
    {
      method: "GET",

      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },

      cache: "no-store",
    }
  );

  if (response.status === 404) {
    return null;
  }

  const data =
    await readJson<AdminProjectResponse>(
      response
    );

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Unable to load admin project."
    );
  }

  if (!data?.project) {
    return null;
  }

  return {
    project: data.project,

    phases:
      data.phases || [],

    activities:
      data.activities || [],

    order:
      data.order || null,

    paymentStages:
      data.paymentStages ||
      data.payment_stages ||
      [],
  };
}

// ======================================================
// GET ADMIN PROJECT FILES
// ======================================================

export async function getAdminProjectFiles(
  projectId: string
): Promise<AdminProjectFile[]> {
  const token = await getAdminToken();

  if (!token) {
    throw new Error("Authentication required.");
  }

  if (!projectId?.trim()) {
    throw new Error("Project ID is required.");
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

  const data =
    await readJson<AdminProjectFilesResponse>(
      response
    );

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Unable to load project files."
    );
  }

  return data?.files || [];
}

// ======================================================
// GET ADMIN PROJECT MESSAGES
// ======================================================

export async function getAdminProjectMessages(
  projectId: string
): Promise<AdminProjectMessage[]> {
  const token = await getAdminToken();

  if (!token) {
    throw new Error("Authentication required.");
  }

  if (!projectId?.trim()) {
    throw new Error("Project ID is required.");
  }

  const response = await fetch(
    `${getApiUrl()}/api/admin/projects/${encodeURIComponent(
      projectId
    )}/messages`,
    {
      method: "GET",

      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },

      cache: "no-store",
    }
  );

  const data =
    await readJson<AdminProjectMessagesResponse>(
      response
    );

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Unable to load project messages."
    );
  }

  return data?.messages || [];
}