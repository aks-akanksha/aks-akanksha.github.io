// Portfolio Analytics - Track Visitors and Interactions

// Analytics Configuration
const ANALYTICS_CONFIG = {
    // You can use a service like Google Analytics, Plausible, or self-hosted
    // For now, we'll use a simple localStorage-based tracking that you can later
    // integrate with your preferred analytics service
    
    // Set to true to enable console logging for debugging
    debug: false,
    
    // Storage key for local analytics
    storageKey: 'portfolio_analytics'
};

// Initialize analytics
(function() {
    'use strict';
    
    // Track page load
    trackPageView();
    
    // Track time on page
    trackTimeOnPage();
    
    // Track scroll depth
    trackScrollDepth();
    
    // Track exit intent (optional)
    trackExitIntent();
})();

// Track page view
function trackPageView(page = window.location.pathname) {
    const event = {
        type: 'pageview',
        page: page,
        timestamp: new Date().toISOString(),
        referrer: document.referrer || 'direct',
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`
    };
    
    logEvent(event);
    saveToLocalStorage(event);
    
    if (ANALYTICS_CONFIG.debug) {
        console.log('Page View:', event);
    }
}

// Track custom events
function trackEvent(category, action, label = '') {
    const event = {
        type: 'event',
        category: category,
        action: action,
        label: label,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    };
    
    logEvent(event);
    saveToLocalStorage(event);
    
    if (ANALYTICS_CONFIG.debug) {
        console.log('Event:', event);
    }
    
    // You can also send to external analytics service here
    // Example: sendToGoogleAnalytics(event);
    // Example: sendToPlausible(event);
}

// Track time on page
let startTime = Date.now();
let maxTime = 0;

function trackTimeOnPage() {
    // Track time every 30 seconds
    setInterval(() => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        maxTime = Math.max(maxTime, timeSpent);
        
        // Send time tracking every minute
        if (timeSpent % 60 === 0 && timeSpent > 0) {
            trackEvent('engagement', 'time_on_page', `${timeSpent} seconds`);
        }
    }, 30000);
    
    // Track final time when leaving
    window.addEventListener('beforeunload', () => {
        const finalTime = Math.floor((Date.now() - startTime) / 1000);
        if (finalTime > 10) { // Only track if user spent more than 10 seconds
            trackEvent('engagement', 'session_duration', `${finalTime} seconds`);
        }
    });
}

// Track scroll depth
let maxScroll = 0;
let scrollMilestones = [25, 50, 75, 100];
let reachedMilestones = new Set();

function trackScrollDepth() {
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round(
            ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
        );
        
        maxScroll = Math.max(maxScroll, scrollPercent);
        
        scrollMilestones.forEach(milestone => {
            if (scrollPercent >= milestone && !reachedMilestones.has(milestone)) {
                reachedMilestones.add(milestone);
                trackEvent('engagement', 'scroll_depth', `${milestone}%`);
            }
        });
    });
}

// Track exit intent
function trackExitIntent() {
    let exitIntentTracked = false;
    
    document.addEventListener('mouseout', (e) => {
        if (!e.toElement && !e.relatedTarget && !exitIntentTracked) {
            exitIntentTracked = true;
            trackEvent('engagement', 'exit_intent', 'mouse_left_viewport');
        }
    });
}

// Save events to localStorage
function saveToLocalStorage(event) {
    try {
        let events = JSON.parse(localStorage.getItem(ANALYTICS_CONFIG.storageKey) || '[]');
        events.push(event);
        
        // Keep only last 100 events to prevent storage overflow
        if (events.length > 100) {
            events = events.slice(-100);
        }
        
        localStorage.setItem(ANALYTICS_CONFIG.storageKey, JSON.stringify(events));
    } catch (e) {
        if (ANALYTICS_CONFIG.debug) {
            console.error('Error saving to localStorage:', e);
        }
    }
}

// Get analytics data
function getAnalyticsData() {
    try {
        return JSON.parse(localStorage.getItem(ANALYTICS_CONFIG.storageKey) || '[]');
    } catch (e) {
        return [];
    }
}

// Clear analytics data (for testing)
function clearAnalyticsData() {
    localStorage.removeItem(ANALYTICS_CONFIG.storageKey);
}

// Export analytics data as JSON
function exportAnalyticsData() {
    const data = getAnalyticsData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Log event (you can extend this to send to your analytics service)
function logEvent(event) {
    // Example: Send to Google Analytics 4
    // if (typeof gtag !== 'undefined') {
    //     if (event.type === 'pageview') {
    //         gtag('config', 'GA_MEASUREMENT_ID', {
    //             page_path: event.page
    //         });
    //     } else {
    //         gtag('event', event.action, {
    //             event_category: event.category,
    //             event_label: event.label
    //         });
    //     }
    // }
    
    // Example: Send to Plausible
    // if (typeof plausible !== 'undefined') {
    //     if (event.type === 'pageview') {
    //         plausible('pageview');
    //     } else {
    //         plausible(event.action, { props: { category: event.category, label: event.label } });
    //     }
    // }
    
    // Example: Send to custom endpoint
    // fetch('/api/analytics', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(event)
    // }).catch(err => console.error('Analytics error:', err));
}

// Generate analytics summary
function getAnalyticsSummary() {
    const events = getAnalyticsData();
    const summary = {
        totalEvents: events.length,
        pageviews: events.filter(e => e.type === 'pageview').length,
        events: events.filter(e => e.type === 'event').length,
        uniquePages: new Set(events.filter(e => e.type === 'pageview').map(e => e.page)).size,
        topEvents: {},
        topPages: {},
        linkClicks: {}
    };
    
    // Count events by category and action
    events.filter(e => e.type === 'event').forEach(event => {
        const key = `${event.category}:${event.action}`;
        summary.topEvents[key] = (summary.topEvents[key] || 0) + 1;
        
        // Track link clicks specifically
        if (event.category === 'project' || event.category === 'contact' || event.category === 'external_link') {
            summary.linkClicks[event.label] = (summary.linkClicks[event.label] || 0) + 1;
        }
    });
    
    // Count pageviews by page
    events.filter(e => e.type === 'pageview').forEach(event => {
        summary.topPages[event.page] = (summary.topPages[event.page] || 0) + 1;
    });
    
    return summary;
}

// Make functions available globally for debugging
if (typeof window !== 'undefined') {
    window.portfolioAnalytics = {
        getData: getAnalyticsData,
        getSummary: getAnalyticsSummary,
        exportData: exportAnalyticsData,
        clearData: clearAnalyticsData,
        trackEvent: trackEvent,
        trackPageView: trackPageView
    };
}

// Display analytics summary in console (for debugging)
if (ANALYTICS_CONFIG.debug) {
    setTimeout(() => {
        console.log('Analytics Summary:', getAnalyticsSummary());
    }, 5000);
}


