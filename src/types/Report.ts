// Define interfaces for the report details
export interface ReportDetailItem {
  name?: string;
  value?: number | string | boolean;
  description?: string;
  [key: string]: unknown;
}

export interface ReportResults {
  seo?: {
    score: number;
    details?: Record<string, ReportDetailItem | unknown>;
  };
  accessibility?: {
    score: number;
    details?: Record<string, ReportDetailItem | unknown>;
  };
  performance?: {
    score: number;
    details?: Record<string, ReportDetailItem | unknown>;
  };
  usability?: {
    score: number;
    details?: Record<string, ReportDetailItem | unknown>;
  };
}

export interface Report {
  _id: string;
  userId: string;
  projectId?: string;
  url: string;
  name?: string;
  status: "processing" | "analyzing" | "completed" | "failed";
  results?: ReportResults;
  pdfUrl?: string;
  error?: string;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
}

// For query parameters when fetching reports
export interface ReportHistoryQuery {
  page?: number;
  limit?: number;
  from?: string | Date;
  to?: string | Date;
  sort?: "asc" | "desc";
}

// For converting backend response to frontend format
export const mapApiReportToReport = (apiReport: any): Report => {
  return {
    _id: apiReport._id,
    userId: apiReport.userId,
    projectId: apiReport.projectId,
    url: apiReport.url,
    name: apiReport.name,
    status: apiReport.status,
    results: apiReport.results,
    pdfUrl: apiReport.pdfUrl,
    error: apiReport.error,
    createdAt: apiReport.createdAt,
    updatedAt: apiReport.updatedAt,
    completedAt: apiReport.completedAt,
  };
};

// For converting a Report to a Project (for UI consistency)
export const reportToProject = (report: Report): any => {
  return {
    id: report._id,
    title: report.name || report.url,
    description: `Analysis for ${report.url}`,
    createdAt: report.createdAt,
    url: report.url,
    results: report.results,
    status: report.status,
  };
};

//// New Interfaces
type WebsiteEvaluationCategory =
  | "Is the color scheme match the website genre?"
  | "Usability"
  | "Visual Design"
  | "Performance & Speed"
  | "Accessibility"
  | "Content Quality & Readability"
  | "Navigation & Information Architecture"
  | "Mobile-Friendliness (Responsiveness)"
  | "User Engagement"
  | "Consistency";

export interface ImprovementSuggestions {
  improvement: string;
  importance: number; // Assuming a scale of 1-10
  expected_improvement: number; // Assuming a scale of 1-10
}

export interface WebsiteEvaluation {
  category: WebsiteEvaluationCategory;
  text_rating: string;
  numeric_rating: number; // Assuming a scale of 1-10
  improvement_suggestions: ImprovementSuggestions[];
}

export interface OverallEvaluation {
  category_ratings: WebsiteEvaluation[];
  final_score: number;
  best_thing: string;
  worst_thing: string;
  suggested_mew_html: string;
}
