// src/services/reportService.ts
import api from './Api';
import { Report, ReportHistoryQuery, mapApiReportToReport } from '../types/Report';

export const reportService = {
  // Get reports history
  async getReportsHistory(query: ReportHistoryQuery = {}): Promise<{ reports: Report[], total: number }> {
    try {
      const response = await api.get('/reports', { params: query });
      return {
        reports: response.data.reports.map(mapApiReportToReport),
        total: response.data.total
      };
    } catch (error) {
      console.error('Error fetching reports history:', error);
      throw error;
    }
  },

  // Get reports by project
  async getReportsByProject(projectId: string, query: ReportHistoryQuery = {}): Promise<{ reports: Report[], total: number }> {
    try {
      const response = await api.get(`/reports/project/${projectId}`, { params: query });
      return {
        reports: response.data.reports.map(mapApiReportToReport),
        total: response.data.total
      };
    } catch (error) {
      console.error('Error fetching reports by project:', error);
      throw error;
    }
  },

  // Get specific report by ID
  async getReportById(id: string): Promise<Report> {
    try {
      const response = await api.get(`/reports/${id}`);
      return mapApiReportToReport(response.data);
    } catch (error) {
      console.error(`Error fetching report with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a report
  async deleteReport(id: string): Promise<void> {
    try {
      await api.delete(`/reports/${id}`);
    } catch (error) {
      console.error(`Error deleting report with ID ${id}:`, error);
      throw error;
    }
  },

  // Assign a report to a project
  async assignReportToProject(reportId: string, projectId: string): Promise<Report> {
    try {
      const response = await api.patch(`/reports/${reportId}/project/${projectId}`);
      return mapApiReportToReport(response.data);
    } catch (error) {
      console.error('Error assigning report to project:', error);
      throw error;
    }
  },

  // Compare two reports
  async compareReports(report1Id: string, report2Id: string): Promise<any> {
    try {
      const response = await api.get('/reports/compare', { 
        params: { 
          report1: report1Id, 
          report2: report2Id 
        } 
      });
      return response.data;
    } catch (error) {
      console.error('Error comparing reports:', error);
      throw error;
    }
  }
};