"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

type DeviceType = "desktop" | "tablet" | "mobile";

interface PreviewPanelProps {
  previewUrl?: string;
  isRunning?: boolean;
  onRefresh?: () => void;
}

const deviceWidths = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export function PreviewPanel({
  previewUrl,
  isRunning = false,
  onRefresh,
}: PreviewPanelProps) {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (previewUrl) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [previewUrl]);

  const handleRefresh = () => {
    setIsLoading(true);
    onRefresh?.();
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="h-10 border-b flex items-center justify-between px-3 bg-muted/30">
        <div className="flex items-center gap-1">
          {(["desktop", "tablet", "mobile"] as DeviceType[]).map((d) => (
            <Button
              key={d}
              variant={device === d ? "secondary" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setDevice(d)}
              title={d}
            >
              {d === "desktop" && <Monitor className="w-4 h-4" />}
              {d === "tablet" && <Tablet className="w-4 h-4" />}
              {d === "mobile" && <Smartphone className="w-4 h-4" />}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleRefresh}
            disabled={!isRunning}
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => window.open(previewUrl, "_blank")}
            disabled={!previewUrl}
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-muted/20 overflow-auto p-4 flex items-center justify-center">
        {!previewUrl || !isRunning ? (
          <Card className="p-8 text-center max-w-md">
            <Monitor className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">Preview Not Running</h3>
            <p className="text-sm text-muted-foreground">
              Click the Run button to start the preview server
            </p>
          </Card>
        ) : (
          <div
            className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
            style={{
              width: deviceWidths[device],
              maxWidth: "100%",
            }}
          >
            {isLoading ? (
              <div className="aspect-video flex items-center justify-center">
                <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <iframe
                src={previewUrl}
                className="w-full h-[600px] border-0"
                title="Preview"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
