function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

export function renderApplications(container, applications) {
  if (applications.length === 0) {
    container.innerHTML = '<p class="empty">No applications match.</p>';
    return;
  }

  container.innerHTML = applications.map(app => `
    <article class="card application-card" data-id="${app.id}">
      <h3>${escapeHtml(app.company)}</h3>
      <p><strong>Position:</strong> ${escapeHtml(app.position)}</p>
      <p><strong>Status:</strong> ${escapeHtml(app.status)}</p>
      <p><strong>Date:</strong> ${escapeHtml(app.date)}</p>
      <p><strong>Notes:</strong> ${escapeHtml(app.notes || "No notes")}</p>
      <div class="card-actions">
        <button type="button" class="edit-btn">Edit</button>
        <button type="button" class="secondary delete-btn">Delete</button>
      </div>
    </article>
  `).join("");
}
