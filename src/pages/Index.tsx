import Header from '@/components/Header';
import TaskForm from '@/components/TaskForm';
import TaskFilters from '@/components/TaskFilters';
import SearchBar from '@/components/SearchBar';
import TaskList from '@/components/TaskList';
import TaskStats from '@/components/TaskStats';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Stats */}
          <TaskStats />

          {/* Add Task Form */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">Add New Task</h2>
            <TaskForm />
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TaskFilters />
            <div className="w-full sm:w-64">
              <SearchBar />
            </div>
          </div>

          {/* Task List */}
          <TaskList />
        </div>
      </main>
    </div>
  );
};

export default Index;
