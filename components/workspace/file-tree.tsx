"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFileIcon } from "@/lib/constants/file-types";

interface FileNode {
  id: string;
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileNode[];
}

interface FileTreeProps {
  files: Record<string, string>;
  activeFile: string;
  onFileSelect: (path: string) => void;
  onCreateFile?: (path: string) => void;
  onCreateFolder?: (path: string) => void;
  onDeleteFile?: (path: string) => void;
}

export function FileTree({
  files,
  activeFile,
  onFileSelect,
  onCreateFile,
  onCreateFolder,
  onDeleteFile,
}: FileTreeProps) {
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set(["src", "components", "lib"]));

  const fileTree = buildFileTree(Object.keys(files));

  const toggleDir = (path: string) => {
    setExpandedDirs((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-2 space-y-1">
        {fileTree.map((node) => (
          <TreeNode
            key={node.path}
            node={node}
            activeFile={activeFile}
            expandedDirs={expandedDirs}
            onToggleDir={toggleDir}
            onFileSelect={onFileSelect}
            onCreateFile={onCreateFile}
            onCreateFolder={onCreateFolder}
            onDeleteFile={onDeleteFile}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

interface TreeNodeProps {
  node: FileNode;
  activeFile: string;
  expandedDirs: Set<string>;
  onToggleDir: (path: string) => void;
  onFileSelect: (path: string) => void;
  onCreateFile?: (path: string) => void;
  onCreateFolder?: (path: string) => void;
  onDeleteFile?: (path: string) => void;
}

function TreeNode({
  node,
  activeFile,
  expandedDirs,
  onToggleDir,
  onFileSelect,
  onCreateFile,
  onCreateFolder,
  onDeleteFile,
}: TreeNodeProps) {
  const isExpanded = expandedDirs.has(node.path);
  const isActive = activeFile === node.path;

  if (node.type === "directory") {
    return (
      <div className="space-y-1">
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-accent/50 cursor-pointer group"
          onClick={() => onToggleDir(node.path)}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onToggleDir(node.path);
            }}
          >
            {isExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </Button>
          {isExpanded ? (
            <FolderOpen className="w-4 h-4 text-blue-500" />
          ) : (
            <Folder className="w-4 h-4 text-blue-500" />
          )}
          <span className="text-sm">{node.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 ml-auto opacity-0 group-hover:opacity-100"
              >
                <MoreHorizontal className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {onCreateFile && (
                <DropdownMenuItem onClick={() => onCreateFile(node.path)}>
                  <Plus className="w-4 h-4 mr-2" />
                  New File
                </DropdownMenuItem>
              )}
              {onCreateFolder && (
                <DropdownMenuItem onClick={() => onCreateFolder(node.path)}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Folder
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {isExpanded && node.children && (
          <div className="ml-4 pl-2 border-l border-border">
            {node.children.map((child) => (
              <TreeNode
                key={child.path}
                node={child}
                activeFile={activeFile}
                expandedDirs={expandedDirs}
                onToggleDir={onToggleDir}
                onFileSelect={onFileSelect}
                onCreateFile={onCreateFile}
                onCreateFolder={onCreateFolder}
                onDeleteFile={onDeleteFile}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-accent/50 cursor-pointer group">
      <div className="w-5" />
      <span className="text-sm">{getFileIcon(node.name)}</span>
      <span
        className={`text-sm flex-1 truncate ${
          isActive ? "font-medium text-primary" : ""
        }`}
        onClick={() => onFileSelect(node.path)}
      >
        {node.name}
      </span>
      {onDeleteFile && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0 ml-auto opacity-0 group-hover:opacity-100"
            >
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {onDeleteFile && (
              <DropdownMenuItem
                onClick={() => onDeleteFile(node.path)}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

function buildFileTree(filePaths: string[]): FileNode[] {
  const tree: FileNode[] = {};

  for (const path of filePathPaths) {
    const parts = path.split("/");
    let current = tree;

    for (let i = 0; i < parts.length; i++) {
      const isFile = i === parts.length - 1;
      const name = parts[i];

      let node = current.find((n) => n.name === name);

      if (!node) {
        node = {
          id: path,
          name,
          path: parts.slice(0, i + 1).join("/"),
          type: isFile ? "file" : "directory",
        };
        current.push(node);
      }

      if (!isFile) {
        node.type = "directory";
        node.children = node.children || [];
        current = node.children;
      }
    }
  }

  return sortTree(tree);
}

function sortTree(nodes: FileNode[]): FileNode[] {
  return nodes.sort((a, b) => {
    if (a.type === "directory" && b.type === "file") return -1;
    if (a.type === "file" && b.type === "directory") return 1;
    return a.name.localeCompare(b.name);
  });
}
