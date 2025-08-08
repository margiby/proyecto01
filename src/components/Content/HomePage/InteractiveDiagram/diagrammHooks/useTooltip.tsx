import { useState } from "react";
import type { NodeMouseHandler } from "@xyflow/react";
import type { TooltipState } from "../data/flow-types";

/**
 * Custom Hook für Tooltip-Funktionalität in Diagrammen
 * Verwaltet den Zustand und die Event-Handler für Node-Tooltips
 */
export const useTooltip = () => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

  const handleNodeMouseEnter: NodeMouseHandler = (event, node) => {
    if (
      node.data &&
      typeof node.data === "object" &&
      "description" in node.data &&
      node.data.description
    ) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      setTooltip({
        visible: true,
        x: rect.right + 10,
        y: rect.top,
        content: node.data.description as string,
      });
    }
  };

  const handleNodeMouseLeave: NodeMouseHandler = () => {
    setTooltip({
      visible: false,
      x: 0,
      y: 0,
      content: "",
    });
  };

  const hideTooltip = () => {
    setTooltip({
      visible: false,
      x: 0,
      y: 0,
      content: "",
    });
  };

  return {
    tooltip,
    handleNodeMouseEnter,
    handleNodeMouseLeave,
    hideTooltip,
  };
};
