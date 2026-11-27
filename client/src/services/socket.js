import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:8000';

class BattleSocketService {
  constructor() {
    this.socket = null;
  }

  connect(authToken) {
    if (this.socket) return this.socket;

    this.socket = io(SOCKET_URL, {
      auth: { token: authToken },
      autoConnect: true,
      reconnection: true,
    });

    this.socket.on('connect', () => {
      console.log('Connected to backend socket:', this.socket.id);
    });

    this.socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinMatchmaking({ difficulty, language, user }, onStatus, onMatchFound) {
    const socket = this.connect();

    const emitJoin = () => {
      socket.off('matchmaking:status');
      socket.off('matchmaking:matched');
      socket.on('matchmaking:status', onStatus);
      socket.on('matchmaking:matched', onMatchFound);
      socket.emit('matchmaking:join', { difficulty, language, user });
    };

    if (socket.connected) {
      emitJoin();
    } else {
      onStatus({
        status: 'searching',
        message: 'Connecting to live server...',
        ping: '15ms',
      });
      socket.once('connect', emitJoin);
    }
  }

  cancelMatchmaking() {
    if (this.socket && this.socket.connected) {
      this.socket.emit('matchmaking:cancel');
    }
  }

  subscribeToMatch(matchId, onOpponentEvent) {
    const socket = this.connect();
    socket.emit('battle:join', { matchId });
    socket.off('opponent:event');
    socket.on('opponent:event', onOpponentEvent);

    return () => {
      socket.off('opponent:event', onOpponentEvent);
    };
  }
}

export const battleSocket = new BattleSocketService();