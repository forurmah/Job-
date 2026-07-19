import { loadApplications, saveApplications } from "./storage.js";
import { getFormValues, isValidApplication, STATUSES } from "./validation.js";
import { renderApplications } from "./ui.js";

const form = document.getElementById("appForm");
const companyInput = document.getElementById("companyInput");
const positionInput = document.getElementById("positionInput");
const statusSelect = document.getElementById("statusSelect");
const dateInput = document.getElementById("dateInput");
const notesInput = document.getElementById("notesInput");
const searchInput = document.getElementById("searchInput");
const submitButton = document.getElementById("submitBtn");
const cancelEditButton = document.getElementById("cancelEditBtn");
const applicationsContainer = document.getElementById("applicationsContainer");
const filterButtons = document.querySelectorAll("[data-filter]");

let applications = loadApplications();
let activeFilter = "All";
let editApplicationId = null;

function getVisibleApplications() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  return applications.filter(application => {
    const matchesFilter =
      activeFilter === "All" ||
      (STATUSES.includes(activeFilter) && application.status === activeFilter);
    const matchesSearch =
      application.company.toLowerCase().includes(searchTerm) ||
      application.position.toLowerCase().includes(searchTerm);

    return matchesFilter && matchesSearch;
  });
}

function render() {
  renderApplications(applicationsContainer, getVisibleApplications());
}

function fillForm(application) {
  companyInput.value = application.company;
  positionInput.value = application.position;
  statusSelect.value = application.status;
  dateInput.value = application.date;
  notesInput.value = application.notes || "";
}

function startEditing(application) {
  editApplicationId = application.id;
  fillForm(application);

  submitButton.textContent = "Save changes";
  cancelEditButton.hidden = false;
  companyInput.focus();
}

function stopEditing() {
  editApplicationId = null;
  form.reset();

  submitButton.textContent = "Add application";
  cancelEditButton.hidden = true;
}

function createApplication(values) {
  return {
    id: Date.now(),
    ...values
  };
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const values = getFormValues();

  if (!isValidApplication(values)) {
    return;
  }

  if (editApplicationId) {
    applications = applications.map(application =>
      application.id === editApplicationId ? { ...application, ...values } : application
    );
  } else {
    applications = [createApplication(values), ...applications];
  }

  saveApplications(applications);
  stopEditing();
  render();
});

cancelEditButton.addEventListener("click", () => {
  stopEditing();
});

searchInput.addEventListener("input", render);

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach(filterButton => {
      filterButton.classList.toggle("is-active", filterButton === button);
    });

    render();
  });
});

applicationsContainer.addEventListener("click", event => {
  const card = event.target.closest(".application-card");

  if (!card) {
    return;
  }

  const applicationId = Number(card.dataset.id);
  const application = applications.find(item => item.id === applicationId);

  if (event.target.classList.contains("edit-btn") && application) {
    startEditing(application);
  }

  if (event.target.classList.contains("delete-btn")) {
    applications = applications.filter(item => item.id !== applicationId);
    saveApplications(applications);

    if (editApplicationId === applicationId) {
      stopEditing();
    }

    render();
  }
});

render();
