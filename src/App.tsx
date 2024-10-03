import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "mobx-react";
import { MainStore } from "./stores/MainStore";
import { Router } from './Router/Router';


const mainStore: MainStore = new MainStore();

const App = () => <Provider MainStore={mainStore}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
;

export default App;


// import React from "react";
// import { Provider } from "mobx-react";
// import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
// import { MainStore } from "./stores/MainStore";
// import { Router } from './Router/Router';

// const queryClient = new QueryClient()

// const mainStore: MainStore = new MainStore();

// const App = () => (<QueryClientProvider client={queryClient}>
// <Provider MainStore={mainStore}>
//       <Router />
//     </Provider>
//   </QueryClientProvider>)
// ;

// export default App;
