import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Upload, Download, Lock, Unlock } from 'lucide-react';
import { toast } from 'sonner';

export const SteganographyEncoder = () => {
  const [message, setMessage] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [stegoImageUrl, setStegoImageUrl] = useState<string>('');
  const [extractedMessage, setExtractedMessage] = useState('');
  const [mode, setMode] = useState<'hide' | 'extract'>('hide');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const url = URL.createObjectURL(file);
      setCoverImageUrl(url);
      setStegoImageUrl('');
      setExtractedMessage('');
    }
  };

  const hideMessage = async () => {
    if (!message || !coverImage) {
      toast.error('Please provide both a message and an image');
      return;
    }

    try {
      const img = new Image();
      img.src = coverImageUrl;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        toast.error('Failed to create canvas context');
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      
      const messageBinary = message.split('').map(char => 
        char.charCodeAt(0).toString(2).padStart(8, '0')
      ).join('');
      
      const lengthBinary = messageBinary.length.toString(2).padStart(32, '0');
      const fullBinary = lengthBinary + messageBinary;

      
      if (fullBinary.length > data.length / 4) {
        toast.error('Image too small for this message');
        return;
      }

      
      for (let i = 0; i < fullBinary.length; i++) {
        data[i * 4] = (data[i * 4] & 0xFE) | parseInt(fullBinary[i]);
      }

      ctx.putImageData(imageData, 0, 0);
      const stegoUrl = canvas.toDataURL('image/png');
      setStegoImageUrl(stegoUrl);
      toast.success('Message hidden successfully!');
    } catch (error) {
      toast.error('Failed to hide message');
      console.error(error);
    }
  };

  const extractMessage = async () => {
    if (!coverImage) {
      toast.error('Please upload an image');
      return;
    }

    try {
      const img = new Image();
      img.src = coverImageUrl;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        toast.error('Failed to create canvas context');
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      
      let lengthBinary = '';
      for (let i = 0; i < 32; i++) {
        lengthBinary += (data[i * 4] & 1).toString();
      }
      const messageLength = parseInt(lengthBinary, 2);

      if (messageLength === 0 || messageLength > data.length / 4 - 32) {
        toast.error('No valid hidden message found');
        return;
      }

      
      let messageBinary = '';
      for (let i = 32; i < 32 + messageLength; i++) {
        messageBinary += (data[i * 4] & 1).toString();
      }

      
      let extractedText = '';
      for (let i = 0; i < messageBinary.length; i += 8) {
        const byte = messageBinary.substring(i, i + 8);
        extractedText += String.fromCharCode(parseInt(byte, 2));
      }

      setExtractedMessage(extractedText);
      toast.success('Message extracted successfully!');
    } catch (error) {
      toast.error('Failed to extract message');
      console.error(error);
    }
  };

  const downloadStegoImage = () => {
    if (!stegoImageUrl) return;
    
    const link = document.createElement('a');
    link.href = stegoImageUrl;
    link.download = 'stego-image.png';
    link.click();
    toast.success('Image downloaded!');
  };

  return (
    <div className="space-y-8">
      {}
      <div className="flex gap-4 justify-center">
        <Button
          variant={mode === 'hide' ? 'default' : 'secondary'}
          onClick={() => setMode('hide')}
          className="gap-2"
        >
          <Lock className="w-4 h-4" />
          Hide Message
        </Button>
        <Button
          variant={mode === 'extract' ? 'default' : 'secondary'}
          onClick={() => setMode('extract')}
          className="gap-2"
        >
          <Unlock className="w-4 h-4" />
          Extract Message
        </Button>
      </div>

      {mode === 'hide' ? (
        <div className="grid lg:grid-cols-2 gap-8">
          {}
          <Card className="p-6 space-y-6 bg-card/50 backdrop-blur border-border/50">
            <div className="space-y-2">
              <Label htmlFor="message" className="text-lg font-display">
                Secret Message
              </Label>
              <Textarea
                id="message"
                placeholder="Hide: my password is 1234"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-32 bg-secondary/50 border-border/50 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="image" className="text-lg font-display">
                Cover Image
              </Label>
              <div className="relative">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => document.getElementById('image')?.click()}
                  variant="secondary"
                  className="w-full gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {coverImage ? coverImage.name : 'Upload Image'}
                </Button>
              </div>
              
              {coverImageUrl && (
                <div className="rounded-lg overflow-hidden border border-border/50">
                  <img 
                    src={coverImageUrl} 
                    alt="Cover" 
                    className="w-full h-auto max-h-64 object-contain bg-secondary/30"
                  />
                </div>
              )}
            </div>

            <Button 
              onClick={hideMessage}
              disabled={!message || !coverImage}
              className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Lock className="w-4 h-4" />
              Hide Message
            </Button>
          </Card>

          {}
          <Card className="p-6 space-y-6 bg-card/50 backdrop-blur border-border/50">
            <div className="space-y-2">
              <Label className="text-lg font-display">
                Stego Image
              </Label>
              {stegoImageUrl ? (
                <>
                  <div className="rounded-lg overflow-hidden border border-primary/30 card-glow">
                    <img 
                      src={stegoImageUrl} 
                      alt="Stego" 
                      className="w-full h-auto max-h-96 object-contain bg-secondary/30"
                    />
                  </div>
                  <Button
                    onClick={downloadStegoImage}
                    className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Download className="w-4 h-4" />
                    Download Stego Image
                  </Button>
                </>
              ) : (
                <div className="rounded-lg border-2 border-dashed border-border/50 p-12 text-center">
                  <p className="text-muted-foreground">
                    Your stego image will appear here
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 space-y-6 bg-card/50 backdrop-blur border-border/50">
            <div className="space-y-4">
              <Label htmlFor="extract-image" className="text-lg font-display">
                Stego Image
              </Label>
              <div className="relative">
                <input
                  id="extract-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => document.getElementById('extract-image')?.click()}
                  variant="secondary"
                  className="w-full gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {coverImage ? coverImage.name : 'Upload Image'}
                </Button>
              </div>
              
              {coverImageUrl && (
                <div className="rounded-lg overflow-hidden border border-border/50">
                  <img 
                    src={coverImageUrl} 
                    alt="Cover" 
                    className="w-full h-auto max-h-64 object-contain bg-secondary/30"
                  />
                </div>
              )}
            </div>

            <Button 
              onClick={extractMessage}
              disabled={!coverImage}
              className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Unlock className="w-4 h-4" />
              Extract Message
            </Button>

            {extractedMessage && (
              <div className="space-y-2">
                <Label className="text-lg font-display">
                  Extracted Message
                </Label>
                <div className="p-4 rounded-lg bg-secondary/50 border border-primary/30 card-glow">
                  <p className="text-foreground font-mono break-all">
                    {extractedMessage}
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
