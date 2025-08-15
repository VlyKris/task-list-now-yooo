import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { CheckCircle, Plus, Sparkles, Target, Zap, ArrowRight, Star, Rocket, Users, Clock, Shield } from "lucide-react";
import { useRef, useEffect, useState } from "react";

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Animated gradient background
const AnimatedGradient = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// 3D Card component
const FeatureCard = ({ icon: Icon, title, description, delay }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      whileHover={{ 
        y: -10, 
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative text-center p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <Icon className="w-8 h-8 text-primary-foreground" />
        </motion.div>
        <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// Animated stats component
const AnimatedStats = () => {
  const [counts, setCounts] = useState({ users: 0, tasks: 0, time: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        users: Math.min(prev.users + 50, 10000),
        tasks: Math.min(prev.tasks + 100, 50000),
        time: Math.min(prev.time + 10, 1000)
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16"
    >
      {[
        { icon: Users, value: counts.users, label: "Active Users", suffix: "+" },
        { icon: CheckCircle, value: counts.tasks, label: "Tasks Completed", suffix: "+" },
        { icon: Clock, value: counts.time, label: "Hours Saved", suffix: "hrs" }
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-3">
            <stat.icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="text-2xl font-bold text-primary">
            {stat.value.toLocaleString()}{stat.suffix}
          </div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function Landing() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      <AnimatedGradient />
      <FloatingParticles />
      
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 container mx-auto px-4 py-6 flex items-center justify-between"
      >
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <CheckCircle className="w-6 h-6 text-primary-foreground" />
          </motion.div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            TodoFlow
          </span>
        </motion.div>
        <AuthButton 
          trigger={
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg">
                Get Started Free
              </Button>
            </motion.div>
          }
          dashboardTrigger={
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="outline" className="rounded-full px-8 border-primary/50 hover:bg-primary/10 shadow-lg">
                Open App
              </Button>
            </motion.div>
          }
        />
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        style={{ y, opacity, scale }}
        className="relative z-10 container mx-auto px-4 py-20 text-center"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <motion.div 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full px-6 py-3 mb-8 border border-primary/30"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Simple. Clean. Productive.
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-6xl md:text-8xl font-black tracking-tight mb-8"
          >
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Todo Done
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-primary to-foreground bg-clip-text text-transparent">
              Right
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            The minimalist todo app that helps you focus on what matters. 
            Clean design, powerful features, zero distractions.
          </motion.p>

          <AnimatedStats />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <AuthButton 
              trigger={
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="rounded-full px-10 py-8 text-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl">
                    <Plus className="w-6 h-6 mr-3" />
                    Start Organizing
                    <ArrowRight className="w-5 h-5 ml-3" />
                  </Button>
                </motion.div>
              }
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="ghost" size="lg" className="rounded-full px-10 py-8 text-xl border-2 border-primary/30 hover:bg-primary/10">
                <Rocket className="w-6 h-6 mr-3" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 container mx-auto px-4 py-32"
      >
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
          >
            Everything you need, nothing you don't
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Built for productivity enthusiasts who value simplicity and efficiency.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={Target}
            title="Priority Focus"
            description="Organize tasks by priority levels to focus on what matters most."
            delay={0.1}
          />
          <FeatureCard
            icon={Zap}
            title="Lightning Fast"
            description="Add, edit, and complete tasks in seconds with our streamlined interface."
            delay={0.2}
          />
          <FeatureCard
            icon={Shield}
            title="Smart Organization"
            description="Automatic sorting and filtering to keep your tasks perfectly organized."
            delay={0.3}
          />
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 container mx-auto px-4 py-32"
      >
        <motion.div 
          className="max-w-4xl mx-auto text-center relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl" />
          <div className="relative bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-16 border border-primary/20 backdrop-blur-sm">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 right-4 w-8 h-8 text-primary/50"
            >
              <Star />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
            >
              Ready to get organized?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground mb-10"
            >
              Join thousands of users who've transformed their productivity with TodoFlow.
            </motion.p>
            <AuthButton 
              trigger={
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="rounded-full px-12 py-8 text-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl">
                    <Plus className="w-6 h-6 mr-3" />
                    Get Started Now
                    <ArrowRight className="w-5 h-5 ml-3" />
                  </Button>
                </motion.div>
              }
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 container mx-auto px-4 py-12 border-t border-border/50"
      >
        <div className="flex items-center justify-center gap-3 text-muted-foreground">
          <motion.div 
            className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded flex items-center justify-center"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <CheckCircle className="w-4 h-4 text-primary-foreground" />
          </motion.div>
          <span className="text-lg font-medium">Built with TodoFlow</span>
        </div>
      </motion.footer>
    </div>
  );
}