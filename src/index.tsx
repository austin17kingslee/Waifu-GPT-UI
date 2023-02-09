import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';
import ErrorPage from 'src/app/components/Commons/ErrorPage/ErrorPage';
import { subgraphService } from "src/app/services/subgraph/subgraphService";
import { persistor, store } from "src/app/redux";
import App from "src/app/App";
import 'src/assets/styles/index.scss';

const container = document.getElementById('root');

if (container !== null) {
  const root = createRoot(container);

  root.render(
    <ErrorPage>
      <Provider store={store}>
        <ApolloProvider client={subgraphService}>
          <PersistGate persistor={persistor} loading={null}>
            <App/>
          </PersistGate>
        </ApolloProvider>
      </Provider>
    </ErrorPage>
  );
}
