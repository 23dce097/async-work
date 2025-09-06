import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Users, Calendar, BarChart3, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const Landing = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
      }
    };
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  const features = [
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team members in real-time"
    },
    {
      icon: Calendar,
      title: "Project Planning",
      description: "Plan and track projects with intuitive task management tools"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor project progress with detailed analytics and reports"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Stay synchronized with instant notifications and live updates"
    }
  ];

  const benefits = [
    "Streamlined project workflow",
    "Enhanced team communication",
    "Automated progress tracking",
    "Customizable task management",
    "Real-time collaboration",
    "Comprehensive reporting"
  ];

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">SynergySpace</span>
          </div>
          <Button onClick={handleGetStarted}>
            {isAuthenticated ? "Go to Dashboard" : "Sign In"}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Transform Your Team's
            <span className="text-gradient"> Productivity</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            SynergySpace is the ultimate project management platform that brings your team together, 
            streamlines workflows, and delivers results faster than ever before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="text-lg px-8 py-3"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Everything you need to succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why teams choose SynergySpace
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of teams who have transformed their productivity 
                with our comprehensive project management solution.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="glass-card p-8 rounded-2xl">
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                  <div className="h-4 bg-gradient-to-r from-secondary to-accent rounded-full w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-accent to-primary rounded-full w-1/2"></div>
                  <div className="space-y-2 pt-4">
                    <div className="h-2 bg-muted rounded w-full"></div>
                    <div className="h-2 bg-muted rounded w-4/5"></div>
                    <div className="h-2 bg-muted rounded w-3/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to supercharge your team?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your free trial today and experience the difference SynergySpace 
            can make for your team's productivity.
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="text-lg px-8 py-3"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-lg font-bold text-foreground">SynergySpace</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 SynergySpace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;