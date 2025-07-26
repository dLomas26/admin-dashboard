import { useState } from 'react';
import { 
  Home, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  BarChart3,
  Settings,
  Bell,
  Menu,
  X,
  School
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'teachers', label: 'Teachers', icon: GraduationCap },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-primary text-primary-foreground p-2 rounded-lg shadow-soft"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <div className={cn(
        "fixed lg:relative bg-card border-r border-border h-screen transition-all duration-300 z-50",
        "flex flex-col shadow-medium",
        isCollapsed ? "w-16" : "w-64",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className={cn(
              "flex items-center gap-3 transition-opacity duration-200",
              isCollapsed && "opacity-0 lg:opacity-100"
            )}>
              <div className="p-2 bg-primary rounded-lg">
                <School className="h-6 w-6 text-primary-foreground" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="font-bold text-lg text-card-foreground">SchoolMS</h1>
                  <p className="text-xs text-muted-foreground">Admin Dashboard</p>
                </div>
              )}
            </div>
            
            {/* Close button for mobile */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1 text-muted-foreground hover:text-card-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            
            {/* Collapse button for desktop */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-1 text-muted-foreground hover:text-card-foreground transition-colors"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsMobileOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  "hover:bg-accent hover:text-accent-foreground hover-lift",
                  isActive && "bg-primary text-primary-foreground shadow-soft",
                  isCollapsed && "justify-center"
                )}
              >
                <Icon className={cn("h-5 w-5 flex-shrink-0", isActive && "animate-pulse-soft")} />
                {!isCollapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={cn(
          "p-4 border-t border-border",
          isCollapsed && "text-center"
        )}>
          <div className="text-xs text-muted-foreground">
            {!isCollapsed ? "Version 1.0.0" : "v1.0"}
          </div>
        </div>
      </div>
    </>
  );
};