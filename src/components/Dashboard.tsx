import { Users, GraduationCap, BookOpen, Calendar, TrendingUp, Award } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const stats = [
  {
    title: 'Total Students',
    value: '2,847',
    subtitle: 'Active this semester',
    icon: Users,
    trend: { value: 12, isPositive: true },
    gradient: 'gradient-primary'
  },
  {
    title: 'Total Teachers',
    value: '156',
    subtitle: 'Full-time faculty',
    icon: GraduationCap,
    trend: { value: 8, isPositive: true },
    gradient: 'gradient-success'
  },
  {
    title: 'Active Courses',
    value: '89',
    subtitle: 'This semester',
    icon: BookOpen,
    trend: { value: 5, isPositive: true },
    gradient: 'gradient-warning'
  },
  {
    title: 'Avg. Attendance',
    value: '94.2%',
    subtitle: 'This month',
    icon: TrendingUp,
    trend: { value: 2, isPositive: true }
  }
];

const recentActivities = [
  { id: 1, type: 'enrollment', student: 'Emma Johnson', course: 'Mathematics 101', time: '2 hours ago' },
  { id: 2, type: 'grade', student: 'Liam Smith', course: 'Physics Lab', time: '4 hours ago' },
  { id: 3, type: 'assignment', student: 'Olivia Brown', course: 'English Literature', time: '6 hours ago' },
  { id: 4, type: 'attendance', student: 'Noah Davis', course: 'Chemistry', time: '8 hours ago' },
];

const upcomingEvents = [
  { id: 1, title: 'Parent-Teacher Conference', date: 'March 15, 2024', type: 'meeting' },
  { id: 2, title: 'Science Fair', date: 'March 20, 2024', type: 'event' },
  { id: 3, title: 'Final Exams Begin', date: 'April 1, 2024', type: 'exam' },
  { id: 4, title: 'Spring Break', date: 'April 15, 2024', type: 'holiday' },
];

export const Dashboard = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.title} className="animate-float" style={{ animationDelay: `${index * 0.1}s` }}>
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="xl:col-span-2">
          <Card className="p-6 shadow-medium hover-lift">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">Recent Activities</h3>
              <Button variant="outline" size="sm" className="hover-lift">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
                  <div className="p-2 bg-primary rounded-lg">
                    <Calendar className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-card-foreground">
                      {activity.student} - {activity.course}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {activity.type} activity
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div>
          <Card className="p-6 shadow-medium hover-lift">
            <h3 className="text-lg font-semibold text-card-foreground mb-6">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 rounded-lg border border-border hover:bg-accent/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-warning rounded">
                      <Award className="h-3 w-3 text-warning-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-card-foreground">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-medium hover-lift">
          <h3 className="text-lg font-semibold text-card-foreground mb-6">Academic Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Mathematics</span>
                <span className="font-medium text-card-foreground">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Science</span>
                <span className="font-medium text-card-foreground">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">English</span>
                <span className="font-medium text-card-foreground">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">History</span>
                <span className="font-medium text-card-foreground">84%</span>
              </div>
              <Progress value={84} className="h-2" />
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-medium hover-lift">
          <h3 className="text-lg font-semibold text-card-foreground mb-6">Attendance Overview</h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">94.2%</div>
              <p className="text-muted-foreground">Overall Attendance Rate</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-3 rounded-lg bg-success/10">
                <div className="text-lg font-semibold text-success">2,695</div>
                <p className="text-xs text-muted-foreground">Present Today</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-destructive/10">
                <div className="text-lg font-semibold text-destructive">152</div>
                <p className="text-xs text-muted-foreground">Absent Today</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};