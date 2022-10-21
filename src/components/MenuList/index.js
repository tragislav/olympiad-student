import { FixedSizeList as List } from "react-window";

import "./styled.css";

const height = 40;

function MenuList({ options, children, maxHeight, getValue }) {
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
}

export default MenuList;
