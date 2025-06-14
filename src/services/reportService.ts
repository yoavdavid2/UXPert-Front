// src/services/reportService.ts
import api from "./requestsWrapper";
import {
  Report,
  ReportHistoryQuery,
  mapApiReportToReport,
} from "../utils/ReportUtils";

export const reportService = {
  // Get reports history
  async getReportsHistory(
    query: ReportHistoryQuery = {}
  ): Promise<{ reports: Report[]; total: number }> {
    try {
      const response = await api.get("/api/reports", { params: query });
      return {
        reports: response.data.reports.map(mapApiReportToReport),
        total: response.data.total,
      };
    } catch (error) {
      console.error("Error fetching reports history:", error);
      throw error;
    }
  },

  // Get reports by project
  async getReportsByProject(
    projectId: string,
    query: ReportHistoryQuery = {}
  ): Promise<{ reports: Report[]; total: number }> {
    try {
      const response = await api.get(`/api/reports/byProjectId/${projectId}`, {
        params: query,
      });

      const rawReports = response.data || [];

      return {
        reports: rawReports.map(mapApiReportToReport),
        total: rawReports.length,
      };
    } catch (error) {
      console.error("Error fetching reports by project:", error);
      throw error;
    }
  },

  // Get specific report by ID
  async getReportById(id: string): Promise<Report> {
    try {
      const response = await api.get(`/api/reports/${id}`);
      return mapApiReportToReport(response.data);
    } catch (error) {
      console.error(`Error fetching report with ID ${id}:`, error);
      throw error;
    }
  },

  // Get report history by website name
  async getReportHistoryByName(websiteName: string): Promise<Report[]> {
    try {
      const response = await api.get(`/api/reports/history/${websiteName}`);
      return response.data.map(mapApiReportToReport);
    } catch (error) {
      console.error(`Error fetching report history for ${websiteName}:`, error);
      throw error;
    }
  },

  // Delete a report
  async deleteReport(id: string): Promise<void> {
    try {
      await api.delete(`/api/reports/${id}`);
    } catch (error) {
      console.error(`Error deleting report with ID ${id}:`, error);
      throw error;
    }
  },

  // Assign a report to a project
  async assignReportToProject(
    reportId: string,
    projectId: string
  ): Promise<Report> {
    try {
      const response = await api.patch(
        `/api/reports/${reportId}/project/${projectId}`
      );
      return mapApiReportToReport(response.data);
    } catch (error) {
      console.error("Error assigning report to project:", error);
      throw error;
    }
  },

  // Compare two reports
  async compareReports(report1Id: string, report2Id: string): Promise<any> {
    try {
      const response = await api.get("/api/reports/compare", {
        params: {
          report1: report1Id,
          report2: report2Id,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error comparing reports:", error);
      throw error;
    }
  },
};
