import { Shield, Upload, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
interface HeroProps {
  onImageUpload: () => void;
  onVideoUpload: () => void;
}
export const Hero = ({
  onImageUpload,
  onVideoUpload
}: HeroProps) => {
  return <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-glow/20 blur-[100px] animate-pulse" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {}
        <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Badge variant="outline" className="border-primary/50 bg-background/50 backdrop-blur-sm px-4 py-2 text-sm">
            <Shield className="w-4 h-4 mr-2 text-primary" />
            AI-Powered Detection
          </Badge>
        </div>

        {}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-foreground">Detect </span>
            <span className="text-primary">Deepfakes</span>
            <br />
            <span className="text-foreground">With Precision</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Advanced machine learning model trained to identify manipulated images and videos
            with industry-leading accuracy. Protect yourself from digital deception.
          </p>
        </div>

        {}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <Button variant="hero" onClick={onImageUpload} className="w-full sm:w-auto">
            <Upload className="w-5 h-5" />
            Upload Image
          </Button>
          <Button variant="outline" onClick={onVideoUpload} className="w-full sm:w-auto h-12 px-8 text-base">
            <Video className="w-5 h-5" />
            Upload Video
          </Button>
        </div>

        {}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">96.5%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">&lt;2s</div>
            <div className="text-sm text-muted-foreground">Detection Time</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">1M+</div>
            <div className="text-sm text-muted-foreground">Media Analyzed</div>
          </div>
        </div>
      </div>
    </section>;
};