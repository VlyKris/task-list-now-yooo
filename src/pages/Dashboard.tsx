// TODO: THIS IS THE DEFAULT DASHBOARD PAGE THAT THE USER WILL SEE AFTER AUTHENTICATION. ADD MAIN FUNCTIONALITY HERE.
// This is the entry point for users who have just signed in

import { AddTodoForm } from "@/components/todos/AddTodoForm";
import { TodoItem } from "@/components/todos/TodoItem";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserButton } from "@/components/auth/UserButton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useAuth } from "@/hooks/use-auth";
import { Protected } from "@/lib/protected-page";
import { motion } from "framer-motion";
import { CheckCircle, Filter, Plus, Target } from "lucide-react";
import { useQuery } from "convex/react";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const todos = useQuery(api.todos.getTodos);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editTodo, setEditTodo] = useState<Doc<"todos"> | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "low" | "medium" | "high">("all");

  const filteredTodos = todos?.filter((todo) => {
    const statusMatch = 
      filter === "all" || 
      (filter === "active" && !todo.completed) || 
      (filter === "completed" && todo.completed);
    
    const priorityMatch = priorityFilter === "all" || todo.priority === priorityFilter;
    
    return statusMatch && priorityMatch;
  }) || [];

  const completedCount = todos?.filter(todo => todo.completed).length || 0;
  const totalCount = todos?.length || 0;
  const activeCount = totalCount - completedCount;

  const handleEdit = (todo: Doc<"todos">) => {
    setEditTodo(todo);
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditTodo(null);
  };

  return (
    <Protected>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10"
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">TodoFlow</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {user?.name || user?.email}
                </p>
              </div>
            </div>
            <UserButton />
          </div>
        </motion.header>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{activeCount}</p>
                  <p className="text-sm text-muted-foreground">Active Tasks</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedCount}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <Filter className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalCount}</p>
                  <p className="text-sm text-muted-foreground">Total Tasks</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8"
          >
            <div className="flex gap-3">
              <Select value={filter} onValueChange={(value: "all" | "active" | "completed") => setFilter(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={(value: "all" | "low" | "medium" | "high") => setPriorityFilter(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={() => setShowAddForm(true)} className="rounded-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </motion.div>

          {/* Todo List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3"
          >
            {filteredTodos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {filter === "completed" ? "No completed tasks yet" : 
                   filter === "active" ? "No active tasks" : "No tasks yet"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {filter === "all" ? "Create your first task to get started!" : 
                   `No ${filter} tasks found.`}
                </p>
                {filter === "all" && (
                  <Button onClick={() => setShowAddForm(true)} className="rounded-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Task
                  </Button>
                )}
              </motion.div>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem key={todo._id} todo={todo} onEdit={handleEdit} />
              ))
            )}
          </motion.div>
        </div>

        <AddTodoForm
          open={showAddForm}
          onOpenChange={handleCloseForm}
          editTodo={editTodo}
        />
      </div>
    </Protected>
  );
}