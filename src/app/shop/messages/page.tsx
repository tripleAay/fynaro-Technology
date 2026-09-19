import {
  getClientProjectMessages,
  getClientProjects,
  type ClientProject,
  type ProjectMessage,
} from "@/lib/client/projects";

import {
  getClientSupportConversation,
  type ClientConversation,
  type ConversationMessage,
} from "@/lib/client/conversations";

import MessagesClient from "./MessagesClient";

export const dynamic = "force-dynamic";

// ======================================================
// TYPES
// ======================================================

export type ProjectConversation = {
  project: ClientProject;
  messages: ProjectMessage[];
};

export type SupportConversation = {
  conversation: ClientConversation | null;
  messages: ConversationMessage[];
};

// ======================================================
// PAGE
// ======================================================

export default async function MessagesPage() {
  const [
    projects,
    supportResult,
  ] = await Promise.all([
    getClientProjects(),

    getClientSupportConversation().catch(
      (error) => {
        console.error(
          "[Messages] Unable to load Fynaro support conversation",
          error
        );

        return {
          conversation: null,
          messages: [],
        };
      }
    ),
  ]);

  // ====================================================
  // PROJECT CONVERSATIONS
  // ====================================================

  const projectConversations: ProjectConversation[] =
    await Promise.all(
      projects.map(
        async (project) => {
          try {
            const messages =
              await getClientProjectMessages(
                project.id
              );

            return {
              project,
              messages,
            };
          } catch (error) {
            console.error(
              `[Messages] Unable to load messages for project ${project.id}`,
              error
            );

            return {
              project,
              messages: [],
            };
          }
        }
      )
    );

  // Most recently active project first.
  projectConversations.sort(
    (a, b) => {
      const aLast =
        a.messages[
          a.messages.length - 1
        ]?.created_at ||
        a.project.updated_at ||
        a.project.created_at;

      const bLast =
        b.messages[
          b.messages.length - 1
        ]?.created_at ||
        b.project.updated_at ||
        b.project.created_at;

      return (
        new Date(
          bLast
        ).getTime() -
        new Date(
          aLast
        ).getTime()
      );
    }
  );

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <MessagesClient
      initialSupport={{
        conversation:
          supportResult.conversation,
        messages:
          supportResult.messages,
      }}
      initialProjectConversations={
        projectConversations
      }
    />
  );
}