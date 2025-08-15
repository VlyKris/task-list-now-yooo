import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import { CalendarIcon, Plus } from "lucide-react";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

interface AddTodoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editTodo?: Doc<"todos"> | null;
}

export function AddTodoForm({ open, onOpenChange, editTodo }: AddTodoFormProps) {
  const createTodo = useMutation(api.todos.createTodo);
  const updateTodo = useMutation(api.todos.updateTodo);
  
  const [title, setTitle] = useState(editTodo?.title || "");
  const [description, setDescription] = useState(editTodo?.description || "");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(editTodo?.priority || "medium");
  const [dueDate, setDueDate] = useState(
    editTodo?.dueDate ? new Date(editTodo.dueDate).toISOString().split('T')[0] : ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      const todoData = {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate ? new Date(dueDate).getTime() : undefined,
      };

      if (editTodo) {
        await updateTodo({ id: editTodo._id, ...todoData });
        toast.success("Task updated successfully!");
      } else {
        await createTodo(todoData);
        toast.success("Task created successfully!");
      }

      // Reset form
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      onOpenChange(false);
    } catch (error) {
      toast.error(editTodo ? "Failed to update task" : "Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      setTitle(editTodo?.title || "");
      setDescription(editTodo?.description || "");
      setPriority(editTodo?.priority || "medium");
      setDueDate(editTodo?.dueDate ? new Date(editTodo.dueDate).toISOString().split('T')[0] : "");
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editTodo ? "Edit Task" : "Add New Task"}
          </DialogTitle>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date (optional)</Label>
              <div className="relative">
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || isLoading}
              className="flex-1"
            >
              {isLoading ? "Saving..." : editTodo ? "Update Task" : "Add Task"}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}
