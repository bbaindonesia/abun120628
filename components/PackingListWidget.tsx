
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PackingItem {
  id: string;
  name: string;
  packed: boolean;
}

interface PackingCategory {
  id: string;
  name: string;
  items: PackingItem[];
}

const LOCAL_STORAGE_KEY = 'bba_packingListData';

const initialCategories: PackingCategory[] = [
  { id: 'cat1', name: 'Pakaian Ihram', items: [] },
  { id: 'cat2', name: 'Pakaian Sehari-hari', items: [] },
  { id: 'cat3', name: 'Dokumen Penting', items: [] },
  { id: 'cat4', name: 'Obat-obatan Pribadi', items: [] },
  { id: 'cat5', name: 'Perlengkapan Mandi', items: [] },
  { id: 'cat6', name: 'Elektronik', items: [] },
  { id: 'cat7', name: 'Lain-lain', items: [] },
];

const PackingListWidget: React.FC = () => {
  const [categories, setCategories] = useState<PackingCategory[]>(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : initialCategories;
  });
  const [newItemName, setNewItemName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(categories.length > 0 ? categories[0].id : null);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newItemName.trim() || !selectedCategoryId) return;
    const newItem: PackingItem = { id: Date.now().toString(), name: newItemName.trim(), packed: false };
    setCategories(prevCategories =>
      prevCategories.map(cat =>
        cat.id === selectedCategoryId ? { ...cat, items: [...cat.items, newItem] } : cat
      )
    );
    setNewItemName('');
  };

  const handleTogglePacked = (categoryId: string, itemId: string) => {
    setCategories(prevCategories =>
      prevCategories.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.map(item => item.id === itemId ? { ...item, packed: !item.packed } : item) }
          : cat
      )
    );
  };

  const handleDeleteItem = (categoryId: string, itemId: string) => {
    setCategories(prevCategories =>
      prevCategories.map(cat =>
        cat.id === categoryId ? { ...cat, items: cat.items.filter(item => item.id !== itemId) } : cat
      )
    );
  };

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    const newCategory: PackingCategory = { id: Date.now().toString(), name: newCategoryName.trim(), items: [] };
    setCategories(prevCategories => [...prevCategories, newCategory]);
    setSelectedCategoryId(newCategory.id);
    setNewCategoryName('');
  };

  const handleDeleteCategory = (categoryId: string) => {
    const categoryToDelete = categories.find(cat => cat.id === categoryId);
    if (categoryToDelete && categoryToDelete.items.length > 0) {
      if (!window.confirm(`Kategori "${categoryToDelete.name}" berisi item. Apakah Anda yakin ingin menghapusnya beserta semua item di dalamnya?`)) {
        return;
      }
    }
    setCategories(prevCategories => prevCategories.filter(cat => cat.id !== categoryId));
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(categories.length > 1 ? categories.find(cat => cat.id !== categoryId)?.id || null : null);
    }
  };

  const resetList = () => {
    if (window.confirm("Apakah Anda yakin ingin mengatur ulang seluruh daftar perlengkapan? Ini akan menghapus semua item dan kategori khusus.")) {
      setCategories(initialCategories);
      setSelectedCategoryId(initialCategories.length > 0 ? initialCategories[0].id : null);
    }
  };

  const DeleteIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-4 h-4"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.24.032 3.287.094M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
  
  const AddIcon: React.FC<{className?: string}> = ({className}) => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );


  return (
    <div className="p-2 space-y-4 text-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-3">
        <h3 className="text-lg font-semibold text-theme-accent text-glow-accent">Daftar Perlengkapan Umrah/Haji</h3>
        <button
            onClick={resetList}
            className="text-xs px-3 py-1.5 rounded-md bg-red-700 hover:bg-red-800 text-white border border-red-500 shadow-sm hover:shadow-md transition-all"
        >
            Atur Ulang Daftar
        </button>
      </div>

      {/* Add Category Form */}
      <form onSubmit={handleAddCategory} className="flex gap-2 mb-4 p-3 bg-theme-interactive/30 rounded-lg border border-[var(--color-theme-widget-border-hologram)]/70">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Nama kategori baru..."
          className="form-input flex-grow text-xs"
        />
        <button type="submit" className="px-3 py-1.5 bg-theme-accent hover:bg-theme-accent-hover text-white rounded-md text-xs font-semibold shadow-md hover:shadow-glow-accent-strong flex items-center gap-1">
          <AddIcon className="w-4 h-4"/> Tambah Kategori
        </button>
      </form>

      {categories.length === 0 && <p className="text-theme-text-muted text-center py-4">Belum ada kategori. Silakan tambahkan kategori baru.</p>}

      {/* Categories and Items */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-widget scrollbar-track-widget pr-2">
        <AnimatePresence>
          {categories.map(category => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-theme-widget-bg rounded-lg border border-[var(--color-theme-widget-border-hologram)] shadow-hologram-soft"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-md font-semibold text-theme-text">{category.name}</h4>
                <button onClick={() => handleDeleteCategory(category.id)} className="text-red-400 hover:text-red-600 transition-colors p-1" aria-label={`Hapus kategori ${category.name}`}>
                  <DeleteIcon />
                </button>
              </div>

              {/* Add Item Form for this category */}
              {selectedCategoryId === category.id && (
                <form onSubmit={handleAddItem} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Nama item baru..."
                    className="form-input flex-grow text-xs"
                    aria-label={`Tambah item ke ${category.name}`}
                  />
                  <button type="submit" className="px-3 py-1.5 bg-theme-accent hover:bg-theme-accent-hover text-white rounded-md text-xs font-semibold shadow-sm hover:shadow-glow-accent flex items-center gap-1">
                    <AddIcon className="w-3.5 h-3.5" /> Tambah Item
                  </button>
                </form>
              )}
              {selectedCategoryId !== category.id && (
                 <button 
                    onClick={() => { setSelectedCategoryId(category.id); setNewItemName(''); }}
                    className="text-xs px-2 py-1 mb-2 rounded bg-theme-interactive hover:bg-opacity-80 text-theme-text-muted border border-theme-border hover:border-theme-accent focus:outline-none focus:ring-1 focus:ring-theme-accent shadow-sm hover:shadow-md"
                >
                    + Tambah item ke kategori ini
                </button>
              )}
              
              {category.items.length === 0 && <p className="text-xs text-theme-text-muted italic py-1">Belum ada item di kategori ini.</p>}
              
              <ul className="space-y-1">
                <AnimatePresence>
                {category.items.map(item => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center justify-between p-1.5 bg-theme-interactive/30 rounded hover:bg-theme-interactive/50 transition-colors"
                  >
                    <label className="flex items-center space-x-2 cursor-pointer flex-grow">
                      <input
                        type="checkbox"
                        checked={item.packed}
                        onChange={() => handleTogglePacked(category.id, item.id)}
                        className="form-checkbox h-4 w-4"
                      />
                      <span className={`text-xs ${item.packed ? 'line-through text-theme-text-muted' : 'text-theme-text'}`}>
                        {item.name}
                      </span>
                    </label>
                    <button onClick={() => handleDeleteItem(category.id, item.id)} className="text-red-500 hover:text-red-700 transition-colors p-0.5 ml-2" aria-label={`Hapus item ${item.name}`}>
                      <DeleteIcon className="w-3.5 h-3.5"/>
                    </button>
                  </motion.li>
                ))}
                </AnimatePresence>
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
       <p className="text-xs text-theme-text-muted mt-4 p-2 border border-dashed border-[var(--color-theme-widget-border-hologram)]/50 rounded-md leading-relaxed bg-theme-widget-bg shadow-hologram-soft">
        <strong>Tips:</strong> Mulailah membuat daftar ini beberapa minggu sebelum keberangkatan. Pastikan semua dokumen penting seperti paspor, visa, dan tiket sudah aman. Bawa obat-obatan pribadi yang biasa Anda konsumsi dalam jumlah cukup.
      </p>
    </div>
  );
};

export default PackingListWidget;
