import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { StudentsView } from '@/components/StudentsView';
import { registerServiceWorker, requestNotificationPermission } from '@/utils/pwa';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Placeholder components for other views
const TeachersView = () => (
  <div className="p-6">
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-card-foreground mb-4">Teachers Management</h2>
      <p className="text-muted-foreground">Teachers management functionality coming soon...</p>
    </div>
  </div>
);

const CoursesView = () => (
  <div className="p-6">
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-card-foreground mb-4">Courses Management</h2>
      <p className="text-muted-foreground">Courses management functionality coming soon...</p>
    </div>
  </div>
);

const ScheduleView = () => (
  <div className="p-6">
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-card-foreground mb-4">Schedule Management</h2>
      <p className="text-muted-foreground">Schedule management functionality coming soon...</p>
    </div>
  </div>
);

const AnalyticsView = () => (
  <div className="p-6">
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-card-foreground mb-4">Analytics Dashboard</h2>
      <p className="text-muted-foreground">Analytics dashboard functionality coming soon...</p>
    </div>
  </div>
);

const NotificationsView = () => (
  <div className="p-6">
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-card-foreground mb-4">Notifications Center</h2>
      <p className="text-muted-foreground">Notifications center functionality coming soon...</p>
    </div>
  </div>
);

const SettingsView = () => (
  <div className="p-6">
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-card-foreground mb-4">System Settings</h2>
      <p className="text-muted-foreground">System settings functionality coming soon...</p>
    </div>
  </div>
);

const getPageTitle = (tab: string) => {
  const titles: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: 'Dashboard', subtitle: 'Welcome back! Here\'s what\'s happening at your school.' },
    students: { title: 'Students', subtitle: 'Manage student information and records.' },
    teachers: { title: 'Teachers', subtitle: 'Manage faculty and staff information.' },
    courses: { title: 'Courses', subtitle: 'Manage academic courses and curriculum.' },
    schedule: { title: 'Schedule', subtitle: 'View and manage class schedules.' },
    analytics: { title: 'Analytics', subtitle: 'View detailed reports and insights.' },
    notifications: { title: 'Notifications', subtitle: 'Manage system notifications and alerts.' },
    settings: { title: 'Settings', subtitle: 'Configure system preferences and settings.' },
  };
  return titles[tab] || { title: 'School Management System', subtitle: '' };
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const initializePWA = async () => {
      try {
        // Register service worker
        const registration = await registerServiceWorker();
        if (registration) {
          console.log('Service Worker registered successfully');
        }

        // Request notification permission
        const permission = await requestNotificationPermission();
        if (permission === 'granted') {
          toast({
            title: "Notifications Enabled",
            description: "You will receive important updates from the school management system.",
          });
        }
      } catch (error) {
        console.error('PWA initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializePWA();
  }, [toast]);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentsView />;
      case 'teachers':
        return <TeachersView />;
      case 'courses':
        return <CoursesView />;
      case 'schedule':
        return <ScheduleView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-xl font-semibold text-card-foreground">Loading School Management System...</h2>
          <p className="text-muted-foreground">Setting up PWA capabilities</p>
        </div>
      </div>
    );
  }

  const { title, subtitle } = getPageTitle(activeTab);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header title={title} subtitle={subtitle} />
        
        <main className={cn(
          "flex-1 overflow-auto",
          "bg-gradient-to-br from-background via-accent/20 to-background"
        )}>
          <div className="animate-float">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
