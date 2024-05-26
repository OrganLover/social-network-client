import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Paper, ScrollArea, Stack, Text } from '@mantine/core';
import { useDialogsStore, useMainStore } from '@shared/providers';

const MessagesBlock = () => {
  const [messageBoardHeight, setMessageBoardHeight] = useState(0);
  const [messageBoardWidth, setMessageBoardWidth] = useState(0);

  const { owner } = useMainStore();
  const store = useDialogsStore();
  const { selectedDialog, sortedMessages } = store;

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { blockSize, inlineSize } = entry.contentBoxSize[0];

        setMessageBoardHeight(blockSize);
        setMessageBoardWidth(inlineSize);
      }
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const msgs = store.sortedMessages;

    if (!msgs) {
      return;
    }

    if (msgs[msgs?.length - 1].writer.id === owner.id) {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.sortedMessages]);

  if (!selectedDialog) {
    return null;
  }

  const maxWidth = Math.min(messageBoardWidth / 1.2, 500);

  return (
    <Stack ref={containerRef} flex={1}>
      <ScrollArea
        h={messageBoardHeight}
        scrollbars={'y'}
        viewportRef={scrollRef}
      >
        {sortedMessages?.map(message => {
          const isAuthor = message.writer.id === owner.id;

          return (
            <Flex justify={isAuthor ? 'right' : 'left'}>
              <Paper
                shadow='xl'
                radius={'md'}
                c={'blue'}
                maw={maxWidth}
                p={10}
                m={10}
              >
                <Text
                  styles={{
                    root: { display: 'block', wordWrap: 'break-word' },
                  }}
                >
                  {message.value}
                </Text>
              </Paper>
            </Flex>
          );
        })}
      </ScrollArea>
    </Stack>
  );
};

export default observer(MessagesBlock);
