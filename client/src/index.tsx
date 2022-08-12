import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existingData, incomingData) {
                        return incomingData;
                    },
                },
                projects: {
                    merge(existingData, incomingData) {
                        return incomingData;
                    },
                },
            },
        },
    },
});

const client = new ApolloClient({
    cache,
    uri: 'http://localhost:2022/graphql',
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Router>
                <App />
            </Router>
        </ApolloProvider>
    </React.StrictMode>
);
reportWebVitals();
