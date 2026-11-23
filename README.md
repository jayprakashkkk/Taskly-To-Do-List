<div align="center">

# 📋 TASKLY — Smart Tasks & Recipe Planner
### *Minimalist, Real-Time Cloud-Synchronized Task Management & AI Recipe Assistant*

[![Live Demo](https://img.shields.io/badge/Live_Demo-dotask.pages.dev-2563EB?style=for-the-badge&logo=cloudflarepages&logoColor=white)](https://dotask.pages.dev/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Edge_Functions-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![Neon Database](https://img.shields.io/badge/Neon-Serverless_Postgres-00E599?style=for-the-badge&logo=postgresql&logoColor=black)](https://neon.tech/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://github.com/jayprakashkkk/Taskly-To-Do-List)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://github.com/jayprakashkkk/Taskly-To-Do-List)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://github.com/jayprakashkkk/Taskly-To-Do-List)
[![License](https://img.shields.io/badge/License-MIT-purple.svg?style=for-the-badge)](LICENSE)

<br/>

**Taskly** is an ultra-fast, responsive task management and meal-planning web application designed to eliminate friction from daily productivity. Engineered with a **dual-layer storage engine**: blazingly fast client-side `localStorage` combined with automatic, real-time background cloud synchronization to **Neon Serverless PostgreSQL** via **Cloudflare Pages Functions**.

[Live Demo](https://dotask.pages.dev/) • [Key Features](#-key-features) • [Cloud Sync Architecture](#-cloud-sync-architecture) • [API Specification](#-rest-api-specification) • [Local Development](#-local-development)

---

</div>

## 📑 Table of Contents

- [Overview](#-overview)
- [✨ Key Features](#-key-features)
- [☁️ Cloud Sync Architecture](#-cloud-sync-architecture)
- [📡 REST API Specification](#-rest-api-specification)
- [🍳 AI Recipe Assistant](#-ai-recipe-assistant)
- [🛠️ Technology Stack](#-technology-stack)
- [💻 Local Development & Setup](#-local-development)
- [🌐 Cloudflare Deployment](#-cloudflare-deployment)
- [📂 Directory Structure](#-directory-structure)
- [📄 License & Author](#-license--author)

---

## 🌟 Overview

Most to-do list applications suffer from one of two problems: they either require tedious account registration with passwords and email verifications, or they are locked to a single browser via local storage.

**Taskly** solves both problems effortlessly:
1. **Zero-Password Frictionless Identity**: Access your workspace simply with your email address. No passwords, no verification delays, and no lock-in.
2. **Instant Offline First + Seamless Cloud Sync**: Changes update immediately in the UI and `localStorage` with zero latency, while syncing silently to Neon PostgreSQL in the background. Your to-do lists and meal recipes stay perfectly synchronized across your phone, tablet, and PC.

---

## ✨ Key Features

- **🔄 Real-Time Cross-Device Synchronization**:
  - Automatically pushes changes to the cloud on task creation, completion, deletion, or priority edit.
  - Pulls latest updates on load and window focus so work begun on mobile immediately reflects on desktop.
- **📂 Workspace Navigation Drawer**:
  - Minimalist 2-line toggle button (`=`) on top left.
  - Smooth sliding drawer on both Desktop and Mobile views.
  - Quick views:
    - ▦ **All Tasks** (with dynamic live count badge)
    - ★ **Important** (pinned and high-priority tasks)
    - ◷ **Added Today** (tasks scheduled or created today)
    - 🍳 **Recipe** (AI-powered smart culinary planner)
- **🔍 Instant Top Search Filter**:
  - Unified search bar at the very top for sub-millisecond filtering across tasks, tags, and ingredients.
- **⚡ Interactive Task Workflow**:
  - 3-tier priority tags (`Low`, `Medium`, `High`) with clear visual badges.
  - Pin crucial tasks to the top of the stack.
  - Completed items automatically dim and transition to the bottom to keep the active view uncluttered.
  - Live circular/linear daily progress indicator displaying completed percentage.
- **🌗 Dark / Light Mode Suite**:
  - High-contrast ergonomic dark mode and crisp daylight theme with instant state persistence.
- **📱 100% Fullscreen Responsive Design**:
  - Fluid edge-to-edge layout designed without awkward lateral margins, adapting natively to phones, tablets, and ultrawide screens.

---

## ☁️ Cloud Sync Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       TASKLY CLIENT                         │
│   (Instant UI Updates ──► Web Storage / localStorage)       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                       Background Fetch
                       /api/sync (JSON)
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               CLOUDFLARE PAGES FUNCTIONS                    │
│            Edge Proxy / Serverless Handler                  │
│       - CORS Handling    - Method Routing (GET/POST)        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                     Neon HTTP SQL Gateway
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 NEON SERVERLESS POSTGRESQL                  │
│       Table: taskly_user_data (email PK, tasks_json JSONB)   │
│             UPSERT (ON CONFLICT DO UPDATE)                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📡 REST API Specification

Handled serverlessly at edge via `functions/api/sync.js`:

### 1. Retrieve User Tasks
- **Endpoint**: `GET /api/sync?email={user_email}`
- **Response**:
  ```json
  {
    "ok": true,
    "exists": true,
    "updatedAt": "2026-11-23T07:45:00Z",
    "tasks": [
      {
        "id": "1732345200",
        "title": "Complete System Design Review",
        "priority": "high",
        "completed": false,
        "pinned": true,
        "createdAt": "2026-11-23"
      }
    ]
  }
  ```

### 2. Synchronize / Save Tasks
- **Endpoint**: `POST /api/sync`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "tasks": [ ... ]
  }
  ```
- **Response**:
  ```json
  {
    "ok": true,
    "saved": true,
    "count": 5
  }
  ```

---

## 🍳 AI Recipe Assistant

Taskly incorporates an integrated **Smart Recipe Planner**:
- Plan weekly breakfasts, lunches, and dinners directly alongside your daily chores.
- Convert recipe ingredients into to-do shopping list items with a single tap.
- Categorized meal prep suggestions tailored to your dietary preferences.

---

## 🛠️ Technology Stack

- **Client**: Semantic HTML5, Modern CSS3 (CSS Variables, Flexbox, CSS Grid, cubic-bezier animations), Vanilla ES6+ JavaScript.
- **Serverless Edge Computing**: [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/) (V8 isolate edge runtime).
- **Cloud Database**: [Neon Serverless PostgreSQL](https://neon.tech/) (JSONB documents, connection pooling, autoscaling storage).
- **Hosting & CDN**: [Cloudflare Pages](https://pages.cloudflare.com/) edge network.

---

## 💻 Local Development

### 1. Clone the Repository
```bash
git clone https://github.com/jayprakashkkk/Taskly-To-Do-List.git
cd Taskly-To-Do-List
```

### 2. Run Locally with Wrangler (Cloudflare CLI)
To test both the frontend and the `/api/sync` Pages Functions locally:
```bash
npx wrangler pages dev .
```
This runs the full edge environment on `http://localhost:8788`.

### 3. Run Standalone (Static Mode)
If you only want to test the UI and `localStorage` features:
```bash
npx serve .
# or
open index.html
```

---

## 🌐 Cloudflare Deployment

Deploying Taskly to Cloudflare Pages takes under two minutes:
1. Connect your GitHub repository to **Cloudflare Pages**.
2. **Build Settings**:
   - **Framework preset**: None
   - **Build command**: *(Leave blank)*
   - **Build output directory**: `/`
3. Functions located in `functions/` are automatically detected and compiled at the edge.

---

## 📂 Directory Structure

```
Taskly-To-Do-List/
├── functions/
│   └── api/
│       ├── sync.js              # Serverless Edge sync handler (Neon SQL)
│       └── [[path]].js          # Catch-all API router
├── index.html                   # Main production web application
├── taskly to do list/
│   └── index.html               # Alternate standalone template
├── LICENSE                      # MIT Open-Source License
└── README.md                    # Comprehensive project documentation
```

---

## 📄 License & Author

Crafted with care by **[Jay Prakash](https://github.com/jayprakashkkk)**.

Released under the **MIT License**. Feel free to fork, customize, and deploy for your own productivity needs!
