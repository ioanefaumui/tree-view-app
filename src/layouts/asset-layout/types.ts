export interface ITreeNode {
  id: string;
  name: string;
  parentId?: string;
  locationId?: string;
  sensorId?: string;
  sensorType?: string;
  status?: string;
  children?: ITreeNode[];
}

export interface ITreeListContainerProps {
  treeData: ITreeNode[];
}
export interface ITreeListProps {
  parsedData: any[];
  setActiveNodes: (nodes: string[]) => void;
  style: { height: number; width: number; itemHeight: number };
  activeNodes: string[];
}
export interface ITreeNodeToParse {
  treeNode: ITreeNode;
  depth: number;
  itemsList: any[];
  parentNodes?: ITreeNode[];
  isLastChild?: boolean;
}

export interface ITreeItemProps {
  style: React.CSSProperties;
  node: ITreeNode & {
    depth: number;
    hasChildren: boolean;
    isCollapsed: boolean;
    isLastChild: boolean;
    parentNodes: ITreeNode[];
  };
  onClick: (node: ITreeNode) => void;
  defaultPadding: number;
  isNodeFirstLevel: boolean;
  itemPadding: number;
  verticalGuideLinesleft: number;
}
