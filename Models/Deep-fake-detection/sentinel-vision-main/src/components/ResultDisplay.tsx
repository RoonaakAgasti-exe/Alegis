import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ResultDisplayProps {
  result: {
    isDeepfake: boolean;
    confidence: number;
    details: string;
  };
  onClose: () => void;
}

export const ResultDisplay = ({ result, onClose }: ResultDisplayProps) => {
  const { isDeepfake, confidence, details } = result;

  const getStatusColor = () => {
    if (!isDeepfake) return "text-green-500";
    if (confidence > 80) return "text-red-500";
    return "text-yellow-500";
  };

  const getStatusIcon = () => {
    if (!isDeepfake) return <CheckCircle2 className="w-12 h-12" />;
    if (confidence > 80) return <XCircle className="w-12 h-12" />;
    return <AlertCircle className="w-12 h-12" />;
  };

  const getStatusText = () => {
    if (!isDeepfake) return "Authentic Content";
    if (confidence > 80) return "Deepfake Detected";
    return "Possible Manipulation";
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <Card className="w-full max-w-2xl p-8 space-y-6 border-primary/20 shadow-[0_0_40px_rgba(0,255,255,0.1)]">
        {}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Analysis Results</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {}
        <div className="flex flex-col items-center gap-4 py-8">
          <div className={getStatusColor()}>
            {getStatusIcon()}
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-bold">{getStatusText()}</h3>
            <p className="text-muted-foreground">{details}</p>
          </div>
        </div>

        {}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Confidence Level</span>
            <span className="text-2xl font-bold text-primary">{confidence}%</span>
          </div>
          <Progress value={confidence} className="h-3" />
        </div>

        {}
        <div className="space-y-4 pt-4 border-t border-border">
          <h4 className="font-semibold">Detection Details</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Analysis Method</p>
              <p className="font-medium">Deep Neural Network</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Processing Time</p>
              <p className="font-medium">1.3s</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Model Version</p>
              <p className="font-medium">SENTINEL v2.5</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Status</p>
              <p className="font-medium">{isDeepfake ? "Manipulated" : "Authentic"}</p>
            </div>
          </div>
        </div>

        {}
        <Button
          variant="hero"
          onClick={onClose}
          className="w-full"
        >
          Analyze Another File
        </Button>
      </Card>
    </div>
  );
};
