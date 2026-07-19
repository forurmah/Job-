const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

export function getFormValues() {
  return {
    company: document.getElementById("companyInput").value.trim(),
    position: document.getElementById("positionInput").value.trim(),
    status: document.getElementById("statusSelect").value,
    date: document.getElementById("dateInput").value,
    notes: document.getElementById("notesInput").value.trim()
  };
}

export function isValidApplication(values) {
  return Boolean(
    values.company &&
    values.position &&
    STATUSES.includes(values.status) &&
    values.date
  );
}
