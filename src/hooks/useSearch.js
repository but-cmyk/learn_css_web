import { useMemo } from 'react';

export const useSearch = (allCategories, searchQuery) => {
  return useMemo(() => {
    if (!searchQuery || !searchQuery.trim()) {
      return allCategories;
    }

    const query = searchQuery.toLowerCase().trim();

    return allCategories.map(category => {
      const filteredTopics = category.topics.filter(topic => {
        const titleMatch = topic.title.toLowerCase().includes(query);
        const descMatch = topic.description.toLowerCase().includes(query);
        const exampleMatch = topic.examples.some(ex =>
          ex.title.toLowerCase().includes(query) ||
          ex.explanation.toLowerCase().includes(query)
        );
        return titleMatch || descMatch || exampleMatch;
      });

      return {
        ...category,
        topics: filteredTopics
      };
    }).filter(category => category.topics.length > 0);
  }, [allCategories, searchQuery]);
};
