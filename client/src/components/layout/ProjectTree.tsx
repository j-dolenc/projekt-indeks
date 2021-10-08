import classes from './ProjectTree.module.css';
import React, { useState } from "react";
//import classes from "./ProjectStruct.module.css";
import SortableTree from "@nosferatu500/react-sortable-tree";
import "@nosferatu500/react-sortable-tree/style.css"; // This only needs to be imported once in your app
//import { TreeItem } from "@nosferatu500/react-sortable-tree";
import { TreeItem } from "react-sortable-tree";

const ProjectTree = () => {

  const getData = async () => {
    
  };

	getData();
	
  const initialData = [
    {
      title: "Chicken",
      children: [{ title: "Egg", children: [{ title: "hmmm" }] }],
    },
    { title: "Egg", children: [{ title: "fingerline" }] },
  ];

  const [treeData, setTreeData] = useState<TreeItem[]>(initialData);

  const onChangeHandler = (treeData: TreeItem[]) => {
    console.log(treeData);
    setTreeData(treeData);
    //setTreeData();
  };
  return (
    <div>
      <h2>{"{CURRENT PROJECT}"}</h2>
      <div style={{ height: 400 }}>
        <SortableTree treeData={treeData} onChange={onChangeHandler} />
      </div>
    </div>
  );
};
export default ProjectTree;
