
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Settings = () => {
  const handleClearData = () => {
    toast.info("This feature is not implemented in this demo. In the full version, this would clear all project data.");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="max-w-2xl">
        <div className="bg-secondary/50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">About ProjectPilot</h2>
          <p className="text-muted-foreground mb-4">
            ProjectPilot is a minimal personal project tracker for solo developers and indie hackers. 
            Track your projects, manage tasks, and plan your work efficiently.
          </p>
          <p className="text-muted-foreground">
            Version 1.0.0
          </p>
        </div>
        
        <div className="bg-red-500/10 rounded-lg p-6 border border-destructive/20">
          <h2 className="text-lg font-medium mb-4 text-destructive">Danger Zone</h2>
          <p className="text-muted-foreground mb-4">
            The following actions are destructive and cannot be undone. Please proceed with caution.
          </p>
          <Button 
            variant="destructive" 
            onClick={handleClearData}
          >
            Clear All Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
