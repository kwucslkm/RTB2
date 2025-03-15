import { React, useEffect, useState } from "react";

interface NavProps {
	onBoardListClick():void;
}

const BoardList: React.FC = () => {
	
	console.log(" == BoardList.tsx");
  
  return (
    <div>
		<h2>BoardList notice </h2>
		<button>글쓰기</button>
    </div>
  );
};

export default BoardList;
