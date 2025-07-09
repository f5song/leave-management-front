
import { Toaster } from "@/Components/Toaster";
// import { Toaster as Sonner } from "@components/ui/sonner";
// import { TooltipProvider } from "@components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/Contexts/AuthContext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Calendar from "./Pages/Calendar";
import NotFound from "./Pages/NotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Landing from "./Pages/Landing";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <TooltipProvider> {/* <TooltipProvider> */}
        <Toaster />
        {/* <Sonner /> */}
        <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/calendar" element={<Calendar />} />
            {/* <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            /> */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);

export default App;
