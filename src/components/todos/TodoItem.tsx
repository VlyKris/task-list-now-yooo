import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, Clock, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

interface TodoItemProps {
  todo: Doc<"todos">;
  onEdit: (todo: Doc<"todos">) => void;
}

const priorityColors = {
  low: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  high: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
};

export function TodoItem({ todo, onEdit }: TodoItemProps) {
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const handleToggle = async () => {
    try {
      await toggleTodo({ id: todo._id });
      toast.success(todo.completed ? "Task marked as incomplete" : "Task completed!");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo({ id: todo._id });
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.01 }}
      className={`group p-4 rounded-xl border bg-card transition-all duration-200 ${
        todo.completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggle}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3
                className={`font-medium text-sm leading-relaxed ${
                  todo.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p
                  className={`text-sm mt-1 ${
                    todo.completed ? "line-through text-muted-foreground" : "text-muted-foreground"
                  }`}
                >
                  {todo.description}
                </p>
              )}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(todo)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center gap-3 mt-3">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                priorityColors[todo.priority]
              }`}
            >
              {todo.priority}
            </span>
            
            {todo.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {format(new Date(todo.dueDate), "MMM d")}
              </div>
            )}
            
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {format(new Date(todo._creationTime), "MMM d")}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
