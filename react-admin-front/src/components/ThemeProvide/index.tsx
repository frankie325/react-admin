import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { selectTheme } from '@/store/features/theme';
import { useSelector } from 'react-redux';

export default function ThemeProvide({ children }: PropsWithChildren) {
  const theme = useSelector(selectTheme);
  useEffect(() => {
    // 设置 HTML 元素的 data-theme 属性
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
}
