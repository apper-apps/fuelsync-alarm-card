import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import Dashboard from "@/components/organisms/Dashboard";
import FuelEntriesList from "@/components/organisms/FuelEntriesList";
import FuelEntryForm from "@/components/organisms/FuelEntryForm";
import FloatingActionButton from "@/components/organisms/FloatingActionButton";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import useFuelEntries from "@/hooks/useFuelEntries";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { entries, loading, error, addEntry, deleteEntry, getLastEntry, refetch } = useFuelEntries();

  const handleAddEntry = async (entryData) => {
    await addEntry(entryData);
    setIsFormOpen(false);
  };

  const handleDeleteEntry = async (id) => {
    await deleteEntry(id);
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        className="container mx-auto px-4 py-8 max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-8">
          {/* Dashboard */}
          <Dashboard entries={entries} />

          {/* Fuel Entries List */}
          <FuelEntriesList
            entries={entries}
            onDeleteEntry={handleDeleteEntry}
            onAddEntry={handleOpenForm}
          />
        </div>
      </motion.div>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleOpenForm} />

      {/* Fuel Entry Form */}
      <FuelEntryForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddEntry}
        lastEntry={getLastEntry()}
      />

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="z-[9999]"
      />
    </div>
  );
}

export default App;