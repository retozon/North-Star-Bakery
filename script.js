const bakeryProducts = [
    { id: "bread", name: "Artisanal Breads" },
    { id: "pastries", name: "Handmade Pastries" },
    { id: "cakes", name: "Custom Cakes" }
];

const FAVORITES_KEY = "northStarFavorites";

function getStoredFavorites() {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function getProductName(productId) {
    const product = bakeryProducts.find(item => item.id === productId);
    return product ? product.name : productId;
}

function toggleFavorite(productId) {
    const favorites = getStoredFavorites();
    const updatedFavorites = favorites.includes(productId)
        ? favorites.filter(id => id !== productId)
        : [...favorites, productId];

    saveFavorites(updatedFavorites);
    updateFavoritesDisplay();
}

function updateFavoritesDisplay() {
    const favorites = getStoredFavorites();
    const summary = document.getElementById("favorites-summary");

    if (summary) {
        summary.textContent = favorites.length
            ? `Saved favorites: ${favorites.map(getProductName).join(", ")}.`
            : "You have not saved any favorites yet.";
    }

    document.querySelectorAll(".favorite-button").forEach(button => {
        const isFavorite = favorites.includes(button.dataset.productId);
        button.textContent = isFavorite ? "Remove from Favorites" : "Add to Favorites";
        button.setAttribute("aria-pressed", String(isFavorite));
    });

    const contactSummary = document.getElementById("saved-favorites-contact");
    if (contactSummary) {
        contactSummary.textContent = favorites.length
            ? `You saved: ${favorites.map(getProductName).join(", ")}.`
            : "No favorites saved yet. Visit the Products page to choose some.";
    }

    const addFavoritesButton = document.getElementById("add-favorites-to-request");
    if (addFavoritesButton) {
        addFavoritesButton.disabled = favorites.length === 0;
    }
}

function initializeFavoritesFeature() {
    document.querySelectorAll(".favorite-button").forEach(button => {
        button.addEventListener("click", () => toggleFavorite(button.dataset.productId));
    });

    const clearButton = document.getElementById("clear-favorites");
    if (clearButton) {
        clearButton.addEventListener("click", () => {
            saveFavorites([]);
            updateFavoritesDisplay();
        });
    }

    const addFavoritesButton = document.getElementById("add-favorites-to-request");
    if (addFavoritesButton) {
        addFavoritesButton.addEventListener("click", () => {
            const favorites = getStoredFavorites();
            const details = document.getElementById("item-details");

            if (details && favorites.length) {
                const favoriteText = `I am interested in: ${favorites.map(getProductName).join(", ")}.`;
                details.value = details.value.trim()
                    ? `${details.value.trim()}\n${favoriteText}`
                    : favoriteText;
                details.focus();
            }
        });
    }

    updateFavoritesDisplay();
}

function setError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);

    if (field) {
        field.classList.toggle("invalid-field", Boolean(message));
        field.setAttribute("aria-invalid", String(Boolean(message)));
    }

    if (error) {
        error.textContent = message;
    }
}

function validateName() {
    const field = document.getElementById("customer-name");
    const value = field.value.trim();
    let message = "";

    if (!value) {
        message = "Please enter your full name.";
    } else if (value.length < 2) {
        message = "Name must be at least 2 characters long.";
    }

    setError("customer-name", "name-error", message);
    return !message;
}

function validateEmail() {
    const field = document.getElementById("customer-email");
    const value = field.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let message = "";

    if (!value) {
        message = "Please enter your email address.";
    } else if (!emailPattern.test(value)) {
        message = "Please enter a valid email address, such as name@example.com.";
    }

    setError("customer-email", "email-error", message);
    return !message;
}

function validateRequestType() {
    const field = document.getElementById("request-type");
    const message = field.value ? "" : "Please select a request type.";
    setError("request-type", "request-type-error", message);
    return !message;
}

function validateDetails() {
    const field = document.getElementById("item-details");
    const value = field.value.trim();
    let message = "";

    if (!value) {
        message = "Please enter your order details or question.";
    } else if (value.length < 10) {
        message = "Please provide at least 10 characters of detail.";
    }

    setError("item-details", "details-error", message);
    return !message;
}

function initializeFormValidation() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    document.getElementById("customer-name").addEventListener("input", validateName);
    document.getElementById("customer-email").addEventListener("input", validateEmail);
    document.getElementById("request-type").addEventListener("change", validateRequestType);
    document.getElementById("item-details").addEventListener("input", validateDetails);

    form.addEventListener("submit", event => {
        event.preventDefault();

        const results = [
            validateName(),
            validateEmail(),
            validateRequestType(),
            validateDetails()
        ];

        const status = document.getElementById("form-status");
        const isValid = results.every(Boolean);

        if (isValid) {
            status.textContent = "Your request looks good and is ready to submit.";
            status.className = "form-status success-message";
        } else {
            status.textContent = "Please correct the highlighted fields before submitting.";
            status.className = "form-status error-message";
            const firstInvalid = form.querySelector(".invalid-field");
            if (firstInvalid) firstInvalid.focus();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initializeFavoritesFeature();
    initializeFormValidation();
});
