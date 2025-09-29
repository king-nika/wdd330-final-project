export const loadPartial = async (id, file) => {
  const container = document.getElementById(id);

  if (container) {
    try {
      const response = await fetch(`/partials/${file}`);
      const html = await response.text();
      container.innerHTML = html;
    } catch (error) {
      console.error(`Error loading partial ${file}:`, error);
    }
  }
};

export const loadHeaderAndFooter = async () => {
  await loadPartial("header", "header.html");
  await loadPartial("footer", "footer.html");
};
