const mongoose = require("mongoose");

// ── Technical Questions ──
const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },

    // ✅ FIX 1: intension → intention
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
  },
  { _id: false }
);

// ── Behavioral Questions ──
const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },

    // ✅ FIX 1 here also
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
  },
  { _id: false }
);

// ── Skill Gaps ──
const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  { _id: false }
);

// ── Preparation Plan ──
const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is required"],
  },
  focus: {
    type: String,
    required: [true, "Focus is required"],
  },

  // ✅ FIX 2: task → tasks
  tasks: [
    {
      type: String,
      required: [true, "Task is required"],
    },
  ],
});

// ── Main Schema ──
const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    resume: String,
    selfDescription: String,

    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],

    // ✅ FIX 3: title moved INSIDE schema
    title: {
      type: String,
      required: [true, "Job title is required"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

const InterviewReport = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = InterviewReport;