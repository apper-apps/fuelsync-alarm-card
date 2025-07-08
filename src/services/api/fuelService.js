import fuelEntriesData from "@/services/mockData/fuelEntries.json";

class FuelService {
  constructor() {
    this.storageKey = "fuelsync_entries";
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.entries = JSON.parse(stored).map(entry => ({
          ...entry,
          date: new Date(entry.date)
        }));
      } else {
        this.entries = fuelEntriesData.map(entry => ({
          ...entry,
          date: new Date(entry.date)
        }));
        this.saveToStorage();
      }
    } catch (error) {
      console.error("Error loading from storage:", error);
      this.entries = [...fuelEntriesData];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
    } catch (error) {
      console.error("Error saving to storage:", error);
    }
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sortedEntries = [...this.entries].sort((a, b) => new Date(b.date) - new Date(a.date));
        resolve(sortedEntries);
      }, 300);
    });
  }

  async getById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const entry = this.entries.find(entry => entry.Id === parseInt(id));
        resolve(entry ? { ...entry } : null);
      }, 200);
    });
  }

  async create(entryData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const highestId = this.entries.length > 0 ? 
          Math.max(...this.entries.map(entry => entry.Id)) : 0;
        
        const newEntry = {
          ...entryData,
          Id: highestId + 1,
          date: new Date(entryData.date)
        };
        
        this.entries.push(newEntry);
        this.saveToStorage();
        resolve({ ...newEntry });
      }, 300);
    });
  }

  async update(id, entryData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.entries.findIndex(entry => entry.Id === parseInt(id));
        if (index !== -1) {
          this.entries[index] = {
            ...this.entries[index],
            ...entryData,
            Id: parseInt(id),
            date: new Date(entryData.date)
          };
          this.saveToStorage();
          resolve({ ...this.entries[index] });
        } else {
          resolve(null);
        }
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.entries.findIndex(entry => entry.Id === parseInt(id));
        if (index !== -1) {
          const deletedEntry = this.entries.splice(index, 1)[0];
          this.saveToStorage();
          resolve(deletedEntry);
        } else {
          resolve(null);
        }
      }, 200);
    });
  }

  async calculateMileage(entries) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (entries.length < 2) {
          resolve(entries);
        }

        const calculatedEntries = entries.map((entry, index) => {
          if (index === 0) {
            return { ...entry, mileage: 0, tripDistance: 0 };
          }

          const prevEntry = entries[index - 1];
          const tripDistance = entry.odometerReading - prevEntry.odometerReading;
          const mileage = tripDistance / prevEntry.fuelQuantity;

          return {
            ...entry,
            tripDistance,
            mileage: mileage > 0 ? mileage : 0
          };
        });

        resolve(calculatedEntries);
      }, 200);
    });
  }
}

export default new FuelService();