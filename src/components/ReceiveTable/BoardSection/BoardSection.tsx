import styles from "@components/ReceiveTable/BoardSection/BoardSection.module.scss";
import { Board } from "@models/PodData/Board";
import Header from "@components/ReceiveTable/BoardSection/Header/Header";
import PacketRow from "@components/ReceiveTable/PacketRow/PacketRow";
import { memo } from "react";
import { VariableSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useCallback, useState } from "react";

type Props = {
  board: Board;
};

const BoardSection = ({ board }: Props) => {
  let [isVisible, setIsVisible] = useState(false);
  let packetArr = Object.values(board.packets);

  const toggleDropdown = useCallback(() => {
    setIsVisible((prevValue) => {
      return !prevValue;
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header
        boardName={board.name}
        isCaretOpen={isVisible}
        toggleDropdown={toggleDropdown}
      />
      {isVisible && (
        <div className={styles.packets}>
          <AutoSizer>
            {({ width, height }) => {
              return (
                <VariableSizeList
                  innerElementType={"div"}
                  itemData={packetArr}
                  itemCount={packetArr.length}
                  itemSize={(index) => {
                    return (
                      Object.keys(packetArr[index].measurements).length * 25 +
                      30
                    );
                  }}
                  width={width}
                  height={height}
                >
                  {({ data, index, style }) => {
                    return (
                      <PacketRow
                        key={data[index].id}
                        packet={data[index]}
                        style={style}
                      ></PacketRow>
                    );
                  }}
                </VariableSizeList>
              );
            }}
          </AutoSizer>
        </div>
      )}
    </div>
  );
};

export default memo(BoardSection);
