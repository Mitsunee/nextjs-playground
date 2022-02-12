import { useState } from "react";
import styles from "../styles/Card.module.css";

export default function Card({ thing, isDir = false }) {
  const [showList, setShowList] = useState(false);

  return (
    <div
      className={`${styles.card} ${isDir ? styles.dir : styles.file}`.trim()}
      onClick={isDir ? () => setShowList(s => !s) : undefined}>
      <p>
        <img src={isDir ? "/icons/folder.svg" : "/icons/file.svg"} />
        {isDir ? thing.name : thing}
      </p>
      {isDir && showList && (
        <ul>
          {thing.children?.map(([child, childIsDir], childIdx) => (
            <li key={childIdx}>
              <img src={childIsDir ? "/icons/folder.svg" : "/icons/file.svg"} />{" "}
              {child}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
