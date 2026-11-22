// Edge Cases — Real-time Socket.IO Interface & Simulated 1v1 Matchmaking Bus
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';

class BattleSocketService {
  constructor() {
    this.socket = null;
    this.simulatedTimers = [];
  }

  // Connect to production Socket.IO server if available
  connect(authToken) {
    if (this.socket) return;
    try {
      this.socket = io(SOCKET_URL, {
        auth: { token: authToken },
        autoConnect: false,
        reconnection: true,
        transports: ['websocket'],
      });

      this.socket.on('connect_error', () => {
        // Fall back quietly to local simulation bus in development
      });
    } catch (err) {
      console.warn('Socket.IO initialization bypassed for local simulator:', err);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.clearSimulation();
  }

  clearSimulation() {
    this.simulatedTimers.forEach(clearTimeout);
    this.simulatedTimers = [];
  }

  // Join matchmaking queue with chosen difficulty and language
  joinMatchmaking({ difficulty, language, user }, onStatus, onMatchFound) {
    // 1. If real socket is connected, emit real event
    if (this.socket && this.socket.connected) {
      this.socket.emit('matchmaking:join', { difficulty, language });
      this.socket.on('matchmaking:status', onStatus);
      this.socket.on('matchmaking:matched', onMatchFound);
      return;
    }

    // 2. Simulated local matchmaking pipeline (authentic developer feedback)
    this.clearSimulation();

    onStatus({
      status: 'searching',
      message: 'Querying matching pool for rating ±150...',
      ping: '24ms'
    });

    const timer1 = setTimeout(() => {
      onStatus({
        status: 'searching',
        message: 'Broadening search filter to active queue...',
        ping: '26ms'
      });
    }, 1800);

    const timer2 = setTimeout(() => {
      onStatus({
        status: 'allocating',
        message: 'Candidate located: @algo_rythm (Rating: 1825). Allocating sandboxed runner...',
        ping: '22ms'
      });
    }, 3400);

    const timer3 = setTimeout(() => {
      const matchId = `match_${Math.floor(1000 + Math.random() * 9000)}`;
      onMatchFound({
        matchId,
        opponent: {
          username: 'algo_rythm',
          rating: 1825,
          tier: 'Specialist',
          avatar: 'AR'
        },
        problemId: 'longest-unique-substring',
        timeLimitSeconds: 15 * 60, // 15 minutes
      });
    }, 4800);

    this.simulatedTimers.push(timer1, timer2, timer3);
  }

  cancelMatchmaking() {
    if (this.socket && this.socket.connected) {
      this.socket.emit('matchmaking:cancel');
    }
    this.clearSimulation();
  }

  // Live in-match status stream simulation
  subscribeToMatch(matchId, onOpponentEvent) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('battle:join', { matchId });
      this.socket.on('opponent:event', onOpponentEvent);
      return () => {
        this.socket.off('opponent:event', onOpponentEvent);
      };
    }

    // Simulate authentic opponent actions in battle
    const t1 = setTimeout(() => {
      onOpponentEvent({ type: 'status', text: 'Typing solution...' });
    }, 3000);

    const t2 = setTimeout(() => {
      onOpponentEvent({ type: 'status', text: 'Ran initial tests (passed 2/3)' });
    }, 28000);

    const t3 = setTimeout(() => {
      onOpponentEvent({ type: 'status', text: 'Refactoring edge cases...' });
    }, 65000);

    const t4 = setTimeout(() => {
      onOpponentEvent({ type: 'status', text: 'Submitted solution (5/6 tests passed)' });
    }, 120000);

    this.simulatedTimers.push(t1, t2, t3, t4);

    return () => {
      this.clearSimulation();
    };
  }
}

export const battleSocket = new BattleSocketService();
