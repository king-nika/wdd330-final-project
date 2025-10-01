// Base URL for fetching partials and other resources
export const base = import.meta.env.BASE_URL;

export const showError = (message = "Something went wrong") => {
  const errorContainer = document.createElement("div");
  errorContainer.classList.add("error");
  errorContainer.textContent = message;

  document.body.prepend(errorContainer);

  setTimeout(() => {
    errorContainer.classList.add("show");
  }, 10);

  setTimeout(() => {
    errorContainer.classList.remove("show");
    errorContainer.classList.add("hide");
  }, 3000);

  setTimeout(() => {
    errorContainer.remove();
  }, 3500);
};
