import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  gradient?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  className,
  gradient 
}: StatsCardProps) => {
  return (
    <div className={cn(
      "p-6 rounded-xl border border-border transition-all duration-300",
      "hover-lift hover-scale cursor-pointer",
      gradient ? gradient : "bg-card shadow-soft",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={cn(
            "text-sm font-medium",
            gradient ? "text-white/80" : "text-muted-foreground"
          )}>
            {title}
          </p>
          <div className="mt-2">
            <h3 className={cn(
              "text-2xl font-bold",
              gradient ? "text-white" : "text-card-foreground"
            )}>
              {value}
            </h3>
            {subtitle && (
              <p className={cn(
                "text-xs mt-1",
                gradient ? "text-white/70" : "text-muted-foreground"
              )}>
                {subtitle}
              </p>
            )}
          </div>
          
          {trend && (
            <div className="flex items-center mt-3 text-xs">
              <span className={cn(
                "font-medium",
                trend.isPositive ? "text-success" : "text-destructive",
                gradient && "text-white"
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className={cn(
                "ml-1",
                gradient ? "text-white/70" : "text-muted-foreground"
              )}>
                vs last month
              </span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "p-3 rounded-lg",
          gradient ? "bg-white/20" : "bg-accent"
        )}>
          <Icon className={cn(
            "h-6 w-6",
            gradient ? "text-white" : "text-accent-foreground"
          )} />
        </div>
      </div>
    </div>
  );
};