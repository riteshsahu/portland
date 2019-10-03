import React, {Component} from 'react';


class ErrorBoundary extends Component {
    constructor(props) {
     super(props);
     this.state = {
          hasError: false
     };
   }
   
   static getDerivedStateFromError(error) {
     // Update state so the next render will show the fallback UI.
     return { hasError: true };
   }
   
//    componentDidCatch(error, info) {
//      // log the error to our server with loglevel
//      log.error({ error, info });
//    }
   
   render() {
    if (this.state.hasError) {
     // You can render any custom fallback UI
     return <h1>Something went wrong.</h1>;
    }
   
    
   }
   }
   
   export default ErrorBoundary;