import { useState, useEffect } from "react";
import fuelService from "@/services/api/fuelService";

const useFuelEntries = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEntries = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await fuelService.getAll();
      setEntries(data);
    } catch (err) {
      setError("Failed to load fuel entries");
      console.error("Error loading entries:", err);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (entryData) => {
    try {
      setError("");
      const newEntry = await fuelService.create(entryData);
      await loadEntries(); // Reload to recalculate mileage
      return newEntry;
    } catch (err) {
      setError("Failed to add fuel entry");
      console.error("Error adding entry:", err);
      throw err;
    }
  };

  const deleteEntry = async (id) => {
    try {
      setError("");
      await fuelService.delete(id);
      await loadEntries(); // Reload to recalculate mileage
    } catch (err) {
      setError("Failed to delete fuel entry");
      console.error("Error deleting entry:", err);
      throw err;
    }
  };

  const updateEntry = async (id, entryData) => {
    try {
      setError("");
      const updatedEntry = await fuelService.update(id, entryData);
      await loadEntries(); // Reload to recalculate mileage
      return updatedEntry;
    } catch (err) {
      setError("Failed to update fuel entry");
      console.error("Error updating entry:", err);
      throw err;
    }
  };

  const getLastEntry = () => {
    if (entries.length === 0) return null;
    return entries.reduce((latest, current) => 
      new Date(current.date) > new Date(latest.date) ? current : latest
    );
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return {
    entries,
    loading,
    error,
    addEntry,
    deleteEntry,
    updateEntry,
    getLastEntry,
    refetch: loadEntries,
  };
};

export default useFuelEntries;