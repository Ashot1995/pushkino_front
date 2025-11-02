'use client';

import { useEffect } from 'react';

export function PerformanceMonitor() {
    useEffect(() => {
        // Only run in production
        if (process.env.NODE_ENV !== 'production') return;

        // Monitor Core Web Vitals
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                // Log performance metrics
                console.log(`${entry.name}: ${entry.value}`);
                
                // Send to analytics if needed
                if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'performance_metric', {
                        metric_name: entry.name,
                        metric_value: Math.round(entry.value),
                        metric_delta: Math.round(entry.delta || 0),
                    });
                }
            }
        });

        // Observe different types of performance entries
        try {
            observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
        } catch (e) {
            // PerformanceObserver not supported
            console.log('PerformanceObserver not supported');
        }

        // Monitor page load time
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
                console.log(`Page load time: ${loadTime}ms`);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return null;
}
