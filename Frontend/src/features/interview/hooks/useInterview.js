import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
  generateResumePdf,
} from "../services/interview.api";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();

  if (!context) {
    throw new Error("UseInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (error) {
      //  CHANGE MADE HERE (IMPORTANT FOR DEBUGGING)
      console.log("FULL ERROR:", error.response?.data || error.message);

      return null;
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    try {
      const response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (error) {
      // ✅ SAME IMPROVEMENT HERE (optional but recommended)
      console.log("FULL ERROR:", error.response?.data || error.message);

      return null;
    } finally {
      setLoading(false);
    }
  };

  const getReports = async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      setReports(response.interviewReports);
      return response.interviewReports;
    } catch (error) {
      // ✅ SAME IMPROVEMENT HERE
      console.log("FULL ERROR:", error.response?.data || error.message);

      return null;
    } finally {
      setLoading(false);
    }
  };

  /* useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReportById();
    }
  }, [interviewId]); */

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);

    try {
      const response = await generateResumePdf({ interviewReportId });

      //  Axios returns blob in response.data
      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewReportId}.pdf`);

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("PDF DOWNLOAD ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
  };
};
