const pdfParse = require("pdf-parse");
const {
  generateInterviewReport,
  generateResumePdf,
} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");
const mongoose = require("mongoose");

/**
 * @description Controller to generate interview report
 */
async function generateInterviewReportController(req, res) {
  try {
    // ✅ check file exists
    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required",
      });
    }

    // ✅ check file type
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        message: "Only PDF files are allowed",
      });
    }

    // ✅ debug info
    console.log("FILE INFO:", {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });

    // ✅ safe PDF parsing
    let resumeContent;

    try {
      const pdfData = await pdfParse(req.file.buffer);
      resumeContent = pdfData.text;
    } catch (err) {
      console.error("PDF PARSE ERROR:", err);

      return res.status(400).json({
        message: "Invalid or corrupted PDF file",
      });
    }

    // ✅ ensure text extracted
    if (!resumeContent || resumeContent.trim().length < 20) {
      return res.status(400).json({
        message: "Could not extract text from PDF",
      });
    }

    const { selfDescription, jobDescription } = req.body;

    // ✅ validate inputs
    if (!selfDescription || !jobDescription) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const interViewReportByAi = await generateInterviewReport({
      resume: resumeContent,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent,
      selfDescription,
      jobDescription,
      ...interViewReportByAi,
    });

    res.status(201).json({
      message: "Interview report generated successfully.",
      interviewReport,
    });
  } catch (error) {
    console.error("ERROR generating report:", error);

    res.status(500).json({
      message: "Failed to generate report",
      error: error.message,
    });
  }
}

/**
 * @description Get interview report by ID
 */
async function getInterviewReportByIdController(req, res) {
  try {
    const { interviewId } = req.params;

    if (!interviewId || interviewId === "undefined") {
      return res.status(400).json({
        message: "Interview ID is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(interviewId)) {
      return res.status(400).json({
        message: "Invalid interview ID.",
      });
    }

    const interviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found.",
      });
    }

    res.status(200).json({
      message: "Interview report fetched successfully.",
      interviewReport,
    });
  } catch (error) {
    console.error("Error fetching report:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

/**
 * @description Get all reports
 */
async function getAllInterviewReportsController(req, res) {
  try {
    const interviewReports = await interviewReportModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
      );

    res.status(200).json({
      message: "Interview reports fetched successfully.",
      interviewReports,
    });
  } catch (error) {
    console.error("Error fetching all reports:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

/**
 * @description Generate resume PDF
 */
async function generateResumePdfController(req, res) {
  try {
    const { interviewReportId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(interviewReportId)) {
      return res.status(400).json({
        message: "Invalid interview report ID",
      });
    }

    const interviewReport = await interviewReportModel.findOne({
      _id: interviewReportId,
      user: req.user.id,
    });
    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found.",
      });
    }

    const { resume, jobDescription, selfDescription } = interviewReport;

    const pdfBuffer = await generateResumePdf({
      resume,
      jobDescription,
      selfDescription,
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("ERROR generating PDF:", error);

    res.status(500).json({
      message: "Failed to generate PDF",
      error: error.message,
    });
  }
}

module.exports = {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
};
