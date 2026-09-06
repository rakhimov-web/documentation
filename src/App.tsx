import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import LibraryOverview from "./pages/LibraryOverview";
import TopicDetail from "./pages/TopicDetail";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:groupId/:libId" element={<LibraryOverview />} />
        <Route path="/:groupId/:libId/:topicId" element={<TopicDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
