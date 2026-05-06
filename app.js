// setup
const form = document.getElementById("newsletterForm");
const submitButton = document.getElementById("submitButton");
const notifyBox = document.querySelector(".notifications");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Funkcja do tworzenia toastów
const createToast = (title, message, type) => {
  if (notifyBox.children.length >= 3) return;

  const newToast = document.createElement("div");

  newToast.classList.add("toast", type);

  const titleEl = document.createElement("strong");
  const messageEl = document.createElement("p");

  titleEl.textContent = title;
  messageEl.textContent = message;

  newToast.appendChild(titleEl);
  newToast.appendChild(messageEl);
  notifyBox.appendChild(newToast);

  setTimeout(() => newToast.remove(), 3000);
};

// Funkcja do walidacji emaila
const isEmailValid = (email) => {
  if (email.trim() === "") {
    createToast("Błąd!", "Pole nie może być puste!", "error");
    return false;
  }

  if (!EMAIL_REGEX.test(email)) {
    createToast("Błąd!", "Wpisz poprawny adres email.", "error");
    return false;
  }
  return true;
};

// Smulacja fetcha
const mockFetch = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ ok: true, status: 200 });
  }, 1000);
});

// Obsługa submitu formularza
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = form.elements.email.value;
  if (!isEmailValid(email)) return;

  submitButton.disabled = true;
  const originalText = submitButton.textContent;
  submitButton.textContent = "Wysyłanie...";

  // symulacja wysłania danych i obsługi odpowiedzi
  mockFetch()
    .then((result) => {
      if (!result.ok) {
        throw new Error(`Serwer odpowiedział błędem: ${result.status}`);
      }

      createToast("Sukces!", "Email zapisano pomyślnie!", "success");
      form.reset();
    })
    .catch((err) => {
      console.error(err);
      createToast("Błąd!", "Coś poszło nie tak, spróbuj później.", "error");
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    });
});
