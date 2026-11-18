# Edge Cases — Think fast. Code precisely.

Edge Cases is a real-time 1v1 competitive programming platform where developers challenge each other to solve algorithmic coding problems with a focus on strict boundary and edge conditions.

Built with **React**, **JavaScript**, **Standard CSS**, and **Monaco Editor**, designed with an authentic, dense, dark-mode developer aesthetic inspired by modern engineering software (Linear, GitHub, professional IDEs).

---

## ⚡ Tech Stack & Architecture

- **Core**: React 19 + JavaScript (ESNext / JSX)
- **Styling**: Standard Modular CSS (`src/styles/*.css`) with CSS custom properties and zero CSS frameworks.
- **Routing**: React Router v7 (`react-router-dom`)
- **Code Editor**: Monaco Editor (`@monaco-editor/react`)
- **Icons**: Lucide React (`lucide-react`)
- **Networking**: Axios (`axios`) + Socket.IO Client (`socket.io-client`)
- **Bundler**: Vite 8

---

## 📁 Project Structure

```text
edgecases/
├── public/
│   └── favicon.svg           # Terminal-inspired brand SVG favicon
├── src/
│   ├── components/
│   │   ├── Badge.jsx         # Difficulty and status tags
│   │   ├── Button.jsx        # Reusable button with variants & loading state
│   │   ├── Input.jsx         # Accessible form inputs with validation
│   │   ├── Modal.jsx         # Accessible confirmation dialogs
│   │   ├── Navbar.jsx        # Top navigation with authentic wordmark
│   │   ├── RatingChart.jsx   # Clean SVG sparkline/area progression chart
│   │   └── Sidebar.jsx       # Persistent developer navigation sidebar
│   ├── context/
│   │   └── AuthContext.jsx   # Session restoration, login/signup, demo user
│   ├── pages/
│   │   ├── Arena.jsx         # 1v1 Matchmaking lobby with difficulty/language selectors
│   │   ├── Battle.jsx        # Dense professional coding IDE with Monaco editor
│   │   ├── Dashboard.jsx     # Overview, stats ribbon, recent battles, rating graph
│   │   ├── Home.jsx          # Editorial landing page with hero battle preview
│   │   ├── Leaderboard.jsx   # Ranked ladder with time filters and top tier badges
│   │   ├── Login.jsx         # Login screen with inline validation & quick demo sign-in
│   │   ├── Practice.jsx      # Filterable & searchable problem library table
│   │   ├── Profile.jsx       # Rating history, solved problems, and IDE settings
│   │   ├── Results.jsx       # Concise post-match battle summary & rematch actions
│   │   └── Signup.jsx        # Registration with password strength meter
│   ├── services/
│   │   ├── api.js            # Centralized API client with mock fallbacks
│   │   ├── mockData.js       # Believable DSA problems, test cases, and rankings
│   │   └── socket.js         # Socket.IO client interface & matchmaking simulator
│   ├── styles/
│   │   ├── arena.css         # Matchmaking queue styles
│   │   ├── auth.css          # Auth split view & code preview panels
│   │   ├── battle.css        # Live IDE split layout, editor & test tabs
│   │   ├── buttons.css       # Button variants & spinner
│   │   ├── dashboard.css     # Metrics ribbon and table styles
│   │   ├── forms.css         # Inputs, selects, and validation errors
│   │   ├── global.css        # Design tokens, CSS variables, dark scrollbars
│   │   ├── home.css          # Landing page & preview cards
│   │   ├── leaderboard.css   # Leaderboard table & badges
│   │   ├── navbar.css        # Navbar styles
│   │   ├── practice.css      # Problem library styles
│   │   ├── profile.css       # Profile and settings layout
│   │   ├── results.css       # Match outcome card styles
│   │   └── sidebar.css       # Persistent sidebar styles
│   ├── App.jsx               # Application routes & layout shells
│   └── main.jsx              # DOM entry point
├── .env.example              # Environment variables template
├── index.html                # HTML template with Google Fonts (Inter & JetBrains Mono)
├── package.json              # Dependencies and scripts
└── vite.config.js            # Vite build configuration with alias '@'
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The server will boot at `http://localhost:5173/`.

### 3. Build for Production
```bash
npm run build
```

---

## 🎮 Key Features

1. **1v1 Matchmaking Arena (`/arena`)**:
   - Filter by difficulty (Any, Easy, Medium, Hard), preferred language (Python, JS, C++, Java), and match type.
   - Interactive live status log showing queue latency and candidate pairing.
   - 4-second synchronized launch countdown.

2. **Professional Coding IDE (`/battle/:matchId`)**:
   - Synchronized top status bar showing countdown timer, player ratings, and live opponent status (`Typing...`, `Running tests...`).
   - Left panel: Problem statement, input/output constraints, test cases, and collapsible hints.
   - Right panel: Full Monaco Editor with multi-language starter templates, font size controls, and reset.
   - Bottom panel: Test case inspector (Case 1, Case 2, Case 3), stdout log, and judge verdict.
   - Forfeit dialog with confirmation.

3. **Developer Dashboard (`/dashboard`)**:
   - Metrics ribbon showing Elo rating, battles count, win rate, and streak.
   - Rating progression chart using pure SVG sparklines.
   - Recent match history table and recommended problem list.

4. **Problem Library (`/practice`)**:
   - Search by keyword, filter by difficulty and topic, track solved status with pagination.

5. **Competitive Leaderboard (`/leaderboard`)**:
   - Real-time rankings, top 3 badges, timeframes (All-Time, Season 3, Weekly), and subtle current-user highlighting.

6. **Authentication & Session Management (`/login`, `/signup`)**:
   - Password strength analyzer, inline field validation, and 1-click Quick Demo Sign-in as `dev_kiran` (1840 Elo).
