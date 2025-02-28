# Learning Management System (LMS)

## Overview

This is a modern, responsive Learning Management System (LMS) built with React, TypeScript, and Vite. The application allows management of trainers and courses, providing a seamless experience for adding, viewing, and deleting training resources.

## Features

- 🏫 Manage Trainers
  - Add new trainers
  - View trainer details
  - Delete trainers
- 📚 Course Management
  - Add new courses
  - View course details
  - Delete courses
- 🎨 Responsive Design
- 🔍 Validation with Zod
- 💾 State Management with React Query
- 🎨 Styled with Tailwind CSS and Shadcn UI

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later)
- npm (v9 or later)

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Hook Form
- Zod Validation
- React Query
- React Router

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/lms-project.git
cd lms-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Backend

This project uses a JSON Server as a mock backend. Install it globally:

```bash
npm install -g json-server
```

### 4. Start the Mock Backend

In a separate terminal, run:

```bash
json-server --watch data.json --port 5000
```

### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

- `src/`
  - `api/`: API service hooks
  - `components/`: Reusable UI components
  - `pages/`: Top-level page components
  - `types/`: TypeScript type definitions
  - `validation/`: Zod validation schemas

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/lms-project](https://github.com/yourusername/lms-project)
