// Edge Cases — Centralized API Client & Service Modules
import axios from 'axios';
import {
  INITIAL_USER,
  MOCK_PROBLEMS,
  MOCK_LEADERBOARD,
  MOCK_BATTLES_HISTORY
} from './mockData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Create configured Axios instance
export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Supports secure HTTP-only cookie authentication
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor for centralized error logging
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // In production with real backend, handle 401 unauth session expiry
    if (error.response && error.response.status === 401) {
      console.warn('API Unauthorized response (session expired or unauthenticated)');
    }
    return Promise.reject(error);
  }
);

// Session storage key for development mock persistence
const MOCK_AUTH_STORAGE_KEY = 'edgecases_auth_user_v1';

// Helper to check if mock fallback should be used
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

/* --- Authentication API Services --- */
export const authApi = {
  async getCurrentUser() {
    if (!USE_MOCK) {
      const res = await apiClient.get('/auth/me');
      return res.data;
    }
    // Mock simulation
    const saved = localStorage.getItem(MOCK_AUTH_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  },

  async login({ email, password, rememberMe }) {
    if (!USE_MOCK) {
      const res = await apiClient.post('/auth/login', { email, password, rememberMe });
      return res.data;
    }
    // Believable mock validation
    await new Promise((r) => setTimeout(r, 600)); // Network delay simulation
    if (password.length < 6) {
      throw new Error('Invalid credentials. Password must be at least 6 characters.');
    }
    const user = {
      ...INITIAL_USER,
      email,
    };
    localStorage.setItem(MOCK_AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  async signup({ fullName, username, email, password }) {
    if (!USE_MOCK) {
      const res = await apiClient.post('/auth/signup', { fullName, username, email, password });
      return res.data;
    }
    await new Promise((r) => setTimeout(r, 700));
    const user = {
      ...INITIAL_USER,
      id: `usr_${Date.now()}`,
      fullName,
      username,
      email,
      rating: 1400,
      ratingChange: '+0',
      tier: 'Apprentice',
      battlesCount: 0,
      wins: 0,
      losses: 0,
      winRate: '0%',
      streak: 0,
    };
    localStorage.setItem(MOCK_AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  async logout() {
    if (!USE_MOCK) {
      await apiClient.post('/auth/logout');
    }
    localStorage.removeItem(MOCK_AUTH_STORAGE_KEY);
    return true;
  },
};

/* --- Problems Service --- */
export const problemsApi = {
  async getProblems({ difficulty, topic, search } = {}) {
    if (!USE_MOCK) {
      const res = await apiClient.get('/problems', { params: { difficulty, topic, search } });
      return res.data;
    }
    let list = [...MOCK_PROBLEMS];
    if (difficulty && difficulty !== 'All') {
      list = list.filter((p) => p.difficulty.toLowerCase() === difficulty.toLowerCase());
    }
    if (topic && topic !== 'All') {
      list = list.filter((p) => p.topic.toLowerCase() === topic.toLowerCase());
    }
    if (search && search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.topic.toLowerCase().includes(q));
    }
    return list;
  },

  async getProblemById(idOrSlug) {
    if (!USE_MOCK) {
      const res = await apiClient.get(`/problems/${idOrSlug}`);
      return res.data;
    }
    const problem = MOCK_PROBLEMS.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || MOCK_PROBLEMS[0];
    return problem;
  },
};

/* --- Leaderboard Service --- */
export const leaderboardApi = {
  async getLeaderboard(timeframe = 'all-time') {
    if (!USE_MOCK) {
      const res = await apiClient.get('/leaderboard', { params: { timeframe } });
      return res.data;
    }
    return MOCK_LEADERBOARD;
  },
};

/* --- Matches & Battle Service --- */
export const matchApi = {
  async getRecentMatches() {
    if (!USE_MOCK) {
      const res = await apiClient.get('/matches/recent');
      return res.data;
    }
    return MOCK_BATTLES_HISTORY;
  },

  async runTests(problemId, language, code, testCaseInput) {
    if (!USE_MOCK) {
      const res = await apiClient.post('/judge/run', { problemId, language, code, testCaseInput });
      return res.data;
    }
    // Realistic judge mock simulation
    await new Promise((r) => setTimeout(r, 650));
    return {
      status: 'Accepted',
      runtime: '38 ms',
      memory: '14.2 MB',
      stdout: '[debug] execution completed without errors\n',
      passedCount: 3,
      totalCount: 3,
      details: 'All public test cases passed successfully.'
    };
  },

  async submitSolution(problemId, language, code) {
    if (!USE_MOCK) {
      const res = await apiClient.post('/judge/submit', { problemId, language, code });
      return res.data;
    }
    await new Promise((r) => setTimeout(r, 1100));
    return {
      status: 'Accepted',
      runtime: '42 ms',
      memory: '15.1 MB',
      passedTests: 6,
      totalTests: 6,
      ratingDelta: +24,
      coinsEarned: 25,
      summary: 'Passed 6/6 test cases including all hidden boundary conditions.'
    };
  }
};
