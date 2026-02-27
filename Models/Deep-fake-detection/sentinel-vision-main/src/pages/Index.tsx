import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { UploadZone } from "@/components/UploadZone";
import { ResultDisplay } from "@/components/ResultDisplay";
import { useToast } from "@/hooks/use-toast";

type UploadType = "image" | "video" | null;

interface AnalysisResult {
  isDeepfake: boolean;
  confidence: number;
  details: string;
}

const Index = () => {
  const [uploadType, setUploadType] = useState<UploadType>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const simulateAnalysis = (file: File): Promise<AnalysisResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        
        const isDeepfake = Math.random() > 0.6;
        const confidence = Math.floor(Math.random() * (isDeepfake ? 30 : 15)) + (isDeepfake ? 70 : 85);
        
        resolve({
          isDeepfake,
          confidence,
          details: isDeepfake 
            ? "Multiple manipulation artifacts detected in the analyzed content."
            : "No signs of manipulation detected. Content appears to be authentic.",
        });
      }, 2000);
    });
  };

  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true);
    
    try {
      const analysisResult = await simulateAnalysis(file);
      setResult(analysisResult);
      setUploadType(null);
      
      toast({
        title: "Analysis Complete",
        description: `File "${file.name}" has been analyzed successfully.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "An error occurred during analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCloseUpload = () => {
    if (!isAnalyzing) {
      setUploadType(null);
    }
  };

  const handleCloseResult = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <Hero
          onImageUpload={() => setUploadType("image")}
          onVideoUpload={() => setUploadType("video")}
        />
      </main>

      {uploadType && (
        <UploadZone
          type={uploadType}
          onClose={handleCloseUpload}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />
      )}

      {result && (
        <ResultDisplay
          result={result}
          onClose={handleCloseResult}
        />
      )}
    </div>
  );
};

export default Index;
