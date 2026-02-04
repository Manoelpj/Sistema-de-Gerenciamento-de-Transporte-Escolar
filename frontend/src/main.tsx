import { StrictMode } from 'react'
import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from 'primereact/api';
import { router } from "./router";
import "./index.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </StrictMode>,
)