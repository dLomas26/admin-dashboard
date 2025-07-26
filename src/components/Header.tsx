import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendTestNotification } from '@/utils/pwa';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  const { toast } = useToast();

  const handleSendNotification = () => {
    sendTestNotification();
    toast({
      title: "Notification Sent!",
      description: "A test notification has been sent to demonstrate PWA capabilities.",
    });
  };

  return (
    <div className="bg-card border-b border-border p-6 sticky top-0 z-30 shadow-soft">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-card-foreground">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64 transition-smooth focus:w-80"
            />
          </div>

          {/* PWA Notification Demo Button */}
          <Button
            onClick={handleSendNotification}
            variant="outline"
            size="sm"
            className="gap-2 hover-lift"
          >
            <Bell className="h-4 w-4" />
            Send Notification
          </Button>

          {/* Notifications */}
          <Button
            variant="outline"
            size="sm"
            className="relative hover-lift"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full animate-pulse-soft" />
          </Button>

          {/* Profile */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2 hover-lift"
          >
            <User className="h-4 w-4" />
            <span className="hidden lg:inline">Admin</span>
          </Button>
        </div>
      </div>
    </div>
  );
};