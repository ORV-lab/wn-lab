import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import NovelInfo from "@/pages/NovelInfo";
import Reader from "@/pages/Reader";
import Library from "@/pages/Library";
import RawRequest from "@/pages/RawRequest";
import Profile from "@/pages/Profile";
import Catalog from "@/pages/Catalog";
import Collections from "@/pages/Collections";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/novel/:id" element={<NovelInfo />} />
            <Route path="/read/:novelId/:chapterNum" element={<Reader />} />
            <Route path="/library" element={<Library />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/requests" element={<RawRequest />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
