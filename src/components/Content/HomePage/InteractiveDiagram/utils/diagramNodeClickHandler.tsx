import { MouseEvent } from "react";
import type { Node } from "@xyflow/react";
import type { DiagramNode } from "../data/flow-types";
import useDiagramStore from "../diagrammHooks/useDiagramStore";
import { diagramRegistry } from "./diagramRegistry";

/**
 * Universeller Handler für Node-Klicks im Diagramm.
 * Unterstützt Collapse für alle Diagramme mit treeConfig.
 */
export default function diagramNodeClickHandler(
  toggleCollapse: (id: string) => void
) {
  return function handleNodeClick(
    event: MouseEvent,
    node: Node<DiagramNode["data"]>
  ): void {
    event.preventDefault();

    const { setTableData, setTableTitle, setDiagramId } =
      useDiagramStore.getState();
    const diagramId = node.id;
    const current = useDiagramStore.getState().diagramId;
    const currentDiagram = diagramRegistry[current];

    // Wenn der Knoten eine Tabelle hat, setze die Tabellendaten und den Titel
    if (node.data.table) {
      setTableData(node.data.table);
      setTableTitle(node.data.cleanLabel || (node.data.label as string));
      return;
    }

    // Collapse nur, wenn das aktuelle Diagramm eine treeConfig hat
    if (currentDiagram && currentDiagram.treeConfig) {
      toggleCollapse(diagramId);
      return;
    }

    // Wenn ein Subdiagramm existiert → wechsel zu diesem
    if (diagramRegistry[diagramId]) {
      setDiagramId(diagramId);
      setTableData(null);
      setTableTitle(null);
    } else {
      console.log("Kein Diagramm für:", diagramId);
    }
  };
}
