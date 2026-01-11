import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('=== ERROR BOUNDARY CAUGHT ===');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Component Stack:', errorInfo.componentStack);
    console.error('Window width:', window.innerWidth);
    console.error('Is mobile:', window.innerWidth < 768);
    
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          fontFamily: 'monospace',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          minHeight: '100vh'
        }}>
          <h1 style={{ color: '#ff6b6b' }}>⚠️ Error Detected</h1>
          <h2>Error Message:</h2>
          <pre style={{ 
            backgroundColor: '#2a2a2a', 
            padding: '10px', 
            borderRadius: '5px',
            overflow: 'auto'
          }}>
            {this.state.error?.toString()}
          </pre>
          
          <h2>Stack Trace:</h2>
          <pre style={{ 
            backgroundColor: '#2a2a2a', 
            padding: '10px', 
            borderRadius: '5px',
            overflow: 'auto',
            fontSize: '12px'
          }}>
            {this.state.error?.stack}
          </pre>
          
          <h2>Component Stack:</h2>
          <pre style={{ 
            backgroundColor: '#2a2a2a', 
            padding: '10px', 
            borderRadius: '5px',
            overflow: 'auto',
            fontSize: '12px'
          }}>
            {this.state.errorInfo?.componentStack}
          </pre>
          
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🔄 Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;