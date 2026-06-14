# Wanderlust

A full-stack web application designed to simulate a real-world travel accommodation marketplace (like Airbnb). The platform allows travelers to explore and search listings, while hosts can list, manage, and receive reviews for their properties.

---

### Technology Stack
* **Frontend**: HTML5, CSS3, EJS, BootStrap 5, Vanilla JavaScript.
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB Atlas.
* **Authentication**: Passport.js and Express-Session.
* **Validation**: Joi schema validator for backend data validation.

---

### Key Features
1. **Dynamic Listing Discovery & Filters**:
   - Categorize accommodations with interactive tags (e.g., *Hotels, Cities, Mountains, Castles, Pools, Farms, Arctic, Beaches*).
   - Filter listings by location or country using MongoDB `$regex` matching.
2. **Comprehensive CRUD Operations**:
   - Authorized users can create new listings, edit details, upload new images, and delete listings.
   - Non-authenticated users can browse listing details but cannot modify content.
3. **Interactive Review System**:
   - Authenticated users can leave star ratings and comments on listings.
4. **Secure Authentication & Authorization**:
   - Secure registration, login, and logout flows powered by **Passport.js**.
   - Custom route authorization middlewares ensure users can only edit or delete listings they own or reviews they authored.
5. **Media Upload & Cloud Integration**:
   - Listings support user-selected photo uploads, saved to a remote cloud directory via **Cloudinary**.
   - Configured fallback images for listings without user-provided images.
6. **Robust Error Handling**:
   - Flash alerts using **connect-flash** to give immediate feedback on successful/failed operations.
   - Comprehensive error middleware catching internal exceptions and invalid client-side requests.

---

### Project Structure
* **`app.js`**: The central application file initializing Express, Mongo connection, Passport strategies, and routes.
* **`cloud-config.js`**: Configures integration between Multer and Cloudinary.
* **`controllers/`**: Controller layer separating business logic from routing (e.g., [listings.js](file:///C:/Programming/Development/Full-Stack%20Projects/Wanderlust/controllers/listings.js)).
* **`models/`**: Mongoose schemas defining database tables for listings, reviews, and users.
* **`routes/`**: Express routes grouping end-points (listings, reviews, and user accounts).
* **`views/`**: Dynamic EJS pages using EJS-Mate layouts for responsive templates.
* **`public/`**: Client-side styling, and scripts.

---

### Live Demo
[Visit Wanderlust Here!](https://the-wanderlust.vercel.app)
