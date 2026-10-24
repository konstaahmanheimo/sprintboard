
# Sprintboard

A responsive task management application built with React. Sprintboard helps users organize tasks into workflow columns, track sprint progress, and manage priorities.

## Features

- **Task management:** Create, edit, delete, and move tasks between workflow columns.
- **Search:** Find tasks by title or description.
- **Priority filtering:** Filter tasks by high, medium, or low priority.
- **Sprint progress:** Track completed tasks with a visual progress bar.
- **Local storage:** Tasks persist in the browser between sessions.
- **Notifications:** Receive feedback when performing actions.
- **Responsive design:** Works on desktop and mobile screens.
- **Accessible interactions:** Includes keyboard focus indicators and reduced-motion support.

## Tech Stack

- React
- JavaScript (ES6+)
- Vite
- CSS
- Lucide React
- Browser Local Storage

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/sprintboard.git
cd sprintboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Data Storage

Sprintboard stores tasks in the browser's Local Storage. Tasks remain available after refreshing the page, but the data is specific to the browser and device. There is currently no backend or user account system.

## Project Structure

```text
src/
├── components/
│   ├── Column.jsx
│   ├── TaskCard.jsx
│   ├── TaskForm.jsx
│   └── Toast.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Future Improvements

- Drag-and-drop task management
- Due dates and task labels
- Unit and component tests
- Backend integration and user authentication

## License

This project was created as a personal learning and portfolio project.
