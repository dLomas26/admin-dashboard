// PWA Service Worker registration and push notification utilities

export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
      return registration;
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
      return null;
    }
  }
  return null;
};

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission;
  }
  return 'denied';
};

export const subscribeToPushNotifications = async (
  registration: ServiceWorkerRegistration
): Promise<PushSubscription | null> => {
  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        'BEl62iUYgUivxIkv69yViEuiBIa40HI80NM9P5JI__PgOmIoJD7fVLWYOlZ4sJA9AcpIgWr6P6YONRD2dkmqJZQ'
      )
    });
    return subscription;
  } catch (error) {
    console.log('Failed to subscribe to push notifications:', error);
    return null;
  }
};

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const sendTestNotification = (): void => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('School Management System', {
      body: 'This is a test notification from your admin dashboard!',
      icon: '/placeholder.svg',
      badge: '/placeholder.svg',
      tag: 'test-notification'
    });
  }
};

export const isStandalone = (): boolean => {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
};

export const isInstallable = (): Promise<boolean> => {
  return new Promise((resolve) => {
    window.addEventListener('beforeinstallprompt', () => {
      resolve(true);
    });
    
    // Timeout after 3 seconds
    setTimeout(() => resolve(false), 3000);
  });
};