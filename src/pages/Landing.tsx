import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Plus, Sparkles, Target, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">TodoFlow</span>
        </div>
        <AuthButton 
          trigger={
            <Button size="lg" className="rounded-full px-6">
              Get Started Free
            </Button>
          }
          dashboardTrigger={
            <Button size="lg" variant="outline" className="rounded-full px-6">
              Open App
            </Button>
          }
        />
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="container mx-auto px-4 py-20 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-accent/50 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Simple. Clean. Productive.</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            Todo Done Right
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            The minimalist todo app that helps you focus on what matters. 
            Clean design, powerful features, zero distractions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <AuthButton 
              trigger={
                <Button size="lg" className="rounded-full px-8 py-6 text-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Start Organizing
                </Button>
              }
            />
            <Button variant="ghost" size="lg" className="rounded-full px-8 py-6 text-lg">
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything you need, nothing you don't
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for productivity enthusiasts who value simplicity and efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Target,
              title: "Priority Focus",
              description: "Organize tasks by priority levels to focus on what matters most."
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Add, edit, and complete tasks in seconds with our streamlined interface."
            },
            {
              icon: CheckCircle,
              title: "Smart Organization",
              description: "Automatic sorting and filtering to keep your tasks perfectly organized."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="text-center p-8 rounded-2xl bg-card border hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-20"
      >
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to get organized?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who've transformed their productivity with TodoFlow.
          </p>
          <AuthButton 
            trigger={
              <Button size="lg" className="rounded-full px-8 py-6 text-lg">
                <Plus className="w-5 h-5 mr-2" />
                Get Started Now
              </Button>
            }
          />
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-8 border-t"
      >
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
            <CheckCircle className="w-3 h-3 text-primary-foreground" />
          </div>
          <span>Built with TodoFlow</span>
        </div>
      </motion.footer>
    </div>
  );
}