import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Introduction from "./pages/assessment/Introduction";
import Psychometric from "./pages/assessment/Psychometric";
import Technical from "./pages/assessment/Technical";
import WISCAR from "./pages/assessment/WISCAR";
import Results from "./pages/assessment/Results";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assessment/intro" element={<Introduction />} />
          <Route path="/assessment/psychometric" element={<Psychometric />} />
          <Route path="/assessment/technical" element={<Technical />} />
          <Route path="/assessment/wiscar" element={<WISCAR />} />
          <Route path="/assessment/results" element={<Results />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
