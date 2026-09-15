export type ProjectStatus =
  | "preparing"
  | "active"
  | "waiting_on_client"
  | "paused"
  | "completed";

export type PhaseStatus = "complete" | "current" | "upcoming";

export type ProjectPhase = {
  number: string;
  title: string;
  description: string;
  status: PhaseStatus;
};

export type ProjectFile = {
  name: string;
  category: string;
  size: string;
  uploadedBy: string;
  date: string;
};

export type ProjectActivity = {
  title: string;
  description: string;
  date: string;
};

export type FynaroProject = {
  id: string;
  requestId: string;
  proposalId: string;

  title: string;
  service: string;
  status: ProjectStatus;

  progress: number;

  totalInvestment: number;
  amountPaid: number;
  balance: number;

  startedAt: string;
  estimatedDelivery: string;

  currentPhase: string;
  currentPhaseDescription: string;

  nextMilestone: string;

  attention: {
    title: string;
    description: string;
  };

  phases: ProjectPhase[];
  files: ProjectFile[];
  activity: ProjectActivity[];
};

const projects: FynaroProject[] = [
  {
    id: "FYN-PRJ-0042",
    requestId: "FYN-0042",
    proposalId: "PRP-0042",

    title: "Marketplace Platform",
    service: "Digital Product",
    status: "active",

    progress: 38,

    totalInvestment: 2450000,
    amountPaid: 1225000,
    balance: 1225000,

    startedAt: "Sep 10, 2026",
    estimatedDelivery: "Nov 2026",

    currentPhase: "Core Development",

    currentPhaseDescription:
      "The approved product architecture and interface direction are now being translated into the working marketplace platform.",

    nextMilestone: "Customer marketplace experience",

    attention: {
      title: "Dashboard design approval",
      description:
        "The latest administrative dashboard direction is ready for your review.",
    },

    phases: [
      {
        number: "01",
        title: "Discovery",
        description:
          "Project requirements, objectives and product direction confirmed.",
        status: "complete",
      },
      {
        number: "02",
        title: "Product Architecture",
        description:
          "User roles, workflows and core product structure established.",
        status: "complete",
      },
      {
        number: "03",
        title: "Development",
        description:
          "Core marketplace functionality and application systems are being built.",
        status: "current",
      },
      {
        number: "04",
        title: "Quality Assurance",
        description:
          "Product testing, refinements and launch preparation.",
        status: "upcoming",
      },
      {
        number: "05",
        title: "Launch",
        description:
          "Production deployment and final project handover.",
        status: "upcoming",
      },
    ],

    files: [
      {
        name: "marketplace-product-architecture.pdf",
        category: "Documentation",
        size: "2.1 MB",
        uploadedBy: "Fynaro",
        date: "Sep 12, 2026",
      },
      {
        name: "dashboard-interface-v2.pdf",
        category: "Design",
        size: "4.6 MB",
        uploadedBy: "Fynaro",
        date: "Sep 18, 2026",
      },
    ],

    activity: [
      {
        title: "Development phase started",
        description: "Core marketplace development has started.",
        date: "Sep 19, 2026",
      },
      {
        title: "Design file uploaded",
        description:
          "Dashboard interface V2 was added to project files.",
        date: "Sep 18, 2026",
      },
      {
        title: "Product architecture approved",
        description:
          "The product structure and primary workflows were approved.",
        date: "Sep 15, 2026",
      },
      {
        title: "Initial payment confirmed",
        description:
          "The project-start payment was successfully recorded.",
        date: "Sep 10, 2026",
      },
    ],
  },
];

export function getProjectById(
  projectId: string,
): FynaroProject | null {
  const normalizedId = decodeURIComponent(projectId)
    .trim()
    .toLowerCase();

  return (
    projects.find(
      (project) =>
        project.id.toLowerCase() === normalizedId,
    ) ?? null
  );
}

export function getProjects(): FynaroProject[] {
  return projects;
}