'use client';
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
 
export default function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
 
  useEffect(() => {
    var url = `${pathname}?${searchParams}`;
    if (searchParams !== '/') {
      url = `${pathname}?${searchParams}`;
    } else {
      url = `${pathname}`;
    }
    ym(98705115, 'hit', url);
  }, [pathname, searchParams])
 
  return null
}