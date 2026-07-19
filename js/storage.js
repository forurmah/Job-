import { STATUSES } from "./validation.js";

const STORAGE_KEY = "job-application";
const starterApplication = [
  {
    id: 1,
    company: "Google",
    position: "Frontend Developer",
    status: "Applied",
    date: "2006-08-07",
    notes: "I applied from LinkedIn"
  }
];

function isApplication(application) {
  return Boolean(
    application &&
    Number.isFinite(application.id) &&
    typeof application.company === "string" &&
    typeof application.position === "string" &&
    STATUSES.includes(application.status) &&
    typeof application.date === "string" &&
    typeof application.notes === "string"
  );
}

export function saveApplications(applications) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

export function loadApplications() {
  try {
    const savedApplications = localStorage.getItem(STORAGE_KEY);
    if (!savedApplications) {
      return starterApplication;
    }

    const applications = JSON.parse(savedApplications);
    return Array.isArray(applications) && applications.every(isApplication)
      ? applications
      : starterApplication;
  } catch {
    return starterApplication;
  }
}
