# React CRUD Application

Deployed Link on Vercel: https://react-crud-app-drab.vercel.app/ 

A comprehensive React CRUD (Create, Read, Update, Delete) application built with TypeScript, Redux Toolkit, and Tailwind CSS. This application follows Clean Architecture principles and demonstrates best practices for building scalable React applications.


## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Components](#components)
- [State Management](#state-management)
- [Filtering & Sorting](#filtering--sorting)
- [Error Handling](#error-handling)
- [Code Quality](#code-quality)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### CRUD Operations
- **Create**: Add new posts with form validation
- **Read**: Display paginated list of posts with detailed view
- **Update**: Edit existing posts with inline form
- **Delete**: Remove posts with confirmation dialog

### Data Management
- Error handling with user feedback via toast notifications
- Loading states for asynchronous operations
- Optimistic updates for better user experience

### Filtering & Sorting
- Search by title and description
- Sort by date or title (ascending/descending)
- Filter by creation date range
- Reset filters functionality

### UI/UX
- Responsive design (mobile-first approach)
- Form validation feedback
- Toast notifications for operation feedback
- Smooth transitions and animations
- Confirmation dialogs for destructive actions

## 🏗️ Architecture

This application follows Clean Architecture principles with a strict separation of concerns:

### Domain Layer
- Contains core business logic and entities
- Defines interfaces that are implemented by other layers
- Independent of frameworks and external concerns

### Data Layer
- Handles API interactions and data management
- Implements repository interfaces defined in the domain layer
- Uses Axios for HTTP requests

### Presentation Layer
- Contains UI components and state management
- Uses Redux Toolkit for global state management
- Implements the UI according to the application's requirements

## 🛠️ Technology Stack

- **React.js**: UI library
- **TypeScript**: Type-safe JavaScript
- **Redux Toolkit**: State management
- **React Hook Form**: Form handling and validation
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client
- **date-fns**: Date manipulation
- **Lucide React**: Icon library

## 🚀 Getting Started

### Prerequisites

- Node.js 
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/phdevApps/react-crud-app.git
   cd react-crud-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   vite
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
vite build
```

## 📁 Project Structure

```
src/
├── data/               # Data layer
│   └── api/            # API clients and services
├── domain/             # Domain layer
│   └── entities/       # Business entities and interfaces
├── presentation/       # Presentation layer
│   ├── components/     # React components
│   └── store/          # Redux store configuration
├── utils/              # Utility functions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🔌 API Integration

The application integrates with [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for demonstration purposes. The following endpoints are used:

- `GET /posts`: Fetch all posts
- `GET /posts/{id}`: Fetch a single post
- `POST /posts`: Create a new post
- `PUT /posts/{id}`: Update an existing post
- `DELETE /posts/{id}`: Delete a post

## 🧩 Components

### ItemList
- Main component that displays the list of posts
- Includes filtering, sorting, and pagination controls
- Handles the creation of new posts

### ItemCard
- Displays individual post information
- Provides edit and delete functionality
- Shows creation date

### ItemForm
- Handles both creation and editing of posts
- Implements form validation
- Provides feedback on submission

### ItemFilter
- Allows searching by title/description
- Provides date range filtering

### ItemSort
- Enables sorting by date or title
- Toggles between ascending and descending order

### Pagination
- Handles navigation between pages of posts

### Toast & ToastContainer
- Provides feedback for user actions
- Displays success, error, and info messages

## 🔄 State Management

The application uses Redux Toolkit for state management with the following slices:

### postsSlice
- Manages the posts data and related operations
- Handles filtering, sorting, and pagination
- Implements async thunks for API calls

### notificationsSlice
- Manages toast notifications
- Handles adding and removing notifications

## 🔍 Filtering & Sorting

The application provides comprehensive filtering and sorting capabilities:

- **Search**: Filter posts by title or description
- **Date Range**: Filter posts by creation date
- **Sorting**: Sort by date or title in ascending or descending order
- **Reset**: Clear all filters and return to default view

## ⚠️ Error Handling

The application implements robust error handling:

- Form validation with clear error messages
- API error handling with user feedback via toast notifications
- Loading states to indicate ongoing operations
- Retry mechanisms for failed requests

## 📊 Code Quality

The project maintains high code quality standards:

- **TypeScript**: Strict type checking throughout the application
- **ESLint**: Code linting for consistent style
- **Clean Architecture**: Separation of concerns for maintainability
- **SOLID Principles**: Following best practices for object-oriented design
- **DRY & KISS**: Avoiding repetition and keeping code simple

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
