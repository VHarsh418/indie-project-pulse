
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  ArrowRight, 
  CheckCircle, 
  Calendar, 
  Tag, 
  Github, 
  Save 
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex justify-between items-center border-b border-secondary">
        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          ProjectPilot
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link to="/dashboard">Get Started</Link>
          </Button>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              Track Your Projects with Clarity
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              ProjectPilot is a minimal yet powerful project tracker for indie hackers and solo developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/dashboard" className="flex items-center gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://github.com/username/project-pilot" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Github className="h-4 w-4" /> View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-6 bg-secondary/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-secondary/50 p-6 rounded-lg">
                <div className="mb-4 text-primary">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Task Management</h3>
                <p className="text-muted-foreground">
                  Create, organize, and track tasks for each project with simple checklists.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-6 rounded-lg">
                <div className="mb-4 text-primary">
                  <Tag className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Technology Tagging</h3>
                <p className="text-muted-foreground">
                  Tag and categorize projects by technologies for easier filtering and organization.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-6 rounded-lg">
                <div className="mb-4 text-primary">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Calendar View</h3>
                <p className="text-muted-foreground">
                  Visualize your project timeline and deadlines with an intuitive calendar interface.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-6 rounded-lg">
                <div className="mb-4 text-primary">
                  <Github className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">GitHub Integration</h3>
                <p className="text-muted-foreground">
                  Link your projects directly to their GitHub repositories for quick access.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-6 rounded-lg">
                <div className="mb-4 text-primary">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Status Tracking</h3>
                <p className="text-muted-foreground">
                  Track project progress with clear status indicators: planning, in-progress, completed, or on-hold.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-6 rounded-lg">
                <div className="mb-4 text-primary">
                  <Save className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Auto-Save</h3>
                <p className="text-muted-foreground">
                  Never lose your work with automatic saving as you update project details.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to streamline your projects?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start organizing your projects today with ProjectPilot. It's free to use!
            </p>
            <Button size="lg" asChild>
              <Link to="/dashboard" className="flex items-center gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="py-8 px-6 border-t border-secondary">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-lg font-semibold mb-4 md:mb-0">
            ProjectPilot
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; 2025 ProjectPilot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
