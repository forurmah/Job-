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

export function saveApplications(applications) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

export function loadApplications() {
  try {
    const savedApplications = localStorage.getItem(STORAGE_KEY);
    return savedApplications ? JSON.parse(savedApplications) : starterApplication;
  } catch {
       return starterApplication;
  }
}
