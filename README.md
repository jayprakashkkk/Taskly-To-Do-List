# Taskly — Smart Tasks & Recipe Planner

Taskly is a modern, responsive, and minimalist task management web application designed to help users organize daily activities, plan meals with an AI recipe assistant, track progress, and boost daily productivity with zero friction.

---

## ✨ Features

- **2-Line Menu Toggle Sidebar**:
  - Minimalist 2-line menu button (`=`) on the top left.
  - Collapsible/expandable **WORKSPACE** drawer on both Desktop and Mobile.
  - Quick workspace navigation:
    - ▦ **All Tasks** (with live count badge)
    - ★ **Important** (pinned / high-priority items)
    - ◷ **Added Today** (tasks created today)
    - 🍳 **Recipe** (AI-powered smart recipe assistant)

- **Search Bar at the Very Top**:
  - Search bar placed right at the top of the interface for instantaneous filtering across tasks and ingredients.
  - Fully synchronized across desktop and mobile views.

- **Fast & Reliable Local Storage**:
  - Tasks and recipes are saved directly to `localStorage` in the browser.
  - Zero loading latency, instant updates, and offline capability.
  - Supports multiple user profiles by email without requiring passwords or external verification.

- **Interactive Task Management**:
  - Add tasks with priority levels (Low, Medium, High).
  - Pin important tasks to the top.
  - Mark tasks complete (completed items automatically move to the bottom with subtle styling).
  - Live daily progress bar showing completion percentage.

- **Theme & UI Controls**:
  - Clean Dark and Light mode toggles with persistence.
  - Optimized for desktop, tablet, and mobile screens.

---

## 🚀 Live Demo

- Production Deployment: **[https://dotask.pages.dev/](https://dotask.pages.dev/)**

---

## 🛠️ Tech Stack

- **HTML5 & Modern CSS3**: Custom CSS variables, responsive grid & flexbox, smooth cubic-bezier transitions.
- **JavaScript (Vanilla ES6+)**: Client-side routing, state management, search filters, and persistent `localStorage`.
- **Hosting**: Cloudflare Pages with instantaneous edge delivery.

---

## 💻 Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/jayprakashkkk/Taskly-To-Do-List.git
   cd Taskly-To-Do-List
   ```
2. Open `index.html` directly in your browser:
   ```bash
   open index.html
   ```
   Or serve with any static server:
   ```bash
   npx serve .
   ```

---

## 📄 License

Open-source personal project developed by [Jay Prakash](https://jayportfoliocms.pages.dev).
