
import { useState, useEffect } from 'react';
import { defaultContent, featureCards, ContentItem } from '../data/content';

export const useContent = () => {
  const [content, setContent] = useState<ContentItem[]>(defaultContent);
  const [features, setFeatures] = useState(featureCards);
  const [isEditing, setIsEditing] = useState(false);

  const getContent = (id: string): string => {
    const item = content.find(c => c.id === id);
    return item ? item.content : '';
  };

  const updateContent = (id: string, newContent: string) => {
    setContent(prev => prev.map(item => 
      item.id === id ? { ...item, content: newContent } : item
    ));
    console.log(`Content updated: ${id} = ${newContent}`);
  };

  const getContentByScreen = (screen: string) => {
    return content.filter(item => item.screen === screen);
  };

  const getContentBySection = (screen: string, section: string) => {
    return content.filter(item => item.screen === screen && item.section === section);
  };

  const updateFeature = (id: string, field: string, value: string) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === id ? { ...feature, [field]: value } : feature
    ));
    console.log(`Feature updated: ${id}.${field} = ${value}`);
  };

  const resetContent = () => {
    setContent(defaultContent);
    setFeatures(featureCards);
    console.log('Content reset to defaults');
  };

  const exportContent = () => {
    const exportData = {
      content,
      features,
      timestamp: new Date().toISOString()
    };
    console.log('Content exported:', exportData);
    return exportData;
  };

  const importContent = (importData: any) => {
    if (importData.content) {
      setContent(importData.content);
    }
    if (importData.features) {
      setFeatures(importData.features);
    }
    console.log('Content imported successfully');
  };

  return {
    content,
    features,
    isEditing,
    setIsEditing,
    getContent,
    updateContent,
    getContentByScreen,
    getContentBySection,
    updateFeature,
    resetContent,
    exportContent,
    importContent
  };
};
