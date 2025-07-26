import { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const students = [
  { id: 1, name: 'Emma Johnson', email: 'emma.j@school.edu', grade: '12th', gpa: 3.8, status: 'active', phone: '+1 (555) 123-4567' },
  { id: 2, name: 'Liam Smith', email: 'liam.s@school.edu', grade: '11th', gpa: 3.6, status: 'active', phone: '+1 (555) 234-5678' },
  { id: 3, name: 'Olivia Brown', email: 'olivia.b@school.edu', grade: '12th', gpa: 3.9, status: 'active', phone: '+1 (555) 345-6789' },
  { id: 4, name: 'Noah Davis', email: 'noah.d@school.edu', grade: '10th', gpa: 3.4, status: 'inactive', phone: '+1 (555) 456-7890' },
  { id: 5, name: 'Ava Wilson', email: 'ava.w@school.edu', grade: '11th', gpa: 3.7, status: 'active', phone: '+1 (555) 567-8901' },
  { id: 6, name: 'Ethan Miller', email: 'ethan.m@school.edu', grade: '12th', gpa: 3.5, status: 'active', phone: '+1 (555) 678-9012' },
];

export const StudentsView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col lg:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-card text-card-foreground"
          >
            <option value="all">All Grades</option>
            <option value="10th">10th Grade</option>
            <option value="11th">11th Grade</option>
            <option value="12th">12th Grade</option>
          </select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 hover-lift">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2 hover-lift gradient-primary">
            <Plus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.map((student, index) => (
          <Card key={student.id} className="p-6 hover-lift shadow-soft transition-all duration-300" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">{student.grade} Grade</p>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="hover-lift">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{student.email}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{student.phone}</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <span className="text-xs text-muted-foreground">GPA</span>
                  <div className="font-semibold text-card-foreground">{student.gpa}</div>
                </div>
                
                <Badge 
                  variant={student.status === 'active' ? 'default' : 'secondary'}
                  className={student.status === 'active' ? 'bg-success text-success-foreground' : ''}
                >
                  {student.status}
                </Badge>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1 hover-lift">
                View Profile
              </Button>
              <Button variant="outline" size="sm" className="flex-1 hover-lift">
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No students found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};