# North Star Bakery — Touchstone 3 Implementation Explanation

## Client and User Need
North Star Bakery serves customers who want to quickly browse baked goods, remember products they are interested in, and submit a clear pre-order or inquiry. The site uses a warm, community-centered tone and simple navigation. A useful improvement is allowing visitors to save favorite product categories while browsing and carry those choices into the pre-order process.

## Interactive Feature
I added a **Bakery Favorites** feature to the Products page. Visitors can click **Add to Favorites** for Artisanal Breads, Handmade Pastries, or Custom Cakes. The page immediately updates to show which items are saved. Clicking the button again removes the item, and a **Clear Favorites** button removes all selections.

The feature is purposeful because customers can keep track of products they may want to order instead of remembering them manually.

### JavaScript organization
The JavaScript is divided into small functions, including:
- `getStoredFavorites()` to load saved selections
- `saveFavorites()` to save selections
- `toggleFavorite()` to add or remove a product
- `updateFavoritesDisplay()` to update the page
- `initializeFavoritesFeature()` to attach event listeners
- separate validation functions for each form field

The code uses an array of product objects called `bakeryProducts` to manage the product data.

## Form Validation
JavaScript validation was added to the Contact & Pre-orders form. The form prevents invalid submission and shows messages next to the relevant fields.

Validation includes:
- required full name check
- minimum name length check
- required email check
- email format validation
- required request type check
- required item-details check
- minimum 10-character item-details check

When a field is invalid, the field is visually highlighted and a custom error message appears nearby. Users can correct the field immediately without restarting the form.

## Browser Storage
The site uses `localStorage` with the key `northStarFavorites`.

When a visitor saves a favorite product, the selected product IDs are stored in the browser. When the Products or Contact page opens, the JavaScript loads those saved selections automatically.

On the Contact page, the saved favorites are displayed to the visitor. The **Add Favorites to Request** button can insert those saved product names into the order-details field, helping the visitor complete the pre-order form faster.

## User Experience Benefit
This implementation connects product browsing with the pre-order process. It reduces memory effort, gives immediate visual feedback, preserves choices across pages, and improves form usability with clear validation messages.

## Files Updated
- `products.html` — favorites controls and dynamic summary
- `contact.html` — saved-favorites display and validation message areas
- `script.js` — interactive feature, localStorage, and form validation
- `styles.css` — styles for buttons, favorites, error states, and success feedback
