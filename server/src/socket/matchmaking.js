const waitingPlayers = [];

export function setupMatchmaking(io) {
  io.on('connection', (socket) => {
    console.log('Player connected:', socket.id);

    // Matches: this.socket.emit('matchmaking:join', { difficulty, language, user })
    socket.on('matchmaking:join', ({ difficulty, language, user }) => {
      // Prevent duplicate entries
      if (waitingPlayers.some((p) => p.socketId === socket.id)) return;

      const player = {
        socketId: socket.id,
        difficulty: difficulty || 'Medium',
        language: language || 'javascript',
        user: {
          username: user?.username || `Coder_${socket.id.slice(0, 4)}`,
          rating: user?.rating || 1500,
          tier: user?.tier || 'Challenger',
          avatar: (user?.username || 'CD').slice(0, 2).toUpperCase(),
        },
      };

      waitingPlayers.push(player);

      // Send status update to the waiting player
      socket.emit('matchmaking:status', {
        status: 'searching',
        message: 'Connected to live pool. Waiting for a real opponent...',
        ping: '18ms',
      });

      // Pair the first 2 players in line
      if (waitingPlayers.length >= 2) {
        const p1 = waitingPlayers.shift();
        const p2 = waitingPlayers.shift();
        const matchId = `match_${Date.now()}`;

        const s1 = io.sockets.sockets.get(p1.socketId);
        const s2 = io.sockets.sockets.get(p2.socketId);

        s1?.join(matchId);
        s2?.join(matchId);

        // Send each player their specific opponent's profile
        s1?.emit('matchmaking:matched', {
          matchId,
          opponent: p2.user,
          problemId: 'longest-unique-substring',
          timeLimitSeconds: 15 * 60,
        });

        s2?.emit('matchmaking:matched', {
          matchId,
          opponent: p1.user,
          problemId: 'longest-unique-substring',
          timeLimitSeconds: 15 * 60,
        });
      }
    });

    // Matches: this.socket.emit('matchmaking:cancel')
    socket.on('matchmaking:cancel', () => {
      const index = waitingPlayers.findIndex((p) => p.socketId === socket.id);
      if (index !== -1) waitingPlayers.splice(index, 1);
    });

    // Live battle events (typing, test runs, submissions)
    socket.on('battle:join', ({ matchId }) => {
      socket.join(matchId);
    });

    socket.on('battle:update', ({ matchId, event }) => {
      socket.to(matchId).emit('opponent:event', event);
    });

    socket.on('disconnect', () => {
      const index = waitingPlayers.findIndex((p) => p.socketId === socket.id);
      if (index !== -1) waitingPlayers.splice(index, 1);
    });
  });
}