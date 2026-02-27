import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Video as VideoIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface UploadZoneProps {
  type: "image" | "video";
  onClose: () => void;
  onAnalyze: (file: File) => void;
  isAnalyzing?: boolean;
}

export const UploadZone = ({ type, onClose, onAnalyze, isAnalyzing }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const acceptedTypes = type === "image" 
    ? "image/jpeg,image/png,image/jpg,image/webp"
    : "video/mp4,video/webm,video/mov";

  const maxSize = type === "image" ? 10 : 100; 

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    const fileSizeMB = file.size / (1024 * 1024);
    
    if (fileSizeMB > maxSize) {
      toast({
        title: "File too large",
        description: `${type === "image" ? "Image" : "Video"} must be under ${maxSize}MB`,
        variant: "destructive",
      });
      return false;
    }

    if (type === "image" && !file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return false;
    }

    if (type === "video" && !file.type.startsWith("video/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    if (!validateFile(file)) return;

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onAnalyze(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const Icon = type === "image" ? ImageIcon : VideoIcon;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <Card className="w-full max-w-2xl p-6 space-y-6 border-primary/20 shadow-[0_0_40px_rgba(0,255,255,0.1)]">
        {}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Upload {type === "image" ? "Image" : "Video"}</h2>
              <p className="text-sm text-muted-foreground">
                Max size: {maxSize}MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isAnalyzing}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {}
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 transition-all duration-200",
            isDragging ? "border-primary bg-primary/5" : "border-border",
            selectedFile && "border-primary/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!selectedFile ? (
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="p-4 rounded-full bg-primary/10">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  Drag & drop your {type} here
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse files
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedTypes}
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isAnalyzing}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {}
              <div className="relative rounded-lg overflow-hidden bg-muted max-h-64">
                {type === "image" && previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                )}
                {type === "video" && previewUrl && (
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-full"
                  />
                )}
              </div>

              {}
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                {!isAnalyzing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFile}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isAnalyzing}
          >
            Cancel
          </Button>
          <Button
            variant="hero"
            onClick={handleAnalyze}
            disabled={!selectedFile || isAnalyzing}
            className="flex-1"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze {type === "image" ? "Image" : "Video"}
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};
