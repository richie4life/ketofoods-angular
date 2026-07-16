# 🥑 Keto Nutrition Tracker — Full-Stack Capstone Application

A modern, responsive, full-stack web application designed to track Keto-friendly recipes and foods. This application enables users to manage their recipes, upload meal photos, and visualize macronutrient distribution (Calories, Fat, Protein, and Net Carbs) via a real-time responsive dashboard.

---

## 🛠️ Tech Stack

- **Frontend**: 
  - **Framework**: Angular (Standalone Components, Signals, Standalone Router, Reactive Forms)
  - **Styling**: Bootstrap 5.3 + Custom CSS variables (including glassmorphism headers, card hover micro-animations, and theme-aligned macronutrient progress bars)
- **Backend**:
  - **Framework**: Node.js with Express (ES Modules `import`/`export` syntax, Layered MVC-style architecture: Router ➡️ Controller ➡️ Service ➡️ Repository)
  - **File Uploads**: `multer` middleware for multi-part file uploads of food images
- **Database**: 
  - **Database**: MongoDB (persistence layer)

---

## 🌟 Key Features

1. **Modern Responsive Dashboard Grid**: A grid of recipe cards featuring hover lifting animations, card click routing, and color-coded macronutrient badges.
2. **Instant Live Search**: A frontend search bar utilizing Angular Signals (`computed()`) to instantly filter recipe names or calories.
3. **Split Macronutrient Dashboard**: A dedicated details page illustrating a split view: large food picture on the left and dynamic macronutrient balance progress-bar distribution on the right (dynamically calculates percentage weight distribution of Fat, Protein, and Net Carbs).
4. **Conditional Image Rendering**: Smart templates that hide the image layout if no photo was uploaded, dynamically expanding text blocks to full width.
5. **Full CRUD Operations**: Full capability to create recipes (with image file uploads), read lists & details, update existing items, and delete entries.
6. **Robust ID Mapping**: Express backend parses incoming UUID string IDs (for newly created entries) and numeric IDs (for pre-seeded items) automatically.

---

## 📂 Project Structure

```text
├── Nutrition-Tracker-Branch (Backend API)
│   ├── config/             # Environment-based database config (.json)
│   ├── controllers/        # Express request/response controllers
│   ├── middleware/         # Custom Express validation & error handling middleware
│   ├── repositories/       # MongoDB queries & database client layer
│   ├── routes/             # Express API routing tables
│   ├── services/           # Business logic service layers
│   ├── static/             # Static file uploads path
│   └── server.js           # Server startup script
│
└── ketofoods-angular (Frontend Client)
    ├── src/
    │   ├── app/
    │   │   ├── keto-listing/   # Main grid view & live search filter
    │   │   ├── keto-overview/  # Individual food card component
    │   │   ├── keto-details/   # Detailed view with macro progress bars
    │   │   ├── keto-create/    # Form card to create new keto foods
    │   │   ├── keto-edit/      # Form card to edit recipe values
    │   │   └── app.html        # App layout with sticky glassmorphic navbar
    │   ├── styles.css          # Global design variables & theme variables
    │   └── proxy.conf.json     # Angular CLI proxy forwarding /api to port 3000
```

---

## 🚀 Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) running locally (by default at `mongodb://127.0.0.1:27017` with database name `Keto`)

### 🗃️ Database Seeding & Architecture
This application is built with an **offline-first, self-contained architecture**. Rather than querying external APIs at runtime, the Express backend serves data directly from your local MongoDB instance. This enables full CRUD operations (creating, editing, and deleting items) and avoids runtime API rate limits.

The initial database records were seeded by:
1. Fetching raw ketogenic recipe data from the **Spoonacular API** using the Bruno API client.
2. Running a **Post-Response script** inside Bruno to extract, validate, and flatten the nutritional metrics (Fat, Protein, Net Carbs, Calories) into a flat schema.
3. Seeding the resulting JSON payload directly into the MongoDB `Keto` collection.

### 1. Backend Server Setup
1. Navigate to the backend directory:
   ```bash
   cd Nutrition-Tracker-Branch
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Express server:
   ```bash
   node server.js
   ```
   The backend will start listening at `http://localhost:3000`.

### 2. Frontend Client Setup
1. Navigate to the Angular directory:
   ```bash
   cd ketofoods-angular
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the development server (configured with proxy forwarding to the backend API):
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:4200/`.

---

## 📋 API Route Documentation

All API routes are prefixed with `/api/v1/ketoFoods`.

| Method | Endpoint | Description | Payload Example |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Retrieves list of all keto foods | *None* |
| **GET** | `/:id` | Retrieves a single keto food by ID | *None* |
| **POST** | `/` | Creates a new food item (supports image upload) | Multipart Form (`title`, `calories`, `fat`, `protein`, `netCarbs`, `ketoImage`) |
| **PUT** | `/:id` | Replaces an entire food item | JSON body (Full recipe details) |
| **PATCH**| `/:id` | Partially updates fields on an entry | JSON body (e.g. `{ "title": "Updated Title" }`) |
| **DELETE**| `/:id` | Removes a food item from the database | *None* |
