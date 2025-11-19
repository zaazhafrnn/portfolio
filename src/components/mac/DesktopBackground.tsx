"use client";
import { WelcomeText } from "@/components/ui/AnimatedText";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export default function DesktopBackground({
  windows,
  handleCloseAllWindows,
  minimizeAllWindows,
}: {
  windows: any[];
  handleCloseAllWindows: () => void;
  minimizeAllWindows: () => void;
}) {
  const handleResetSplashScreen = () => {
    sessionStorage.removeItem("hasSeenSplash");
    window.location.reload();
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="absolute inset-0">
          <div
            className="w-full h-full"
            style={{
              backgroundColor: "rgb(248, 249, 250)",
              backgroundImage: `
                linear-gradient(rgb(226, 232, 240) 1px, transparent 2px),
                linear-gradient(90deg, rgb(226, 232, 240) 1px, transparent 2px),
                linear-gradient(rgb(226, 232, 240) 1px, transparent 2px),
                linear-gradient(90deg, rgb(226, 232, 240) 1px, transparent 2px)
              `,
              backgroundSize: "150px 150px, 150px 150px, 25px 25px, 25px 25px",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <WelcomeText />
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-54">
        <ContextMenuItem
          inset
          onSelect={handleCloseAllWindows}
          disabled={windows.length === 0}
          className="text-red-600 hover:bg-red-50 focus:bg-red-100 focus:text-red-800"
        >
          Close All Window
          <ContextMenuShortcut>⌘⇧W</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          onSelect={minimizeAllWindows}
          disabled={windows.length === 0 || windows.every((w) => w.isMinimized)}
        >
          Minimize All Window
          <ContextMenuShortcut>⌘M</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset onSelect={() => window.location.reload()}>
          Reload Page
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset onSelect={handleResetSplashScreen}>
          Show Splash Screen
          <ContextMenuShortcut>⌘⇧R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            <ContextMenuItem>Save Page...</ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
