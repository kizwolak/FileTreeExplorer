import { useState } from "react";

type Node = {
  name: string;
  type: "file" | "folder";
  size?: number;
  children?: Node[];
};

function TreeNode({ node, level = 0 }: { node: Node; level?: number }) {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === "folder";

  return (
    <div>
      <div
        onClick={() => isFolder && setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: level * 12,
          cursor: isFolder ? "pointer" : "default",
          lineHeight: "1.8",
          fontFamily: "monospace",
        }}
      >
        <span style={{ width: 20 }}>
          {isFolder ? (isOpen ? "▾" : "▸") : ""}
        </span>
        <span>{node.name}</span>
      </div>

      {isFolder && isOpen && (
        <div
          style={{
            marginLeft: 12,
            borderLeft: "1px solid #ccc",
          }}
        >
          {node.children?.map((child) => (
            <TreeNode key={child.name} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function Tree() {
  const data = JSON.parse(sessionStorage.getItem("jsonData") || "null");

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div style={{ fontFamily: "monospace" }}>
      <h1>File Tree</h1>
      <TreeNode node={data} />
    </div>
  );
}

export default Tree;
