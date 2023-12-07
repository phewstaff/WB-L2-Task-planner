import { useState } from "react";

export const useSortTodos = (initialTodos) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("");

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const toggleSortBy = (type) => {
    if (sortBy === type) {
      toggleSortOrder();
    } else {
      setSortBy(type);
    }
  };

  const sortedTodos = initialTodos.slice().sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortBy === "completion") {
      return sortOrder === "asc"
        ? a.completed - b.completed
        : b.completed - a.completed;
    } else {
      return 0;
    }
  });

  return {
    sortedTodos,
    toggleSortOrder,
    toggleSortBy,
    sortBy,
  };
};
