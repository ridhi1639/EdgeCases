// Edge Cases — Application Entry Point
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: '#0C0C12', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', padding: '40px' }}>
          <div style={{ color: '#DC1C1C', fontSize: '20px', marginBottom: '16px' }}>⚠ App Crashed</div>
          <div style={{ color: '#FF4D4D', fontSize: '14px', marginBottom: '24px' }}>{this.state.error?.message}</div>
          <pre style={{ color: '#969DA5', fontSize: '11px', maxWidth: '800px', overflowX: 'auto', background: '#181824', padding: '16px', borderRadius: '8px' }}>
            {this.state.error?.stack}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: '24px', background: '#DC1C1C', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer' }}>
            Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
