import React, { useEffect, useState } from 'react';
import { ThemeCategory } from '../../types/product';
import { fetchThemes } from '../../api/productAPI';


interface ThemeSelectorProps {
  selectedThemes: number[]; // 선택된 테마 ID 리스트
  onThemeChange: (themeIds: number[]) => void; // 테마 변경 핸들러
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedThemes, onThemeChange }) => {
  const [themes, setThemes] = useState<ThemeCategory[]>([]);

  useEffect(() => {
    fetchThemes().then(setThemes);
  }, []);

  const handleThemeToggle = (tno: number) => {
    const updatedThemes = selectedThemes.includes(tno)
      ? selectedThemes.filter((id) => id !== tno) // 이미 선택된 테마면 제거
      : [...selectedThemes, tno]; // 새 테마 추가
    onThemeChange(updatedThemes);
  };

  return (
    <div>
      <h4>Select Themes</h4>
      {themes.map((theme) => (
        <label key={theme.tno}>
          <input
            type="checkbox"
            value={theme.tno}
            checked={selectedThemes.includes(theme.tno)}
            onChange={() => handleThemeToggle(theme.tno)}
          />
          {theme.tname}
        </label>
      ))}
    </div>
  );
};

export default ThemeSelector;
