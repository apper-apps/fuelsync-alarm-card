import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import FuelEntryCard from "@/components/organisms/FuelEntryCard";
import ConfirmDialog from "@/components/molecules/ConfirmDialog";
import Empty from "@/components/ui/Empty";

const FuelEntriesList = ({ entries, onDeleteEntry, onAddEntry }) => {
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      onDeleteEntry(deleteId);
      setDeleteId(null);
      toast.success("Fuel entry deleted successfully!");
    }
  };

  if (!entries || entries.length === 0) {
    return (
      <Empty
        onAction={onAddEntry}
        actionText="Add Your First Fuel Entry"
      />
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-display font-semibold text-secondary-800">
        Fuel History
      </h2>
      
      <AnimatePresence>
        {entries.map((entry) => (
          <FuelEntryCard
            key={entry.id}
            entry={entry}
            onDelete={handleDelete}
          />
        ))}
      </AnimatePresence>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Fuel Entry"
        message="Are you sure you want to delete this fuel entry? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default FuelEntriesList;