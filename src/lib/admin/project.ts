import { cookies } from "next/headers";

// ======================================================
// API CONFIGURATION
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

export type AdminProjectFileCategory =
  | "document"
  | "design"
  | "deliverable"
  | "asset"
  | "report"
  | "contract"
  | "invoice"
  | "client_upload"
  | "other";

export type AdminProjectFile = {
  id: string;
  project_id: string;

  uploaded_by_profile_id?: string | null;

  name: string;
  original_name: string;

  mime_type: string | null;
  file_size: number | null;

  category: AdminProjectFileCategory;

  description: string | null;

  visible_to_client: boolean;

  created_at: string;

  signed_url: string;
  signed_url_expires_in: number;
};

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

export type AdminProjectUpdatePayload = {
  status?: string;
  progress?: number;
  nextMilestone?: string | null;
  estimatedDelivery?: string | null;
};

export type AdminProjectPhaseUpdatePayload = {
  status: "upcoming" | "in_progress" | "completed";
};

// ======================================================
// API RESPONSE TYPES
// ======================================================

type BaseResponse = {
  success: boolean;
  message?: string;
  code?: string;
};

type AdminProjectsResponse = BaseResponse & {
  projects?: AdminProject[];
};

type AdminProjectResponse = BaseResponse & {
  project?: AdminProject;

  phases?: AdminProjectPhase[];

  activities?: AdminProjectActivity[];

  order?: AdminProjectOrder | null;

  paymentStages?: AdminProjectPaymentStage[];
  payment_stages?: AdminProjectPaymentStage[];
};

type AdminProjectFilesResponse = BaseResponse & {
  projectId?: string;
  files?: AdminProjectFile[];
};

type AdminProjectMessagesResponse = BaseResponse & {
  projectId?: string;
  messages?: AdminProjectMessage[];
};

type AdminProjectUpdateResponse = BaseResponse & {
  project?: AdminProject;
};

type AdminProjectPhaseUpdateResponse = BaseResponse & {
  phase?: AdminProjectPhase;
};

// ======================================================
// TOKEN
// ======================================================

async function getAdminToken() {
  const cookieStore =
    await cookies();

  return cookieStore.get(
    "fynaro_token"
  )?.value;
}

async function requireAdminToken() {
  const token =
    await getAdminToken();

  if (!token) {
    throw new Error(
      "Authentication required."
    );
  }

  return token;
}

// ======================================================
// SAFE JSON
// ======================================================

async function readJson<T>(
  response: Response
): Promise<T | null> {
  try {
    return (
      await response.json()
    ) as T;
  } catch {
    return null;
  }
}

// ======================================================
// REQUEST HELPER
// ======================================================

async function adminApiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<{
  response: Response;
  data: T | null;
}> {
  const token =
    await requireAdminToken();

  const headers =
    new Headers(
      options.headers
    );

  headers.set(
    "Accept",
    "application/json"
  );

  headers.set(
    "Authorization",
    `Bearer ${token}`
  );

  const response =
    await fetch(
      `${getApiUrl()}${path}`,
      {
        ...options,

        headers,

        cache:
          options.cache ||
          "no-store",
      }
    );

  const data =
    await readJson<T>(
      response
    );

  return {
    response,
    data,
  };
}

// ======================================================
// LIST ADMIN PROJECTS
// ======================================================

export async function getAdminProjects(
  filters: {
    status?: string;
    search?: string;
  } = {}
): Promise<AdminProject[]> {
  const query =
    new URLSearchParams();

  if (
    filters.status &&
    filters.status !== "all"
  ) {
    query.set(
      "status",
      filters.status
    );
  }

  if (
    filters.search?.trim()
  ) {
    query.set(
      "search",
      filters.search.trim()
    );
  }

  const suffix =
    query.toString()
      ? `?${query.toString()}`
      : "";

  const {
    response,
    data,
  } =
    await adminApiRequest<AdminProjectsResponse>(
      `/api/admin/projects${suffix}`,
      {
        method: "GET",
      }
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
  const safeProjectId =
    projectId?.trim();

  if (!safeProjectId) {
    throw new Error(
      "Project ID is required."
    );
  }

  const {
    response,
    data,
  } =
    await adminApiRequest<AdminProjectResponse>(
      `/api/admin/projects/${encodeURIComponent(
        safeProjectId
      )}`,
      {
        method: "GET",
      }
    );

  if (
    response.status === 404
  ) {
    return null;
  }

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
    project:
      data.project,

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
// UPDATE ADMIN PROJECT
// ======================================================

export async function updateAdminProject(
  projectId: string,
  payload: AdminProjectUpdatePayload
): Promise<AdminProject> {
  const safeProjectId =
    projectId?.trim();

  if (!safeProjectId) {
    throw new Error(
      "Project ID is required."
    );
  }

  const progress =
    payload.progress;

  if (
    progress !== undefined &&
    (
      !Number.isFinite(progress) ||
      progress < 0 ||
      progress > 100
    )
  ) {
    throw new Error(
      "Progress must be between 0 and 100."
    );
  }

  const {
    response,
    data,
  } =
    await adminApiRequest<AdminProjectUpdateResponse>(
      `/api/admin/projects/${encodeURIComponent(
        safeProjectId
      )}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            payload
          ),
      }
    );

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Unable to update project."
    );
  }

  if (!data?.project) {
    throw new Error(
      "The updated project was not returned."
    );
  }

  return data.project;
}

// ======================================================
// UPDATE ADMIN PROJECT PHASE
// ======================================================

export async function updateAdminProjectPhase(
  projectId: string,
  phaseId: string,
  payload: AdminProjectPhaseUpdatePayload
): Promise<AdminProjectPhase> {
  const safeProjectId =
    projectId?.trim();

  const safePhaseId =
    phaseId?.trim();

  if (!safeProjectId) {
    throw new Error(
      "Project ID is required."
    );
  }

  if (!safePhaseId) {
    throw new Error(
      "Project phase ID is required."
    );
  }

  const {
    response,
    data,
  } =
    await adminApiRequest<AdminProjectPhaseUpdateResponse>(
      `/api/admin/projects/${encodeURIComponent(
        safeProjectId
      )}/phases/${encodeURIComponent(
        safePhaseId
      )}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            payload
          ),
      }
    );

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Unable to update project phase."
    );
  }

  if (!data?.phase) {
    throw new Error(
      "The updated project phase was not returned."
    );
  }

  return data.phase;
}

// ======================================================
// GET ADMIN PROJECT FILES
// ======================================================

export async function getAdminProjectFiles(
  projectId: string
): Promise<AdminProjectFile[]> {
  const safeProjectId =
    projectId?.trim();

  if (!safeProjectId) {
    throw new Error(
      "Project ID is required."
    );
  }

  const {
    response,
    data,
  } =
    await adminApiRequest<AdminProjectFilesResponse>(
      `/api/admin/projects/${encodeURIComponent(
        safeProjectId
      )}/files`,
      {
        method: "GET",
      }
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
  const safeProjectId =
    projectId?.trim();

  if (!safeProjectId) {
    throw new Error(
      "Project ID is required."
    );
  }

  const {
    response,
    data,
  } =
    await adminApiRequest<AdminProjectMessagesResponse>(
      `/api/admin/projects/${encodeURIComponent(
        safeProjectId
      )}/messages`,
      {
        method: "GET",
      }
    );

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Unable to load project messages."
    );
  }

  return data?.messages || [];
}