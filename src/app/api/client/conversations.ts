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

export type ConversationProfile = {
  id: string;
  external_auth_id?: string | null;
  email: string;
  full_name?: string | null;
  company_name?: string | null;
  phone?: string | null;
  role?: string | null;
  avatar_url?: string | null;
};

export type ConversationStatus =
  | "open"
  | "closed";

export type ConversationType =
  | "support"
  | "general";

export type ConversationMessageType =
  | "message"
  | "question"
  | "update"
  | "feedback";

export type ClientConversation = {
  id: string;
  client_id: string;
  conversation_type: ConversationType;
  subject: string | null;
  status: ConversationStatus;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ConversationMessage = {
  id: string;
  conversation_id: string;
  sender_profile_id: string;

  message: string;

  message_type:
    ConversationMessageType;

  read_by_client: boolean;
  read_by_admin: boolean;

  edited_at: string | null;
  created_at: string;

  sender:
    | ConversationProfile
    | ConversationProfile[]
    | null;
};

export type ClientSupportConversationResult = {
  conversation:
    | ClientConversation
    | null;

  messages:
    ConversationMessage[];
};

type ClientSupportConversationApiResponse = {
  success: boolean;

  conversation?:
    | ClientConversation
    | null;

  messages?:
    ConversationMessage[];

  message?: string;
  code?: string;
};

type CreateClientMessageApiResponse = {
  success: boolean;

  message?: string;

  conversation?:
    ClientConversation;

  conversationMessage?:
    ConversationMessage;

  code?: string;
};

// ======================================================
// AUTH
// ======================================================

async function getAuthToken() {
  const cookieStore =
    await cookies();

  return cookieStore.get(
    "fynaro_token"
  )?.value;
}

// ======================================================
// ERROR RESPONSE
// ======================================================

async function getResponseData<T>(
  response: Response
): Promise<T | null> {
  const rawText =
    await response.text();

  if (!rawText) {
    return null;
  }

  try {
    return JSON.parse(
      rawText
    ) as T;
  } catch {
    return null;
  }
}

// ======================================================
// GET CLIENT SUPPORT CONVERSATION
//
// Server-side helper.
//
// GET
// /api/client/conversations/support
//
// IMPORTANT:
// The backend does not create a conversation merely
// because the client visits the Messages page.
// ======================================================

export async function getClientSupportConversation(): Promise<ClientSupportConversationResult> {
  const token =
    await getAuthToken();

  if (!token) {
    throw new Error(
      "Authentication required."
    );
  }

  const response =
    await fetch(
      `${getApiUrl()}/api/client/conversations/support`,
      {
        method: "GET",

        headers: {
          Accept:
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        cache: "no-store",
      }
    );

  const data =
    await getResponseData<ClientSupportConversationApiResponse>(
      response
    );

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Unable to load support conversation."
    );
  }

  return {
    conversation:
      data?.conversation ||
      null,

    messages:
      data?.messages || [],
  };
}

// ======================================================
// CREATE CLIENT SUPPORT MESSAGE
//
// Server-side helper.
//
// POST
// /api/client/conversations/support/messages
// ======================================================

export async function createClientSupportMessage({
  message,
  messageType = "message",
}: {
  message: string;
  messageType?: ConversationMessageType;
}): Promise<{
  conversation: ClientConversation;
  conversationMessage: ConversationMessage;
}> {
  const token =
    await getAuthToken();

  if (!token) {
    throw new Error(
      "Authentication required."
    );
  }

  const cleanMessage =
    message.trim();

  if (!cleanMessage) {
    throw new Error(
      "Message is required."
    );
  }

  const response =
    await fetch(
      `${getApiUrl()}/api/client/conversations/support/messages`,
      {
        method: "POST",

        headers: {
          Accept:
            "application/json",

          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body:
          JSON.stringify({
            message:
              cleanMessage,

            messageType,
          }),

        cache: "no-store",
      }
    );

  const data =
    await getResponseData<CreateClientMessageApiResponse>(
      response
    );

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Unable to send message."
    );
  }

  if (
    !data?.conversation ||
    !data?.conversationMessage
  ) {
    throw new Error(
      "The Fynaro API returned an invalid conversation response."
    );
  }

  return {
    conversation:
      data.conversation,

    conversationMessage:
      data.conversationMessage,
  };
}