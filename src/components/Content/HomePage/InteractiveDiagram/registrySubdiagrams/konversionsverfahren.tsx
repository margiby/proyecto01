import { tryRegisterDiagram } from "../utils/diagramRegistry";
import { createFlexibleDiagram } from "../utils/diagramFactory";
import type { DiagramFactoryOptions, FlexibleDiagramConfig } from "../data/flow-types";

export function registerKonversionSubdiagram(config: FlexibleDiagramConfig) {
  const diagramId = "konversionsverfahren";
  tryRegisterDiagram(diagramId, () => {
    const options: DiagramFactoryOptions = {
      defaultClassName: "konversion-node",
    };
    createFlexibleDiagram(diagramId, config, options);
  });
}