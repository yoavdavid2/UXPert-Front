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
    id: string;         // This will map to _id from the backend
    userId: string;
    projectId?: string;
    url: string;
    name?: string;
    status: 'processing' | 'analyzing' | 'completed' | 'failed';
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
    sort?: 'asc' | 'desc';
  }
  
  // For converting backend response to frontend format
  export const mapApiReportToReport = (apiReport: any): Report => {
    return {
      id: apiReport._id,
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
      completedAt: apiReport.completedAt
    };
  };
  
  // For converting a Report to a Project (for UI consistency)
  export const reportToProject = (report: Report): any => {
    return {
      id: report.id,
      title: report.name || report.url,
      description: `Analysis for ${report.url}`,
      createdAt: report.createdAt,
      url: report.url,
      results: report.results,
      status: report.status
    };
  };