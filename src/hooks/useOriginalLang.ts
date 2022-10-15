import { useState } from "react";

export const useOriginalLang = () => {
  const [originalLang, setOriginalLang] = useState("ja");

  const onChangeOriginalLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value;
    setOriginalLang(target);
  };

  return { originalLang, onChangeOriginalLang };
};
