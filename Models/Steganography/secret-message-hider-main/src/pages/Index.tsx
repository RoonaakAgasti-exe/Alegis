import { SteganographyEncoder } from '@/components/SteganographyEncoder';
import { Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display glow-text">Steganography</h1>
              <p className="text-sm text-muted-foreground">Image Steganography Tool</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-display glow-text">
              Hide Messages in Images
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use LSB steganography to secretly embed text messages within images. 
              Completely secure and invisible to the naked eye.
            </p>
          </div>

          <SteganographyEncoder />

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-lg bg-card/30 border border-border/50 backdrop-blur">
              <h3 className="text-lg font-display mb-2 text-primary">Secure</h3>
              <p className="text-sm text-muted-foreground">
                Messages are hidden using LSB encoding, making them imperceptible to human vision.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card/30 border border-border/50 backdrop-blur">
              <h3 className="text-lg font-display mb-2 text-primary">Private</h3>
              <p className="text-sm text-muted-foreground">
                All processing happens in your browser. No data is sent to any server.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card/30 border border-border/50 backdrop-blur">
              <h3 className="text-lg font-display mb-2 text-primary">Simple</h3>
              <p className="text-sm text-muted-foreground">
                Just upload an image, type your message, and download the result instantly.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
